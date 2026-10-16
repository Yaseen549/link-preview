"use client";

import { useState, useEffect } from "react";
import { Link2, X, ArrowRight, Loader2, Sparkles } from "lucide-react";

const EXAMPLE_URLS = [
  { label: "GitHub", url: "https://github.com" },
  { label: "OpenGraph.io", url: "https://www.opengraph.io" },
  { label: "Vercel", url: "https://vercel.com" },
  { label: "TechCrunch", url: "https://techcrunch.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
];

export default function SearchBar({ onSearch, isLoading, currentUrl }) {
  const [inputVal, setInputVal] = useState(currentUrl || "https://github.com");

  // Keep input synchronized if parent URL changes
  useEffect(() => {
    if (currentUrl) {
      setInputVal(currentUrl);
    }
  }, [currentUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handleExampleClick = (url) => {
    setInputVal(url);
    onSearch(url);
  };

  const handleClear = () => {
    setInputVal("");
  };

  return (
    <div id="url-checker" className="w-full my-8 sm:my-10">
      {/* Siri iOS 18 fluid flame soul aura wrapper */}
      <div className="relative group">
        {/* Layer 1: Ethereal radiant flame plume radiating outward */}
        <div className="absolute -inset-2.5 sm:-inset-4 rounded-3xl siri-flame-outer pointer-events-none -z-20 opacity-70 group-hover:opacity-90 group-focus-within:opacity-100 transition-opacity duration-300" />

        {/* Layer 2: Middle undulating liquid heat wave */}
        <div className="absolute -inset-1 rounded-2xl siri-flame-mid pointer-events-none -z-10 opacity-60 group-hover:opacity-85 group-focus-within:opacity-100 transition-opacity duration-300" />

        {/* Layer 3: Radiant flame rim border */}
        <div className="relative p-[2.5px] rounded-2xl siri-flame-rim shadow-xl">
          <div className="bg-white dark:bg-black rounded-[14px] p-2 sm:p-2.5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
            >
              {/* Input with Link icon and Clear action */}
              <div className="relative flex-1 flex items-center min-w-0">
                <Link2
                  size={18}
                  className="absolute left-3.5 text-slate-400 dark:text-neutral-500 pointer-events-none flex-shrink-0"
                />
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter a website URL (e.g. https://github.com)"
                  disabled={isLoading}
                  spellCheck={false}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 bg-transparent border-0 outline-none focus:ring-0"
                />
                {inputVal && !isLoading && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear URL input"
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 p-1 rounded-full transition-colors"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md shadow-emerald-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <span>Check Preview</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Examples Row */}
      <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 mt-3.5 px-1">
        <span className="text-xs text-slate-500 dark:text-neutral-400 font-medium mr-1 flex items-center gap-1">
          <Sparkles size={12} className="text-emerald-500" />
          Try an open-source example:
        </span>
        {EXAMPLE_URLS.map((item) => (
          <button
            key={item.label}
            type="button"
            disabled={isLoading}
            onClick={() => handleExampleClick(item.url)}
            className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-neutral-800 dark:hover:text-emerald-400 border border-slate-200/80 dark:border-neutral-800 rounded-full transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
