import type { MetadataRoute } from "next";

import { courseSlugs } from "@/lib/content/courses";
import { productionSlugs } from "@/lib/content/productions";
import { SITE_URL } from "@/lib/schema";

/* Generated from the content layer, so a new course or production cannot be
   added and then quietly left out of the sitemap. The static routes are a
   literal because that is what they are — a route file exists or it does not,
   and deriving them from the filesystem would be a build-time directory walk
   to restate fourteen strings. A test in lib/content/content.test.ts walks
   app/ and fails if a static page.tsx is missing from this list. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/surrey-hills",
    "/glen-waverley",
    "/courses",
    "/faculty",
    "/stage",
    "/workshops",
    "/workshops/venue",
    "/contact",
    "/privacy",
    ...courseSlugs().map((s) => `/courses/${s}`),
    ...productionSlugs().map((s) => `/stage/${s}`),
  ];

  /* No lastModified. The previous version stamped every URL with the build
     time, which told Google that all 28 pages changed on every deploy — a
     date it learns to ignore. Real per-page dates would need a content
     changelog the site does not keep; until it does, silence is honest. */
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
