import type { MetadataRoute } from "next";

const siteUrl = "https://iclaude.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${siteUrl}/tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/image-compressor`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/image-resizer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/remove-background`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/pdf-to-word`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/video-compressor`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}