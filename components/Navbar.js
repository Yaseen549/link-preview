"use client";

import { useState, useEffect } from "react";
import { Link2, Sun, Moon, ExternalLink, Menu, X, ArrowRight, History } from "lucide-react";

export default function Navbar({ onCheckPreviewClick }) {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const changelogItems = [
    {
      version: "v1.0.0",
      date: "October 2026",
      tag: "Latest Release",
      features: [
        "Real-time Open Graph parser with crawler User-Agent emulation",
        "Pixel-accurate preview cards for Facebook, X (Twitter), LinkedIn, Slack, and Google Search",
        "Transparent 0–100 SEO & social card health score breakdown",
        "Character length recommendation meters for Title and Description",
        "Siri-inspired iridescent glowing search bar interface",
        "Interactive draggable tabletop preview cards in the hero section",
        "1-click HTML meta tags code generator",
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Pro Free Badge */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-base tracking-tighter leading-none shadow-sm shadow-emerald-500/25 group-hover:bg-emerald-600 group-hover:scale-105 transition-all duration-200">
                LP
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                LinkPreview
              </span>
            </a>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
              PRO FREE
            </span>
          </div>

          {/* Center Navigation Links - Features, Supported Apps & Changelog */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#supported-platforms"
              className="text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Supported Apps
            </a>
            <button
              type="button"
              onClick={() => setChangelogOpen(true)}
              className="text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Changelog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </button>
          </nav>

          {/* Right Action Controls: All perfectly equal h-9 (36px) height */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="h-9 w-9 rounded-lg border border-gray-200 dark:border-neutral-800 flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
            </button>

            {/* OG Protocol Link: Exactly h-9 matching the buttons */}
            <a
              href="https://ogp.me/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex h-9 px-3.5 items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-neutral-800 text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>OG Protocol</span>
              <ExternalLink size={12} className="text-slate-400 dark:text-neutral-500" />
            </a>

            {/* Primary CTA: Exactly h-9 matching the buttons */}
            <button
              type="button"
              onClick={onCheckPreviewClick}
              className="h-9 px-4 inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm shadow-emerald-500/20 transition-all hover:shadow-md hover:shadow-emerald-500/30 active:scale-95"
            >
              <span>Check Preview</span>
              <ArrowRight size={14} />
            </button>

            {/* Mobile Menu Toggle Button: Exactly h-9 */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-900 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-black px-4 pt-3 pb-5 space-y-2">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              Features
            </a>
            <a
              href="#supported-platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              Supported Apps
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setChangelogOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900 flex items-center justify-between"
            >
              <span>Changelog</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
                v1.0.0
              </span>
            </button>
            <a
              href="https://ogp.me/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              <span>OG Protocol Docs</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </header>

      {/* Standard Changelog Modal */}
      {changelogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-neutral-800 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/50">
                  <History size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Product Changelog
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">
                    Industry-standard release notes
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChangelogOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
              {changelogItems.map((item) => (
                <div key={item.version} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                        {item.version}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-neutral-500">{item.date}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-neutral-300 list-disc list-inside leading-relaxed pl-1">
                    {item.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-end">
              <button
                type="button"
                onClick={() => setChangelogOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
