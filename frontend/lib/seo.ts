import type { Metadata } from "next";
import type { ToolDefinition } from "./tools";

export const SITE_URL = "https://iclaude.in";
export const SITE_NAME = "iclaude";

/**
 * Current brand asset.
 *
 * This is used for favicon/brand identity and as a temporary
 * social image until a dedicated 1200x630 OG image is added.
 */
export const DEFAULT_OG_IMAGE = "/iclaude-og-image.png";

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Converts a relative path into the site's canonical absolute URL.
 *
 * The project uses Next.js trailingSlash: true, so internal
 * page URLs are normalized to end with "/".
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }

  const normalizedPath = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;

  return `${SITE_URL}${normalizedPath}/`;
}

/**
 * Common robots configuration.
 */
const robotsConfig = {
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

/**
 * Generates complete metadata for an iclaude tool page.
 */
export function generateToolMetadata(tool: ToolDefinition): Metadata {
  const canonicalUrl = absoluteUrl(tool.href);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

  return {
    title: tool.seoTitle,

    description: tool.seoDescription,

    keywords: tool.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: robotsConfig,

    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: tool.seoTitle,
      description: tool.seoDescription,

      images: [
        {
          url: imageUrl,
          alt: `${tool.name} - ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [imageUrl],
    },

    category: tool.category,
  };
}

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
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

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
      locale: "en_IN",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,

      images: [
        {
          url: imageUrl,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

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

/**
 * Creates structured data for an iclaude tool.
 */
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

/**
 * Creates WebSite structured data.
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: SITE_NAME,
    url: `${SITE_URL}/`,

    description:
      "Free online tools for images, PDFs, videos and digital files.",

    inLanguage: "en-IN",
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
    url: `${SITE_URL}/`,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
  };
}

/**
 * Safely serializes structured data for application/ld+json.
 */
export function serializeStructuredData(
  data: Record<string, unknown>,
): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}