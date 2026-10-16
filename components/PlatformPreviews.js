"use client";

import { useState } from "react";
import {
  Layers,
  MessageSquare,
  Search,
  ImageOff,
} from "lucide-react";
import {
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  SlackIcon,
  GoogleIcon,
} from "@/components/SocialIcons";

function ImageWithFallback({ src, alt, className }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="no-img-placeholder">
        <ImageOff size={28} />
        <span>No Open Graph image provided</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "Link preview image"}
      className={className || "preview-img"}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

export default function PlatformPreviews({ data }) {
  const [activeTab, setActiveTab] = useState("all");

  if (!data) return null;

  const {
    url,
    domain,
    siteName,
    title,
    description,
    image,
    favicon,
    og,
    twitter,
  } = data;

  const displayTitle = og?.title || twitter?.title || title || domain;
  const displayDesc =
    og?.description || twitter?.description || description || "No description provided.";
  const displayImage = og?.image || twitter?.image || image;

  const tabs = [
    { id: "all", label: "All Previews", icon: <Layers size={16} /> },
    { id: "facebook", label: "Facebook", icon: <FacebookIcon size={16} /> },
    { id: "twitter", label: "Twitter / X", icon: <XIcon size={14} /> },
    { id: "linkedin", label: "LinkedIn", icon: <LinkedinIcon size={16} /> },
    { id: "slack", label: "Slack", icon: <SlackIcon size={16} /> },
    { id: "google", label: "Google SERP", icon: <GoogleIcon size={16} /> },
  ];

  return (
    <section className="preview-section">
      <div className="preview-header-bar">
        <div className="preview-title-group">
          <h2>
            <Layers size={22} color="#10b981" />
            Social Platform Previews
          </h2>
          <p>Real-time visual rendering across major social media networks and search engines</p>
        </div>

        <div className="platform-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid">
        {/* FACEBOOK PREVIEW */}
        {(activeTab === "all" || activeTab === "facebook") && (
          <div className="platform-box">
            <div className="platform-box-header">
              <span className="platform-tag">
                <FacebookIcon size={18} /> Facebook Feed
              </span>
              <span className="platform-aspect">1.91:1 (1200 × 630px)</span>
            </div>

            <div className="fb-mock">
              <div className="mock-user-bar">
                <div className="mock-avatar">U</div>
                <div className="mock-user-info">
                  <div className="user-name">Your Profile</div>
                  <div className="user-time">Just now · 🌐</div>
                </div>
              </div>
              <div className="mock-caption">Check out this link:</div>

              <div className="fb-card-content" onClick={() => window.open(url, "_blank")}>
                <div className="card-img-wrapper">
                  <ImageWithFallback src={displayImage} alt={displayTitle} />
                </div>
                <div className="fb-card-meta">
                  <div className="fb-domain">{domain}</div>
                  <div className="fb-title">{displayTitle}</div>
                  <div className="fb-desc">{displayDesc}</div>
                </div>
              </div>

              <div className="fb-footer-actions">
                <span>👍 Like</span>
                <span>💬 Comment</span>
                <span>↗ Share</span>
              </div>
            </div>
          </div>
        )}

        {/* TWITTER / X PREVIEW */}
        {(activeTab === "all" || activeTab === "twitter") && (
          <div className="platform-box">
            <div className="platform-box-header">
              <span className="platform-tag">
                <XIcon size={16} /> Twitter / X Card
              </span>
              <span className="platform-aspect">
                {twitter?.card === "summary" ? "1:1 Square" : "2:1 Summary Large"}
              </span>
            </div>

            <div className="x-mock">
              <div className="x-header">
                <div className="x-avatar">X</div>
                <div>
                  <div className="x-names">
                    <span className="x-display-name">{siteName || "Web Creator"}</span>
                    <span className="x-handle">@{domain.replace(/\.[a-z]+$/i, "")} · 1m</span>
                  </div>
                  <div className="x-text">Excited to share this link with everyone!</div>
                </div>
              </div>

              <div className="x-card" onClick={() => window.open(url, "_blank")}>
                <div className="card-img-wrapper">
                  <ImageWithFallback src={displayImage} alt={displayTitle} />
                </div>
                <div className="x-card-info">
                  <div className="x-card-domain">{domain}</div>
                  <div className="x-card-title">{displayTitle}</div>
                  <div className="x-card-desc">{displayDesc}</div>
                </div>
              </div>

              <div className="x-actions-row">
                <span>💬 12</span>
                <span>🔁 24</span>
                <span>❤️ 89</span>
                <span>📊 3.2k</span>
              </div>
            </div>
          </div>
        )}

        {/* LINKEDIN PREVIEW */}
        {(activeTab === "all" || activeTab === "linkedin") && (
          <div className="platform-box">
            <div className="platform-box-header">
              <span className="platform-tag">
                <LinkedinIcon size={18} /> LinkedIn Post
              </span>
              <span className="platform-aspect">1.91:1 Banner</span>
            </div>

            <div className="li-mock">
              <div className="li-header">
                <div className="li-avatar">in</div>
                <div className="li-meta">
                  <div className="li-name">{siteName || "Industry Professional"}</div>
                  <div className="li-sub">Author / Developer · 1h · 🌐</div>
                </div>
              </div>
              <div className="mock-caption">Found this very insightful resource:</div>

              <div className="li-card" onClick={() => window.open(url, "_blank")}>
                <div className="card-img-wrapper">
                  <ImageWithFallback src={displayImage} alt={displayTitle} />
                </div>
                <div className="li-card-content">
                  <div className="li-card-title">{displayTitle}</div>
                  <div className="li-card-domain">{domain}</div>
                </div>
              </div>

              <div className="fb-footer-actions">
                <span>👍 Like</span>
                <span>💬 Comment</span>
                <span>🔁 Repost</span>
                <span>📤 Send</span>
              </div>
            </div>
          </div>
        )}

        {/* SLACK / DISCORD PREVIEW */}
        {(activeTab === "all" || activeTab === "slack") && (
          <div className="platform-box">
            <div className="platform-box-header">
              <span className="platform-tag">
                <SlackIcon size={18} /> Slack / Discord Embed
              </span>
              <span className="platform-aspect">Rich Chat Snippet</span>
            </div>

            <div className="slack-mock">
              <div className="slack-user-header">
                <span className="slack-user-name">Teammate</span>
                <span className="slack-time">2:45 PM</span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "#e0e0e0", marginBottom: "8px" }}>
                Hey team, check this out:{" "}
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "underline" }}
                >
                  {url}
                </a>
              </div>

              <div className="slack-embed">
                <div className="slack-site-row">
                  {favicon && (
                    <img
                      src={favicon}
                      alt="icon"
                      className="slack-favicon"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <span>{siteName || domain}</span>
                </div>
                <div className="slack-title">{displayTitle}</div>
                <div className="slack-desc">{displayDesc}</div>
                {displayImage && (
                  <div className="slack-img-thumb">
                    <ImageWithFallback src={displayImage} alt={displayTitle} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE SEARCH SERP PREVIEW */}
        {(activeTab === "all" || activeTab === "google") && (
          <div className="platform-box">
            <div className="platform-box-header">
              <span className="platform-tag">
                <GoogleIcon size={18} /> Google Search (SERP)
              </span>
              <span className="platform-aspect">Organic Search Result</span>
            </div>

            <div className="google-mock">
              <div className="google-url-row">
                {favicon && (
                  <img
                    src={favicon}
                    alt="favicon"
                    className="google-favicon"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="google-site-name">{siteName || domain}</div>
                <div className="google-breadcrumb">{url}</div>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="google-title"
              >
                {displayTitle}
              </a>
              <div className="google-snippet">{displayDesc}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
