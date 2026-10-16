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
  Table as TableIcon,
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

  const ratingClass =
    score >= 85
      ? "excellent"
      : score >= 70
      ? "good"
      : score >= 50
      ? "fair"
      : "poor";

  return (
    <section className="inspector-section">
      <div className="preview-header-bar">
        <div className="preview-title-group">
          <h2>
            <ShieldCheck size={22} color="#10b981" />
            Meta Tags Health & Inspector
          </h2>
          <p>Transparent evaluation of your page metadata and social tags</p>
        </div>
      </div>

      <div className="inspector-grid">
        {/* SCORE & CHECKLIST COLUMN */}
        <div className="score-card">
          <div className="score-display-center">
            <div className={`score-circle ${ratingClass}`}>
              <span className="score-number">{score}</span>
              <span className="score-max">/ {maxScore}</span>
            </div>
            <span className={`score-rating-badge rating-${ratingClass}`}>
              {rating} Health
            </span>
          </div>

          <div className="diagnostics-list">
            {checks.map((check) => {
              const isPassed = check.passed;
              const isWarning = check.status === "warning" || check.status === "too_short" || check.status === "too_long";
              const isMissing = check.status === "missing";

              let icon = <CheckCircle2 size={18} color="#10b981" />;
              if (isWarning) icon = <AlertTriangle size={18} color="#eab308" />;
              if (isMissing) icon = <XCircle size={18} color="#ef4444" />;

              return (
                <div key={check.id} className="diag-item">
                  <div className="diag-status-icon">{icon}</div>
                  <div className="diag-body">
                    <div className="diag-title-row">
                      <span className="diag-title">{check.title}</span>
                      <span className="diag-pts">
                        {isPassed ? `+${check.points} pts` : `0 / ${check.points}`}
                      </span>
                    </div>
                    <div className="diag-msg">{check.message}</div>

                    {check.length !== undefined && (
                      <div className="length-bar">
                        <div
                          className="length-bar-fill"
                          style={{
                            width: `${Math.min(100, (check.length / (check.id === "og_title" ? 60 : 160)) * 100)}%`,
                            backgroundColor:
                              check.status === "optimal"
                                ? "#10b981"
                                : check.status === "too_long"
                                ? "#ef4444"
                                : "#eab308",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RAW TAGS & SNIPPET COLUMN */}
        <div className="tags-card">
          <div className="tags-card-header">
            <div className="tag-subtabs">
              <button
                type="button"
                className={`subtab-btn ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All ({allTags.length})
              </button>
              <button
                type="button"
                className={`subtab-btn ${activeTab === "og" ? "active" : ""}`}
                onClick={() => setActiveTab("og")}
              >
                Open Graph
              </button>
              <button
                type="button"
                className={`subtab-btn ${activeTab === "twitter" ? "active" : ""}`}
                onClick={() => setActiveTab("twitter")}
              >
                Twitter
              </button>
              <button
                type="button"
                className={`subtab-btn ${activeTab === "meta" ? "active" : ""}`}
                onClick={() => setActiveTab("meta")}
              >
                Standard
              </button>
              <button
                type="button"
                className={`subtab-btn ${activeTab === "snippet" ? "active" : ""}`}
                onClick={() => setActiveTab("snippet")}
              >
                <Code2 size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                Code Snippet
              </button>
            </div>

            {activeTab !== "snippet" && (
              <div style={{ position: "relative", width: "200px" }}>
                <input
                  type="text"
                  placeholder="Filter tags..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "6px",
                    padding: "6px 10px 6px 28px",
                    color: "white",
                    fontSize: "0.8rem",
                    outline: "none",
                  }}
                />
                <Search
                  size={14}
                  style={{
                    position: "absolute",
                    left: "8px",
                    top: "8px",
                    color: "var(--text-dim)",
                  }}
                />
              </div>
            )}
          </div>

          {activeTab === "snippet" ? (
            <div className="code-generator-box">
              <div className="code-header-bar">
                <span className="code-title">Recommended HTML Meta Tags</span>
                <button
                  type="button"
                  className="copy-mini-btn"
                  onClick={handleCopySnippet}
                  style={{
                    background: snippetCopied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                    color: snippetCopied ? "#34d399" : "inherit",
                  }}
                >
                  {snippetCopied ? (
                    <>
                      <Check size={14} />
                      <span>Copied Snippet!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="code-content">
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
            <div className="table-wrapper">
              <table className="meta-table">
                <thead>
                  <tr>
                    <th>Tag / Property</th>
                    <th>Extracted Content</th>
                    <th style={{ textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center", padding: "32px", color: "var(--text-dim)" }}>
                        No matching meta tags detected.
                      </td>
                    </tr>
                  ) : (
                    filteredTags.map((tag, idx) => {
                      const itemKey = `${tag.key}-${idx}`;
                      const isCopied = copiedKey === itemKey;

                      return (
                        <tr key={itemKey}>
                          <td className="tag-key">{tag.key}</td>
                          <td className="tag-val">{tag.content}</td>
                          <td className="tag-copy-cell">
                            <button
                              type="button"
                              className="copy-mini-btn"
                              onClick={() => handleCopy(tag.content, itemKey)}
                              title="Copy value"
                            >
                              {isCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
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
