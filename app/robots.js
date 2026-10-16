export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://oglinkpreview.vercel.app/sitemap.xml",
  };
}
