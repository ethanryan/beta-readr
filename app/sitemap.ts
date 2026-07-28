import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://betareadr.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/review", "/privacy", "/terms"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
