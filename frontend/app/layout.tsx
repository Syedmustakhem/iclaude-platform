import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
const siteUrl = "https://iclaude.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "iclaude — Free Online Tools for Images, PDF, Video & More",
    template: "%s | iclaude",
  },

  description:
    "Free online tools to compress, resize, convert and process images, PDFs and videos. Simple file tools designed to work quickly without unnecessary steps.",

  applicationName: "iclaude",

  authors: [
    {
      name: "iclaude",
      url: siteUrl,
    },
  ],

  creator: "iclaude",
  publisher: "iclaude",

  keywords: [
    "online tools",
    "file tools",
    "image tools",
    "PDF tools",
    "video tools",
    "image compressor",
    "image resizer",
    "background remover",
    "PDF to Word",
    "video compressor",
  ],

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "iclaude",
    title: "iclaude — Free Online Tools for Images, PDF, Video & More",
    description:
      "Compress, resize, convert and process your files with simple online tools.",
  },

  twitter: {
    card: "summary_large_image",
    title: "iclaude — Free Online Tools for Images, PDF, Video & More",
    description:
      "Simple online tools for images, PDFs, videos and other digital files.",
  },

  category: "technology",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "iclaude",
    url: siteUrl,
    description:
      "Online tools for compressing, resizing, converting and processing digital files.",
    inLanguage: "en-IN",
  };

  return (
    <html lang="en-IN">
      <body>
  <Navbar />

  <div className="min-h-screen">
    {children}
  </div>

  <Footer />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredData),
    }}
  />
</body>
    </html>
  );
}