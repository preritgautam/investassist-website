import type { MetadataRoute } from "next"
import { BRAND_APP_ICON, BRAND_NAME, THEME_COLOR } from "@/lib/brand"
import { SITE_DESCRIPTION } from "@/lib/seo-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: BRAND_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLOR.dark,
    theme_color: THEME_COLOR.dark,
    icons: [
      { src: BRAND_APP_ICON[192], sizes: "192x192", type: "image/png" },
      { src: BRAND_APP_ICON[512], sizes: "512x512", type: "image/png" },
    ],
  }
}
