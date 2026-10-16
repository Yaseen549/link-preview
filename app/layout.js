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
  title: "LinkPreview — Free Social Preview & Open Graph Inspector",
  description:
    "Preview how your links appear on Facebook, X (Twitter), LinkedIn, Slack, Google Search, and mobile messaging. Inspect Open Graph and meta tags instantly.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    title: "LinkPreview — Free Social Preview & Open Graph Inspector",
    description:
      "Preview how your links appear on Facebook, X (Twitter), LinkedIn, Slack, Google Search, and mobile messaging.",
    url: "https://oglinkpreview.vercel.app",
    siteName: "LinkPreview",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "LinkPreview Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkPreview — Free Social Preview & Open Graph Inspector",
    description:
      "Preview how your links appear on Facebook, X (Twitter), LinkedIn, Slack, Google Search, and mobile messaging.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-white dark:bg-black text-gray-900 dark:text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
