# SEO round 2 — pickup

**Built 22 Sep 2026** from `docs/superpowers/plans/2026-09-22-seo-round-2.md`. All four
items shipped in the shape below; #5 and #6 render without hours, transport, nearby
suburbs or Glen Waverley photographs until Daisy answers "Ask Daisy now" — the fields
exist on the campus record (`lib/content/site.ts`) and the page grows the sections the
moment they are filled. `Course.campuses` is both-for-all until her timetable arrives;
`content.test.ts` pins that and says so. Release SHA: see `docs/STATE.md`.

**Written 22 Sep 2026, 02:10 AEST, by Claude with Kayden.** Read this first in the new session,
then `docs/STATE.md` (head) and `docs/seo-audit-2026-09-22.md`. Round 1 shipped tonight as
`f8ee823` on `mirrorartsv2-`; live crawl 0 issues. Kayden chose the next four items from the
"anything else" list and wants them built. Nothing below has been started.

## The four items (Kayden's pick, 22 Sep)

| # | Item | Needs from client | Can start without client? |
|---|---|---|---|
| 5 | **Campus pages** — `/surrey-hills` and `/glen-waverley` (or `/campuses/<slug>`; decide in brainstorm) | Which courses run at each campus, on which days; opening hours; parking / transport notes; Glen Waverley photographs (none exist — Surrey Hills has seven in `lib/content/campus.ts`) | Skeleton yes; content no |
| 6 | **Geo + hours in schema** — `geo` (lat/long), `openingHoursSpecification`, `hasMap` on each campus `Place` in `lib/schema.ts`; consider `LocalBusiness` subtype per campus alongside `EducationalOrganization` | Opening hours per campus | Geo yes (geocode the two addresses; verify on the map embed); hours no |
| 7 | **Entity-first `/about` lede** — first sentence states what / where / since when / for whom in plain terms | Nothing | Yes |
| 8 | **FAQ on the remaining pages** — `/workshops`, `/workshops/venue`, `/faculty`, `/stage` (and `/about` if it earns one), same `Faq` component + `FAQPage`, answers derived from content only | Nothing | Yes |

Not chosen: #9 (home LCP), #10 (testimonials — needs GBP reviews first), `/zh`, news posts.

## What exists that these build on

- `lib/content/site.ts` — `SITE.campuses[]`: `id`, `name`, `cn`, `address`, `suburb`, `state`,
  `postcode`, `mapEmbed`. No geo, no hours, no course list per campus. `campusAddress(c)`.
- `lib/content/campus.ts` — `CAMPUS_PHOTOS` (seven, all Surrey Hills, labelled rooms).
- `lib/content/courses.ts` — `Course` has no campus field. Adding `campuses: CampusId[]`
  is the obvious shape; every course must state at least one or the content test should fail.
- `lib/content/venue.ts` — `HIRE_SPACES` (five rooms, all Surrey Hills), `VENUE_TERMS`.
- `lib/content/faq.ts` — `FaqItem`, `SITE_FAQ` (six), `faqForCourse(c)`. Pattern: derive every
  number from content; wording ours; flagged for the client in `content/OPEN-QUESTIONS.md` §66.
- `components/shared/faq.tsx` — `<Faq items tone="base"|"alt" />`, renders nothing when empty,
  emits `FAQPage`. `.faq` styles in `app/globals.css` near `.phero__meta`.
- `lib/schema.ts` — `SITE_URL` (www), `OG`, `organisationSchema()` (with `location:
  Place[]` built by `placeSchema(c)`), `courseSchema`, `personSchema`, `productionSchema`,
  `breadcrumbSchema(trail)`, `faqSchema(items)`, `jsonLd()`. Relative `.ts` imports so
  `lib/seo.test.ts` can load it. No ratings, no prices, no invented facts — comment at top.
- `components/site/page-hero.tsx` — `PageHero` with `trail` (emits `BreadcrumbList`).
- `components/shared/campus-tabs.tsx` + `components/sections/find-us.tsx` — the existing
  two-campus map UI (homepage and `/contact`).
- `lib/seo.test.ts` — canonical walk over `app/` (a new page.tsx must set
  `alternates.canonical`), title/description rules, FAQ derivation tests, `shortTitle` rule.
- `app/sitemap.ts` — static routes are a literal; `content.test.ts` fails if a new page.tsx is
  missing from it. Add the campus routes there.
- `scripts/seo-crawl.mjs <baseUrl>` — run against `http://localhost:3199` after build and
  against live after deploy. Exit 0 = clean. It rewrites sitemap locs onto the base URL.
- `/about` today: `standfirst` at `app/about/page.tsx:67` opens "Mirror Arts Education is a
  leading performing arts education destination for young people in Melbourne. Since 2017…".
  Marketing-first, not entity-first. The `<h1>` is `title={…}` just above it.

## Decisions already made (do not re-litigate)

- Canonical host `www.mirrorartsedu.com.au`. `SITE_URL` in `lib/schema.ts`.
- Campus pages must be **real pages**, not doorway pages: address, map, the courses that
  actually run there, days if the client supplies them, photos, transport/parking, a
  campus FAQ, links to `/contact#trial`. Two pages, not one per suburb nearby. Nearby
  suburbs may be *named* in copy ("ten minutes from Box Hill and Camberwell") only if the
  client confirms parents come from there — otherwise leave them out.
- Hours and course-by-campus come **from the client** (Daisy). Do not guess. Build the
  types and the pages so a missing field renders nothing rather than a placeholder.
- Geo coordinates: geocode the two verbatim addresses, confirm against the existing
  `mapEmbed` pins, store as numbers on the campus record with a comment saying where they
  came from and when.
- `/about` lede: keep the client's voice for the rest of the paragraph; only the first
  sentence becomes the plain statement. Something like *"Mirror Arts Education is a
  performing arts school for children and adults in Surrey Hills and Glen Waverley, in
  Melbourne's east, teaching drama, speech, vocal, music and dance since 2017."* — then
  the existing copy. Flag the new sentence in `content/OPEN-QUESTIONS.md`.
- FAQ answers on the new pages: derived from `lib/content` (venue rates, hire terms,
  workshop offers, faculty counts, production list). No new claims.
- Process: this is creative work → `superpowers:brainstorming` first (short — the design
  is mostly above; settle the URL shape, the campus data model, and what renders without
  client data), then `superpowers:writing-plans` to
  `docs/superpowers/plans/2026-09-<dd>-seo-round-2.md`, then execute inline with TDD in
  `lib/seo.test.ts` / `lib/content/content.test.ts`. Read `node_modules/next/dist/docs/`
  on `generateMetadata` and `generateStaticParams` before writing the campus route.
- Ship via the V2 procedure (scratch clone of `mirrorartsv2-` + rsync; memory
  `v2-release-procedure`). **Ask before pushing.**
- Local checks on port **3199**, never 3100; `lsof -tnP -iTCP:3199 -sTCP:LISTEN` before
  starting and `kill` after. A stale `next-server` on 3100 cost an hour tonight.

## Ask Daisy now (Kayden to send — unblocks #5 and #6)

1. For each of the 13 courses: which campus(es), and which day(s) / times, for the current
   term. A photo of the timetable is fine.
2. Opening hours for each campus (reception / when someone is there), and whether they
   differ in school holidays.
3. Parking and public transport notes for each campus, in her words (nearest station or
   tram, where parents park, drop-off).
4. Three to five photographs of the Glen Waverley campus (rooms, entrance, sign).
5. Confirm: do families mostly come from Surrey Hills / Glen Waverley themselves, or from
   surrounding suburbs — and which? (Decides whether nearby suburbs are named.)

## Still open from round 1 (not part of this round, don't lose them)

- **Apex 308**: `mirrorartsedu.com.au` is on no Vercel project; Vercel serves an implicit
  307. Kayden adds it to `mirrorartsv2` → Domains → redirect to www → 308. The MCP call was
  blocked by the session's permission policy. Check: `curl -sI https://mirrorartsedu.com.au/`.
- **Old `mirrorartsedu.com`** still live, #1 for the brand. Client's host must 301 it.
  `content/OPEN-QUESTIONS.md` §67.
- **GBP** needs the Mirror Google login. Not in the map pack today.
- **Search Console**: Domain property verified 22 Sep by DNS TXT in Namecheap (token
  `RSubGvklOFztBGOYZRycoSuUuBgrb_QTiYIJJ0_8gvk`, public by design). Sitemap submitted.
  Indexing requested for `/`, `/courses`, `/contact` (+ maybe `/courses/drama`, `/stage`).
  No meta-tag backup added; Kayden did not say yes to it. Optional later:
  `verification: { google: "<token>" }` in `app/layout.tsx`.
- **Bing Webmaster**: site imported from GSC. Sitemap may still need submitting there.
- Docs from tonight edited **after** the push (audit doc "After — live" section, SEO-PICKUP
  header with the SHA) — uncommitted in the V2 repo. They ride with the next release.

## Useful commands

```bash
cd "Updated Website"
npm test && npm run lint && npm run build
npx next start -p 3199 &   # then: node scripts/seo-crawl.mjs http://localhost:3199
node scripts/seo-crawl.mjs https://www.mirrorartsedu.com.au   # live, expect 0 issues
curl -sI https://mirrorartsedu.com.au/ | head -1                # 307 until the apex is added
```
