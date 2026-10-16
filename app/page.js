"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroIllustration from "@/components/HeroIllustration";
import SearchBar from "@/components/SearchBar";
import SupportedPlatforms from "@/components/SupportedPlatforms";
import PlatformPreviews from "@/components/PlatformPreviews";
import TagInspector from "@/components/TagInspector";
import { Zap, Link2, ShieldCheck, AlertCircle } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

export default function Home() {
  const [url, setUrl] = useState("https://github.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const fetchPreview = useCallback(async (targetUrl) => {
    if (!targetUrl) return;
    setUrl(targetUrl);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/preview?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch preview metadata");
      }

      setPreviewData(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while fetching preview.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial preview for the default open-source URL on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPreview("https://github.com");
  }, [fetchPreview]);

  const handleScrollToChecker = () => {
    const el = document.getElementById("url-checker");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input");
      if (input) input.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-neutral-100 transition-colors">
      {/* Top Navigation */}
      <Navbar onCheckPreviewClick={handleScrollToChecker} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24">
        {/* HERO SECTION: Two-column responsive desktop layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-6 lg:mb-8">
          {/* Left Column: Heading, Description, Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow badge & GitHub repo link */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
                REAL-TIME LINK PREVIEW TOOL
              </div>
              <a
                href="https://github.com/Yaseen549/link-preview"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <GithubIcon size={13} />
                <span>Open Source on GitHub</span>
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 dark:text-white leading-[1.14] tracking-tight mb-4">
              See how your link looks{" "}
              <span className="text-gradient-teal">everywhere.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed mb-6 max-w-xl">
              Preview how your URL appears on Facebook, LinkedIn, X (Twitter), Slack and
              Google. Check titles, descriptions, images and meta tags instantly before you share.
            </p>

            {/* Three Compact Feature Highlights */}
            <div id="features" className="flex flex-wrap items-center gap-5 sm:gap-7 pt-1">
              {/* Feature 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                    Real-time preview
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
                    See changes instantly
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0">
                  <Link2 size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                    Open Graph analysis
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
                    View all meta tags
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                    Works on any URL
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
                    Websites, articles, apps
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition of Overlapping Cards */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroIllustration data={previewData} />
          </div>
        </section>

        {/* URL CHECKER COMPONENT (WIDE) */}
        <SearchBar
          onSearch={fetchPreview}
          isLoading={loading}
          currentUrl={url}
        />

        {/* Error Notification */}
        {error && (
          <div className="my-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-3">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SUPPORTED PLATFORMS STRIP */}
        <SupportedPlatforms />

        {/* LINK PREVIEWS SECTION: 3-column responsive grid */}
        <PlatformPreviews
          data={previewData}
          isLoading={loading}
        />

        {/* TAG HEALTH & INSPECTOR SECTION with dynamic remount key */}
        {previewData && (
          <TagInspector
            key={`inspector-${previewData?.finalUrl || previewData?.url || url}`}
            data={previewData}
          />
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-900 bg-slate-50/50 dark:bg-black py-8 px-4 text-center text-xs text-slate-500 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-white font-black text-[11px] leading-none shadow-xs">
              LP
            </div>
            <p>© 2026 LinkPreview. Open source under MIT License.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <a
              href="https://github.com/Yaseen549/link-preview"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-neutral-300 hover:text-emerald-500 transition-colors"
            >
              <GithubIcon size={14} />
              <span>GitHub Repository</span>
            </a>
            <a href="https://ogp.me/" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
              Open Graph Protocol
            </a>
            <a href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
              Twitter Cards
            </a>
            <a href="#url-checker" className="hover:text-emerald-500 transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
