import type { MetadataRoute } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/private/", "/*?utm_"],
    },
    sitemap: `${site.replace(/\/$/, "")}/sitemap.xml`,
  };
}
