import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

import { SITE_URL, breadcrumbSchema, faqSchema } from "./schema.ts";
import { SITE_FAQ, faqForCourse } from "./content/faq.ts";
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

test("the FAQ block is on the contact page and the course pages", () => {
  assert.ok(src("../app/contact/page.tsx").includes("<Faq items={SITE_FAQ}"));
  assert.ok(src("../app/courses/[slug]/page.tsx").includes("<Faq items={faqForCourse(c)}"));
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
