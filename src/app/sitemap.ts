import type { MetadataRoute } from "next";

const siteUrl = "https://thaboliz.co.za";

function toDate(date: string) {
  return new Date(`${date}T00:00:00+02:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: toDate("2026-03-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: toDate("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/construction`,
      lastModified: toDate("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/integrated-farms`,
      lastModified: toDate("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/logistics`,
      lastModified: toDate("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/technologies`,
      lastModified: toDate("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/services/enterprise`,
      lastModified: toDate("2026-03-13"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}