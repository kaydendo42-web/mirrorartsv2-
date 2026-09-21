# SEO / AEO audit and quick-win fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the site onto its real host (`www`), give every page a canonical, a share card and breadcrumb structured data, add a fact-derived FAQ with `FAQPage` markup, shorten the homepage title, record a rank baseline and an audit, then ship through the V2 repository.

**Architecture:** Everything that names a URL keeps reading one constant, `SITE_URL` in `lib/schema.ts`; the fix there flows to the sitemap, robots and all JSON-LD. New structured data (`BreadcrumbList`, `FAQPage`) is built in `lib/schema.ts` from the same content layer the existing schema reads, and emitted from one component each (`PageHero`, a new `Faq`). Page-level metadata (`alternates.canonical`, `openGraph.images`) lives in each page's existing `metadata` / `generateMetadata` export, guarded by a source-walking test in the pattern of the existing sitemap test. The root share card is the file convention `app/opengraph-image.jpg`.

**Tech Stack:** Next 16.3 App Router (`--webpack` build), TypeScript, `node --test` with type stripping (`npm test` globs `lib/**/*.test.ts`), `sharp` (already in `node_modules` via Next) for the one image crop, `curl` + a small Node crawl script for the audit, Scrapling for the rank snapshot.

**Spec:** `docs/SEO-PICKUP.md` (design table under "Design awaiting approval"; Kayden approved it on 22 Sep 2026 with "Do all as you can"). Also read `docs/STATE.md` head and `../AGENTS.md`.

## Global Constraints

- Canonical host is `https://www.mirrorartsedu.com.au`. No DNS or Vercel domain *assignment* changes. DNS lives in Namecheap, not Vercel.
- `Updated Website/` is **not a git repository** and is untracked by the root repo. There are no per-task commits. One commit happens at ship time in a scratch clone of `https://github.com/kaydendo42-web/mirrorartsv2-.git` (Task 12). Do not commit or push the root repo.
- Read `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` (sections `metadataBase`, `openGraph`, `alternates`, `verification`, `Merging`) and `.../03-file-conventions/01-metadata/opengraph-image.md` before touching metadata. Key rule: `openGraph` is **shallow-merged** — a page that sets `openGraph` replaces the root's `openGraph` entirely.
- No invented facts. Every FAQ answer and every schema value is derived from `lib/content/*` or quotes copy already on the site. No ratings, reviews, prices, timetables.
- No `ImageResponse`, no keyword tooling, no backlinks work, no content rewrites, no `/zh`, no homepage layout change.
- Match the codebase's comment style: block comments that say *why*, written for the next person.
- Verify with `npm test`, `npm run lint`, `npm run build` before claiming any task done.
- Ask Kayden before pushing (Task 12). The 13 Sep authorisation covered the workshop release only.

---

## File map

| File | Responsibility | Task |
|---|---|---|
| `lib/schema.ts` | `SITE_URL` → www; relative imports (so tests can load it); `OG` base object; `breadcrumbSchema()`; `faqSchema()` | 1, 4, 5, 6 |
| `lib/seo.test.ts` | **New.** All SEO assertions: host, sitemap, title length, canonical walk, OG file, breadcrumb, FAQ | 1–6 |
| `app/sitemap.ts` | Drop `lastModified: new Date()` | 2 |
| `app/layout.tsx` | Title ≤ 60, description with suburbs, root `openGraph` + `twitter`, later `verification` | 2, 4, 11 |
| `app/opengraph-image.jpg`, `app/opengraph-image.alt.txt` | **New.** Root share card, 1200×630 | 4 |
| 11 × `app/**/page.tsx` | `alternates.canonical`; course + stage also `openGraph.images` | 3, 4 |
| `components/site/page-hero.tsx` | Emit `BreadcrumbList` from `trail` | 5 |
| `lib/content/faq.ts` | **New.** `SITE_FAQ`, `faqForCourse()` derived from content | 6 |
| `components/shared/faq.tsx` | **New.** Renders a FAQ section + `FAQPage` JSON-LD | 6 |
| `app/globals.css` | `.faq` styles | 6 |
| `app/contact/page.tsx`, `app/courses/[slug]/page.tsx` | Render `<Faq>` | 6 |
| `scripts/seo-crawl.mjs` | **New.** Crawls a base URL's sitemap and prints a per-page audit table | 7 |
| `docs/seo-audit-2026-09-22.md` | **New.** Findings, rank baseline, what shipped, off-site checklist | 7, 8, 9, 10 |
| `docs/STATE.md`, `docs/SEO-PICKUP.md`, `content/OPEN-QUESTIONS.md` | Record the change; FAQ copy flagged for client review | 13 |

---

### Task 1: One host — `SITE_URL` becomes `www`, and `lib/schema.ts` becomes testable

**Files:**
- Modify: `lib/schema.ts:1-25`
- Create: `lib/seo.test.ts`

**Interfaces:**
- Produces: `SITE_URL = "https://www.mirrorartsedu.com.au"` (string const, no trailing slash). Every later task reads it.

- [ ] **Step 1: Write the failing test**

```ts
// lib/seo.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

import { SITE_URL } from "./schema.ts";

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
```

- [ ] **Step 2: Run it, expect failure**

Run: `cd "Updated Website" && node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL. Either `Cannot find package '@/lib/content/courses'` (the alias) or `Expected values to be strictly equal: 'https://mirrorartsedu.com.au' !== 'https://www.mirrorartsedu.com.au'`.

- [ ] **Step 3: Make `lib/schema.ts` importable from Node and point it at www**

Replace lines 1–5 (the five `@/` imports) with relative imports, and change the constant:

```ts
import { YOUNGEST_AGE, type Course } from "./content/courses";
import type { Teacher } from "./content/faculty";
import type { Production } from "./content/productions";
import { SITE, campusAddress, type Campus } from "./content/site";
import type { Leader } from "./content/team";
```

```ts
/* The host Vercel actually serves. The apex redirects here, so a sitemap,
   a robots.txt or an @id built on the apex is a URL that redirects — which
   is how the site described itself until 22 September 2026. Relative
   imports above rather than the @/ alias so lib/seo.test.ts can load this
   file under node --test, which does not read tsconfig paths. */
export const SITE_URL = "https://www.mirrorartsedu.com.au";
```

- [ ] **Step 4: Run the test, expect pass; run the full suite**

Run: `node --experimental-strip-types --test lib/seo.test.ts && npm test`
Expected: both PASS (existing suite: 0 fail).

- [ ] **Step 5: Confirm the change reached sitemap, robots and JSON-LD**

Run: `grep -rn "mirrorartsedu.com.au" app lib components --include=*.ts --include=*.tsx | grep -v "www\." | grep -v "mirrorartsedu.com\b"`
Expected: no line prints a bare `https://mirrorartsedu.com.au` (the email domain `mirrorartsedu.com` is a different string and may appear).

---

### Task 2: Sitemap without a fake modification date; homepage title that fits a result

**Files:**
- Modify: `app/sitemap.ts:26-32`
- Modify: `app/layout.tsx:42-53`
- Test: `lib/seo.test.ts`

**Interfaces:**
- Produces: root default title `"Performing Arts School for Kids · Mirror Arts Education"` (55 chars). Task 7's crawl checks every `<title>` ≤ 60 after the template.

- [ ] **Step 1: Write the failing tests**

Append to `lib/seo.test.ts`:

```ts
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
```

- [ ] **Step 2: Run, expect two failures**

Run: `node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL ×2 — `sitemap.ts still sets lastModified…` and `default title is 85 characters`.

- [ ] **Step 3: Edit `app/sitemap.ts`**

Replace from `const lastModified = new Date();` to the end of the function with:

```ts
  /* No lastModified. The previous version stamped every URL with the build
     time, which told Google that all 28 pages changed on every deploy — a
     date it learns to ignore. Real per-page dates would need a content
     changelog the site does not keep; until it does, silence is honest. */
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
```

- [ ] **Step 4: Edit `app/layout.tsx` metadata**

Replace the `title` and `description` fields:

```ts
  title: {
    /* 55 characters. Google shows about 60 of a title; the previous default
       ran to 85 and dropped the school's name off the end of its own result.
       The two suburbs moved into the description, where they still count. */
    default: "Performing Arts School for Kids · Mirror Arts Education",
    template: "%s · Mirror Arts Education",
  },
  /* The age comes off the catalogue rather than out of this string. It said
     "aged 6+" until 8 September 2026, when the client dropped Musical Theatre
     and Vocal to four — and a meta description is exactly the kind of line
     nobody re-reads after a content change. Kept under ~160 characters so
     the last clause survives the snippet. */
  description: `Drama, speech, music and dance for children aged ${YOUNGEST_AGE}+ in Surrey Hills and Glen Waverley. Taught in English and Mandarin, with AMEB and CEFA exam preparation.`,
```

- [ ] **Step 5: Run tests, expect pass**

Run: `npm test`
Expected: PASS, 0 fail. (`content.test.ts` has a test on the layout description mentioning the age — if it asserts a specific sentence, update that assertion to the new string rather than weakening it.)

---

### Task 3: A canonical on every page

**Files:**
- Modify: `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/courses/page.tsx`, `app/faculty/page.tsx`, `app/privacy/page.tsx`, `app/stage/page.tsx`, `app/workshops/page.tsx`, `app/workshops/venue/page.tsx` (each `export const metadata`), `app/courses/[slug]/page.tsx:48-63`, `app/stage/[slug]/page.tsx:47-56`
- Test: `lib/seo.test.ts`

**Interfaces:**
- Consumes: `metadataBase: new URL(SITE_URL)` already in `app/layout.tsx`, so canonicals are written as paths and resolve to `https://www.mirrorartsedu.com.au/<path>`.
- Produces: `<link rel="canonical">` on all 28 routes. Task 7 verifies in HTML.

- [ ] **Step 1: Write the failing test**

Append to `lib/seo.test.ts`:

```ts
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
```

- [ ] **Step 2: Run, expect failure naming `//page.tsx` (the homepage) first**

Run: `node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL — `//page.tsx does not contain canonical: "/"` (or whichever page the walk reaches first).

- [ ] **Step 3: Add `alternates` to the nine static pages**

`app/page.tsx` currently has no `metadata` export (the root layout's default title applies). Add one:

```tsx
import type { Metadata } from "next";

/* The homepage inherits the root title and description; this only pins the
   canonical. See lib/seo.test.ts, which walks app/ for this field. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
```

For each of the other eight static pages add one line to the existing object — the value is the page's own route:

```ts
  alternates: { canonical: "/about" },
```

Routes: `/about`, `/contact`, `/courses`, `/faculty`, `/privacy`, `/stage`, `/workshops`, `/workshops/venue`.

- [ ] **Step 4: Add `alternates` to the two dynamic pages**

`app/courses/[slug]/page.tsx`, inside `generateMetadata`'s return:

```ts
  return {
    title: c.title,
    description: `${c.strapline}. ${facts}, at Mirror Arts Education in Melbourne.`,
    alternates: { canonical: `/courses/${slug}` },
  };
```

`app/stage/[slug]/page.tsx`:

```ts
  return {
    title: `${p.title} (${p.year})`,
    description: p.blurb,
    alternates: { canonical: `/stage/${slug}` },
  };
```

- [ ] **Step 5: Run tests, lint, expect pass**

Run: `npm test && npm run lint`
Expected: PASS, lint clean.

---

### Task 4: Share card — root `opengraph-image.jpg`, root `openGraph` / `twitter`, per-page images on courses and stage

**Files:**
- Create: `app/opengraph-image.jpg` (1200×630), `app/opengraph-image.alt.txt`
- Modify: `app/layout.tsx` (metadata), `lib/schema.ts` (add `OG`), `app/courses/[slug]/page.tsx`, `app/stage/[slug]/page.tsx`
- Test: `lib/seo.test.ts`

**Interfaces:**
- Produces: `export const OG = { siteName: SITE.name, locale: "en_AU", type: "website" } as const` in `lib/schema.ts`. Any page that sets `openGraph` must spread `...OG` first, because `openGraph` is shallow-merged and would otherwise lose `siteName`/`locale`/`type`.

- [ ] **Step 1: Write the failing test**

Append to `lib/seo.test.ts`:

```ts
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
```

- [ ] **Step 2: Run, expect failure (ENOENT on the jpg)**

Run: `node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL — `ENOENT … app/opengraph-image.jpg`.

- [ ] **Step 3: Crop the hero still**

The homepage hero video's poster, `public/assets/video/hero-poster.jpg` (1920×1080, The Jungle Book), is the still parents already see first. Crop it:

```bash
cd "Updated Website"
node -e '
const sharp = require("sharp");
sharp("public/assets/video/hero-poster.jpg")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("app/opengraph-image.jpg")
  .then((i) => console.log(i.width, i.height, i.size));
'
printf "Mirror Arts Education students on stage in the annual production of The Jungle Book\n" > app/opengraph-image.alt.txt
```

Expected output: `1200 630 <bytes under 307200>`. If the size is over, drop `quality` to 76 and rerun. Open the file (`open app/opengraph-image.jpg`) and confirm faces are not cut off by the centre crop; if they are, use `position: "top"` or `"attention"`.

- [ ] **Step 4: Add `OG` to `lib/schema.ts`**

After `SITE_URL`:

```ts
/* The Open Graph fields every page shares. Next shallow-merges openGraph,
   so a page that sets its own image would silently drop siteName and locale
   unless it spreads this first. Course and stage pages do. */
export const OG = {
  siteName: SITE.name,
  locale: "en_AU",
  type: "website",
} as const;
```

- [ ] **Step 5: Root metadata in `app/layout.tsx`**

Import `OG` alongside the existing `SITE_URL` import from `@/lib/schema`, then add to the `metadata` object:

```ts
  /* The image itself is the file convention app/opengraph-image.jpg — Next
     emits og:image, its type, width and height from the file, and the
     .alt.txt beside it. Pages without their own openGraph inherit all of
     this; course and stage pages replace the image with their own still. */
  openGraph: { ...OG },
  twitter: { card: "summary_large_image" },
```

- [ ] **Step 6: Per-page images**

`app/courses/[slug]/page.tsx` — import `OG` from `@/lib/schema` (it already imports `courseSchema, jsonLd` from there), and extend the return:

```ts
  return {
    title: c.title,
    description: `${c.strapline}. ${facts}, at Mirror Arts Education in Melbourne.`,
    alternates: { canonical: `/courses/${slug}` },
    /* Debating has no photograph yet, so it falls back to the root card. */
    ...(c.hero
      ? {
          openGraph: {
            ...OG,
            images: [{ url: c.hero.src, width: c.hero.width, height: c.hero.height, alt: c.hero.alt }],
          },
        }
      : {}),
  };
```

`app/stage/[slug]/page.tsx` — same import; every production has a poster:

```ts
  const poster = p.video.poster;
  return {
    title: `${p.title} (${p.year})`,
    description: p.blurb,
    alternates: { canonical: `/stage/${slug}` },
    openGraph: {
      ...OG,
      images: [{ url: poster.src, width: poster.width, height: poster.height, alt: poster.alt }],
    },
  };
```

- [ ] **Step 7: Tests, lint, build, then read the real head tags**

Run: `npm test && npm run lint && npm run build`
Expected: all pass; build lists `/opengraph-image.jpg` among routes.

Run: `npm run start -- -p 3100 &` then

```bash
for p in / /about /courses/drama /stage/born-to-fly; do
  echo "== $p"; curl -sS "http://localhost:3100$p" | grep -o '<meta property="og:[^>]*>\|<meta name="twitter:[^>]*>\|<link rel="canonical"[^>]*>'
done
kill %1
```

Expected, per page: `og:title`, `og:description`, `og:site_name` = Mirror Arts Education, `og:locale` = en_AU, `og:type` = website, `og:image` (root pages: `…/opengraph-image.jpg?…`; `/courses/drama`: `…/assets/cards/performance.jpg`; `/stage/born-to-fly`: `…/assets/video/born-to-fly-poster.jpg`), `og:image:width/height`, `twitter:card` = summary_large_image, `twitter:image`, canonical = `https://www.mirrorartsedu.com.au<path>`. **If `og:title` or `og:description` is missing on the course/stage pages**, Next did not fill them from `title`/`description` — add `title` and `description` explicitly inside those two `openGraph` objects and re-run. **If `twitter:image` is missing**, add `images` to the root `twitter` object pointing at `/opengraph-image.jpg` and re-run.

---

### Task 5: `BreadcrumbList` from the trail every `PageHero` already renders

**Files:**
- Modify: `lib/schema.ts` (add `breadcrumbSchema`), `components/site/page-hero.tsx`
- Test: `lib/seo.test.ts`

**Interfaces:**
- Produces: `breadcrumbSchema(trail: { label: string; href?: string }[])` → schema.org `BreadcrumbList` object. Position 1 is always Home → `SITE_URL`. A crumb with `href` gets `item: SITE_URL + href`; the last crumb (current page) has no `item`, which Google's spec allows.

- [ ] **Step 1: Write the failing test**

Change the schema import at the top of `lib/seo.test.ts` to `import { SITE_URL, breadcrumbSchema } from "./schema.ts";` and append:

```ts
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
```

- [ ] **Step 2: Run, expect failure (`breadcrumbSchema` is not exported)**

Run: `node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL — `SyntaxError: The requested module './schema.ts' does not provide an export named 'breadcrumbSchema'`.

- [ ] **Step 3: Add `breadcrumbSchema` to `lib/schema.ts`** (before `jsonLd`)

```ts
/* Built from the trail PageHero already draws, so the markup and the visible
   crumbs cannot disagree. Home is always first. The last crumb is the page
   itself and carries no item — schema.org allows it and Google prefers it,
   since the item would just be the URL the crawler is already on. Typed
   structurally rather than importing Crumb from a component: schema.ts
   knows about content, not about components. */
export function breadcrumbSchema(trail: { label: string; href?: string }[]) {
  const crumbs = [{ name: "Home", item: SITE_URL }, ...trail.map((c) => ({
    name: c.label,
    ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
  }))];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
  };
}
```

- [ ] **Step 4: Emit it from `components/site/page-hero.tsx`**

Add the import `import { breadcrumbSchema, jsonLd } from "@/lib/schema";` and, inside `<header>` directly after `<div className="page-cue" …/>`:

```tsx
      {/* The same trail, as structured data. One place, every inner page. */}
      {trail && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />
      )}
```

- [ ] **Step 5: Tests, lint, build; check one page**

Run: `npm test && npm run lint && npm run build && (npm run start -- -p 3100 & sleep 3; curl -sS http://localhost:3100/courses/drama | grep -o '"@type":"BreadcrumbList"[^<]*' | head -c 400; echo; kill %1)`
Expected: PASS; the JSON shows three ListItems, positions 1–3, Home → Courses → Drama.

---

### Task 6: FAQ — content-derived answers, `FAQPage` markup, visible block on contact and course pages

**Files:**
- Create: `lib/content/faq.ts`, `components/shared/faq.tsx`
- Modify: `lib/schema.ts` (add `faqSchema`), `app/globals.css`, `app/contact/page.tsx`, `app/courses/[slug]/page.tsx`
- Test: `lib/seo.test.ts`

**Interfaces:**
- Produces: `type FaqItem = { q: string; a: string }`; `SITE_FAQ: FaqItem[]` (six items); `faqForCourse(c: Course): FaqItem[]` (0–3 items, only where the course states the fact); `faqSchema(items: FaqItem[])` → schema.org `FAQPage`; `<Faq items={FaqItem[]} />` component that renders nothing when `items` is empty.

- [ ] **Step 1: Write the failing tests**

Change the schema import to `import { SITE_URL, breadcrumbSchema, faqSchema } from "./schema.ts";`, add `import { SITE_FAQ, faqForCourse } from "./content/faq.ts";` and `import { getCourse, COURSES, YOUNGEST_AGE } from "./content/courses.ts";` and `import { SITE, campusAddress } from "./content/site.ts";`, then append:

```ts
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
  const drama = faqForCourse(getCourse("drama"));        // minutes 120, minAge 5, exam pathway
  assert.equal(drama.length, 3);
  assert.ok(drama[0].a.includes("age 5"));
  assert.ok(drama[1].a.includes("120 minutes"));
  const debating = faqForCourse(getCourse("debating"));  // no minAge, no leadsTo
  assert.ok(debating.length <= 1, "Debating has no age and no pathway on record");
  const instrument = faqForCourse(getCourse("instrument"));
  assert.ok(instrument.some((f) => f.a.includes("30 or 45 minutes")), "the two-length course reads both lengths");
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
```

Check the slugs: `grep -n 'slug: "' lib/content/courses.ts` — use the real slugs for drama, debating and instrument if they differ from the three above, and adjust the expected lengths to what those courses actually record (`minutes`, `minAge`, `leadsTo`).

- [ ] **Step 2: Run, expect failure (module not found)**

Run: `node --experimental-strip-types --test lib/seo.test.ts`
Expected: FAIL — `Cannot find module './content/faq.ts'`.

- [ ] **Step 3: Create `lib/content/faq.ts`**

```ts
import { COURSES, YOUNGEST_AGE, courseFacts, type Course } from "./courses";
import { SITE, campusAddress } from "./site";

/* The questions a parent asks before the enquiry form, answered from the
   content layer and from nothing else. Every number here is read off the
   catalogue or the site record, so an answer cannot outlive the fact it
   states — the meta description learned that lesson on 8 September 2026.
   Rendered by components/shared/faq.tsx, marked up as FAQPage in
   lib/schema.ts. Flagged for the client's review in
   content/OPEN-QUESTIONS.md; the wording is ours, the facts are theirs. */

export type FaqItem = { q: string; a: string };

const EXAM_COURSES = COURSES.filter((c) => c.leadsTo?.href === "/stage#achievements");

const STARTING_AGES = COURSES.flatMap((c) => (c.minAge === undefined ? [] : [c.minAge]));
const OLDEST_START = Math.max(...STARTING_AGES);

const LENGTHS = COURSES.flatMap((c) =>
  typeof c.minutes === "number" ? [c.minutes] : Array.isArray(c.minutes) ? c.minutes : [],
);
const SHORTEST = Math.min(...LENGTHS);
const LONGEST = Math.max(...LENGTHS);

function classLength(c: Course): string | undefined {
  return courseFacts(c).find((f) => f.label === "Each class")?.value;
}

export const SITE_FAQ: FaqItem[] = [
  {
    q: "What age can my child start?",
    a: `Children's classes start from age ${YOUNGEST_AGE}. The starting age runs from ${YOUNGEST_AGE} to ${OLDEST_START} depending on the course, and each course page states its own. Adult programs run separately.`,
  },
  {
    q: "How do I book a trial class?",
    a: "Use the enquiry form on the contact page and tell us the child's age and what they are already doing. There is no online booking or payment page — a person reads the form and replies with which course fits and whether there is room this term.",
  },
  {
    q: "Where are the classes held?",
    a: `At two campuses in Melbourne's east: ${campusAddress(SITE.campuses[0])} and ${campusAddress(SITE.campuses[1])}. Classes run at both; studio hire and the workshop space are at ${SITE.campuses[0].suburb}.`,
  },
  {
    q: "Are classes taught in English or Mandarin?",
    a: "Both. Teaching is in English and Mandarin, and Bilingual Hosting trains students to present in the two languages.",
  },
  {
    q: "Do you prepare students for exams?",
    a: `Yes. ${EXAM_COURSES.length} of the ${COURSES.length} courses prepare students directly for AMEB Speech & Performance and Vocal, Trinity and CEFA grades, alongside showcases, productions and competitions.`,
  },
  {
    q: "How long is a class?",
    a: `Between ${SHORTEST} and ${LONGEST} minutes depending on the course. Each course page states its own length.`,
  },
];

/* The same three facts a course states on its own hero, as questions. A
   course that does not record a fact gets no question about it — an absent
   answer says nothing, a guessed one says something wrong. */
export function faqForCourse(c: Course): FaqItem[] {
  const items: FaqItem[] = [];
  if (c.minAge !== undefined) {
    items.push({
      q: `What age can my child start ${c.title}?`,
      a: `From age ${c.minAge}. Tell us the child's age and what they are already doing when you enquire, and we will say whether this course fits.`,
    });
  }
  const length = classLength(c);
  if (length) {
    items.push({ q: `How long is a ${c.title} class?`, a: `${length[0].toUpperCase()}${length.slice(1)}, taught at ${SITE.name} in ${SITE.campuses[0].suburb} and ${SITE.campuses[1].suburb}.` });
  }
  if (c.leadsTo) {
    items.push(
      c.leadsTo.href === "/stage#achievements"
        ? { q: `Does ${c.title} prepare students for exams?`, a: `Yes. ${c.title} is one of the courses that prepare students directly for accredited exam grades — see Exams and achievements on the Stage page.` }
        : { q: `Where does ${c.title} lead?`, a: `To the stage. Students in ${c.title} work towards ${c.leadsTo.label}.` },
    );
  }
  return items;
}
```

- [ ] **Step 4: Add `faqSchema` to `lib/schema.ts`** (import `type FaqItem` from `./content/faq`)

```ts
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
```

- [ ] **Step 5: Create `components/shared/faq.tsx`**

```tsx
import { Section, SectionHead } from "@/components/site/section";
import type { FaqItem } from "@/lib/content/faq";
import { faqSchema, jsonLd } from "@/lib/schema";

/* A definition list, not an accordion: the answers are short, the point is
   that they are readable by a parent and by a crawler in the same pass, and
   a closed <details> is one more click on a page whose only job is to get
   someone to the form. Renders nothing for an empty list, so a course with
   no recorded facts shows no empty section. */
export default function Faq({ items, tone = "alt" }: { items: FaqItem[]; tone?: "base" | "alt" }) {
  if (items.length === 0) return null;
  return (
    <Section id="faq" tone={tone}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(items))} />
      <SectionHead eyebrow="Questions" title="Before you write" />
      <dl className="faq">
        {items.map((f) => (
          <div key={f.q} className="faq__item">
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
```

- [ ] **Step 6: Styles, in `app/globals.css`** (append near the `.phero__meta` rules, ~line 1712)

```css
/* FAQ (components/shared/faq.tsx). Same voice as .phero__meta: small caps
   label, display answer — but here the question is the label and gets the
   display face, since it is what a scanning parent reads first. */
.faq {
  display: grid;
  gap: 0;
  margin: 0;
  border-top: 1px solid var(--line);
}
.faq__item {
  display: grid;
  gap: 0.5rem 2.5rem;
  padding: 1.35rem 0;
  border-bottom: 1px solid var(--line);
}
@media (min-width: 760px) {
  .faq__item { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }
}
.faq dt {
  font-family: var(--disp);
  font-weight: 600;
  font-size: 1.15rem;
  margin: 0;
}
.faq dd {
  margin: 0;
  color: var(--muted);
  max-width: 60ch;
}
```

- [ ] **Step 7: Render on the two pages**

`app/contact/page.tsx` — add `import Faq from "@/components/shared/faq";` and `import { SITE_FAQ } from "@/lib/content/faq";`. The page alternates base / alt / base; insert after the "Every channel" `<Section>` closes and before `<PageNav …/>`:

```tsx
      <Faq items={SITE_FAQ} />
```

`app/courses/[slug]/page.tsx` — add `import Faq from "@/components/shared/faq";` and `import { faqForCourse } from "@/lib/content/faq";`. Insert before `<PageNav`; the section before it is `<Section>` (base) "Who runs the room", so `alt` is right:

```tsx
      <Faq items={faqForCourse(c)} />
```

- [ ] **Step 8: Tests, lint, build; eyeball both pages**

Run: `npm test && npm run lint && npm run build`
Expected: PASS.

Run: `npm run start -- -p 3100 &` then open `http://localhost:3100/contact#faq` and `http://localhost:3100/courses/drama#faq` in Chrome (via the claude-in-chrome tools) at desktop and 390px width. Expected: the list reads cleanly, no horizontal overflow, the section ground alternates correctly with its neighbours. Then `curl -sS http://localhost:3100/contact | grep -o '"@type":"FAQPage"'` prints once. `kill %1`.

---

### Task 7: The audit crawl — script, local and live, findings table

**Files:**
- Create: `scripts/seo-crawl.mjs`
- Create: `docs/seo-audit-2026-09-22.md` (first sections)

**Interfaces:**
- Produces: `node scripts/seo-crawl.mjs <baseUrl>` prints a Markdown table (one row per sitemap URL) and an issues list; exit code 1 if any issue.

- [ ] **Step 1: Write the crawler**

```js
// scripts/seo-crawl.mjs
// Usage: node scripts/seo-crawl.mjs https://www.mirrorartsedu.com.au
// Reads the sitemap, fetches every page, prints a Markdown audit table and
// a list of issues. Built-ins only, so it runs anywhere Node does.
const base = process.argv[2]?.replace(/\/$/, "");
if (!base) { console.error("usage: node scripts/seo-crawl.mjs <baseUrl>"); process.exit(2); }

const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const one = (html, re) => html.match(re)?.[1] ?? "";
const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = attr(sitemap, /<loc>([^<]+)<\/loc>/g);
if (urls.length === 0) { console.error("no <loc> in sitemap"); process.exit(1); }

const rows = [];
const issues = [];
const seenLinks = new Map();

for (const url of urls) {
  const res = await fetch(url, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  const path = url.replace(base, "") || "/";
  const title = unescape(one(html, /<title>([^<]*)<\/title>/));
  const desc = unescape(one(html, /<meta name="description" content="([^"]*)"/));
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = one(html, /<link rel="canonical" href="([^"]+)"/);
  const ogImage = one(html, /<meta property="og:image" content="([^"]+)"/);
  const ld = attr(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g);
  const types = [];
  for (const block of ld) {
    try { types.push(JSON.parse(block)["@type"]); } catch { issues.push(`${path}: invalid JSON-LD`); }
  }
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? []).length;
  const links = attr(html, /href="(\/[^"#?]*)/g).filter((l) => !l.startsWith("/_next"));
  for (const l of new Set(links)) if (!seenLinks.has(l)) seenLinks.set(l, null);

  if (res.status !== 200) issues.push(`${path}: HTTP ${res.status}`);
  if (title.length > 60) issues.push(`${path}: title ${title.length} chars`);
  if (!desc) issues.push(`${path}: no description`); else if (desc.length > 165) issues.push(`${path}: description ${desc.length} chars`);
  if (h1s !== 1) issues.push(`${path}: ${h1s} h1`);
  if (canonical !== url && canonical !== url.replace(/\/$/, "")) issues.push(`${path}: canonical "${canonical}"`);
  if (!ogImage) issues.push(`${path}: no og:image`);
  if (imgsNoAlt) issues.push(`${path}: ${imgsNoAlt} <img> without alt`);

  rows.push(`| ${path} | ${res.status} | ${title.length} | ${desc.length} | ${h1s} | ${canonical ? "✓" : "✗"} | ${ogImage ? "✓" : "✗"} | ${types.flat().join(", ")} |`);
}

// Internal links: HEAD every distinct path once.
for (const l of seenLinks.keys()) {
  const r = await fetch(`${base}${l}`, { method: "HEAD", redirect: "manual" });
  if (r.status >= 400) issues.push(`link ${l}: HTTP ${r.status}`);
  if (r.status >= 300 && r.status < 400) issues.push(`link ${l}: redirects (${r.status})`);
}

console.log(`Crawl of ${base} — ${urls.length} URLs, ${new Date().toISOString().slice(0, 10)}\n`);
console.log("| Path | HTTP | Title len | Desc len | H1 | Canon | OG img | JSON-LD |");
console.log("|---|---|---|---|---|---|---|---|");
console.log(rows.join("\n"));
console.log(`\n${issues.length} issue(s)`);
for (const i of issues) console.log(`- ${i}`);
process.exit(issues.length ? 1 : 0);
```

- [ ] **Step 2: Run it against live (the "before"), save the output**

```bash
mkdir -p "$SCRATCH/seo" # the session scratchpad
node scripts/seo-crawl.mjs https://www.mirrorartsedu.com.au > "$SCRATCH/seo/before-live.md"; echo "exit $?"
curl -sS -D - -o /dev/null https://mirrorartsedu.com.au/ | head -5   # expect 307 → www
```

Expected: exit 1, ~28 rows, issues include `no og:image` and `canonical ""` on every row and `title 85 chars` on `/`.

- [ ] **Step 3: Run it against the local build (the "after")**

```bash
npm run build && (npm run start -- -p 3100 & sleep 3; node scripts/seo-crawl.mjs http://localhost:3100 > "$SCRATCH/seo/after-local.md"; echo "exit $?"; kill %1)
```

Expected: exit 0 — zero issues. If any remain, they are real; fix them in the task they belong to before continuing (a missing alt is a content fix in `lib/content`; a long description is a copy fix in that page's `metadata`).

- [ ] **Step 4: Lighthouse on four template pages (optional — skip and say so if Chrome or npx fails)**

```bash
for p in / /courses/drama /stage/born-to-fly /contact; do
  npx --yes lighthouse "http://localhost:3100$p" --only-categories=performance,seo,accessibility,best-practices \
    --chrome-flags="--headless=new" --output=json --output-path="$SCRATCH/seo/lh$(echo $p | tr / _).json" --quiet
done
node -e 'for (const f of process.argv.slice(1)) { const r = require(f); console.log(f, Object.entries(r.categories).map(([k,v]) => `${k} ${Math.round(v.score*100)}`).join("  ")); }' "$SCRATCH"/seo/lh*.json
```

Expected: four lines of scores. Record them in the audit doc; anything under 90 on SEO or accessibility gets a one-line note on what Lighthouse names.

- [ ] **Step 5: Start `docs/seo-audit-2026-09-22.md`**

```markdown
# SEO / AEO audit — 22 September 2026

One-time audit and quick-win pass. Method: crawl of all 28 sitemap URLs on the live site
(`www.mirrorartsedu.com.au`, before) and on the local production build (after), with
`scripts/seo-crawl.mjs`; head tags and JSON-LD read from the HTML; Lighthouse on four
template pages. No Search Console existed at the time, so there is no query data.

## Before

<paste $SCRATCH/seo/before-live.md>

## After (local build, same script)

<paste $SCRATCH/seo/after-local.md>

## Lighthouse (local build)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
<four rows>

## Findings and what was done

| # | Finding | Severity | Fix | Where |
|---|---|---|---|---|
| 1 | `SITE_URL` was the apex; sitemap, robots and all JSON-LD pointed at a redirecting host | Critical | `SITE_URL` → www | `lib/schema.ts` |
| 2 | No canonical on any page | High | `alternates.canonical` on all 11 page files; test walks `app/` | `app/**/page.tsx`, `lib/seo.test.ts` |
| 3 | No `og:image` / Twitter card | High | Root `opengraph-image.jpg` (Jungle Book still); course hero / production poster per page | `app/opengraph-image.jpg`, `app/layout.tsx`, the two `[slug]` pages |
| 4 | No `BreadcrumbList` | Medium | Emitted from `PageHero`'s existing `trail` | `components/site/page-hero.tsx`, `lib/schema.ts` |
| 5 | No `FAQPage` | Medium | Six-question FAQ on `/contact`, per-course FAQ on each course page, all derived from `lib/content` | `lib/content/faq.ts`, `components/shared/faq.tsx` |
| 6 | Homepage title 85 chars | Medium | 55 chars; suburbs moved to the description | `app/layout.tsx` |
| 7 | Sitemap `lastModified` = build time | Low | Removed | `app/sitemap.ts` |
| 8 | Apex → www redirect is 307 (temporary) | Low | <Task 9 result> | Vercel domain setting |
```

Fill the `<…>` placeholders from the scratch files as you go; Task 8 and Task 9 add their sections below this.

---

### Task 8: Rank baseline — where the site sits today for eight searches

**Files:**
- Modify: `docs/seo-audit-2026-09-22.md` (add "Rank baseline" section)

**Interfaces:** none; this is a record.

- [ ] **Step 1: Invoke the `scrapling-official` skill, then write the snapshot script in the scratchpad**

Queries (Australian Google, English UI, personalisation off, 50 results):

```
mirror arts education
drama classes surrey hills
kids drama classes glen waverley
performing arts school for kids melbourne
musical theatre classes for kids melbourne east
AMEB speech and drama lessons melbourne
public speaking classes for kids melbourne
墨尔本 儿童 戏剧 课程
```

Script shape (adjust to what the skill says is the current Scrapling API):

```python
# $SCRATCH/seo/rank.py
from urllib.parse import quote_plus
from scrapling.fetchers import StealthyFetcher

QUERIES = [...]  # the eight above
for q in QUERIES:
    url = f"https://www.google.com.au/search?q={quote_plus(q)}&gl=au&hl=en&pws=0&num=50"
    page = StealthyFetcher.fetch(url, headless=True, network_idle=True)
    hrefs = [a.attrib.get("href", "") for a in page.css("a[href]")]
    organic = [h for h in hrefs if h.startswith("http") and "google." not in h]
    pos = next((i + 1 for i, h in enumerate(dict.fromkeys(organic)) if "mirrorartsedu.com.au" in h), None)
    print(f"{q!r}: {pos if pos else 'not in top 50'}")
```

Run: `~/.venvs/scrapling/bin/python "$SCRATCH/seo/rank.py"`

If Google serves a consent wall or a CAPTCHA, do not fight it. Fall back to Bing (`https://www.bing.com/search?q=…&cc=AU&count=50`) with the same loop and say so in the doc; Bing is a legitimate free proxy and Bing Webmaster Tools is on the off-site list anyway.

- [ ] **Step 2: Record it**

Append to the audit doc:

```markdown
## Rank baseline — 22 September 2026

Method: <Google AU / Bing AU>, personalisation off, top 50 organic results, one run, from
Melbourne. A single snapshot, not a tracker; Search Console (off-site list) replaces this
once it has three days of data.

| Query | Position | Who ranks 1–3 |
|---|---|---|
| mirror arts education | … | … |
| … | … | … |

Reading: brand search is <#1 / not>. Non-brand local searches are <positions>; the map
pack is held by <names>, which is a Google Business Profile question, not a code one.
```

Fill every cell from the run. "Not in top 50" is a valid cell. Do not estimate.

---

### Task 9: Apex → www redirect from 307 to 308

**Files:**
- Modify: `docs/seo-audit-2026-09-22.md` (row 8 and, if manual, an instruction)

**Interfaces:** none.

- [ ] **Step 1: Look at the domain's current config**

Use the Vercel MCP: `mcp__plugin_vercel_vercel__list_project_domains` for project `mirrorartsv2` (team `kaydendo42-webs-projects`). Expected: two domains; `mirrorartsedu.com.au` has `redirect: "www.mirrorartsedu.com.au"` and `redirectStatusCode: 307` (or null, which Vercel treats as 307).

- [ ] **Step 2: Change it**

Try, in order:
1. `ToolSearch` for a Vercel MCP tool that updates a project domain (`update_project_domain` / `patch`). If it exists, set `redirectStatusCode: 308`, leaving `redirect` as is.
2. Otherwise the REST API, with the CLI's own token:
   ```bash
   TOKEN=$(node -e 'console.log(require(process.env.HOME+"/Library/Application Support/com.vercel.cli/auth.json").token)')
   TEAM=$(vercel teams ls --scope kaydendo42-webs-projects 2>/dev/null | grep -o 'team_[A-Za-z0-9]*' | head -1)
   curl -sS -X PATCH "https://api.vercel.com/v9/projects/mirrorartsv2/domains/mirrorartsedu.com.au?teamId=$TEAM" \
     -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
     -d '{"redirect":"www.mirrorartsedu.com.au","redirectStatusCode":308}'
   ```
   (If `vercel teams ls` does not print an id, take `teamId` from `.vercel/project.json` → `orgId`.)
3. Otherwise write this into the audit doc for Kayden: *Vercel → mirrorartsv2 → Settings → Domains → `mirrorartsedu.com.au` → Edit → Redirect to `www.mirrorartsedu.com.au`, status code 308 → Save.*

- [ ] **Step 3: Verify**

Run: `curl -sS -D - -o /dev/null https://mirrorartsedu.com.au/ | head -3`
Expected: `HTTP/2 308` and `location: https://www.mirrorartsedu.com.au/`. Record the outcome in row 8 of the findings table. (This change is live immediately and independent of the code deploy — it is a platform setting.)

---

### Task 10: Off-site checklist for the client and the FAQ review note

**Files:**
- Modify: `docs/seo-audit-2026-09-22.md` (append), `content/OPEN-QUESTIONS.md` (one new item)

- [ ] **Step 1: Append the checklist**

```markdown
## Off-site — needs the school's Google login or a person at the campus

All free. In order of effect.

1. **Google Business Profile** — the listing exists (Daisy, Sep 2026; needs the Mirror
   Google login). Set the website to `https://www.mirrorartsedu.com.au`, confirm both
   campus addresses match the site exactly (`1F/244 Canterbury Rd, Surrey Hills VIC 3127`;
   `36 Kincumber Dr, Glen Waverley VIC 3150`), add the phone, hours, the ten categories'
   worth of photos already on the site, and start asking parents for reviews. This is the
   map pack for "drama classes Surrey Hills". Verification is a postcard, phone or video at
   the address.
2. **Google Search Console** — search.google.com/search-console → Add property → *Domain*
   → `mirrorartsedu.com.au` → copy the TXT token. Either add it in Namecheap DNS, or send
   it to Kayden and it goes into `app/layout.tsx` as `verification.google` (a meta tag; no
   DNS). Then Sitemaps → submit `https://www.mirrorartsedu.com.au/sitemap.xml`. Position
   data appears after ~3 days and replaces the manual baseline above.
3. **Bing Webmaster Tools** — bing.com/webmasters → Import from Search Console. Five minutes.
4. **Links, free** — each of these is a page that can point at the site: the Google Business
   Profile; Yellow Pages AU; TrueLocal; Localsearch; the partner schools on `/about`
   (ask each for a link from their extracurricular page); AMEB and Trinity teacher / school
   directories where the school's examiners are listed; Whitehorse and Monash council
   community-arts directories; the Facebook, Instagram and YouTube bios (already link).
5. **Rich Results test** — after deploy, paste these into search.google.com/test/rich-results:
   `https://www.mirrorartsedu.com.au/`, `/courses/drama`, `/stage/born-to-fly`, `/contact`.
   Expect EducationalOrganization, BreadcrumbList, Course, CreativeWork, FAQPage detected.

## For the client's review

The FAQ on `/contact` and on each course page (`lib/content/faq.ts`) is worded by us from
facts the site already states. Please read the six answers and correct anything that is
not how the school would say it — particularly "Both" on the language question and the
trial-class answer.
```

- [ ] **Step 2: Add the review item to `content/OPEN-QUESTIONS.md`**

Under the next free number in the "Nice to resolve" or the current section (match the file's convention — read its last item first):

```markdown
NN. **FAQ wording** (22 Sep 2026) — six site-level questions on /contact and up to three per
    course page, in `lib/content/faq.ts`, derived from the catalogue. Confirm the answers
    read as the school would say them; the facts move with the content layer, the phrasing
    does not.
```

---

### Task 11: Search Console / Bing verification tags — when Kayden supplies the tokens

**Files:**
- Modify: `app/layout.tsx` (metadata)

**Interfaces:** blocked on the tokens. If they arrive before Task 12, do this before shipping; otherwise it is a one-line follow-up release.

- [ ] **Step 1: Add the tokens**

```ts
  /* Site verification for the two consoles. Meta tags rather than DNS
     because DNS is in Namecheap and this is the one place the whole team
     can read. The strings are public by design — they are on every page. */
  verification: {
    google: "<token from Search Console → Settings → Ownership verification → HTML tag>",
    other: { "msvalidate.01": ["<token from Bing Webmaster → Settings → Verify ownership → Meta tag>"] },
  },
```

Use only the token value (the `content="…"` part), not the whole tag.

- [ ] **Step 2: Verify**

Run: `npm run build && (npm run start -- -p 3100 & sleep 3; curl -sS http://localhost:3100/ | grep -o '<meta name="google-site-verification"[^>]*>\|<meta name="msvalidate.01"[^>]*>'; kill %1)`
Expected: both tags print with the tokens.

---

### Task 12: Ship through the V2 repository

**Files:** none in `Updated Website/`; a scratch clone.

- [ ] **Step 1: Full verification first** (superpowers:verification-before-completion)

Run: `npm test && npm run lint && npm run build`
Expected: 0 failures, lint clean, build green with 34+ pages.

- [ ] **Step 2: Clone and sync**

```bash
cd "$SCRATCH" && git clone --depth 50 https://github.com/kaydendo42-web/mirrorartsv2-.git v2 && cd v2
rsync -a --delete \
  --exclude .git --exclude node_modules --exclude .next --exclude media --exclude '.env*' --exclude .vercel \
  --exclude next-env.d.ts --exclude .DS_Store --exclude '*.tsbuildinfo' --exclude public/__preview \
  --exclude original-file-hashes.json --exclude research/component-pass/check-preservation.cjs \
  "/Users/kaydendo/Documents/Projects/Aspire Studio/Clients/MirrorArtsEducation/Updated Website/" ./
git status --short
```

Expected: only the files this plan touched (the file map above, plus `docs/superpowers/plans/2026-09-22-seo-audit-and-fixes.md`, `docs/seo-audit-2026-09-22.md`, `docs/STATE.md`, `docs/SEO-PICKUP.md`, `content/OPEN-QUESTIONS.md`). Anything else listed is a leak from an earlier session — stop and show Kayden.

- [ ] **Step 3: Show Kayden the status and ask before pushing.** Do not push without a yes in this session.

- [ ] **Step 4: Commit and push (after the yes)**

```bash
git add -A
git -c user.name="Kayden Do" -c user.email="kaydendo42@gmail.com" commit -F - <<'MSG'
feat: SEO pass — www canonical, share cards, breadcrumbs, FAQ

SITE_URL was the apex, so the sitemap, robots.txt and every JSON-LD @id
pointed at a host that 307s to www. Now www everywhere, a canonical on
all 28 routes, a 1200x630 share card (course hero / production poster on
those pages), BreadcrumbList from PageHero's trail, a content-derived FAQ
with FAQPage on /contact and each course, the homepage title down to 55
chars, and no fake lastModified in the sitemap. lib/seo.test.ts holds
all of it. Audit and off-site checklist in docs/seo-audit-2026-09-22.md.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG
git push origin main
```

- [ ] **Step 5: Wait for the deploy and verify live**

```bash
vercel ls mirrorartsv2 --scope kaydendo42-webs-projects | head -3   # newest deployment url
vercel inspect <url> --scope kaydendo42-webs-projects | grep -i status   # until READY
node scripts/seo-crawl.mjs https://www.mirrorartsedu.com.au; echo "exit $?"
curl -sS https://www.mirrorartsedu.com.au/robots.txt
curl -sS https://www.mirrorartsedu.com.au/sitemap.xml | grep -c '<loc>https://www\.'
```

Expected: crawl exit 0; robots `Sitemap:` line on www; 28 www locs. Paste the live crawl into the audit doc under "After (live)".

---

### Task 13: Record the change — STATE, pickup doc, memory

**Files:**
- Modify: `docs/STATE.md` (prepend a "Latest change" paragraph, demote the previous one to "The change before it" as the file does), `docs/SEO-PICKUP.md` (replace "Design awaiting approval" with a "Shipped" note pointing at the audit doc), the memory file `seo-audit-in-progress.md` (mark shipped; keep the decisions).

- [ ] **Step 1: STATE.md** — paragraph in the file's voice: what shipped, that `lib/seo.test.ts` guards it, that the off-site checklist waits on the Mirror Google login, that the verification tokens (Task 11) are the follow-up.
- [ ] **Step 2: SEO-PICKUP.md** — top line: `**Shipped 22 Sep 2026** in commit <sha>; see docs/seo-audit-2026-09-22.md. Open: GSC/Bing tokens, GBP.`
- [ ] **Step 3: Memory** — update `seo-audit-in-progress.md` → status shipped, follow-ups; keep the "why" and the rejected-tool decision.

---

## Self-review

- Spec coverage: findings 1–8 in `SEO-PICKUP.md` → Tasks 1 (1), 3 (2), 4 (3), 5 (4), 6 (5), 2 (6, 7), 9 (8), 10 (off-site). Audit → 7, 8. Verify → in each task + 12. Ship → 12. Client artifact page (optional in the spec) is left to Kayden's call after ship — offer it, do not build it unasked.
- Placeholders: the `<…>` cells in Task 7/8/10 are values the run produces; the plan says which command produces each. Task 11 tokens are inputs from Kayden by design.
- Type consistency: `FaqItem`, `SITE_FAQ`, `faqForCourse`, `faqSchema`, `breadcrumbSchema`, `OG`, `SITE_URL`, `<Faq items tone>` are named identically across Tasks 4–7.
