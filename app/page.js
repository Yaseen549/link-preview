"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PlatformPreviews from "@/components/PlatformPreviews";
import TagInspector from "@/components/TagInspector";
import {
  Link2,
  Image as ImageIcon,
  Type,
  AlignLeft,
  Share2,
  Eye,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

function XIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  const fetchPreview = async (targetUrl) => {
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
      setPreviewData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-ambient" />

      <div className="app-container">
        {/* Navigation */}
        <header className="navbar">
          <a href="/" className="logo-group">
            <div className="logo-icon">
              <Link2 size={20} />
            </div>
            <div>
              <span className="logo-title">LinkPreview</span>
            </div>
            <span className="logo-badge">Pro Free</span>
          </a>

          <div className="nav-links">
            <a
              href="https://ogp.me/"
              target="_blank"
              rel="noreferrer"
              className="nav-link-btn"
            >
              <span>OG Protocol</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-pill">
            <span>⚡ Real-Time Open Graph & Social Card Inspector</span>
          </div>

          <h1 className="hero-title">
            Social Preview & <span className="hero-title-accent">Link Preview Tool</span>
          </h1>

          <p className="hero-subtitle">
            See how your URL appears on Facebook, LinkedIn, X, Slack, and Google.
            Inspect your title, description, image, and meta tags before you share.
          </p>
        </section>

        {/* Search Bar */}
        <SearchBar
          onSearch={fetchPreview}
          isLoading={loading}
          currentUrl={url}
        />

        {/* Error Alert */}
        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Live Platform Previews */}
        {previewData && (
          <>
            <PlatformPreviews data={previewData} />
            <TagInspector data={previewData} />
          </>
        )}

        {/* Feature Badges */}
        {!previewData && !loading && (
          <div className="feature-badges-row">
            <div className="feature-badge">
              <ImageIcon size={15} />
              <span>Preview image</span>
            </div>
            <div className="feature-badge">
              <Type size={15} />
              <span>Title & length</span>
            </div>
            <div className="feature-badge">
              <AlignLeft size={15} />
              <span>Meta description</span>
            </div>
            <div className="feature-badge">
              <Share2 size={15} />
              <span>Open Graph tags</span>
            </div>
            <div className="feature-badge">
              <XIcon size={15} />
              <span>Twitter / X cards</span>
            </div>
            <div className="feature-badge">
              <Eye size={15} />
              <span>Platform previews</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
