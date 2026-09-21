import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

const siteUrl = "https://iclaude.in";

function pageUrl(path: string): string {
  if (path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.replace(/\/+$/, "")}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: pageUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: pageUrl("/tools"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: pageUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: pageUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: pageUrl("/privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: pageUrl("/terms"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: pageUrl(tool.href),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}