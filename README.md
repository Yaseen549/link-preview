<p align="center">
  <a href="https://oglinkpreview.vercel.app">
    <img src="public/logo.png" width="100" height="100" alt="LinkPreview Logo" />
  </a>
</p>

<h1 align="center">LinkPreview</h1>

<p align="center">
  <strong>Free Social Preview & Open Graph Inspector</strong><br />
  Preview how any URL appears across social platforms and messaging apps before sharing.
</p>

<p align="center">
  <a href="https://oglinkpreview.vercel.app"><img src="https://img.shields.io/badge/demo-oglinkpreview.vercel.app-10B981?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge" alt="License: MIT" /></a>
</p>

👉 **Live Demo:** [https://oglinkpreview.vercel.app](https://oglinkpreview.vercel.app)

---

## ✨ Features

- 🌐 **Real-Time URL Scraping (`/api/preview`)**: Fetches Open Graph (`og:*`), Twitter Card (`twitter:*`), and standard HTML meta tags server-side with social bot User-Agent emulation (`facebookexternalhit/1.1`) to bypass crawler walls.
- 📱 **Multi-Platform Previews**:
  - **WhatsApp Chat Preview** (Authentic WhatsApp speech bubble with preview banner and double blue ticks)
  - **Apple iMessage Preview** (iOS rich link squircle bubble with clean typography and delivered indicator)
  - **Facebook Feed Card** (1.91:1 banner, uppercase domain, 2-line title & description)
  - **Twitter / X Card** (Summary large image and standard card format)
  - **LinkedIn Post Preview** (Business author header, banner, and feed format)
  - **Slack / Discord Embed** (Left-accented chat embed with favicon & thumbnail)
  - **Google Search (SERP)** (Breadcrumb URL, blue clickable link, search snippet)
  - **⚡ Instant Skeleton Loading Feedback** (Pulsing skeleton previews for every card during URL inspection)
- 📊 **100% Transparent SEO & Social Health Score (0–100)**:
  - No hidden algorithms — clear point breakdown (Title: 20pts, Description: 20pts, OG Image: 25pts, Twitter Card: 15pts, Canonical: 10pts, Favicon: 10pts).
  - Character length progress bars with platform truncation warnings (optimal 30–60 chars for titles, 100–160 chars for descriptions).
- 🖐️ **Draggable Tabletop Hero Cards**:
  - Interactive physics-like tabletop cards that you can click and drag around on desktop or swipe on mobile phones with touch support.
- 🔥 **iOS 18 Siri / Apple Intelligence Flame Aura**:
  - Fluid, multi-layer radiant flame soul animation around the search bar.
- 📋 **1-Click HTML Code Snippet Generator**:
  - Ready-to-copy `<meta>` tags formatted for quick drop-in to your HTML or Next.js layout.
- 🌗 **Light & Dark Mode**:
  - Clean, light-first SaaS aesthetic with instant toggle to an immersive, true pitch-black AMOLED dark theme.
- 🚀 **Zero Database & Vercel Serverless Ready**:
  - 100% stateless, lightweight, and deploys to Vercel in seconds on the free tier.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18.18.0 or later) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/linkpreviewer.git
cd linkpreviewer
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Usage

LinkPreview includes a built-in serverless API route to inspect metadata programmatically.

### Endpoint:
```http
GET /api/preview?url={TARGET_URL}
```

### Example Request:
```bash
curl -X GET "https://oglinkpreview.vercel.app/api/preview?url=https://github.com"
```

### Sample Response:
```json
{
  "url": "https://github.com",
  "domain": "github.com",
  "title": "GitHub · Build and ship software on a single, collaborative platform",
  "description": "Join 100+ million developers creating and sharing software together.",
  "image": "https://github.githubassets.com/images/modules/open_graph/github-logo.png",
  "favicon": "https://github.githubassets.com/favicons/favicon.svg",
  "canonical": "https://github.com",
  "og": {
    "title": "GitHub...",
    "description": "...",
    "image": "...",
    "type": "website",
    "site_name": "GitHub"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "...",
    "image": "..."
  },
  "diagnostics": {
    "score": 100,
    "maxScore": 100,
    "rating": "Excellent",
    "checks": [...]
  },
  "allTags": [...]
}
```

---

## 📁 Project Structure

```
linkpreviewer/
├── app/
│   ├── api/
│   │   └── preview/
│   │       └── route.js         # Serverless metadata extraction engine (Cheerio)
│   ├── globals.css              # Tailwind base & Siri flame soul animations
│   ├── layout.js                # Root layout with SEO & Open Graph meta
│   └── page.js                  # Main landing page & reactive state
├── components/
│   ├── HeroIllustration.js      # Interactive draggable tabletop cards (touch-ready)
│   ├── Navbar.js                # Navigation, theme toggle & changelog modal
│   ├── PlatformPreviews.js      # Social cards (FB, X, LinkedIn, Slack, Google, Mobile)
│   ├── SearchBar.js             # Siri flame glowing input & sample chips
│   ├── SocialIcons.js           # Lightweight SVG vector brand icons
│   ├── SupportedPlatforms.js    # Horizontal supported platforms strip
│   └── TagInspector.js          # Health score, checklist & 1-click HTML generator
├── public/                      # Static assets & favicons
├── tailwind.config.js           # Tailwind theme & dark mode configuration
└── package.json                 # Project dependencies & scripts
```

---

## ☁️ Deployment on Vercel

### Option 1: Vercel CLI
```bash
npx vercel
```

### Option 2: GitHub Integration
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects Next.js. Click **Deploy**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request on GitHub.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
