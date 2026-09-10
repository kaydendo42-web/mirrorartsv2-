import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import "./studio.css";
import "./component-motion.css";
import "./art-direction.css";
import StudioMotion from "@/components/motion/studio-motion";

import Intro from "@/components/site/intro";
import Masthead from "@/components/site/masthead";
import Footer from "@/components/site/footer";
import { YOUNGEST_AGE } from "@/lib/content/courses";
import { SITE_URL, jsonLd, organisationSchema } from "@/lib/schema";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* metadataBase is what makes every page's relative og:image and canonical
   resolve to an absolute URL. Without it Next warns and social cards break.

   The title template wraps what each page already sets, so /faculty becomes
   "Faculty · Mirror Arts Education" without any page repeating the brand.
   The homepage keeps the full keyword-bearing default. The old site carried
   the title "australianmirror" on every page and an empty description on
   every page, so this is the first time the site has had either.

   There is deliberately no languages key here. It pointed at /zh, which does
   not exist — an hreflang aimed at a 404 tells a search engine a translation
   exists and then hands it an error page, which is worse than saying nothing.
   It goes back the day /zh ships, and a test in lib/content/content.test.ts
   fails if it comes back before then. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Performing Arts School for Kids | Surrey Hills & Glen Waverley | Mirror Arts Education",
    template: "%s · Mirror Arts Education",
  },
  /* The age comes off the catalogue rather than out of this string. It said
     "aged 6+" until 8 September 2026, when the client dropped Musical Theatre
     and Vocal to four — and a meta description is exactly the kind of line
     nobody re-reads after a content change. */
  description: `Drama, musical theatre, speech, debating, hosting, music and dance for children aged ${YOUNGEST_AGE}+, plus adult programs, in Melbourne's eastern suburbs. AMEB and CEFA exam preparation, taught in English and Mandarin.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body data-design-direction="b71ea108">
        <div hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: Mirror's real performances become a contemporary season programme. OWN-WORLD: gold C9A227, plum, lilac, burgundy; condensed type and square frames. STORY: perform, explore, visit, enquire. FIRST VIEWPORT: existing centered headline over actual school film, location above and actions below. FORM: stage lighting scene changes, candidate 6, seed b71ea108. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance. -->" }} />
        {/* One organisation record for the whole site: the name, both
            campuses, the phone number, the email and the three social
            accounts, all read from lib/content/site.ts rather than retyped.
            It sits in the layout because every page is a page of this
            school's site, and a search engine reading any one of them should
            find the same single record. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organisationSchema())}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <StudioMotion />
        <Intro />
        <Masthead />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
