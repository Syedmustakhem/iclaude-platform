import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

function pageUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;

  const normalizedPath = `/${path.replace(/^\/+/, "")}`;
  const cleanPath = normalizedPath.replace(/\/+$/, "");

  return `${SITE_URL}${cleanPath}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: pageUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: pageUrl("/tools"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: pageUrl("/guides"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: pageUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: pageUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: pageUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: pageUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === "available")
    .map((tool) => ({
      url: pageUrl(tool.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: pageUrl(`/guides/${guide.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...toolPages, ...guidePages];
}
