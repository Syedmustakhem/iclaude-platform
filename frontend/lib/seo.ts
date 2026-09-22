import type { Metadata } from "next";

import type { ToolDefinition } from "./tools";

/* ============================================================
   Site identity
   ============================================================ */

export const SITE_URL = "https://iclaude.in";

export const SITE_NAME = "iclaude";

export const SITE_LOCALE = "en_IN";

export const DEFAULT_OG_IMAGE = "/iclaude-og-image.png";

/* ============================================================
   Types
   ============================================================ */

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/* ============================================================
   URL helpers
   ============================================================ */

/**
 * Converts a relative path into an absolute canonical URL.
 *
 * Rules:
 * - Website pages use trailing slashes.
 * - Static assets do not receive trailing slashes.
 * - Existing absolute URLs are returned unchanged.
 */
export function absoluteUrl(path: string): string {
  if (!path) {
    return `${SITE_URL}/`;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = `/${path.replace(/^\/+/, "")}`;

  const isAsset =
    /\.(?:png|jpe?g|gif|svg|webp|ico|avif|pdf|txt|xml|json|webmanifest)$/i.test(
      normalizedPath,
    );

  if (isAsset) {
    return `${SITE_URL}${normalizedPath}`;
  }

  const pagePath = normalizedPath.replace(/\/+$/, "");

  return pagePath === "" ? `${SITE_URL}/` : `${SITE_URL}${pagePath}/`;
}

/* ============================================================
   Common robots configuration
   ============================================================ */

export const robotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/* ============================================================
   Open Graph helpers
   ============================================================ */

function getOgImage(title: string) {
  return {
    url: absoluteUrl(DEFAULT_OG_IMAGE),
    alt: `${title} - ${SITE_NAME}`,
    width: 1200,
    height: 630,
  };
}

/* ============================================================
   Tool metadata
   ============================================================ */

/**
 * Generates complete metadata for an iclaude tool page.
 */
export function generateToolMetadata(tool: ToolDefinition): Metadata {
  const canonicalUrl = absoluteUrl(tool.href);
  const title = tool.seoTitle;
  const description = tool.seoDescription;

  return {
    title,
    description,

    keywords: tool.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: robotsConfig,

    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [getOgImage(title)],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },

    category: tool.category,
  };
}

/* ============================================================
   Static page metadata
   ============================================================ */

/**
 * Generates metadata for normal static pages.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const canonicalUrl = absoluteUrl(path);

  return {
    title,
    description,

    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: robotsConfig,

    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [getOgImage(title)],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

/* ============================================================
   Breadcrumb structured data
   ============================================================ */

/**
 * Creates BreadcrumbList structured data.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/* ============================================================
   Tool structured data
   ============================================================ */

/**
 * Creates structured data describing an iclaude web tool.
 *
 * We intentionally do not invent ratings or reviews.
 */
export function generateToolSchema(tool: ToolDefinition) {
  const toolUrl = absoluteUrl(tool.href);

  return {
    "@context": "https://schema.org",

    "@type": "WebApplication",

    name: tool.name,

    url: toolUrl,

    description: tool.description,

    applicationCategory: "UtilitiesApplication",

    operatingSystem: "Web",

    browserRequirements: "Requires a modern web browser",

    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: toolUrl,
    },

    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },

    featureList: tool.benefits,

    keywords: tool.keywords.join(", "),

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toolUrl,
    },
  };
}

/* ============================================================
   Website structured data
   ============================================================ */

/**
 * Creates WebSite structured data for the iclaude homepage.
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: SITE_NAME,

    url: `${SITE_URL}/`,

    description:
      "Free online tools for images, PDFs, videos and digital files.",

    inLanguage: SITE_LOCALE,
  };
}

/* ============================================================
   Organization structured data
   ============================================================ */

/**
 * Creates Organization structured data.
 */
export function generateOrganizationSchema() {
  const logoUrl = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: SITE_NAME,

    url: `${SITE_URL}/`,

    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 1200,
      height: 630,
    },
  };
}

/* ============================================================
   WebPage structured data
   ============================================================ */

/**
 * Creates generic WebPage structured data.
 *
 * Useful for static SEO pages such as:
 * - About
 * - Contact
 * - Privacy
 * - Terms
 * - Guides
 */
export function generateWebPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const pageUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",

    "@type": "WebPage",

    name,

    description,

    url: pageUrl,

    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },

    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },

    inLanguage: SITE_LOCALE,
  };
}

/* ============================================================
   Structured-data serialization
   ============================================================ */

/**
 * Safely serializes structured data for application/ld+json.
 *
 * Escaping "<" prevents accidental HTML parsing inside JSON-LD.
 */
export function serializeStructuredData(
  data: Record<string, unknown>,
): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}