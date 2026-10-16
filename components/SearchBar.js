"use client";

import { useState } from "react";
import { Search, Loader2, X, Sparkles, Globe } from "lucide-react";

const PRESET_URLS = [
  { label: "OpenGraph.io", url: "https://www.opengraph.io" },
  { label: "Vercel", url: "https://vercel.com" },
  { label: "GitHub", url: "https://github.com" },
  { label: "TechCrunch", url: "https://techcrunch.com" },
  { label: "YouTube", url: "https://www.youtube.com" },
];

export default function SearchBar({ onSearch, isLoading, currentUrl }) {
  const [inputVal, setInputVal] = useState(currentUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    onSearch(inputVal.trim());
  };

  const handlePresetClick = (url) => {
    setInputVal(url);
    onSearch(url);
  };

  const handleClear = () => {
    setInputVal("");
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSubmit} className="search-form">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Enter website URL (e.g. https://vercel.com or github.com)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isLoading}
          autoFocus
          spellCheck={false}
        />
        {inputVal && !isLoading && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            title="Clear input"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading || !inputVal.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="spinner" size={18} />
              <span>Fetching Preview...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Check Preview</span>
            </>
          )}
        </button>
      </form>

      <div className="quick-try-row">
        <span className="quick-try-label">
          <Globe size={14} /> Try sample:
        </span>
        {PRESET_URLS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            className="preset-chip"
            onClick={() => handlePresetClick(preset.url)}
            disabled={isLoading}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
