# Mirror Arts Education on the Global Explorers blueprint — design

**Date:** 2026-08-04 · **Author:** Kayden Do / Aspire Studio
**Blueprint:** `https://globalexplorersearlylearning.com.au/` (Framer, owned by the client)
**Client site being replaced:** `https://www.mirrorartsedu.com/`
**Target launch:** 14 Aug 2026

Companion files:
`docs/research/DESIGN_TOKENS.md` · `docs/research/LAYOUT_ARCHITECTURE.md` ·
`docs/research/INTERACTION_PATTERNS.md` · `content/MIRROR-ARTS-EDUCATION.md`

---

## 1. What this is

Rachel picked the Global Explorers site as the blueprint because a parent can move through it
without thinking. Every section is the same shape — a small label, a big heading, a short
paragraph, two buttons — and the page alternates cream and dark bands so you always know
where you are. That repetition is the product. This spec keeps it and pours Mirror's content
into it.

**Mode: re-skin.** We take the blueprint's layout, spacing rhythm, type hierarchy, section
order and motion. We replace its palette, fonts, copy and photography with Mirror's own. No
blueprint CSS, JS, fonts, images or copy ship in the build.

**Decisions taken 2026-08-04 (Kayden):**

| Decision | Choice |
|---|---|
| Brand tone | Keep the blueprint's structure and motion; restage in Mirror gold/cream/charcoal with the nine course accents |
| Language | English at the root, full Chinese mirror at `/zh`, `hreflang` both ways |
| Local targeting | **One location page listing both campuses**, not per-campus landing pages |

On that last one: one page covering two suburbs will not rank as strongly in either as two
dedicated pages would — competitors in the area run per-suburb pages. It is a cheap upgrade
later and nothing in this spec has to be rebuilt to add it. Recorded and moving on.

---

## 2. Success criteria

Carried from `docs/PROJECT-PLAN.md`, unchanged:

> A parent on a phone can find a course, understand it, see who teaches it, and enquire —
> in under 60 seconds.

Plus, specific to this restage:

1. The homepage reads as the same *kind* of site as the blueprint — same pace, same
   confidence, same one-idea-per-screen — without reading as a childcare centre.
2. Zero copy trapped in images. Every one of the nine course descriptions and six teacher
   bios that were locked in PNGs becomes real HTML text.
3. Both campuses are unambiguous on the page and machine-readable to Google.

---

## 3. Homepage — section by section

Twelve slots, matching the blueprint's twelve. Band colour alternates exactly as the
blueprint does. Every content slot uses the same shape: **eyebrow → display heading → body →
dual CTA**.

The primary CTA is **"Book a trial class"** everywhere on the page — one action, repeated,
never varied. The secondary is always "Learn more" pointing at the relevant inner page.

---

### Slot 1 — Utility bar · cream · sticky

`logo · info@mirrorartsedu.com · +61 498 183 332 · WeChat · 小红书 · [Book a trial class] · [EN / 中文]`

The blueprint's Instagram and Facebook icons become **WeChat and Xiaohongshu**, which is
where this audience actually is. WeChat opens a QR modal rather than a link — the ID is
`MirrorArtsEdu`, the QR is in `extraction/assets/`.

The blueprint's second pill is "Contact Us". Ours is the **language toggle**, because a
bilingual site needs the switch above the fold and the contact action is already covered by
the primary pill.

*Content:* master file §2. *Phone:* logo + hamburger; both pills move into the panel.

---

### Slot 2 — Nav · cream · sticky

Five dropdowns, matching the blueprint's five:

| Nav item | Contains |
|---|---|
| Why Mirror | About · The Mirror Way · Results & Awards |
| Courses | The nine courses, grouped Performance / Language / Music / Posture |
| Faculty | Leadership · Teaching faculty |
| Stage | Productions · Galas · Original MVs · Competitions |
| Workshops | For schools · Craft · Party & media |

Contact, Venue Hire and Partners live in the footer, not the top nav — the blueprint keeps
its top nav to five and that restraint is doing work.

---

### Slot 3 — Hero · cream · pinned, scroll-driven

| Element | Content |
|---|---|
| Logo blob | Mirror's gold mark in the scalloped blob |
| H1 | **"Every child gets the chance to stand on stage."** |
| Subline | Performing arts for ages 6+ · Surrey Hills & Glen Waverley, Melbourne |
| Arrow | Gold, bobbing |
| Circular photo + curved rotating text | "Book a trial class today" |

The H1 is the client's own tagline in English — 在 Mirror，每一个孩子都有机会站上舞台，被世界看见
(master file §3). It carries no keywords, which is fine: the blueprint solves that with a
keyword-carrying `H1` down in the footer band, and we do the same (slot 12).

**The four scroll-in badges** replace the blueprint's "Safety First / Child-development
Focused / Family-owned / Supporting Parents". Ours are the credentials a parent shopping
this category actually weighs:

1. **Australia's only CEFA children's language-performance exam centre**
2. **AMEB · Trinity · LAMDA prepared**
3. **Teaching in Melbourne since 2017**
4. **Bilingual — English & 中文**

Badge 1 is the strongest claim Mirror has and it is currently buried in the middle of a
course description inside a PNG. Putting it in the hero is the single highest-leverage change
on the page.

⚠️ Badge 1 must be verified with the client before it goes live. "Sole centre in Australia"
is a factual claim and needs to be right — added to `OPEN-QUESTIONS.md`.

---

### Slot 4 — Welcome · cream · centred

Cursive H2 **"Welcome to Mirror Arts Education"**, then the positioning paragraph, then one
filled CTA.

Body is the homepage hero copy from master file §3, rewritten in English — not translated
word-for-word. Fix the live typo (展和传播 → 展示和传播) in the Chinese version.

The hero badges keep drifting through this section. No hard band edge between slots 3 and 4.

---

### Slot 5 — The Mirror Way · cream · text left, image right

Eyebrow: **a bilingual, stage-first approach**
H2: **The Mirror Way**
Body: two paragraphs from the About copy (master file §3).
CTA: Book a trial class · Learn more → `/the-mirror-way`

**Five value blobs** replacing the blueprint's Family Partnerships / Play-Based / Stable Team
/ Inclusive / Sustainability:

1. Stage time for every child
2. Exam pathways — AMEB · CEFA · Trinity
3. Bilingual by design
4. Faculty from real industry careers
5. Small classes — some capped at 8

---

### Slot 6 — Courses · **charcoal band** · orbital rings

The signature section, and the one that most needs to land.

Seven program blobs become **nine course blobs**, each filled with its own poster accent
colour (`DESIGN_TOKENS.md` §2). Each is a link to its course page.

| Ring | Courses |
|---|---|
| Inner | Musical Theatre · Vocal · Choir · Music Composition |
| Outer | English Drama · English Speech · Bilingual Hosting · Voice-over · Posture |

Centre stack — eyebrow pill **WHAT WE TEACH** → H2 → body → dual CTA → `/courses`.

Nine is more than the blueprint's seven and the orbit will get crowded. If it does, drop the
inner ring to three and push Music Composition out. Do not shrink the blobs below `100px`;
the labels stop being readable.

**Phone:** rings drop, blobs become a horizontally scrolling row — same as the blueprint.

*Content:* master file §4.

---

### Slot 7 — Faculty · cream · text left, photos right

Eyebrow: **OUR TEACHERS**
H2: **Trained on real stages.**
Body: the faculty is genuinely unusual and the current site hides it inside PNGs. Name the
institutions in the first sentence — Central Academy of Drama, Shanghai Theatre Academy,
University of Manchester, Monash, Xi'an Conservatory — and note that one teacher was an AMEB
speech examiner.
CTA: Book a trial class · Meet the faculty → `/faculty`

Right side: the teacher cards from `extraction/assets/`, which already share a gold/charcoal
editorial look. They will sit inside the blueprint's `40px` radius frame without a fight.

*Content:* master file §5.

---

### Slot 8 — Stage & Results · **charcoal band** · image left, text right

The blueprint's "Excursions" slot — the one place it runs three paragraphs. Mirror has more
than enough to fill it.

Eyebrow: **ON STAGE**
H2: **We put them in front of an audience.**
Three paragraphs:
1. Melbourne's first Children's Spring Festival Gala, 2024 — Rachel Fu as chief director.
2. Original music videos — *Born to Fly*《此生飞翔》carried on the Beijing Winter Olympics
   Organising Committee site and the Chinese Consulate-General's platform;
   《笔画春秋》screened at the Consulate's Teachers' Day event.
3. Annual stage productions (*Jungle Book*, 2025) and the China Daily Belt & Road youth
   English speech competition.

CTA: See the work → `/productions`

⛔ **Do not** carry any China Daily placement claim onto the page until the client fills in
the real numbers. The live site currently reads "XXX obtained Third, Second and First
places". Describe the competition, not our results, until that is answered.

*Content:* master file §8.

---

### Slot 9 — The Campuses · cream · split header + photo rail

**This is where local targeting lands on the homepage.**

Split header, the blueprint's one asymmetric layout:

- Left: eyebrow pill **THE CAMPUSES** + H2 **"Two homes in Melbourne's east."**
- Right: body + dual CTA

Body names both campuses and their surrounding suburbs in natural prose:

> Our main campus is on Canterbury Road in **Surrey Hills**, a few minutes from Box Hill,
> Camberwell, Canterbury and Balwyn. Our Glen campus is on Kincumber Drive in
> **Glen Waverley**, close to Mount Waverley, Wheelers Hill and Burwood East.

Below: the horizontal photo rail — campus interiors, classrooms, a class in progress.
Real photography needed here; what we scraped is web-resolution
(`OPEN-QUESTIONS.md` #16).

---

### Slot 10 — Workshops for schools · cream · card row

The blueprint's Instagram feed row becomes **three workshop cards**, because the workshops
are a real B2B offer to schools and the current site buries them:

| Card | Contains |
|---|---|
| Traditional Chinese arts | Music · martial arts · lion and dragon dance · dance |
| Traditional crafts | Lacquer fans · tie-dye · lacquer beads · sachets · paper · incense · soap |
| Party & media | Singing · shadow puppets · presenter studio · voice-over booth |

CTA aimed at teachers and coordinators, not parents: **Enquire about an incursion**.

Social lives in the utility bar and footer instead of getting its own row. Revisit only if
the client wants a Xiaohongshu embed.

*Content:* master file §6 — bilingual copy already exists for all fifteen workshops.

---

### Slot 11 — Book a trial · cream · centred

Eyebrow pill **BOOK A TRIAL** → H2 **"Come and watch a class."** → booking widget.

The blueprint embeds cal.com. Whether we do the same or route to the enquiry form depends on
`OPEN-QUESTIONS.md` #9 (enrolment flow). **Build the form path first** — it works without any
client decision. Swap in a scheduler later if they want one; the slot does not change.

---

### Slot 12 — Contact + footer · full-bleed campus photograph

Cream card floating over a photo of a campus exterior.

**Left column** — label pills, values in the display face, underlined:

| Label | Value |
|---|---|
| PHONE | +61 498 183 332 |
| WHATSAPP | 0422 362 426 |
| MAIN CAMPUS | 1f/244 Canterbury Rd, Surrey Hills VIC 3127 |
| GLEN CAMPUS | 36 Kincumber Dr, Glen Waverley VIC 3150 |
| EMAIL | info@mirrorartsedu.com |
| WECHAT | MirrorArtsEdu (+ QR) |

Six rows against the blueprint's four. If it runs long, put the two campuses side by side.

**Right column** — enquiry form. The blueprint's fields plus two of ours:

`Parent's name* · Email* · Phone · Child's name · Child's age · Course of interest (select) ·
Preferred campus (select) · Message`

**Preferred campus** is the field that makes a single location page workable — it is how we
recover the routing information that separate campus pages would have given us for free.

Beneath the card: the keyword-carrying `H1`, exactly as the blueprint does it —

> **Mirror Arts Education | Drama, speech and music classes in Melbourne's eastern suburbs**

Then copyright (dynamic year, not the hardcoded 2026 currently live) and the Aspire Studio
credit.

---

## 4. Information architecture

```
/                       Home — the twelve slots above
/about                  Story · timeline 2017→2025 · leadership
/the-mirror-way         The five values, expanded
/courses                Nine courses, filterable by the four categories
/courses/[slug]         ×9 — real text, ages, duration, term, teacher, accent colour, CTA
/faculty                Leadership + six teachers
/workshops              Fifteen workshops in three groups — school-facing
/productions            Galas · Born to Fly · 笔画春秋 · Jungle Book
/results                CEFA · AMEB · competition wins  ⛔ China Daily numbers gated
/partners               AYACA · Venus Dance · 明心舞蹈 · CEFA · Chinese Museum
/venue-hire             Blocked on client input — falls back to a contact CTA
/contact                Both campuses, both maps, WeChat QR, form
/zh/*                   Full Chinese mirror of the above
```

Every inner page reuses the homepage's section shape. No page invents a new layout.

**Redirects:** every old `doc_*` / `item_*` URL maps to its new equivalent; the nineteen wig
e-commerce pages return `410`. Map lives in the implementation plan.

---

## 5. Local targeting

One location page, per the decision above. It carries its weight through:

| Mechanism | Detail |
|---|---|
| Home `<title>` | Performing Arts School for Kids · Surrey Hills & Glen Waverley · Mirror Arts Education |
| Home meta description | Drama, speech, singing and musical theatre for ages 6+ in Melbourne's eastern suburbs. AMEB and CEFA exam preparation. Bilingual classes. |
| Footer `H1` | Drama, speech and music classes in Melbourne's eastern suburbs |
| Structured data | **Two `LocalBusiness` nodes on one page** — one per campus, each with its own address, geo, phone and opening hours. A single page can legitimately describe two locations |
| Also on home | `Organization`, and `Course` on each course page |
| `/contact` | Both addresses, two embedded maps, transport notes, parking |
| Suburb prose | Slot 9 and `/contact` name the surrounding suburbs naturally. No keyword lists |
| Google Business Profile | Both listings NAP-matched to `/contact`. Access requested in `OPEN-QUESTIONS.md` #20 |
| `hreflang` | `en-AU` ↔ `zh-Hans` on every page pair |

The current site has none of this — every page's title is `australianmirror` and every meta
description is empty.

---

## 6. Build order

Foundation before sections, or every section drifts:

1. **Tokens + fonts + Lenis + reduced-motion switch.** Nothing else starts until this is in.
2. **Shell** — utility bar, nav, footer, language toggle, mobile panel.
3. **Hero** (slot 3) — the pinned scroll scene and the drifting badges. Hardest thing on the
   page; do it while there is time to get it wrong.
4. **The repeating section component** — eyebrow / heading / body / dual CTA / optional
   image, with a `side` and `band` prop. Slots 4, 5, 7, 8 are all this component.
5. **Orbital courses** (slot 6) — second-hardest.
6. Slots 9, 10, 11, 12.
7. Inner pages, all reusing the section component.
8. Chinese mirror.

Slots 4–12 are independent once step 4 exists and can be built in parallel.

---

## 7. Risks specific to the restage

| Risk | Mitigation |
|---|---|
| **Bilingual display type.** A cursive/script Latin heading next to Chinese looks broken unless the Chinese gets its own treatment | Resolve the font pairing in step 1, before any section is built. Ask the client for their poster fonts first (`OPEN-QUESTIONS.md` #14) |
| **Gold fails contrast on cream** (~2.6:1) | Gold is for display type ≥24px, rules, icons and pill fills only. Body copy is charcoal. Written into the tokens file |
| **Nine blobs crowd the orbit** where seven fitted | Fall back to 3 inner / 6 outer; never shrink below 100px |
| **Motion budget** — pinned hero + two rotating systems + parallax | `transform`/`opacity` only, pause off-screen rotations, Lighthouse mobile ≥95 as the gate |
| **Blueprint charm vs. exam-prep credibility** | The four hero badges are the counterweight. If it still reads young at review, dial the display face more serif and less script — the layout does not change |
| **Photography.** The blueprint leans on real, warm photos in nearly every slot | We have web-resolution scrapes only. Requested in `OPEN-QUESTIONS.md` #16. Build with what we have; swap in later. Never block |
| **"Only CEFA centre in Australia"** is a factual claim in the hero | Verify with the client before launch |

---

## 8. Out of scope

Unchanged from `docs/PROJECT-PLAN.md`: online enrolment with payment, parent portal, CMS,
blog, ticketing, WeChat mini-program, marketing automation. Per-suburb landing pages are now
also phase 2, by decision.
