import { YOUNGEST_AGE, type Course } from "@/lib/content/courses";
import type { Teacher } from "@/lib/content/faculty";
import type { Production } from "@/lib/content/productions";
import { SITE, campusAddress, type Campus } from "@/lib/content/site";
import type { Leader } from "@/lib/content/team";

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

export const SITE_URL = "https://mirrorartsedu.com.au";

const ORG_ID = `${SITE_URL}/#organisation`;

function placeSchema(c: Campus) {
  return {
    "@type": "Place",
    name: `${SITE.name} — ${c.suburb}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: c.suburb,
      addressRegion: c.state,
      postalCode: c.postcode,
      addressCountry: "AU",
    },
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

/* One place that turns any of the above into the attribute React needs, so no
   page has to think about JSON.stringify or about escaping. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema) };
}
