# Information architecture

> Decisions taken with Kayden, 6 Aug 2026. Blueprint: `https://rushd.sch.id/` (Framer).
> Companion docs: `content/AUDIENCE.md` · `content/MIRROR-ARTS-EDUCATION.md`
>
> **This is the plan as agreed in August, kept as the record of why the shape is the shape.
> Six things below have since been overtaken by later client revisions, and
> `docs/STATE.md` is the file to trust on all six:**
>
> - The Chinese glosses printed throughout the tables (关于我们, 表演类, 明心舞蹈学校 …) are
>   off the English site entirely. They belong to `/zh`.
> - The mission band's copy is now "Welcome to Mirror Arts Education, where young talent
>   takes centre stage", followed by the nine disciplines and "Professional AMEB Examination
>   Centre" — not the cultural-bridge sentence or the CEFA sole-centre line.
> - **Core Team** (§Navigation) and **Exams & Pathways** are gone as pages; Venue hire has
>   moved up to the top level of the nav.
> - The Partners section carries supporters only. The media belt is off both the homepage
>   and `/about#partners`.
> - Partners, Exams & Achievements, and For Schools are no longer standalone pages. They
>   are sections at `/about#partners`, `/stage#achievements`, and `/workshops#schools`.
> - **The twelve-section landing page below is not what ships.** The homepage now runs four
>   sections between the hero and the enquiry band — Courses, Two campuses, Partners — after
>   About, Faculty, Testimonials, Achievements, Stage and Workshops came out of it across
>   the 8 and 9 Sep passes. "Every nav item gets one summary section" is no longer the rule
>   the page follows; the comment at the top of `app/page.tsx` is the live record of which
>   sections are there and why.

---

## The organising principle

**Every nav item gets exactly one summary section on the landing page, in nav order.**

The homepage is a table of contents that happens to be beautiful. Each section says enough
to be useful on its own, then hands off to the page that goes deep. A parent who scrolls and
a parent who uses the menu build the same mental model of the school.

This is also the rule that settles individual arguments — "should faculty be on the homepage?"
stops being taste and becomes arithmetic. Faculty is a nav item, so it gets a section.

Two consequences worth stating:

- **No section is allowed to be a dead end.** If it has no page to hand off to, it isn't a
  section — it's decoration, and it gets cut.
- **Rushd's eleven slots are not sacred.** They are one school's answer to one school's
  content. Mirror has nine courses, four course categories, ten staff and fifteen workshops;
  Rushd has one program. Where the blueprint has no slot for something Mirror owns, we add
  one. Where it has a slot Mirror can't fill, we drop it.

---

## Navigation

The current site has **seven** top-level items.

| Nav | Dropdown | Absorbs from the old nav |
|---|---|---|
| **About** ▾ | Our Story · Partners | 关于我们 about Us, 合作伙伴 Partners |
| **Courses** ▾ | Performance · Language · Music · Posture | 课程种类 Course types |
| **Faculty** | — | 师资团队 Faculty Team |
| **Stage** ▾ | Productions · Exams & Achievements | 作品展示 Works, 教育成果 Achievements |
| **Workshops** ▾ | For Schools · Cultural Workshops | Workshop |
| **Venue hire** | — | 场地租赁 Venue rental |
| **Contact** | — | 联系我们 Contact Us |

Plus, in the Rushd manner: a filled pill CTA — **Book a trial class** — and the **EN / 中文**
toggle. On mobile both move into the panel behind the hamburger.

**Faculty stays top-level.** `AUDIENCE.md` §3 ranks *"who teaches my kid, and are they
qualified"* as avatar B's number-one decision factor, and Delyse Weisz and Callum Dibbert are
the whole bridge to the local English-speaking market. Demoting faculty into an About
dropdown would cost the audience this rebuild exists to reach.

---

## Landing page — twelve sections

Section order matches nav order after the hero and mission band. Band colour alternates
near-white / charcoal so position on the page is always legible.

| # | Section | Content | Hands off to |
|---|---|---|---|
| 1 | **Hero** | Jungle Book video 1:49–2:50, muted loop. *"Welcome to Mirror Arts Education — building a cultural bridge that transcends geographical boundaries."* | — |
| 2 | **Mission band** | Charcoal ground, gold display type: *"Mirror Arts Education is dedicated to providing a professional and inclusive environment for children in Melbourne to learn, experience, and inherit Chinese culture."* Beneath, small italic serif: *"Australia's only CEFA children's language-performance examination centre."* | — |
| 3 | **Courses** | Four category cards — Performance 表演类 · Language & Expression 语言表达 · Music 音乐类 · Posture & Etiquette 形体与礼仪. NDS treatment: bold type over full-bleed photo, one accent colour each. Card proportions to be tuned once Rachel supplies course photography. | Courses |
| 4 | **About** | Condensed 关于我们 copy plus the existing photo collage. Core team named, not detailed. | About |
| 5 | **Faculty** | 4–6 summary cards: photo, name, discipline, one credential line. | Faculty |
| 6 | **Testimonials** | ⛔ **Blocked** — none exist. `OPEN-QUESTIONS #24`. Section is built and held empty rather than faked. | — |
| 7 | **Achievements** | Competition wins, AMEB and CEFA results, China Daily. ⛔ Blocked by live placeholder text — `OPEN-QUESTIONS #2`. | Achievements |
| 8 | ~~*Diverse Cultures*~~ | **Cut.** Rushd uses it for diversity metrics; Mirror's equivalent content is already carried by the hero, the mission band and the workshops. | — |
| 9 | **Stage** | The productions, as video: 2025 Snake Year gala, 2026 Horse Year gala, the 2026 Australia International Youth Drama, Speech & Debate Competition (replaced Belt & Road on 20 Sep 2026), plus both original MVs. All six masters in hand; full films on Vercel Blob. | Productions |
| 10 | **Partners** | AYACA, CEFA, Melbourne Chinese Museum, AMEB, Venus Dance, 明心舞蹈学校 and the 23-logo sheet. | Partners |
| 11 | **Workshops** | The fifteen cultural workshops, lightly covered — enough to signal the offer exists. | Workshops |
| 12 | **Social + footer** | Facebook, Instagram, YouTube, WeChat QR modal, 小红书. Footer nav, both campuses, ABN, language toggle. | — |

Sections 6 and 7 are blocked on the client, not on us. Everything else can be built now.

The footer is universal across every page.

---

## Page inventory

Each page exists at the root in English and under `/zh` in Chinese, written independently
rather than translated (`AUDIENCE.md` §5).

```
/                       Home
/about                  Our story, timeline, campuses, partners and supporters
/courses                All nine, grouped by the four categories
/courses/<slug>         Nine course pages
/faculty                Full teaching faculty, grouped by discipline
/stage                  Productions, exams and achievements
/stage/<slug>           Case studies — Born to Fly, 笔画春秋, Jungle Book, the galas
/workshops              For schools and organisations, followed by three workshop groups
/workshops/venue        Venue hire
/contact                Both campuses, enquiry form, map
```

Roughly 25 pages per language. `hreflang` both ways on every one.

---

## Design tokens

```
Base      #FAFAF9    near-white, no yellow cast
Ink       #181818    charcoal — body and display
Muted     #4A4A4A    secondary text
Grey      #828282    meta, captions
Gold      #C9A227    type, rules, small fills
Band      #181818    charcoal ground, gold type
```

**Gold is never a large area.** The client's existing tan `#EDE0D0` is what makes the current
site read cheap, and a saturated gold at full-bleed would read worse — the logo is a gold
gradient and needs quiet ground to hold its shape. Gold performs as type, hairline rules and
small fills against near-white or charcoal. Where Rushd goes full-bleed orange, Mirror goes
charcoal with gold type.

Per-course accents from the existing poster system (`MIRROR-ARTS-EDUCATION.md` §13) carry
into the course cards — sky blue, orange, coral red, pink, green, yellow, royal blue, purple.
That system is already the client's; the blueprint work is executing it properly, not
inventing it.

**Type** — following the blueprint's structure, not its fonts:

- Sans for everything structural. Plus Jakarta Sans is the blueprint's choice and works.
- A display serif in *italic* for emphasis words inside headlines — the move that stops the
  geometric sans reading corporate. Reserved for a word or two per headline, never a
  full sentence.
- Chinese needs its own pairing. Latin serif italic has no Chinese equivalent; `/zh` gets
  weight and size contrast instead. **Open — needs a decision before `/zh` is built.**

---

## Open items

| # | Item | Blocks |
|---|---|---|
| 1 | Testimonials — none exist | Section 6 |
| 2 | Placeholder text on the results page | Section 7 |
| 3 | Course photography for the category cards | Section 3 proportions |
| 4 | Is the workshops line genuinely B2B? | Section 11 depth, `/workshops#schools` |
| 5 | Venue hire — page has no text at all | `/workshops/venue` |
| 6 | Chinese display type pairing | `/zh` |
| 7 | CEFA "only in Australia" claim, confirmed in writing | Section 2 — it is the headline |
| ~~8~~ | ~~Photo/video consent for children in the hero~~ — confirmed 6 Aug 2026 | — |
