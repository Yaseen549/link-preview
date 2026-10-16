"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  Search,
} from "lucide-react";

export default function TagInspector({ data }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [snippetCopied, setSnippetCopied] = useState(false);

  if (!data) return null;

  const { diagnostics, allTags = [], title, description, image, url, siteName } = data;
  const { score = 0, maxScore = 100, rating = "Fair", checks = [] } = diagnostics || {};

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleCopySnippet = () => {
    const snippet = `<!-- Primary Meta Tags -->
<title>${title || ""}</title>
<meta name="title" content="${title || ""}">
<meta name="description" content="${description || ""}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || ""}">
<meta property="og:title" content="${title || ""}">
<meta property="og:description" content="${description || ""}">
${image ? `<meta property="og:image" content="${image}">` : ""}
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ""}

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url || ""}">
<meta name="twitter:title" content="${title || ""}">
<meta name="twitter:description" content="${description || ""}">
${image ? `<meta name="twitter:image" content="${image}">` : ""}`;

    navigator.clipboard.writeText(snippet);
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  };

  const filteredTags = allTags.filter((tag) => {
    const matchesSearch =
      tag.key.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tag.content.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "og") return tag.type === "Open Graph";
    if (activeTab === "twitter") return tag.type === "Twitter";
    if (activeTab === "meta") return tag.type === "Standard Meta";
    return true;
  });

  const ratingBadgeColor =
    score >= 85
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
      : score >= 70
      ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800"
      : score >= 50
      ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800";

  return (
    <section id="tag-inspector" className="w-full my-10 sm:my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <ShieldCheck size={16} />
            <span>METADATA HEALTH CHECK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Tag Health & Inspector
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transparent analysis of Open Graph, Twitter Cards, and SEO meta tags
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SCORE & DIAGNOSTICS CHECKLIST (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-5">
          {/* Circular Score Badge */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#141416] rounded-xl border border-gray-100 dark:border-neutral-800/80">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                SEO & Social Score
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {score}
                </span>
                <span className="text-xs text-slate-400 dark:text-neutral-500">/ {maxScore}</span>
              </div>
            </div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${ratingBadgeColor}`}
            >
              {rating}
            </span>
          </div>

          {/* Diagnostic Checks List */}
          <div className="space-y-3">
            {checks.map((check) => {
              const isPassed = check.passed;
              const isWarning =
                check.status === "warning" ||
                check.status === "too_short" ||
                check.status === "too_long";
              const isMissing = check.status === "missing";

              let icon = <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />;
              if (isWarning)
                icon = <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />;
              if (isMissing)
                icon = <XCircle size={16} className="text-rose-500 flex-shrink-0" />;

              return (
                <div
                  key={check.id}
                  className="p-3 bg-slate-50/70 dark:bg-[#141416]/50 rounded-xl border border-gray-100 dark:border-neutral-800/80"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {icon}
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {check.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-neutral-500">
                      {isPassed ? `+${check.points} pts` : `0 / ${check.points}`}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 pl-6 leading-relaxed">
                    {check.message}
                  </p>

                  {check.length !== undefined && (
                    <div className="pl-6 mt-2">
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            check.status === "optimal"
                              ? "bg-emerald-500"
                              : check.status === "too_long"
                              ? "bg-rose-500"
                              : "bg-amber-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (check.length / (check.id === "og_title" ? 60 : 160)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 dark:text-neutral-500 mt-1">
                        <span>{check.length} characters</span>
                        <span>{check.optimal}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RAW TAGS TABLE & CODE GENERATOR (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col">
          {/* Subtabs and Filter Input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-neutral-900 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "all"
                    ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                All ({allTags.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("og")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "og"
                    ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Open Graph
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("twitter")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "twitter"
                    ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Twitter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("meta")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "meta"
                    ? "bg-white dark:bg-black text-gray-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("snippet")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all inline-flex items-center gap-1 ${
                  activeTab === "snippet"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Code2 size={13} />
                <span>HTML Code</span>
              </button>
            </div>

            {activeTab !== "snippet" && (
              <div className="relative w-full sm:w-56">
                <Search
                  size={14}
                  className="absolute left-3 top-2.5 text-slate-400 dark:text-neutral-500 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Filter tags..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs text-gray-900 dark:text-white bg-slate-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg outline-none focus:border-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Tab Content: Snippet or Raw Table */}
          {activeTab === "snippet" ? (
            <div className="flex-1 bg-black text-neutral-100 rounded-xl p-4 sm:p-5 font-mono text-xs overflow-hidden flex flex-col border border-neutral-800">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
                <span className="text-neutral-400 font-sans text-xs font-semibold">
                  Recommended HTML Meta Tags
                </span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all ${
                    snippetCopied
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800"
                  }`}
                >
                  {snippetCopied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{snippetCopied ? "Copied!" : "Copy HTML"}</span>
                </button>
              </div>

              <pre className="overflow-x-auto text-emerald-400 leading-relaxed font-mono select-all">
{`<!-- Primary Meta Tags -->
<title>${title || ""}</title>
<meta name="title" content="${title || ""}">
<meta name="description" content="${description || ""}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || ""}">
<meta property="og:title" content="${title || ""}">
<meta property="og:description" content="${description || ""}">
${image ? `<meta property="og:image" content="${image}">\n` : ""}${siteName ? `<meta property="og:site_name" content="${siteName}">\n` : ""}<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url || ""}">
<meta name="twitter:title" content="${title || ""}">
<meta name="twitter:description" content="${description || ""}">
${image ? `<meta name="twitter:image" content="${image}">` : ""}`}
              </pre>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto border border-gray-200 dark:border-neutral-800/80 rounded-xl max-h-[460px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400 z-10">
                  <tr>
                    <th className="py-2.5 px-3.5 font-semibold">Property / Tag</th>
                    <th className="py-2.5 px-3.5 font-semibold">Extracted Content</th>
                    <th className="py-2.5 px-3.5 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800/80">
                  {filteredTags.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-10 text-center text-slate-400 dark:text-neutral-500"
                      >
                        No matching meta tags detected.
                      </td>
                    </tr>
                  ) : (
                    filteredTags.map((tag, idx) => {
                      const itemKey = `${tag.key}-${idx}`;
                      const isCopied = copiedKey === itemKey;

                      return (
                        <tr
                          key={itemKey}
                          className="hover:bg-slate-50/60 dark:hover:bg-neutral-900/40 transition-colors"
                        >
                          <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                            {tag.key}
                          </td>
                          <td className="py-2.5 px-3.5 font-mono text-slate-700 dark:text-neutral-300 max-w-sm sm:max-w-md break-all">
                            {tag.content}
                          </td>
                          <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleCopy(tag.content, itemKey)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-neutral-800 dark:hover:text-emerald-400 rounded-md border border-slate-200 dark:border-neutral-800 transition-colors"
                            >
                              {isCopied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                              <span>{isCopied ? "Copied" : "Copy"}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
