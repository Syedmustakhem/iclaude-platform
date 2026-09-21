import type { Metadata } from "next";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import StructuredData from "@/components/seo/StructuredData";

import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/seo";

import "./globals.css";

const siteUrl = "https://iclaude.in";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: "iclaude — Free Online Tools for Images, PDF & Video",
    template: "%s | iclaude",
  },

  description:
    "Free online tools to compress, resize, convert and process images, PDFs and videos. Simple, fast and easy-to-use tools for everyday digital work.",

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
    "free online tools",
    "online file tools",
    "image tools",
    "PDF tools",
    "video tools",
    "image compressor",
    "image resizer",
    "background remover",
    "PDF to Word converter",
    "video compressor",
  ],

  alternates: {
    canonical: `${siteUrl}/`,
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
    url: `${siteUrl}/`,
    siteName: "iclaude",

    title: "iclaude — Free Online Tools for Images, PDF & Video",

    description:
      "Compress, resize, convert and process your files with simple online tools.",

    images: [
      {
        url: "/icon.png",
        alt: "iclaude — Free online file tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "iclaude — Free Online Tools for Images, PDF & Video",

    description:
      "Simple online tools for images, PDFs, videos and digital files.",

    images: ["/icon.png"],
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