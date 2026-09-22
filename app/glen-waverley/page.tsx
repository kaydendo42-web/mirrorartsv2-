import type { Metadata } from "next";

import CampusPage, { campusMetadata } from "@/components/sections/campus";
import { getCampus } from "@/lib/content/site";

/* Five lines on purpose. The page is components/sections/campus.tsx; this
   file exists so the route is a static folder the canonical and sitemap
   tests already know how to walk. The canonical must be the literal string
   below — lib/seo.test.ts reads it off the source. */
const CAMPUS = getCampus("glen-waverley");

export const metadata: Metadata = {
  ...campusMetadata(CAMPUS),
  alternates: { canonical: "/glen-waverley" },
};

export default function GlenWaverleyPage() {
  return <CampusPage campus={CAMPUS} />;
}
