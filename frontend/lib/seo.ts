import type { Metadata } from "next";
import type { ToolDefinition } from "./tools";

export const SITE_URL = "https://iclaude.in";
export const SITE_NAME = "iclaude";

export const DEFAULT_OG_IMAGE = "/icon.png";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Converts a relative path into an absolute URL.
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generates complete metadata for an iclaude tool page.
 *
 * This is the primary SEO metadata generator used by tool routes.
 */
export function generateToolMetadata(
  tool: ToolDefinition
): Metadata {
  const canonicalUrl = absoluteUrl(tool.href);

  return {
    title: tool.seoTitle,

    description: tool.seoDescription,

    keywords: tool.keywords,

    alternates: {
      canonical: canonicalUrl,
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
      url: canonicalUrl,
      siteName: SITE_NAME,

      title: tool.seoTitle,

      description: tool.seoDescription,

      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: tool.seoTitle,

      description: tool.seoDescription,

      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },

    category: tool.category,
  };
}

/**
 * Generates metadata for a normal static page.
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
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,

      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

/**
 * Creates BreadcrumbList structured data.
 *
 * Example:
 *
 * Home
 *   >
 * Tools
 *   >
 * Image Compressor
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
) {
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

export function generateToolSchema(tool: ToolDefinition) {
  const toolUrl = absoluteUrl(tool.href);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
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
      url: SITE_URL,
    },
    featureList: tool.benefits,
    keywords: tool.keywords.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toolUrl,
    },
  };
}

/**
 * Creates WebSite structured data for the main iclaude website.
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: SITE_NAME,

    url: SITE_URL,

    description:
      "Free online tools for images, PDFs, videos and digital files.",

    inLanguage: "en-IN",

    potentialAction: {
      "@type": "SearchAction",

      target: {
        "@type": "EntryPoint",

        urlTemplate:
          `${SITE_URL}/tools?search={search_term_string}`,
      },

      "query-input":
        "required name=search_term_string",
    },
  };
}

/**
 * Creates Organization structured data.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: SITE_NAME,

    url: SITE_URL,

    logo: absoluteUrl(DEFAULT_OG_IMAGE),
  };
}

/**
 * Safely serializes structured data for use inside
 * an application/ld+json script tag.
 */
export function serializeStructuredData(
  data: Record<string, unknown>
): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}