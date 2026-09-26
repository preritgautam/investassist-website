import type { MetadataRoute } from "next"

import { absoluteUrl, shouldIndex } from "@/lib/seo-config"

export default function robots(): MetadataRoute.Robots {
  // Preview and development deployments must never be indexed.
  if (!shouldIndex()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    }
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/+$/, ""),
  }
}
