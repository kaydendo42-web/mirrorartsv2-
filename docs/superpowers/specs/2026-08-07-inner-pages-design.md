# Inner pages — design

> Agreed with Kayden, 7 Aug 2026. Supersedes nothing; extends
> `docs/INFORMATION-ARCHITECTURE.md` from the homepage into the rest of the site.
> Companion docs: `docs/STATE.md` · `content/MIRROR-ARTS-EDUCATION.md` · `content/AUDIENCE.md`

---

## The job

The homepage exists. Nothing else does. Every route in `masthead.tsx` 404s today. This spec
builds every English inner page, using the content and assets recovered from the old site,
so that no fact the old site carried is lost in the move.

`/zh` is a separate push. It is not in scope here, but every decision below is made so
that adding it later is a matter of new strings, not new structure.

---

## Decisions taken

| Decision | Detail |
|---|---|
| **Scope** | All English inner pages. Chinese mirror deferred |
| **Granularity** | Full route tree per the IA — nine course pages, six production case studies, one workshops page holding all fifteen |
| **Component source** | shadcn CLI, initialised against the existing tokens, plus 21st.dev blocks pulled through the same registry. Behaviour from them, look from us |
| **Prices** | No course fees and no timetable exist — none are invented. Venue-hire rates **do** exist and are published |
| **Conversion** | One path: message or email the team. There is no booking system and no online payment |
| **China Daily** | The competition survives as a case study on verified facts. The `XXX` results paragraph is dropped, not filled in |
| **AMEB reports** | Published as-is, names visible. Parental consent is a pre-launch gate, recorded below |
| **Contact address** | `info@mirrorartsedu.com`. The studio-hire poster's `Info@mirrorartseducation.com` is treated as an error on the poster |

---

## 1. Content layer

Content currently lives inside the components that render it — `DISCIPLINES` is declared
in `components/sections/courses.tsx`. That is correct for one page and wrong for
seventeen, because most facts now appear in three or four places at once: a course is a
card on `/courses`, a page at `/courses/<slug>`, a cross-link on a faculty bio, an option
in the enquiry `<select>`, and a `Course` node in JSON-LD.

Everything moves to `lib/content/`. One module per domain object, each exporting a typed
array and the helpers that read it.

```
lib/content/
  site.ts          contact, campuses, socials, ABN, nav tree
  disciplines.ts   4 categories → course slugs, accent colours
  courses.ts       9 courses
  faculty.ts       7 teachers
  team.ts          4 leadership + credit lists
  timeline.ts      2017 → 2025
  productions.ts   6 works
  workshops.ts     15 workshops in 3 families
  venue.ts         5 hire spaces
  achievements.ts  competitions, exam reports, credential bodies
  partners.ts      11 media · 15 support · 7 named institutions
```

### Shapes

```ts
type Course = {
  slug: string;              // "english-drama"
  title: string;             // "English drama"
  cn: string;                // "英文戏剧课"
  strapline: string;         // "Creativity and performance"
  discipline: DisciplineId;  // "performance"
  minutes: 60 | 90 | 120;
  sessionsPerTerm: 10;
  minAge: 6;
  maxStudents?: number;      // hosting caps at 8
  accent: string;            // the client's own poster colour
  body: string[];            // English, written from the CN poster copy
  includes: string[];
  highlights: [string, string];
  teachers: FacultySlug[];
  poster: string;            // the original CN poster, shown as an aside
  hero: { src: string; alt: string };
};
```

`Faculty`, `Production`, `Workshop`, `HireSpace` and `Achievement` follow the same pattern:
a slug, the display strings, the assets, and explicit cross-links by slug rather than by
name. Cross-links are slugs so a rename cannot silently break a relationship.

`lib/courses.ts` — the enquiry allow-list — is **derived**:

```ts
export const COURSES = [...courses.map((c) => c.title), "Not sure yet"] as const;
```

The `<select>` and the server action's validation then cannot drift from the catalogue.

### Why this shape

Each module answers one question and can be read on its own. A page imports the two or
three it needs and nothing else. When `/zh` arrives, the same modules gain a parallel
string set — the relationships, slugs, assets and ordering are already correct and are not
re-derived.

---

## 2. Rendering model

The homepage is `"use client"` because scroll drives it. **Inner pages are Server
Components.** They render content that does not change, need real `<title>`/description
metadata, and benefit from being in the HTML for search.

Client islands only where there is genuine interaction:

| Island | Used by |
|---|---|
| Video player + poster-frame swap | `/stage/[slug]` |
| Accordion | `/workshops`, `/faculty`, `/courses/exams` |
| Lightbox dialog | achievement scans, course posters, room photos |
| Campus tabs | `/contact` (the homepage already has this — extract and share) |
| Enquiry form | `/contact` (already exists — extract from `find-us.tsx`) |
| Logo marquees | `/about/partners` (already exists — extract from `partners.tsx`) |

Three components on the homepage are already doing work the inner pages need. They get
extracted to shared components rather than copied: the enquiry form, the campus tabs and
the partner marquees.

### Shared page shell

The homepage opens on a full-bleed video reel. No inner page does, so the masthead's
transparent state and the top offset both need a second mode.

New in `components/site/`:

- **`page-hero.tsx`** — eyebrow, `h1`, standfirst, optional image or video, carrying the
  arch motif. One component, three densities (deep for hubs, shallow for detail pages,
  bare for utility pages).
- **`crumbs.tsx`** — breadcrumbs. Required: the tree is three deep in places, and a parent
  arriving from search needs to know where they are.
- **`page-nav.tsx`** — prev/next within a set (course → course, production → production).
  Dead ends are the thing the IA explicitly forbids.

`masthead.tsx` already early-returns when `.reel` is absent, so it stays solid on inner
pages. Verify `--bar-h` offset is applied — `globals.css` has the token and the comment,
but nothing has ever used it.

---

## 3. Route tree

Fourteen route files. Twelve static pages plus two dynamic segments, giving twenty-seven
new URLs on top of the homepage.

### `/about` — our story

The 2017→2025 timeline as the spine, on the four-chapter treatment already proven in the
homepage About section but expanded: nine entries, not four. Mission copy written from the
CN About page. The rename from Mirror Drama Studio to Mirror Arts Education in 2025 is the
turn in the story, not a footnote. Closes on both campuses.

Assets: eight images from `bk_28760852`.

Confirm with Rachel: the old site groups 2022 and 2023 loosely. 2023 currently has no
milestone of its own.

### `/about/team` — core team

Four leadership profiles at full depth. Rachel Fu carries eight screen and stage credits
back to 2000, including a Ning Hao film that won Best Director at the 2001 Beijing College
Student Film Festival. Koven Song carries ten-plus, including lead dubbing on eight feature
films and a CCTV 3·15 gala. This is the strongest credibility material the business has and
the old site rendered it as a JPEG.

Diana Zhao holds two roles — Operations Director and the Bilingual Hosting & Dubbing
teacher. The page states both and cross-links to `/faculty`.

Assets: four portraits already in `public/assets/team/`, plus seven images from
`item_28761490`. Note from `STATE.md`: Diana Zhao and Rachel Cai are 262×444 originals —
soft on retina, acceptable at the rendered size.

### `/about/partners` — partners

Three groups, each with its own treatment rather than one undifferentiated wall:

- **Named institutional partners** (7) — AYACA, CEFA, AMEB, Melbourne Chinese Museum,
  Trinity College London, Chinese Consulate-General in Melbourne, China Daily. Each gets a
  line saying what the relationship actually is. CEFA is the one that carries the sole-centre
  claim.
- **Supporting organisations** (15) — the marquee, reused from the homepage.
- **Media** (11) — the second marquee.

Assets: all 26 logos already sliced into `public/assets/partners/`.

Known defects carried from `STATE.md`: `auyang-media.png` has a Chinese browser's "AI识图"
tooltip baked in; Venus Art, TL Studio and the Chinese Museum line drawing are light-on-light.
Source problems, not CSS ones. Listed for the client, not worked around.

### `/courses` — hub

Four disciplines, nine courses. Extends the homepage's 2×2 pattern rather than replacing it —
a returning visitor should recognise the shape. Each discipline block carries its courses
with duration, and each course links through.

Anchor IDs `#performance`, `#language`, `#music`, `#posture` must match what `masthead.tsx`
already links to.

Closes on the exam pathway, which is the differentiator and currently buried mid-paragraph
inside a poster.

### `/courses/[slug]` ×9 — course pages

The nine courses per `content/MIRROR-ARTS-EDUCATION.md` §4. Each page:

- Hero: title, Chinese name, strapline, accent colour, duration / sessions / minimum age
- Body: English written from the CN poster copy. Not machine-translated
- What the course includes
- The two highlight claims the poster makes
- Who teaches it — cross-linked to `/faculty`
- Where it leads — exam pathway, or the stage it ends on
- The original poster, available as an aside. It is the client's own artefact and carries
  the brand colour system
- One conversion: message or email

Per-course specifics that must survive the move:

| Course | Detail that must not be lost |
|---|---|
| English drama | 90 min, not 60. Trinity-certified teacher. Exam-gradable |
| English speech | AMEB syllabus. Teacher is ex-Trinity and Caulfield Grammar, and has examined for AMEB |
| Bilingual hosting | Max 8 students. Carries the CEFA sole-centre claim. Diana Zhao, Shanghai Theatre Academy |
| Voice-over | Studio recording. End-of-term showcase of the children's own work |
| Vocal & AMEB | Links to *Born to Fly* and 笔画春秋 — the students' work reached the Winter Olympics organising committee's site |
| Choir | 120 min. Is the school's official performing group |
| Musical theatre | Combines vocal, acting and staging |
| Music composition | Students finish with a piece of their own |
| Posture & etiquette | Teacher holds a Monash M.Ed and ACIC senior certification, trains airline cabin crew |

### `/courses/exams` — exams and pathways

The credential story in one place: AMEB Speech & Performance and Vocal, and CEFA. What the
grades are, what a report actually looks like, what it is worth — scholarship and selective
private-school applications, which is the claim the Chinese-language copy makes explicitly.

Carries the two AMEB practical examination reports. See the consent gate below.

### `/faculty` — teaching faculty

Seven teachers grouped by discipline, matching the old site's own grouping
(表演类 / 语言表达 / 音乐类 / 形体矫正与礼仪). Each: portrait, name, Chinese name, subject,
credentials, and the courses they teach — cross-linked, so the page is a way into the
catalogue rather than a cul-de-sac.

Delyse Weisz and Callum Dibbert lead. Per `AUDIENCE.md` §3, who teaches the child is
avatar B's first decision factor, and these two are the bridge to the English-speaking
market.

Assets: eight teacher cards, portraits extracted.

### `/stage` — productions

Six works, each with a video master in hand. Grid of silent looping cards, each into a case
study.

### `/stage/[slug]` ×6 — case studies

| Slug | Work | Master |
|---|---|---|
| `born-to-fly` | 此生飞翔 — Olympic MV, 2022 | 1180.6 MB `.mov` |
| `brushstrokes-of-history` | 笔画春秋 — original MV, 2022 | 410.1 MB |
| `jungle-book` | 2025 annual stage production | 567.9 MB |
| `belt-and-road-2025` | China Daily Belt & Road speech competition | 244.6 MB |
| `snake-year-gala` | 2025 Year of the Snake gala promo | 334.7 MB |
| `horse-year-gala` | 2026 Year of the Horse gala promo | 2169.4 MB |

Each: the video, what it was, who made it, where it played, and which course it grew out of.

*Born to Fly* broadcast on the Beijing Winter Olympics Organising Committee's official site
and the Chinese Consulate-General in Melbourne's platform. 笔画春秋 screened at the
Consulate-General's Teachers' Day event in 2023. Joshua Dai composed both. Rachel Fu and
Koven Song produced and directed both.

**Belt & Road carries the competition, not the results.** Verified: hosted by China Daily,
running since 2019, participants from 50+ countries, and the 2025 seventh global final's
theme. The old site's `XXX obtained Third, Second and First places` paragraph is dropped.
If Rachel supplies real numbers later the block is easy to add; it is not designed around
their absence.

### `/stage/achievements` — student results

What is actually evidenced:

- **AMEB practical examination reports** — Vivian Fu, Speech & Performance Grade 2, B+ Credit;
  Adrian Wong, Speech & Performance Grade 4, A Honours, examined by Ms Julianne Eveleigh,
  5 September 2024. The examiner's written feedback is the persuasive part
- **Cultures of China Water Cube Cup, Melbourne** — 2023 Chinese Songs Contest, two students
  with trophies at the award ceremony
- **Australia-China International Music & Arts Association** — Sound of Music, Melbourne.
  Four award-ceremony photographs
- **National Children's Spring Festival Gala, Beijing** — 2026, hosting
- **CEFA language-performance certificates**

No invented tallies. `STATE.md` already records that the homepage tally uses four checkable
figures rather than the big round numbers the blueprint runs, and this page holds the same
line.

### `/workshops` — cultural workshops

All fifteen, in the client's own three families:

- 中国传统艺术表演 · Traditional Chinese arts performance (4)
- 中国传统手工工坊 · Traditional Chinese craft (7)
- 派对承办 & 媒体体验 · Party hosting and media experiences (4)

Each entry carries what the old site carried: what happens, age band, whether materials are
provided, and whether the child keeps what they make. Three have real constraints that must
not be flattened — lacquer beads are 5+, sachet-making and soap-making are 12+, and soap
needs adult supervision.

Bilingual copy already exists on the old site for these, so this is the one section that is
edit rather than translate.

Assets: 21 photographs across `item_28760874_*`.

### `/workshops/schools` — for schools

The only page addressed to an organisation rather than a parent, so it reads differently:
incursion format, age bands, group sizes, materials, lead time, and a booking path that is
an email conversation rather than a form.

`OPEN-QUESTIONS #13` — whether schools genuinely book these — is unanswered. The page is
built on what the workshop structure itself evidences (fixed duration, age bands, "materials
provided", group delivery) and does not claim volumes nobody has confirmed.

### `/workshops/venue` — studio hire

Recovered from the studio-hire poster, which the old site rendered as an undisplayed
background image on a page with no text.

| Space | Size | Rate | Weekday before 5 |
|---|---|---|---|
| Function room | 150 m² | $100/hr | $80/hr |
| Room 2 | 47 m² | $65/hr | $50/hr |
| Room 1 | 32 m² | $55/hr | $40/hr |
| Room 3 & Room 4 | 27 m² each | $45/hr | $30/hr |
| Workshop space | 80 m² | $70/hr | $60/hr |

Extras: LED screen +$50/hr, stage lighting +$30/hr (function room). Air conditioning
included in rooms 1–4 and the workshop space.

Conditions: catering incurs an additional cleaning fee; bump in/out exceeding 20 minutes
incurs $20 per half hour.

Published with the date they were current and a line that rates are confirmed on booking.
Located at the main campus, 1F/244 Canterbury Rd, Surrey Hills.

Assets: eight room photographs sliced out of the poster, including the function room lit
for a showcase.

### `/contact` — contact

Both campuses over one map, the enquiry form, phone, WhatsApp, email, WeChat ID and QR,
and every social account. The socials exist and are currently linked from nowhere:
Facebook, Instagram, YouTube, Xiaohongshu 789947009.

The `#trial` anchor the masthead pill already points at lives here.

The enquiry form still does not send. `app/actions/enquiry.ts` validates and returns; the
mail provider is the client's call because it decides where parent contact details live.
The form says so plainly rather than faking success. Unchanged by this work.

---

## 4. Components — shadcn and 21st.dev

`npx shadcn@latest init`, configured so its CSS variables resolve to the existing tokens:

```
--background  → --color-base
--foreground  → --color-ink
--primary     → --color-gold
--border      → --color-line
--muted       → --color-base-2
```

Not shadcn's default zinc. The palette is locked (`INFORMATION-ARCHITECTURE.md` §Design
tokens) and gold is never a large area.

**The rule: shadcn supplies behaviour, we supply the look.**

Install only what earns its place — accordion, dialog, tabs, carousel, breadcrumb, select,
label. These are focus traps, ARIA wiring and keyboard handling that would otherwise be
hand-rolled badly across seventeen pages.

21st.dev blocks come through the same registry for the marketing structures — timeline,
bento, marquee, gallery, feature rails — and are restyled onto the tokens before they ship.
Nothing renders in default shadcn styling.

The bespoke CSS stays bespoke. The arch, the sticky reel and the marquees are plain CSS
because utilities are bad at them, and that does not change.

**Cost, stated plainly:** this adds roughly ten runtime dependencies (Radix primitives, CVA,
tailwind-merge, lucide) to a repo that currently has three. `STATE.md` records the opposite
decision — that shadcn was not worth it — and that was correct when there was one page and
one form. It is being reversed deliberately at seventeen pages with dialogs, accordions,
carousels and tabs across them.

---

## 5. Media pipeline

Four scripts under `scripts/`, run once, output committed.

**`slice-venue.mjs`** — eight room photographs out of the 1920×2651 studio-hire poster
(`tmp1779196320_2319209_s-1502aaec.jpg`) at fixed crop boxes, via sharp.

**`crop-gallery.mjs`** — the six stage stills carry white letterbox padding baked into the
pixels. Trim to content.

**`extract-portraits.mjs`** — portraits out of the eight teacher-card PNGs and the nine
course posters. The cards are a consistent editorial layout, so the crop boxes are
predictable.

**`transcode.mjs`** — 4.9 GB of masters to web renditions. Two outputs per work:

- A silent 8–12s loop, ~2 MB, in `public/assets/video/`, for the production cards
- A full-length render, CRF 27 at 1920 and 1280, on **Vercel Blob**

The existing hero is 18 MB for 61 seconds. Six full productions at that rate is ~110 MB in
git, which is the wrong place for it. Blob streams properly and keeps the repo light. The
hero stays where it is — it is already committed and already works.

Known asset gaps, carried forward from `STATE.md` and not solvable here: the Music card
image is a 253px thumbnail upscaled 4.6×; one media logo has a browser tooltip baked in;
three partner logos are light-on-light.

---

## 6. SEO and metadata

Every page gets `generateMetadata` — real title, real description. The old site carried the
title `australianmirror` on every page and an empty meta description on every page, so this
is not a refinement, it is the first time the site has had any.

- `metadataBase` and canonicals
- Open Graph images per page type
- JSON-LD: `EducationalOrganization` on the root, `Course` on course pages, `Person` on
  faculty and team, `Event` on productions, `LocalBusiness` for both campuses
- `app/sitemap.ts` and `app/robots.ts`
- **No `hreflang` until `/zh` exists.** Pointing at pages that 404 is worse than omitting it

---

## 7. Error handling

- `app/not-found.tsx` — the old site is being blanket-301'd to the homepage, but internal
  slugs can still be wrong. A 404 that offers the four disciplines and contact
- `generateStaticParams` on both dynamic segments (fifteen pages), with
  `dynamicParams: false` so an unknown slug 404s rather than rendering an empty shell
- The video player falls back to the poster frame if the source fails. Blob is a network
  dependency the rest of the page does not have
- `use-reveal`'s six-second failsafe already covers the case where an observer never fires.
  Inner pages use the same hook, so they inherit it

---

## 8. Verification

Per page, before it is called done:

1. `npm run build` and `npm run lint` both clean
2. Rendered in a real browser window, not the automation sandbox — `STATE.md` records that
   the hidden tab throttles `IntersectionObserver` and makes correct reveals look broken
3. Every link resolves. No route in `masthead.tsx` 404s
4. Keyboard-only pass over any accordion, dialog, tab or carousel on the page
5. Copy run through `stop-slop`

---

## 9. Pre-launch gates

Carried from `content/OPEN-QUESTIONS.md`, plus what this work adds.

| # | Gate | Owner |
|---|---|---|
| 1 | **Parental consent for the AMEB reports.** Vivian Fu and Adrian Wong are named minors with their academic results on a public page. Written consent per child before deploy | Rachel |
| 2 | CEFA sole-centre claim confirmed in writing | Rachel |
| 3 | Venue rates confirmed current | Rachel |
| 4 | Photo consent for the wider gallery and poster imagery beyond the hero | Rachel |
| 5 | Enquiry form wired to a mail provider | Client decision |
| 6 | Email address discrepancy resolved — poster says `Info@mirrorartseducation.com` | Rachel |
| 7 | 2023 timeline entry | Rachel |
| 8 | Wig demo pages deleted and 410'd at cutover | Kayden |

---

## 10. Out of scope

- `/zh` — separate push, needs the Chinese display-face decision first
- Course fees and timetable — do not exist
- Testimonials — none exist
- Individual pages per workshop — `OPEN-QUESTIONS #13` is unanswered, so fifteen more routes
  are not justified yet
- Booking system or online payment — the conversion path is a conversation
- Fraunces WONK axes — a live decision in `STATE.md`, unrelated to this work
