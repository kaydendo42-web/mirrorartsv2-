import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/schema";

/* Everything is public and everything is meant to be found — the old site was
   invisible to search engines mostly because its content was inside images,
   not because it blocked anyone. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
