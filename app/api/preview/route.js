import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

// Helper to validate and normalize URL
function normalizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  let trimmed = rawUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }
  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }
    // Disallow loopback / private IP patterns for security
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname.endsWith(".local") ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

// Helper to resolve relative paths
function resolveUrl(relativeOrAbsolute, baseUrl) {
  if (!relativeOrAbsolute) return "";
  try {
    return new URL(relativeOrAbsolute, baseUrl).href;
  } catch {
    return relativeOrAbsolute;
  }
}

// Compute transparent SEO & Social Score (0 - 100)
function computeDiagnostics({ title, description, ogImage, twitterCard, canonical, favicon }) {
  const checks = [
    {
      id: "og_title",
      title: "Title Tag",
      passed: Boolean(title && title.trim().length > 0),
      points: 20,
      value: title || null,
      length: title ? title.length : 0,
      optimal: "30 - 60 characters",
      status: !title
        ? "missing"
        : title.length < 30
        ? "too_short"
        : title.length > 60
        ? "too_long"
        : "optimal",
      message: !title
        ? "Missing title tag. Social platforms and search engines need a title."
        : title.length > 60
        ? "Title is longer than 60 characters and may get truncated."
        : title.length < 30
        ? "Title is shorter than recommended 30 characters."
        : "Title length is optimal for social sharing and search.",
    },
    {
      id: "og_description",
      title: "Description",
      passed: Boolean(description && description.trim().length > 0),
      points: 20,
      value: description || null,
      length: description ? description.length : 0,
      optimal: "100 - 160 characters",
      status: !description
        ? "missing"
        : description.length < 50
        ? "too_short"
        : description.length > 165
        ? "too_long"
        : "optimal",
      message: !description
        ? "Missing meta description. Platforms will fallback to page text."
        : description.length > 165
        ? "Description exceeds 165 characters and will likely be truncated."
        : description.length < 50
        ? "Description is quite short. Consider adding more context."
        : "Description length is optimal.",
    },
    {
      id: "og_image",
      title: "Open Graph Image",
      passed: Boolean(ogImage),
      points: 25,
      value: ogImage || null,
      status: ogImage ? "optimal" : "missing",
      message: ogImage
        ? "Preview image detected. Social platforms will show a rich visual card."
        : "Missing og:image. Social shares will display as plain text or fallback icon.",
    },
    {
      id: "twitter_card",
      title: "Twitter / X Card",
      passed: Boolean(twitterCard),
      points: 15,
      value: twitterCard || null,
      status: twitterCard ? "optimal" : "warning",
      message: twitterCard
        ? `Twitter card configured (${twitterCard}).`
        : "twitter:card tag is not explicitly declared (defaults to summary or og fallback).",
    },
    {
      id: "canonical",
      title: "Canonical URL",
      passed: Boolean(canonical),
      points: 10,
      value: canonical || null,
      status: canonical ? "optimal" : "warning",
      message: canonical
        ? "Canonical URL is properly declared."
        : "Missing rel=\"canonical\" link. Helps prevent duplicate content issues.",
    },
    {
      id: "favicon",
      title: "Favicon",
      passed: Boolean(favicon),
      points: 10,
      value: favicon || null,
      status: favicon ? "optimal" : "warning",
      message: favicon
        ? "Favicon detected."
        : "No explicit favicon icon tag found.",
    },
  ];

  const totalScore = checks.reduce((acc, curr) => acc + (curr.passed ? curr.points : 0), 0);

  let rating = "Poor";
  if (totalScore >= 85) rating = "Excellent";
  else if (totalScore >= 70) rating = "Good";
  else if (totalScore >= 50) rating = "Fair";

  return {
    score: totalScore,
    maxScore: 100,
    rating,
    checks,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  return handlePreview(target);
}

export async function POST(request) {
  try {
    const body = await request.json();
    return handlePreview(body?.url);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

async function handlePreview(rawUrl) {
  const validatedUrl = normalizeUrl(rawUrl);

  if (!validatedUrl) {
    return NextResponse.json(
      {
        error: "Please provide a valid public HTTP or HTTPS web address.",
      },
      { status: 400 }
    );
  }

  const parsedUrl = new URL(validatedUrl);
  const domain = parsedUrl.hostname.replace(/^www\./i, "");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    // Realistic crawler user-agent that gets full OG tags
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    };

    let response;
    try {
      response = await fetch(validatedUrl, {
        headers,
        signal: controller.signal,
        redirect: "follow",
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Target server responded with status HTTP ${response.status} (${response.statusText || "Failed to fetch"})`,
        },
        { status: 400 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    // If user provided a direct image or pdf URL
    if (contentType.startsWith("image/")) {
      return NextResponse.json({
        url: validatedUrl,
        finalUrl: response.url || validatedUrl,
        domain,
        siteName: domain,
        title: domain,
        description: `Direct Image File (${contentType})`,
        image: validatedUrl,
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        isDirectMedia: true,
        og: {
          title: domain,
          description: `Direct Image File (${contentType})`,
          image: validatedUrl,
          url: validatedUrl,
          site_name: domain,
          type: "image",
        },
        twitter: {
          card: "summary_large_image",
          title: domain,
          description: `Direct Image File (${contentType})`,
          image: validatedUrl,
        },
        allTags: [],
        diagnostics: computeDiagnostics({
          title: domain,
          description: "Direct Image",
          ogImage: validatedUrl,
          twitterCard: "summary_large_image",
          canonical: validatedUrl,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        }),
      });
    }

    const html = await response.text();
    const finalUrl = response.url || validatedUrl;
    const finalParsed = new URL(finalUrl);
    const finalDomain = finalParsed.hostname.replace(/^www\./i, "");

    const $ = cheerio.load(html);

    // 1. Standard HTML tags
    const htmlTitle = $("title").first().text().trim();
    const metaDescription =
      $('meta[name="description" i]').attr("content")?.trim() || "";
    const metaKeywords =
      $('meta[name="keywords" i]').attr("content")?.trim() || "";
    const metaAuthor =
      $('meta[name="author" i]').attr("content")?.trim() || "";
    const canonicalRaw = $('link[rel="canonical" i]').attr("href");
    const canonical = resolveUrl(canonicalRaw, finalUrl);
    const themeColor =
      $('meta[name="theme-color" i]').attr("content")?.trim() || "";

    // Favicon resolution
    let faviconRaw =
      $('link[rel="icon" i]').attr("href") ||
      $('link[rel="shortcut icon" i]').attr("href") ||
      $('link[rel="apple-touch-icon" i]').attr("href");
    let favicon = resolveUrl(faviconRaw, finalUrl);
    if (!favicon) {
      favicon = `https://www.google.com/s2/favicons?domain=${finalDomain}&sz=64`;
    }

    // 2. Open Graph tags
    const ogTitle =
      $('meta[property="og:title" i]').attr("content")?.trim() || "";
    const ogDescription =
      $('meta[property="og:description" i]').attr("content")?.trim() || "";
    const ogImageRaw =
      $('meta[property="og:image" i]').attr("content") ||
      $('meta[property="og:image:url" i]').attr("content") ||
      $('meta[property="og:image:secure_url" i]').attr("content");
    const ogImage = resolveUrl(ogImageRaw, finalUrl);
    const ogImageAlt =
      $('meta[property="og:image:alt" i]').attr("content")?.trim() || "";
    const ogSiteName =
      $('meta[property="og:site_name" i]').attr("content")?.trim() || "";
    const ogType =
      $('meta[property="og:type" i]').attr("content")?.trim() || "website";
    const ogUrlRaw = $('meta[property="og:url" i]').attr("content");
    const ogUrl = resolveUrl(ogUrlRaw, finalUrl) || finalUrl;
    const ogLocale =
      $('meta[property="og:locale" i]').attr("content")?.trim() || "";

    // 3. Twitter Card tags
    const twitterCard =
      $('meta[name="twitter:card" i]').attr("content")?.trim() ||
      $('meta[property="twitter:card" i]').attr("content")?.trim() ||
      "";
    const twitterTitle =
      $('meta[name="twitter:title" i]').attr("content")?.trim() ||
      $('meta[property="twitter:title" i]').attr("content")?.trim() ||
      "";
    const twitterDescription =
      $('meta[name="twitter:description" i]').attr("content")?.trim() ||
      $('meta[property="twitter:description" i]').attr("content")?.trim() ||
      "";
    const twitterImageRaw =
      $('meta[name="twitter:image" i]').attr("content") ||
      $('meta[name="twitter:image:src" i]').attr("content") ||
      $('meta[property="twitter:image" i]').attr("content");
    const twitterImage = resolveUrl(twitterImageRaw, finalUrl);
    const twitterSite =
      $('meta[name="twitter:site" i]').attr("content")?.trim() ||
      $('meta[property="twitter:site" i]').attr("content")?.trim() ||
      "";
    const twitterCreator =
      $('meta[name="twitter:creator" i]').attr("content")?.trim() ||
      $('meta[property="twitter:creator" i]').attr("content")?.trim() ||
      "";

    // 4. Effective values for preview displays (prioritized hierarchy)
    const effectiveTitle = ogTitle || twitterTitle || htmlTitle || finalDomain;
    const effectiveDescription =
      ogDescription ||
      twitterDescription ||
      metaDescription ||
      "No description provided for this URL.";
    const effectiveImage = ogImage || twitterImage || null;
    const effectiveSiteName = ogSiteName || finalDomain;

    // 5. Collect all raw meta tags for the inspector table
    const allTags = [];
    $("meta").each((_, el) => {
      const name = $(el).attr("name") || $(el).attr("property") || $(el).attr("http-equiv") || "";
      const content = $(el).attr("content") || $(el).attr("value") || "";
      if (name && content) {
        allTags.push({
          key: name,
          content,
          type: name.startsWith("og:")
            ? "Open Graph"
            : name.startsWith("twitter:")
            ? "Twitter"
            : "Standard Meta",
        });
      }
    });

    // 6. Calculate diagnostics & score
    const diagnostics = computeDiagnostics({
      title: effectiveTitle,
      description: effectiveDescription !== "No description provided for this URL." ? effectiveDescription : "",
      ogImage: effectiveImage,
      twitterCard,
      canonical,
      favicon,
    });

    return NextResponse.json({
      url: validatedUrl,
      finalUrl,
      domain: finalDomain,
      siteName: effectiveSiteName,
      title: effectiveTitle,
      description: effectiveDescription,
      image: effectiveImage,
      favicon,
      themeColor,
      canonical,
      og: {
        title: ogTitle,
        description: ogDescription,
        image: ogImage,
        imageAlt: ogImageAlt,
        site_name: ogSiteName,
        type: ogType,
        url: ogUrl,
        locale: ogLocale,
      },
      twitter: {
        card: twitterCard || "summary_large_image",
        title: twitterTitle,
        description: twitterDescription,
        image: twitterImage,
        site: twitterSite,
        creator: twitterCreator,
      },
      meta: {
        htmlTitle,
        description: metaDescription,
        keywords: metaKeywords,
        author: metaAuthor,
      },
      allTags,
      diagnostics,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out after 9 seconds. The website took too long to respond." },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: `Failed to scrape link preview: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
