"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ImageOff } from "lucide-react";
import {
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  SlackIcon,
  GoogleIcon,
  WhatsAppIcon,
  IMessageIcon,
} from "@/components/SocialIcons";

function ImageWithFallback({ src, alt, className }) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  if (!src || hasError) {
    return (
      <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center gap-1.5 text-slate-400 dark:text-neutral-500 bg-slate-100 dark:bg-neutral-900 p-4 text-center">
        <ImageOff size={22} />
        <span className="text-xs">No Open Graph image provided</span>
      </div>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={alt || "Link preview image"}
      className={className || "w-full h-full object-cover"}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
}

/* Plain Card Skeleton Loading for Feed-style Cards (FB, X, LinkedIn) */
function StandardCardSkeleton({ icon, platformName, aspect = "aspect-[1.91/1]" }) {
  return (
    <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            {platformName}
          </span>
        </div>
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
      <div className={`w-full ${aspect} bg-gray-200 dark:bg-neutral-800 flex items-center justify-center`}>
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-neutral-700/60" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="w-20 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-full h-4 rounded bg-gray-300 dark:bg-neutral-700" />
          <div className="w-4/5 h-4 rounded bg-gray-300 dark:bg-neutral-700" />
          <div className="w-full h-3 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>
        <div className="w-24 h-2 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

/* Skeleton Loading for Slack Embed */
function SlackSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <SlackIcon size={16} />
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            Slack Embed
          </span>
        </div>
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
      <div className="p-4 flex-1">
        <div className="border-l-4 border-sky-400 pl-3 py-1 space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded bg-gray-300 dark:bg-neutral-700" />
            <div className="w-24 h-3 rounded bg-gray-300 dark:bg-neutral-700" />
          </div>
          <div className="w-3/4 h-4 rounded bg-sky-300/60 dark:bg-sky-900/60" />
          <div className="w-full h-3 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-5/6 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-full aspect-[2/1] rounded-lg bg-gray-200 dark:bg-neutral-800 mt-2" />
        </div>
      </div>
    </div>
  );
}

/* Skeleton Loading for Google SERP */
function GoogleSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <GoogleIcon size={16} />
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            Google Search
          </span>
        </div>
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
      <div className="p-4 flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-800" />
          <div className="space-y-1">
            <div className="w-24 h-3 rounded bg-gray-300 dark:bg-neutral-700" />
            <div className="w-36 h-2 rounded bg-gray-200 dark:bg-neutral-800" />
          </div>
        </div>
        <div className="w-4/5 h-4.5 rounded bg-blue-300/70 dark:bg-blue-900/60" />
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-3 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-11/12 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-4/5 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

/* Skeleton Loading for WhatsApp Chat */
function WhatsAppSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <WhatsAppIcon size={16} />
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            WhatsApp Chat
          </span>
        </div>
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
      <div className="p-4 flex-1 bg-[#efeae2]/60 dark:bg-[#0b141a]/60 flex flex-col justify-center">
        <div className="max-w-xs mx-auto w-full">
          <div className="bg-white dark:bg-[#202c33] rounded-2xl rounded-tl-sm border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="w-full aspect-[1.91/1] bg-gray-200 dark:bg-neutral-800" />
            <div className="p-3 space-y-2">
              <div className="w-16 h-2.5 rounded bg-emerald-200 dark:bg-emerald-950/60" />
              <div className="w-full h-3.5 rounded bg-gray-300 dark:bg-neutral-700" />
              <div className="w-5/6 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
              <div className="flex justify-end pt-1">
                <div className="w-12 h-2 rounded bg-gray-200 dark:bg-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Skeleton Loading for iMessage */
function IMessageSkeleton() {
  return (
    <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <IMessageIcon size={16} />
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            Apple iMessage
          </span>
        </div>
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
      </div>
      <div className="p-4 flex-1 bg-[#f2f2f7]/80 dark:bg-black/60 flex flex-col justify-center">
        <div className="max-w-xs mx-auto w-full">
          <div className="bg-[#e9e9eb] dark:bg-[#1c1c1e] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-xs">
            <div className="w-full aspect-[1.91/1] bg-gray-300 dark:bg-neutral-800" />
            <div className="p-3 space-y-2">
              <div className="w-16 h-2.5 rounded bg-gray-400/50 dark:bg-neutral-700" />
              <div className="w-full h-3.5 rounded bg-gray-400 dark:bg-neutral-600" />
              <div className="w-4/5 h-3 rounded bg-gray-300 dark:bg-neutral-700" />
            </div>
          </div>
          <div className="flex justify-end mt-1.5">
            <div className="w-14 h-2 rounded bg-gray-300 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformPreviews({ data, isLoading = false }) {
  const [activeTab, setActiveTab] = useState("all");

  const title = data?.og?.title || data?.twitter?.title || data?.title || "Your Website Title";
  const desc =
    data?.og?.description ||
    data?.twitter?.description ||
    data?.description ||
    "Preview how your URL appears on Facebook, LinkedIn, X (Twitter), Slack and Google.";
  const domain = data?.domain || "yourwebsite.com";
  const url = data?.finalUrl || data?.url || "https://yourwebsite.com";
  const image =
    data?.og?.image ||
    data?.twitter?.image ||
    data?.image ||
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  const favicon = data?.favicon;
  const siteName = data?.siteName || domain;

  const tabs = [
    { id: "all", label: "All" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "imessage", label: "iMessage" },
    { id: "facebook", label: "Facebook" },
    { id: "twitter", label: "X (Twitter)" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "slack", label: "Slack" },
    { id: "google", label: "Google" },
  ];

  const handleOpenUrl = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="link-previews" className="w-full my-8 sm:my-10">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Link Previews
          </h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            {isLoading
              ? "Fetching and generating live platform previews..."
              : "See real-time visual previews across top platforms"}
          </p>
        </div>

        {/* Platform Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-neutral-900 rounded-xl overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-black text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-100 dark:border-emerald-900/50"
                  : "text-slate-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. WHATSAPP CHAT CARD */}
        {(activeTab === "all" || activeTab === "whatsapp") && (
          isLoading ? (
            <WhatsAppSkeleton />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    WhatsApp Chat
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Authentic WhatsApp Chat Backdrop */}
              <div className="p-4 flex-1 bg-[#efeae2]/80 dark:bg-[#0b141a] flex flex-col justify-center">
                <div className="max-w-xs mx-auto w-full">
                  <div className="bg-white dark:bg-[#202c33] rounded-2xl rounded-tl-sm border border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
                    {/* Media Area */}
                    <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden relative">
                      <ImageWithFallback src={image} alt={title} />
                    </div>
                    {/* Content */}
                    <div className="p-3 bg-white dark:bg-[#202c33]">
                      <p className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400 truncate mb-0.5">
                        {domain}
                      </p>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
                        {title}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400 dark:text-neutral-400">
                        <span>10:42 AM</span>
                        <span className="text-[#53bdeb] font-bold">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* 2. APPLE IMESSAGE CARD */}
        {(activeTab === "all" || activeTab === "imessage") && (
          isLoading ? (
            <IMessageSkeleton />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <IMessageIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    Apple iMessage
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Authentic Apple iMessage Backdrop */}
              <div className="p-4 flex-1 bg-[#f2f2f7] dark:bg-black flex flex-col justify-center">
                <div className="max-w-xs mx-auto w-full">
                  <div className="bg-[#e9e9eb] dark:bg-[#1c1c1e] rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-xs">
                    {/* Media Area */}
                    <div className="w-full aspect-[1.91/1] bg-slate-200 dark:bg-neutral-900 overflow-hidden relative">
                      <ImageWithFallback src={image} alt={title} />
                    </div>
                    {/* Content */}
                    <div className="p-3">
                      <p className="text-[10px] uppercase font-semibold text-slate-500 dark:text-neutral-400 truncate mb-0.5">
                        {domain}
                      </p>
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1">
                        {title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-1.5 text-[10px] text-slate-400 dark:text-neutral-500 font-medium">
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* 3. FACEBOOK FEED CARD */}
        {(activeTab === "all" || activeTab === "facebook") && (
          isLoading ? (
            <StandardCardSkeleton
              icon={<FacebookIcon size={16} />}
              platformName="Facebook Feed"
            />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <FacebookIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    Facebook Feed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Media Area */}
              <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden relative">
                <ImageWithFallback src={image} alt={title} />
              </div>

              {/* Content Area */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-[#0c0c0e]/50 border-t border-gray-100 dark:border-neutral-800/80">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-1 truncate">
                    {domain}
                  </p>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* 4. X (TWITTER) CARD */}
        {(activeTab === "all" || activeTab === "twitter") && (
          isLoading ? (
            <StandardCardSkeleton
              icon={
                <div className="w-4 h-4 rounded bg-black flex items-center justify-center text-white">
                  <XIcon size={10} color="#ffffff" />
                </div>
              }
              platformName="X (Twitter) Card"
            />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-black flex items-center justify-center text-white">
                    <XIcon size={10} color="#ffffff" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    X (Twitter) Card
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Media Area */}
              <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden relative">
                <ImageWithFallback src={image} alt={title} />
              </div>

              {/* Content Area */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                    {desc}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-neutral-500 truncate">
                    {domain}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* 5. LINKEDIN PREVIEW */}
        {(activeTab === "all" || activeTab === "linkedin") && (
          isLoading ? (
            <StandardCardSkeleton
              icon={<LinkedinIcon size={16} />}
              platformName="LinkedIn Preview"
            />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <LinkedinIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    LinkedIn Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Media Area */}
              <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden relative">
                <ImageWithFallback src={image} alt={title} />
              </div>

              {/* Content Area */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-slate-50/40 dark:bg-[#0c0c0e]/40 border-t border-gray-100 dark:border-neutral-800/80">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1">
                    {title}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-neutral-500 truncate">
                    {domain}
                  </p>
                </div>
              </div>
            </div>
          )
        )}

        {/* 6. SLACK / DISCORD PREVIEW */}
        {(activeTab === "all" || activeTab === "slack") && (
          isLoading ? (
            <SlackSkeleton />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <SlackIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    Slack Embed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Slack Embed Container with Left Accent Border */}
              <div className="p-4 flex-1">
                <div className="border-l-4 border-sky-400 pl-3 py-0.5 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    {favicon && (
                      <img
                        src={favicon}
                        alt="icon"
                        className="w-3.5 h-3.5 rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <span className="text-xs font-bold text-slate-800 dark:text-neutral-200 truncate">
                      {siteName}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                  {image && (
                    <div className="w-full aspect-[2/1] rounded-lg overflow-hidden mt-2 bg-slate-100 dark:bg-neutral-900">
                      <ImageWithFallback src={image} alt={title} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {/* 7. GOOGLE SERP PREVIEW */}
        {(activeTab === "all" || activeTab === "google") && (
          isLoading ? (
            <GoogleSkeleton />
          ) : (
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <GoogleIcon size={16} />
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    Google Search
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenUrl}
                  aria-label="Open website"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              {/* Google Result Styling */}
              <div className="p-4 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  {favicon ? (
                    <img
                      src={favicon}
                      alt="icon"
                      className="w-4 h-4 rounded-full bg-slate-100 dark:bg-neutral-800 p-0.5"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-neutral-800" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-800 dark:text-neutral-200 font-medium truncate leading-tight">
                      {siteName}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-neutral-500 truncate leading-tight">
                      {url}
                    </p>
                  </div>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-base font-medium text-blue-700 dark:text-blue-400 hover:underline leading-snug line-clamp-1"
                >
                  {title}
                </a>

                <p className="text-xs text-slate-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
