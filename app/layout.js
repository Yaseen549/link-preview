import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://oglinkpreview.vercel.app"),
  title: {
    default: "LinkPreview — Free Social Preview & Open Graph Inspector",
    template: "%s | LinkPreview",
  },
  description:
    "Free real-time Open Graph simulator and meta tag inspector. Preview how your links appear on Facebook, X (Twitter), LinkedIn, WhatsApp, Slack, iMessage, and Google Search before sharing.",
  keywords: [
    "open graph preview",
    "og preview tool",
    "link preview generator",
    "social card tester",
    "meta tag checker",
    "twitter card validator",
    "facebook share debugger",
    "whatsapp link preview",
    "slack unfurl simulator",
    "free open graph inspector",
    "seo link debugger",
  ],
  authors: [
    {
      name: "LinkPreview Community",
      url: "https://github.com/Yaseen549/link-preview",
    },
  ],
  creator: "LinkPreview",
  publisher: "LinkPreview",
  applicationName: "LinkPreview",
  alternates: {
    canonical: "https://oglinkpreview.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "LinkPreview — Free Social Preview & Open Graph Inspector",
    description:
      "Preview how your links appear on Facebook, X (Twitter), LinkedIn, WhatsApp, Slack, and Google Search. Inspect Open Graph and meta tags instantly.",
    url: "https://oglinkpreview.vercel.app",
    siteName: "LinkPreview",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LinkPreview — Free Social Preview & Open Graph Inspector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkPreview — Free Social Preview & Open Graph Inspector",
    description:
      "Preview how your links appear on Facebook, X (Twitter), LinkedIn, WhatsApp, Slack, and Google Search. Inspect Open Graph and meta tags instantly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LinkPreview — Free Social Preview & Open Graph Inspector",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "LinkPreview",
  "url": "https://oglinkpreview.vercel.app",
  "description":
    "Free real-time Open Graph simulator and meta tag inspector. Preview links on Facebook, X (Twitter), LinkedIn, WhatsApp, Slack, iMessage, and Google Search.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "author": {
    "@type": "Organization",
    "name": "LinkPreview",
    "url": "https://github.com/Yaseen549/link-preview",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
