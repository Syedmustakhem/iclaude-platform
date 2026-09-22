import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import StructuredData from "@/components/seo/StructuredData";

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),

  title: {
    default: "Free Online Tools for Images, PDF & Video | iclaude",
    template: "%s | iclaude",
  },

  description:
    "Free online tools to compress, resize, convert and transform images, PDFs and videos. Fast, simple browser-based tools for everyday digital work.",

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  keywords: [
    "free online tools",
    "online file tools",
    "free file tools",
    "image tools",
    "PDF tools",
    "video tools",
    "image compressor",
    "image resizer",
    "background remover",
    "PDF to Word converter",
    "video compressor",
    "compress image online",
    "resize image online",
    "convert PDF to Word online",
    "compress video online",
  ],

  alternates: {
    canonical: "/",
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

  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,

    title: "Free Online Tools for Images, PDF & Video | iclaude",

    description:
      "Free online tools to compress, resize, convert and transform images, PDFs and videos.",

    images: [
      {
        url: "/iclaude-og-image.png",
        width: 1200,
        height: 630,
        alt: "iclaude — Free online tools for images, PDF and video",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free Online Tools for Images, PDF & Video | iclaude",

    description:
      "Free browser-based tools for compressing, resizing, converting and transforming your files.",

    images: ["/iclaude-og-image.png"],
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
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-white text-slate-950">
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4988290120939071"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        <Navbar />

        <div className="min-h-screen">
          {children}
        </div>

        <Footer />

        <StructuredData data={websiteSchema} />
        <StructuredData data={organizationSchema} />
      </body>
    </html>
  );
}