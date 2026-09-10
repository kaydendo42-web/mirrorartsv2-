import type { MetadataRoute } from "next";

import { courseSlugs } from "@/lib/content/courses";
import { productionSlugs } from "@/lib/content/productions";
import { SITE_URL } from "@/lib/schema";

/* Generated from the content layer, so a new course or production cannot be
   added and then quietly left out of the sitemap. The static routes are a
   literal because that is what they are — a route file exists or it does not,
   and deriving them from the filesystem would be a build-time directory walk
   to restate thirteen strings. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/courses",
    "/faculty",
    "/stage",
    "/workshops",
    "/workshops/venue",
    "/contact",
    ...courseSlugs().map((s) => `/courses/${s}`),
    ...productionSlugs().map((s) => `/stage/${s}`),
  ];

  const lastModified = new Date();

  return paths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified,
  }));
}
