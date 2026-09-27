import type { MetadataRoute } from "next";

import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/seo";
import { getIndexableTools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

/*
 * Honest lastmod.
 *
 * Never stamp `new Date()` on every URL: when lastmod is always "today",
 * crawlers learn to ignore it and you lose the crawl-priority signal on
 * pages you actually updated. Bump SITE_LAST_MODIFIED (lib/seo.ts) on
 * deploy days when content really changed; guides use their own real
 * editorial dates.
 */
const SITE_UPDATED = new Date(`${SITE_LAST_MODIFIED}T00:00:00+05:30`);

/*
 * Priority tiers for tool pages, based on search-demand potential.
 *
 * 0.9 — highest-demand tools (homepage-adjacent money pages)
 * 0.8 — everything else indexable
 *
 * Re-tier once Google Search Console shows which pages actually earn
 * impressions and clicks.
 */
const HIGH_PRIORITY_TOOLS = new Set([
  "image-compressor",
  "image-resizer",
  "video-studio",
  "merge-pdf",
  "pdf-to-word",
  "jpg-to-pdf",
]);

function toolPriority(slug: string): 0.9 | 0.8 {
  return HIGH_PRIORITY_TOOLS.has(slug) ? 0.9 : 0.8;
}

function pageUrl(path: string): string {
  if (!path || path === "/") {
    return `${SITE_URL}/`;
  }

  const normalizedPath = `/${path.replace(/^\/+/, "")}`;
  const cleanPath = normalizedPath.replace(/\/+$/, "");

  return `${SITE_URL}${cleanPath}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: pageUrl("/"),
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: pageUrl("/tools"),
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: pageUrl("/guides"),
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: pageUrl("/about"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: pageUrl("/contact"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: pageUrl("/privacy"),
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: pageUrl("/terms"),
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /*
   * Only genuinely indexable tools belong in the sitemap.
   *
   * Registry rule:
   * available + indexable=true → sitemap
   * coming-soon / indexable=false → excluded
   */
  const toolPages: MetadataRoute.Sitemap = getIndexableTools().map(
    (tool) => ({
      url: pageUrl(tool.href),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: toolPriority(tool.slug),
    }),
  );

  /*
   * Guides carry their own real editorial dates — use them so the
   * sitemap reflects actual content freshness.
   */
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: pageUrl(`/guides/${guide.slug}`),
    lastModified: new Date(`${guide.dateModified}T00:00:00+05:30`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...toolPages, ...guidePages];
}
