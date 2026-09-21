import type { Metadata } from "next";

import Home from "@/components/sections/home";

/* The page file is a Server Component so it can export metadata — the
   homepage body calls useReveal() and is therefore a Client Component, and
   Next refuses a metadata export from one of those. The body, and the long
   note on which sections the homepage runs and why, live in
   components/sections/home.tsx. This inherits the root title and
   description and only pins the canonical; lib/seo.test.ts walks app/ for
   that field. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <Home />;
}
