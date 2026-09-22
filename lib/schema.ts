import { YOUNGEST_AGE, type Course } from "./content/courses.ts";
import type { Teacher } from "./content/faculty.ts";
import type { Production } from "./content/productions.ts";
import { campusPhotos } from "./content/campus.ts";
import { SITE, campusAddress, campusMapUrl, campusPath, type Campus } from "./content/site.ts";
import type { Leader } from "./content/team.ts";
import type { FaqItem } from "./content/faq.ts";

/* Structured data, built from the content layer.
 *
 * Not one address, phone number or name is retyped here — every value is read
 * from lib/content, which is the whole reason that layer exists. A phone
 * number that disagrees with the one in the footer is worse than no structured
 * data at all, because a search engine will happily publish the wrong one.
 *
 * Productions emit CreativeWork, not Event. That is a deliberate departure
 * from the plan's `eventSchema`: schema.org's Event wants a startDate and a
 * location, we hold a year and nothing else, and two of the six are
 * promotional films rather than events at all. A CreativeWork with a
 * datePublished says exactly what we know.
 *
 * No aggregateRating, no review, no offers. There are no testimonials, no
 * ratings and no published prices, and inventing any of them in JSON-LD would
 * be inventing them on the page — the markup is a claim to a search engine
 * the same way body copy is a claim to a reader. */

/* The host Vercel actually serves. The apex redirects here, so a sitemap,
   a robots.txt or an @id built on the apex is a URL that redirects — which
   is how the site described itself until 22 September 2026. Relative
   imports above rather than the @/ alias so lib/seo.test.ts can load this
   file under node --test, which does not read tsconfig paths. */
export const SITE_URL = "https://www.mirrorartsedu.com.au";

/* The Open Graph fields every page shares. Next shallow-merges openGraph,
   so a page that sets its own image would silently drop siteName and locale
   unless it spreads this first. Course and stage pages do. */
export const OG = {
  siteName: SITE.name,
  locale: "en_AU",
  type: "website",
} as const;

const ORG_ID = `${SITE_URL}/#organisation`;

/* One Place per campus, inside the organisation's `location` on every page
   and — with more types and more fields — as the campus page's own node.
   Both carry the same @id, so a crawler that sees the organisation on /about
   and the LocalBusiness on /surrey-hills merges them into one thing rather
   than two Surrey Hills addresses.

   geo and hasMap are always present: the coordinates are on the record and
   the map link is the same one the address block prints.
   openingHoursSpecification is present only when the record has hours.
   There is no fallback and no default; Google publishes hours as fact. */
function placeSchema(c: Campus) {
  return {
    "@type": "Place",
    "@id": `${SITE_URL}${campusPath(c)}#campus`,
    name: `${SITE.name} — ${c.suburb}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: c.suburb,
      addressRegion: c.state,
      postalCode: c.postcode,
      addressCountry: "AU",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
    hasMap: campusMapUrl(c),
    ...(c.hours
      ? {
          openingHoursSpecification: c.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

/* The campus page's own node. LocalBusiness is what the map pack reads;
   EducationalOrganization is what it is. Multi-typing is ordinary JSON-LD
   and Google's local-business documentation accepts subtypes and arrays.
   parentOrganization ties it back to the one organisation record, and the
   image is the first campus photograph or nothing — Glen Waverley has not
   been shot, and a photograph of Surrey Hills on the Glen Waverley node
   would be a wrong claim with a picture attached. */
export function campusSchema(c: Campus) {
  const photo = campusPhotos(c.id).at(0);
  return {
    "@context": "https://schema.org",
    ...placeSchema(c),
    "@type": ["LocalBusiness", "EducationalOrganization"],
    url: `${SITE_URL}${campusPath(c)}`,
    telephone: SITE.phone,
    email: SITE.email,
    parentOrganization: { "@id": ORG_ID },
    ...(photo ? { image: `${SITE_URL}${photo.src}` } : {}),
  };
}

export function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: [SITE.cn, SITE.formerName],
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SITE.socials.map((s) => s.href),
    location: SITE.campuses.map(placeSchema),
    address: SITE.campuses.map((c) => ({
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: c.suburb,
      addressRegion: c.state,
      postalCode: c.postcode,
      addressCountry: "AU",
    })),
    description: `${SITE.name} teaches drama, musical theatre, speech, debating, hosting, dubbing, music, dance and posture to children from age ${YOUNGEST_AGE}, and runs adult programs, at ${campusAddress(SITE.campuses[0])} and ${campusAddress(SITE.campuses[1])}.`,
  };
}

export function courseSchema(c: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE_URL}/courses/${c.slug}#course`,
    name: c.title,
    alternateName: c.cn,
    url: `${SITE_URL}/courses/${c.slug}`,
    description: c.body[0],
    inLanguage: ["en-AU", "zh-Hans"],
    provider: { "@id": ORG_ID },
    /* The two facts most courses state about their own delivery, and both are
       omitted where the course does not state them: the two holiday programs
       carry no class length, four of the newer courses carry no minimum age,
       and Instrument runs at either 30 or 45 minutes, which is not a duration
       schema.org can express. An absent property says nothing; a guessed one
       says something wrong to a machine that will republish it.

       No hasCourseInstance either: that wants a start date and a price, and
       there is no published timetable and no published fee. */
    ...(typeof c.minutes === "number"
      ? { timeRequired: `PT${c.minutes}M` }
      : {}),
    ...(c.minAge !== undefined ? { typicalAgeRange: `${c.minAge}-` } : {}),
  };
}

export function personSchema(p: Teacher | Leader, path: string) {
  const job = "role" in p ? p.role : p.subject;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}${path}#person`,
    name: p.name,
    ...(p.cn ? { alternateName: p.cn } : {}),
    jobTitle: job,
    worksFor: { "@id": ORG_ID },
    image: `${SITE_URL}${p.portrait.src}`,
    url: `${SITE_URL}${path}`,
  };
}

export function productionSchema(p: Production) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/stage/${p.slug}#work`,
    name: p.title,
    ...(p.cn ? { alternateName: p.cn } : {}),
    url: `${SITE_URL}/stage/${p.slug}`,
    description: p.blurb,
    datePublished: String(p.year),
    thumbnailUrl: `${SITE_URL}${p.video.poster.src}`,
    creator: { "@id": ORG_ID },
  };
}

/* Built from the trail PageHero already draws, so the markup and the visible
   crumbs cannot disagree. Home is always first. The last crumb is the page
   itself and carries no item — schema.org allows it and Google prefers it,
   since the item would just be the URL the crawler is already on. Typed
   structurally rather than importing Crumb from a component: schema.ts
   knows about content, not about components. */
export function breadcrumbSchema(trail: { label: string; href?: string }[]) {
  const crumbs = [
    { name: "Home", item: SITE_URL },
    ...trail.map((c) => ({
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
  };
}

/* FAQPage. Google stopped showing FAQ dropdowns for most sites in 2023;
   this is for the answer engines, which lift a Question/Answer pair far
   more reliably than a paragraph. The visible block and the markup are the
   same array, so they cannot drift. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* One place that turns any of the above into the attribute React needs, so no
   page has to think about JSON.stringify or about escaping. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema) };
}
