import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

import { SITE_URL, breadcrumbSchema, campusSchema, faqSchema, organisationSchema } from "./schema.ts";
import {
  ABOUT_FAQ, FACULTY_FAQ, SITE_FAQ, STAGE_FAQ, VENUE_FAQ, WORKSHOPS_FAQ,
  faqForCampus, faqForCourse,
} from "./content/faq.ts";
import { HIRE_SPACES, VENUE_TERMS } from "./content/venue.ts";
import { FACULTY } from "./content/faculty.ts";
import { COMPETITIONS } from "./content/certificates.ts";
import { CREDENTIAL_BODIES } from "./content/achievements.ts";
import { INCURSION_CRAFT, INCURSION_PERFORMANCE } from "./content/workshops.ts";
import { COURSES, YOUNGEST_AGE, getCourse } from "./content/courses.ts";
import { SITE, campusAddress } from "./content/site.ts";
import { PRODUCTIONS } from "./content/productions.ts";

/* Source-level assertions read app/ files as text, in the pattern of the
   sitemap test in lib/content/content.test.ts — there is no component runner,
   and the things checked here (a canonical string, a title length) are facts
   about the source rather than about rendered output. */
const src = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");

test("the canonical host is www — what Vercel serves, and where the apex redirects", () => {
  // Live since launch: https://mirrorartsedu.com.au 307s to www. Until 22
  // September 2026 SITE_URL said apex, so the sitemap, robots.txt and every
  // JSON-LD @id pointed at a redirecting host.
  assert.equal(SITE_URL, "https://www.mirrorartsedu.com.au");
  assert.ok(!SITE_URL.endsWith("/"), "SITE_URL is joined with paths that start with /");
});

test("the sitemap does not stamp every URL with the build time", () => {
  // lastModified: new Date() said "everything changed" on every deploy,
  // which is the same as saying nothing. Google ignores dates it cannot
  // trust, and a wrong signal is worse than none.
  assert.ok(!src("../app/sitemap.ts").includes("new Date()"), "app/sitemap.ts still sets lastModified from new Date()");
});

test("the homepage title fits a search result and the suburbs live in the description", () => {
  // Google draws about 60 characters of a title. The old default was 85
  // and lost "Mirror Arts Education" off the end — the one word a parent
  // who already knows the school is scanning for.
  const layout = src("../app/layout.tsx");
  const m = layout.match(/default:\s*"([^"]+)"/);
  assert.ok(m, "no default title string in app/layout.tsx");
  assert.ok(m[1].length <= 60, `default title is ${m[1].length} characters: ${m[1]}`);
  assert.ok(m[1].endsWith("Mirror Arts Education"), "the default title should end with the school's name, like the template does");
  assert.ok(layout.includes("Surrey Hills and Glen Waverley"), "the description no longer names both suburbs");
});

test("every page.tsx declares its own canonical path", () => {
  // Walks app/ like the sitemap test does. A static page must contain
  // canonical: "/its/route"; a [slug] page must contain the template
  // literal for its route. Source-level because there is no component
  // runner, and because this is exactly the kind of field that gets added
  // to nine pages and forgotten on the tenth.
  const appDir = new URL("../app/", import.meta.url);
  const pages: [string, string][] = [];
  const walk = (at: URL, route: string) => {
    for (const e of readdirSync(at, { withFileTypes: true })) {
      if (e.isDirectory()) walk(new URL(`${e.name}/`, at), `${route}/${e.name}`);
      else if (e.name === "page.tsx") pages.push([route || "/", readFileSync(new URL(e.name, at), "utf8")]);
    }
  };
  walk(appDir, "");
  assert.ok(pages.length >= 11, `found only ${pages.length} pages`);

  for (const [route, source] of pages) {
    const literal = route.includes("[slug]")
      ? "canonical: `" + route.replace("[slug]", "${slug}") + "`"
      : `canonical: "${route}"`;
    assert.ok(source.includes(literal), `${route}/page.tsx does not contain ${literal}`);
  }
});

/* JPEG dimensions from the first SOF marker. Fifteen lines beats pulling
   sharp into a unit test. */
function jpegSize(buf: Buffer): [number, number] {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error(`no marker at byte ${i}`);
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  throw new Error("no SOF marker");
}

test("the root share card is a 1200×630 JPEG with alt text, and pages that set openGraph keep the site name", () => {
  // Facebook, WeChat and iMessage all want 1.91:1. 300 KB keeps the card
  // fast on a phone. The alt file is the file convention's own; without
  // it og:image:alt is empty.
  const img = readFileSync(new URL("../app/opengraph-image.jpg", import.meta.url));
  assert.deepEqual(jpegSize(img), [1200, 630]);
  assert.ok(img.length < 300 * 1024, `share card is ${Math.round(img.length / 1024)} KB`);
  assert.ok(src("../app/opengraph-image.alt.txt").trim().length > 10);

  // openGraph is shallow-merged, so a page that sets it replaces the root's
  // siteName/locale/type unless it spreads OG. Course and stage pages set it.
  for (const rel of ["../app/courses/[slug]/page.tsx", "../app/stage/[slug]/page.tsx", "../app/layout.tsx"]) {
    const s = src(rel);
    assert.ok(s.includes("...OG"), `${rel} sets openGraph without spreading OG`);
  }
  assert.ok(src("../app/layout.tsx").includes('card: "summary_large_image"'));
});

test("a breadcrumb trail becomes a BreadcrumbList that starts at home and ends without an item", () => {
  const s = breadcrumbSchema([{ label: "Courses", href: "/courses" }, { label: "Drama" }]);
  assert.equal(s["@type"], "BreadcrumbList");
  assert.deepEqual(s.itemListElement.map((i) => i.position), [1, 2, 3]);
  assert.deepEqual(s.itemListElement.map((i) => i.name), ["Home", "Courses", "Drama"]);
  assert.equal(s.itemListElement[0].item, "https://www.mirrorartsedu.com.au");
  assert.equal(s.itemListElement[1].item, "https://www.mirrorartsedu.com.au/courses");
  assert.ok(!("item" in s.itemListElement[2]), "the current page must not carry an item");
});

test("PageHero emits the BreadcrumbList so every inner page carries it", () => {
  const hero = src("../components/site/page-hero.tsx");
  assert.ok(hero.includes("breadcrumbSchema(trail)"), "page-hero.tsx does not emit breadcrumbSchema");
  assert.ok(hero.includes('type="application/ld+json"'));
});

test("the site FAQ answers only with facts the content layer already states", () => {
  // Six questions, each answered from lib/content, so the FAQ moves when
  // the catalogue does — the same rule the meta description follows.
  assert.equal(SITE_FAQ.length, 6);
  const text = SITE_FAQ.map((f) => f.a).join("\n");
  assert.ok(text.includes(`age ${YOUNGEST_AGE}`), "youngest age not derived");
  assert.ok(text.includes(campusAddress(SITE.campuses[0])) && text.includes(campusAddress(SITE.campuses[1])), "campus addresses not derived");
  assert.ok(text.includes(`of the ${COURSES.length} courses`), "course count not derived");
  for (const f of SITE_FAQ) {
    assert.ok(f.q.endsWith("?"), `not a question: ${f.q}`);
    assert.ok(f.a.length >= 40 && f.a.length <= 400, `answer length off: ${f.q}`);
  }
  // Nothing the site does not publish.
  assert.ok(!/\$\d|per term|price|fee/i.test(text), "the FAQ names a price the site does not");
});

test("a course FAQ states only what that course states", () => {
  const drama = faqForCourse(getCourse("drama")); // 120 minutes, from 5, exam pathway
  assert.equal(drama.length, 3);
  assert.ok(drama[0].a.includes("age 5"));
  assert.ok(drama[1].a.includes("120 minutes"));
  assert.ok(drama[2].q.includes("exams"));
  const debating = faqForCourse(getCourse("debating")); // 60 minutes, no age, no pathway
  assert.equal(debating.length, 1);
  const instrument = faqForCourse(getCourse("instrument"));
  assert.ok(instrument.some((f) => f.a.includes("30 or 45 minutes")), "the two-length course reads both lengths");
  const mt = faqForCourse(getCourse("musical-theatre"));
  assert.ok(mt.some((f) => f.a.includes("The Jungle Book")), "a production pathway names the production");
});

test("faqSchema is a FAQPage with one Question per item", () => {
  const s = faqSchema([{ q: "A?", a: "Yes, because." }]);
  assert.equal(s["@type"], "FAQPage");
  assert.equal(s.mainEntity.length, 1);
  assert.equal(s.mainEntity[0]["@type"], "Question");
  assert.equal(s.mainEntity[0].name, "A?");
  assert.equal(s.mainEntity[0].acceptedAnswer["@type"], "Answer");
  assert.equal(s.mainEntity[0].acceptedAnswer.text, "Yes, because.");
});

test("every section page carries its FAQ block", () => {
  const expect: [string, string][] = [
    ["../app/contact/page.tsx", "<Faq items={SITE_FAQ}"],
    ["../app/courses/[slug]/page.tsx", "<Faq items={faqForCourse(c)}"],
    ["../app/workshops/page.tsx", "<Faq items={WORKSHOPS_FAQ}"],
    ["../app/workshops/venue/page.tsx", "<Faq items={VENUE_FAQ}"],
    ["../app/faculty/page.tsx", "<Faq items={FACULTY_FAQ}"],
    ["../app/stage/page.tsx", "<Faq items={STAGE_FAQ}"],
    ["../app/about/page.tsx", "<Faq items={ABOUT_FAQ}"],
  ];
  for (const [rel, needle] of expect) {
    assert.ok(src(rel).includes(needle), `${rel} lacks ${needle}`);
  }
});

test("the about standfirst opens with the entity, not the pitch", () => {
  // What / where / since when / for whom, in the first sentence, derived
  // from the record. The rest of the paragraph is the client's own.
  const about = src("../app/about/page.tsx");
  assert.ok(about.includes("is a performing arts school for children and adults in ${SITE.campuses[0].suburb} and ${SITE.campuses[1].suburb}"), "lede is not entity-first / not derived");
  assert.ok(about.includes("since ${TIMELINE[0].year}"), "founding year is not read from the timeline");
  assert.ok(!about.includes("Since 2017, we have grown"), "the client's 'Since 2017' now repeats the lede's");
});

test("a production's shortTitle exists only where the full title would overrun the tab", () => {
  // The template adds " · Mirror Arts Education" (24 chars) and " (YYYY)"
  // (7). A shortTitle on a production that fits anyway is a second name
  // for nothing; a missing one on a production that does not fit is a
  // 95-character <title>.
  const SUFFIX = 24 + 7;
  for (const p of PRODUCTIONS) {
    const full = p.title.length + SUFFIX;
    if (p.shortTitle) {
      assert.ok(full > 80, `${p.slug} has a shortTitle but its full title fits (${full})`);
      assert.ok(p.shortTitle.length + SUFFIX <= 80, `${p.slug} shortTitle still overruns`);
    } else {
      assert.ok(full <= 80, `${p.slug} title runs to ${full} with the template and has no shortTitle`);
    }
  }
});

test("each campus Place carries its coordinates, a map link and a stable @id", () => {
  const org = organisationSchema();
  const [sh, gw] = org.location;
  assert.equal(sh["@id"], "https://www.mirrorartsedu.com.au/surrey-hills#campus");
  assert.equal(gw["@id"], "https://www.mirrorartsedu.com.au/glen-waverley#campus");
  assert.equal(sh.geo["@type"], "GeoCoordinates");
  assert.equal(sh.geo.latitude, SITE.campuses[0].geo.lat);
  assert.equal(sh.geo.longitude, SITE.campuses[0].geo.lng);
  assert.ok(sh.hasMap.startsWith("https://www.google.com/maps/search/?api=1&query="));
  // No hours on the record → no openingHoursSpecification. A guessed
  // 9-to-5 would be published by Google as fact.
  assert.ok(!("openingHoursSpecification" in sh), "hours were invented");
});

test("openingHoursSpecification appears only when the campus record has hours", () => {
  const withHours = {
    ...SITE.campuses[0],
    hours: [{ days: ["Monday", "Friday"] as const, opens: "15:30", closes: "19:00" }],
  };
  const s = campusSchema(withHours as never);
  assert.deepEqual(s.openingHoursSpecification, [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Friday"], opens: "15:30", closes: "19:00" },
  ]);
});

test("a campus page node is a LocalBusiness that shares the Place @id and points at the organisation", () => {
  const [sh, gw] = SITE.campuses.map((c) => campusSchema(c));
  assert.deepEqual(sh["@type"], ["LocalBusiness", "EducationalOrganization"]);
  assert.equal(sh["@id"], organisationSchema().location[0]["@id"]);
  assert.equal(sh.url, "https://www.mirrorartsedu.com.au/surrey-hills");
  assert.equal(sh.parentOrganization["@id"], "https://www.mirrorartsedu.com.au/#organisation");
  assert.equal(sh.telephone, SITE.phone);
  assert.ok(String(sh.image).startsWith("https://www.mirrorartsedu.com.au/assets/campus/"), "Surrey Hills has photographs");
  assert.ok(!("image" in gw), "Glen Waverley has no photographs and must not borrow one");
  assert.equal(sh.address.streetAddress, "1F/244 Canterbury Rd");
});

/* Every FAQ set on the site obeys the same three rules. */
function wellFormed(items: { q: string; a: string }[], label: string) {
  assert.ok(items.length >= 2, `${label} has ${items.length} questions`);
  for (const f of items) {
    assert.ok(f.q.endsWith("?"), `${label}: not a question: ${f.q}`);
    assert.ok(f.a.length >= 40 && f.a.length <= 400, `${label}: answer length ${f.a.length}: ${f.q}`);
  }
  assert.equal(new Set(items.map((f) => f.q)).size, items.length, `${label} repeats a question`);
}

test("a campus FAQ states the address, the courses and the hire rooms, and nothing the record lacks", () => {
  const [sh, gw] = SITE.campuses;
  const s = faqForCampus(sh);
  const g = faqForCampus(gw);
  wellFormed(s, "surrey-hills");
  wellFormed(g, "glen-waverley");
  assert.ok(s[0].a.includes(campusAddress(sh)) && s[0].a.includes(campusAddress(gw)), "both addresses");
  assert.ok(s[1].a.includes(`All ${COURSES.length} courses`), "today every course runs at both");
  assert.ok(s.some((f) => f.q.includes("hire")), "Surrey Hills hires rooms");
  assert.ok(!g.some((f) => f.q.includes("hire")), "Glen Waverley does not");
  assert.ok(!s.some((f) => /open\?$/.test(f.q)), "no hours on the record → no hours question");
  assert.ok(!s.some((f) => /parking/i.test(f.q)), "no transport on the record → no parking question");
  assert.ok(s[s.length - 1].q.startsWith("How do I book a trial"));
  // The hours and transport questions appear the moment the record has them.
  const withData = {
    ...gw,
    hours: [{ days: ["Saturday"] as const, opens: "09:00", closes: "13:00" }],
    transport: ["There is parking on the street.", "Glen Waverley station is a ten-minute walk."],
  };
  const d = faqForCampus(withData as never);
  assert.ok(d.some((f) => f.a.includes("Saturday, 9:00am–1:00pm")), "hours are formatted");
  assert.ok(d.some((f) => f.a.includes("parking on the street")), "transport is quoted verbatim");
});

test("the workshops FAQ counts the activity lists and names the popular ones", () => {
  wellFormed(WORKSHOPS_FAQ, "workshops");
  const text = WORKSHOPS_FAQ.map((f) => f.a).join("\n");
  assert.ok(text.includes(`${INCURSION_PERFORMANCE.length} performance`));
  assert.ok(text.includes(`${INCURSION_CRAFT.length} craft`));
  for (const a of [...INCURSION_PERFORMANCE, ...INCURSION_CRAFT].filter((x) => x.popular)) {
    assert.ok(text.includes(a.title), `popular activity ${a.title} not named`);
  }
  assert.ok(text.includes(SITE.email));
});

test("the venue FAQ reads the rate card", () => {
  wellFormed(VENUE_FAQ, "venue");
  const text = VENUE_FAQ.map((f) => f.a).join("\n");
  const off = Math.min(...HIRE_SPACES.map((s) => s.offPeakRate));
  const peak = Math.max(...HIRE_SPACES.map((s) => s.peakRate));
  assert.ok(text.includes(`$${off}`) && text.includes(`$${peak}`), "rate range not derived");
  assert.ok(text.includes(`${HIRE_SPACES.length} spaces`));
  for (const t of VENUE_TERMS) assert.ok(text.includes(t), "a hire term is missing");
  assert.ok(text.includes(campusAddress(SITE.campuses[0])));
});

test("the faculty FAQ counts the teachers and names only institutions their cards name", () => {
  wellFormed(FACULTY_FAQ, "faculty");
  const text = FACULTY_FAQ.map((f) => f.a).join("\n");
  assert.ok(text.includes(`${FACULTY.length} teachers`));
  const trained = FACULTY_FAQ.find((f) => f.q.includes("trained"));
  assert.ok(trained, "no training question");
  const credentials = FACULTY.flatMap((t) => t.credentials).join("\n");
  for (const name of trained.a.match(/[A-Z][A-Za-z'’]+(?: [A-Za-z'’]+)*(?: of [A-Z][A-Za-z]+)*/g) ?? []) {
    if (/University|Academy|Conservatory/.test(name)) {
      assert.ok(credentials.includes(name), `${name} is not on any teacher's card`);
    }
  }
});

test("the stage FAQ lists the productions, the bodies and the competitions", () => {
  wellFormed(STAGE_FAQ, "stage");
  const text = STAGE_FAQ.map((f) => f.a).join("\n");
  assert.ok(text.includes(`${PRODUCTIONS.length} productions`));
  for (const b of CREDENTIAL_BODIES) assert.ok(text.includes(b.name), `${b.name} missing`);
  for (const c of COMPETITIONS) assert.ok(text.includes(c.title), `${c.title} missing`);
});

test("the about FAQ dates the school from the timeline and names the former name without a rename year", () => {
  wellFormed(ABOUT_FAQ, "about");
  const text = ABOUT_FAQ.map((f) => f.a).join("\n");
  assert.ok(text.includes("In 2017"));
  assert.ok(text.includes(SITE.formerName));
  // The rename year is disputed (content/OPEN-QUESTIONS.md, 2024 vs 2025),
  // so the answer must not pick one.
  const renameAnswer = ABOUT_FAQ.find((f) => f.a.includes(SITE.formerName))!.a;
  assert.ok(!/202[45]/.test(renameAnswer), "the rename answer picked a year");
});

test("the two campus pages exist, share one component, and are linked from the footer and the map", () => {
  // Source-level, like the canonical walk. The routes are static folders on
  // purpose: the canonical and sitemap tests then cover them with no special
  // case, and a third campus is one more five-line file.
  for (const id of ["surrey-hills", "glen-waverley"]) {
    const page = src(`../app/${id}/page.tsx`);
    assert.ok(page.includes(`getCampus("${id}")`), `${id} route does not load its campus`);
    assert.ok(page.includes("<CampusPage campus="), `${id} route does not mount CampusPage`);
    assert.ok(src("../app/sitemap.ts").includes(`"/${id}"`), `${id} missing from sitemap`);
  }
  const campus = src("../components/sections/campus.tsx");
  assert.ok(campus.includes("campusSchema(c)"), "campus page does not emit campusSchema");
  assert.ok(campus.includes("<Faq items={faqForCampus(c)}"), "campus page has no FAQ");
  assert.ok(campus.includes("...OG"), "campus metadata sets openGraph without spreading OG");
  assert.ok(campus.includes('href="/contact#trial"'), "campus page does not send readers to the form");
  assert.ok(src("../components/site/footer.tsx").includes("campusPath("), "footer still links campuses to /#find-us");
  assert.ok(src("../components/shared/campus-tabs.tsx").includes("campusPath(here)"), "map address block does not link to the campus page");
});
