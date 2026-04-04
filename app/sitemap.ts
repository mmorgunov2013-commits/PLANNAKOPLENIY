import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const base = site.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${base}/`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/planirovschik-nakopleniy`,
      lastModified: new Date("2026-04-03"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
