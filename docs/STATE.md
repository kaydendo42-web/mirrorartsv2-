> **Workspace update (13 September 2026):** The active source is the verified live V2 design, with Daisy's workshop revisions. Local preview: http://127.0.0.1:3100. The user reviewed this version and authorised its push and deployment to `kaydendo42-web/mirrorartsv2-`. See `docs/LOCAL-V2-WORKSHOPS.md` (from the application root) for the source and workspace history. Earlier preview addresses below are historical.

# Where this project is

**Updated 20 Sep 2026.** Read this first when picking the work back up.

**Latest change: Belt & Road is off `/stage`, and every production plays its full film with
sound** (20 Sep, Kayden, from Daisy's message and the `Production page` Drive folder).

- **The competition entry is now the 2026 Australia International Youth Drama, Speech & Debate
  Competition** — `youth-drama-speech-debate-2026` in `lib/content/productions.ts`. Its loop and
  poster are cut from the film's opening montage (00:02–00:12, Glen Eira Town Hall), the only
  ten seconds without burned-in captions; `scripts/transcode.mjs` says why. The three Belt &
  Road assets are deleted and `/stage/belt-and-road-2025` 308s to the new slug. The copy names
  only the result the certificates document (first and second prize, junior group) and no
  child; `content.test.ts` holds it to that. `content/OPEN-QUESTIONS.md` §62–64.
- **`video.full` is filled for all six works.** Blob store `mirrorarts-productions` (Sydney,
  public) on the `mirrorartsv2` Vercel project, created with `vercel blob create-store` and
  connected to all three environments; `BLOB_READ_WRITE_TOKEN` is on the project. The renders
  (CRF 27, 1920 wide, AAC 128k; ~390 MB for six) live at
  `https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/<slug>-1920.mp4`,
  uploaded with `vercel blob put --access public --cache-control-max-age 31536000`. The
  "Play the full film" button `VideoFigure` was built with now appears on every case study.
  Masters and renders sit in `media/` (gitignored); the five older masters are still in
  `Original Website/media/`.
- **To redo a render:** `node scripts/transcode.mjs --full --only=<slug>`, then the `vercel
  blob put` line above with `--allow-overwrite`. Needs `BLOB_STORE_ID` in `.env.local`
  alongside the OIDC token `vercel link` writes — the CLI refuses one without the other.
- **The enquiry form sends at last.** Resend (`mirrorarts-enquiries`, Vercel Marketplace,
  free plan) emails each enquiry to `workshop@mirrorartsedu.com` from
  `enquiries@mirrorartsedu.com.au`, Reply-To the parent. `lib/enquiry-mail.ts` +
  `lib/enquiry-mail.test.ts`; the action in `app/actions/enquiry.ts`. DNS for the sending
  domain (DKIM TXT, `send` MX + SPF TXT) is in Namecheap, Mail Settings switched to Custom
  MX — the domain had no forwarders. Honeypot field `website` on the form. `npm test` glob
  widened to `lib/**/*.test.ts`.
- **Still open from Daisy's message:** the Google Business Profile URL (needs the Mirror
  Google login). The `Childhood` MV in the same Drive folder is not on the site — §64.

**The change before it: the certificates arrived, and `/stage` grew a Competitions section** (19 Sep,
Kayden, from Daisy's 18 Sep Drive upload). AMEB and CEFA lost their animated artworks to piles of
the real documents (`CertStack`, layered and overlapping as Daisy asked); `#competitions` shelves
one pile per event and closes with the ceremony photographs on the campus grid; the Stage nav
gained a Competitions item. "Six pieces of work" became "Creative productions" with Daisy's line
beneath it. The speech-competition video from the same message went in on 20 Sep (above); the
Google Business Profile URL update still needs the Mirror Google login. See `DESIGN.md` §Exams &
achievements and `lib/content/certificates.ts`.


**Latest change: `/about` lost its campuses section** (9 Sep, Kayden). "Two campuses, both
in the east" — the two addresses, the Hire a room here link and the ghost link to `/contact`
— came off `/about`. It was a shorter copy of what `/contact` already carries in full, with
maps and every other way to reach the school, and venue hire is in the top-level nav and the
footer besides. Nothing linked to `/about#campuses`. `.campuslist` went from `globals.css`
with it; both are in the history if the section comes back. `/about` now runs what the
school is, how it got here, and who backs it: base / alt / base, still alternating.
`content/OPEN-QUESTIONS.md` §61.

**The change before it: the homepage is down to four sections** (9 Sep, Kayden). Achievements,
Stage and Workshops came off `/`. All three summarised pages that already carry the same
material in full, and all three are still in the nav and the footer — only the homepage
summaries went. What is left between the hero and the enquiry band is Courses, Two campuses
and Partners: what is taught, where it is taught, who backs it.

`components/sections/{achievements,stage,workshops}.tsx` are **kept, unimported**, in case
the client wants any of them back. Nothing else referenced them; every `/stage#achievements`
and `/workshops#workshops` link in the nav, the footer and `lib/content/courses.ts` points at
the standalone pages, which build their own detail components and are untouched. Grounds on
the shortened page re-counted to base / alt / base / band, so they still alternate.

This ends the "every nav item gets one summary section" rule that
`docs/INFORMATION-ARCHITECTURE.md` was built on; that file now says so at the top. The
comment at the head of `app/page.tsx` is the live record.

**And before that: `/stage` lost its enquiry form** (9 Sep, Kayden). The "What a grade is
actually for" prose and the "Ask about entering" form came off the bottom of `/stage`, on
the same reasoning that took the form off the course pages on 8 Sep — the masthead's "Book a
trial class" is meant to be the one enrolment path. The examination-bodies list moved up
into the overview band rather than leaving with the prose that housed it. The enquiry form
is now genuinely in two places, `/` and `/contact`; `content/OPEN-QUESTIONS.md` §59.

**The pass before that: the faculty cards** (`Revision - Daisy and Rachel/Faculty/`, supplied 9 Sep).
Ten teacher cards as a PDF, and the same ten as JPEGs filed under four discipline folders.
The faculty went from six to ten and `/faculty` is rebuilt from the cards:

- **Callum Dibbert is off the site.** He has no card in the new set. He was half the
  English-language bridge `content/AUDIENCE.md` §3 leans on — Delyse Weisz still carries it
  and Anthony Pontonio is the other native-English teacher now. `content/OPEN-QUESTIONS.md`
  §52 asks the client to confirm he has actually left rather than been left out.
- **Anthony Pontonio and Zoe Sun are new.** Joyce Wu, Toni Cao and Shanshan 姜雨姗 — three
  of the four cards the August pass could not place against §5 — are named faculty at last.
  Lindy Zhang, the fourth, has no card in this set either and stays off.
- **The discipline grouping is now literally the client's folders.** Delyse's card is
  byte-identical under both Performance Arts and Language; every other card sits in one.
- **Course assignments come off each card's printed subject line**, which answers half of
  §36: Dance has Rachel Cai now. Debating, Instrument and MV (Production) still have nobody.
  Becky Li narrows to Vocal — her card reads VOCAL TEACHER and nothing else — so Musical
  Theatre is Anthony, Zoe and Toni, and Choir is Joyce. That is the one thing this pass takes
  away rather than adds; §50.
- **All ten portraits are re-cut** by `scripts/import-faculty-cards.mjs`, including the six
  that already existed. The new cards are 2480×3425 against the old 860×1187, so every
  portrait on the site is off one source set at 2.88× the pixels the first pass had.
- `content/MIRROR-ARTS-EDUCATION.md` §5's faculty table is **superseded** and now says so.
  Eleven questions came out of the pass, §48-58.

**And before that: the second Daisy & Rachel revision** (`Revision - Daisy and Rachel/Revision
Part 2/`, a 38-item annotated PDF and ten course photographs, supplied 8 Sep), plus four
things asked for over WeChat the same evening. It is the largest content change since the
inner pages were built:

- **The catalogue went from nine courses to thirteen.** Debating, Instrument (AMEB), MV
  (Production) and Dance are new; Voice-over is Dubbing, Posture & etiquette is Posture
  Training, and English drama is Drama (Production) at 120 minutes over twenty sessions.
  Almost every string on every course page is the client's own new copy.
- **A fifth section, Adult Program**, holding five adult programs with no pages of their own.
- **Three sections came off every course page** — the poster lightbox (items 14, 20), and
  then, over WeChat, the "Where it leads" band and the "Start a conversation" enquiry form.
  A course page now ends on the teacher cards and the prev/next nav, with no call to action;
  `content/OPEN-QUESTIONS.md` §47.
- **Ten new photographs** imported by `scripts/import-course-photos.mjs`, nine of them wired
  in. They replace card and hero images that were a beach, a choir standing in for a speech
  class, and a 253px thumbnail upscaled 4.6×.
- **The homepage lost its About section** and the room photographs moved into Two campuses as
  a marquee; Two campuses moved up the page to sit under Courses.
- **The Chinese Consulate-General and China Daily came off the partners list** — the client's
  answer to a direct question was "No, this is government institution."

**Everything the client asked for in that pass is built** — all 38 PDF items and all six
WeChat asks — **except four sections that are blocked on them, not on us:** the per-course
photo/video sections at items 13, 19, 26 and 32. They stay off until the client says which
photographs belong to which course; `content/OPEN-QUESTIONS.md` §35 spells out what to send.

Item 8, the same request under Drama, was answered differently on Kayden's direction: rather
than a strip under one course, everything the school holds is now **one contact sheet across
the top of /courses** — sixteen frames, the ten course photographs and the six production
loops, directly under the headline and before the first course is named. Five of them play on
hover, focus or tap. `components/shared/course-work.tsx`.

Thirteen questions came out of the pass, §35-47 in that file. Four of them will change the
pages the moment they are answered: §35 (class footage), §36 (who teaches the four new
courses), §37 (a photograph for Debating) and §47 (a course page now ends with no call to
action).

Three things were corrected on the way through, none of them asked for, all of them wrong
the moment the catalogue changed: the homepage tally read "9 courses, every one
exam-prepared"; the site's meta description and its organisation record both said "children
aged 6+" when Musical Theatre and Vocal now take four-year-olds. The age is derived from the
catalogue now (`YOUNGEST_AGE`) and a test fails if either file states one of its own.

The previous version of this file opened with "the homepage is the only page that exists".
Twenty-seven URLs exist now. It is in git history if you want the earlier framing.

---

## The job

Rebuild `mirrorartsedu.com` — a Melbourne youth performing-arts and Chinese cultural-exchange
school — as `mirrorartsedu.com.au`. English at the root, full Chinese mirror at `/zh`. The
site must work for two different parents at once (see `content/AUDIENCE.md`).

**No launch date.** The 14 Aug 2026 target in `README.md` and `docs/PROJECT-PLAN.md` was
Kayden's own two-week estimate, not a client commitment, and was released on 6 Aug.
`docs/PROJECT-PLAN.md` is superseded — it plans a build on the Global Explorers blueprint
that the client rejected.

---

## Read in this order

| File | What it gives you |
|---|---|
| `docs/STATE.md` | This file — current state, next actions |
| `content/OPEN-QUESTIONS.md` | What we still need from the client. 61 items, the live ones marked. §35-47 are the 8 Sep batch, §48-58 the 9 Sep faculty cards, §59-61 the 9 Sep cuts |
| `content/MIRROR-ARTS-EDUCATION.md` | Every fact about the business, as the **old** site stated it on 31 Jul 2026. Still the only transcription of the original Chinese posters — but **superseded on courses** by the two client revisions. `lib/content/courses.ts` is what ships |
| `content/AUDIENCE.md` | Who the site is for. Two avatars with opposite proof hierarchies |
| `docs/INFORMATION-ARCHITECTURE.md` | Nav, page inventory, homepage section map, design tokens |
| `docs/superpowers/plans/2026-08-07-inner-pages.md` | The 26-task plan the inner pages were built from |
| `docs/superpowers/plans/HANDOFF-inner-pages.md` | What is owed on that plan, and how to run it |

---

## What exists

**Twenty-seven content URLs, all building.**

```
/                       /about
/courses                /courses/[slug] ×13    /faculty
/stage                  /stage/[slug] ×6
/workshops              /workshops/venue       /contact
                        /sitemap.xml           /robots.txt          404
```

Partners, Exams & Achievements, and For Schools are sections rather than
standalone pages: `/about#partners`, `/stage#achievements`, and
`/workshops#schools`. Their former URLs permanently redirect to those anchors, and so do the
three course slugs the 8 Sep revision renamed (`/courses/english-drama`, `/courses/voice-over`,
`/courses/posture`). A test checks every redirect destination is a slug that still exists.

```bash
npm run dev        # http://localhost:3000
npm run build      # must stay clean
npm run lint       # zero warnings
npm test           # 63 tests, node --test, no framework
```

**This is live.** `https://mirrorartsedu.com.au` serves this build as of 9 September 2026.
**The faculty pass is on it** — pushed to `main` the same day at Kayden's instruction, which
is a production release. Ten teachers, ten new portraits and the rewired course pages are
what a parent sees now; nobody outside this repo has read that copy yet, which is why the
reading pass sits at №3 in Next actions rather than lower.

The line that stood here until then — "Nothing has been deployed… deploying is Kayden's call,
ask first" — was wrong, and had been for a while: the Vercel project carries production
deployments going back thirty-six days. **The project has GitHub integration, so every push
to `main` deploys straight to production.** There is no promote step to forget and no
approval gate in front of it. A push is a release.

That matters against the pre-launch gates below, which are written as things that block a
deploy. They no longer block anything by themselves — they are now things that are live and
unresolved. Read them that way.

  - Vercel project `prj_rgLfHCn1Pv69UWqwyjKamjVvpxGr`, team `kaydendo42-webs-projects`,
    project name `mirror-arts-education`.
  - `vercel link --yes --project mirror-arts-education` re-links a fresh clone. It writes
    `.vercel/` and `.env.local`, both already ignored — but it also appends its own `.vercel`
    and `.env*` lines to `.gitignore`, and `.env*` lands after the `!.env.example` negation
    and cancels it. Revert `.gitignore` after linking.
  - Deploy from Git, not from `vercel deploy`. A CLI deploy uploads the working directory,
    and this one is 6.9 GB: `media/` alone is 4.8 GB of client video masters. `.gitignore`
    keeps that out, but `prototype/`, `extraction/`, `Revision - Daisy and Rachel/` and
    `RushD homepage blueprint/` are tracked and would go up — 252 MB of reference material
    that ships nothing, 34 MB of it the 9 Sep faculty cards.

---

## Where facts live now

**`lib/content/` — 13 modules, one per domain object.** This is the single source for every
fact on the site, and it exists because most facts appear in three or four places at once:
a course duration is on `/courses`, on the course page, in the enquiry form's list and in
JSON-LD. `courseFacts()` and `courseFactLine()` in `courses.ts` are the one place a course's
delivery facts get formatted, so the hero strip and the list row cannot disagree.
`content.test.ts` holds 63 tests over the lot — cross-links resolve in both
directions, no course carries a price or a weekday, every declared image dimension matches
the file on disk, every committed video loop is silent and ten seconds.

Two rules that are load-bearing:

- **Imports inside `lib/content/` use an explicit `.ts` extension** (`node --test` needs it,
  and `allowImportingTsExtensions` in `tsconfig.json` is what stops `tsc` rejecting it).
  From `app/` or `components/`, import without an extension via `@/lib/content/...`.
- **New client-facing data goes in the content layer, not a second literal in a component** —
  but check what ships. `app/page.tsx` is `"use client"`, so anything the homepage imports
  goes to the browser, and properties of one exported object do not tree-shake. That is why
  `partners.ts` exports `MEDIA_LOGOS`, `SUPPORT_LOGOS` and `INSTITUTIONS` separately, and why
  `lib/courses.ts` and `components/sections/stage.tsx` stay hand-kept literals with tests or
  comments holding them honest.

---

## Decisions locked

Do not relitigate these without a reason.

| Decision | Detail |
|---|---|
| **Blueprint** | `https://rushd.sch.id/` — a Framer site. Structure and rhythm only; nothing of theirs ships. Client rejected Global Explorers as "too childish" |
| **Language** | English at root, full Chinese at `/zh`. **Written separately, not translated** — the registers differ. **No `hreflang` until `/zh` exists**; a test fails if the key comes back before the route does. **The English site carries no Chinese at all** as of 4 Sep — the client asked for every gloss out. The `cn` fields stay in `lib/content/` because `/zh` will need them; nothing renders one. Adding one back to an English page undoes a client instruction |
| **Nav** | Seven items: About · Courses · Faculty · Stage · Workshops · Venue hire · Contact, plus a "Book a trial class" pill. The Courses dropdown holds five: the four disciplines and Adult Program |
| **Homepage sections** | One per nav item, in nav order, with two exceptions. Faculty was cut because bios do not help a first-time visitor decide. **About was cut on 8 Sep 2026 at the client's request** — its block came out and its room photographs moved to Two campuses, which left a heading and a link. `/about` is still in the nav and the footer; `content/OPEN-QUESTIONS.md` §46 asks where the story should live on the homepage now |
| **Stack** | Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript · Node 24. Bespoke CSS stays plain CSS in `app/globals.css` (3,342 lines) below the `@theme` block, with its comments |
| **shadcn** | **Installed 7 Aug — this reverses the earlier decision.** It was right for one page and one form; it is wrong for fourteen pages carrying dialogs, accordions, carousels and tabs. shadcn supplies behaviour and ARIA, our CSS supplies the look. Keep every `data-[state=…]`, `aria-*` and Radix prop in `components/ui/` |
| **Palette** | Off-white `#FAFAF9`, charcoal `#181818`, gold `#C9A227`, plus the four course accents from the client's poster system. **Gold and the accents are never a large area** — type, hairlines and small fills only |
| **Signature** | The arch. Their logo is an arched doorway holding a music note; an arch is a proscenium |
| **Type** | Fraunces for display, Plus Jakarta Sans for everything else; serif italic reserved for one or two emphasis words per headline. `--font-sans` and `--font-disp` must stay in `@theme`, never `@theme inline` — both faces are injected at runtime by `layout.tsx` and `@theme inline` resolves at parse time |
| **Old domain** | Blanket 301 from `mirrorartsedu.com` to the `.com.au` homepage. No per-page mapping |
| **No invented facts** | There are no fees, no timetable, no testimonials and no competition tallies. Do not add them, do not imply them, and do not design a slot that reads as broken without them |

---

## Pre-launch gates — open, and now open *in production*

1. ~~**Written parental consent for the two AMEB reports.**~~ **Closed 6 September 2026** — the
   client asked for the results table to come out of `/stage#achievements`, so no minor is
   named on the site any more. The two results are still in `ACHIEVEMENTS` in
   `lib/content/achievements.ts` because removing a section is not deleting the record;
   nothing renders them, and anything that renders them again re-opens this gate.
2. **The CEFA sole-centre claim confirmed in writing.** It is the headline of `/stage#achievements`
   and is written as the school's own account, so a qualification costs a word, not a rewrite.
   **The 4 Sep revision softened this in `/about#partners` only** — the client's own new
   wording is "CEFA's authorised examination centre in Australia", with no "only". **The
   8 Sep revision took it out of the bilingual hosting course as a side effect** — the client
   rewrote that body wholesale and their new copy does not make the claim. It now stands in
   two places, both on `/stage#achievements`. Whether it should come out of those too is a
   question for Rachel, not an inference to act on.
3. **Venue rates confirmed current.** Published with an as-at date of January 2026 and a line
   saying they are confirmed on booking.
4. **Photo consent for the wider gallery** beyond the hero. §5 of
   `content/OPEN-QUESTIONS.md` came back "all photos are cleared to be used", but the
   8 Sep photographs raise it again in a sharper form: the frame the client chose for
   English Speech and for the homepage's Language card **has a student's full name on the
   screen behind him**, two metres high, and it now appears on two pages.
   `content/OPEN-QUESTIONS.md` §43.
5. ~~**The enquiry form is not wired to a mail provider.**~~ **Wired 20 Sep 2026.** Resend,
   provisioned from the Vercel Marketplace on `mirrorartsv2` (`mirrorarts-enquiries`, free
   plan, Tokyo region), delivers to `workshop@mirrorartsedu.com` at Kayden's instruction.
   From `enquiries@mirrorartsedu.com.au`; the DKIM and `send` SPF/MX records are in
   Namecheap. `lib/enquiry-mail.ts` shapes the message and is tested; the action returns an
   honest failure (with the phone number) if the send fails. A honeypot field drops scripts.
6. **The poster's `Info@mirrorartseducation.com` versus the site's `info@mirrorartsedu.com`.**
   Settled as far as we can: the contact poster prints the `mirrorartsedu.com` form, so the
   studio-hire poster is the outlier. Worth telling Rachel.
7. **The 2023 timeline gap.** §7 has no milestone for it; the timeline says so on the page
   rather than inventing one.
8. **The 19 wig-shop demo pages** deleted and 410'd at cutover.
9. **No Vercel Blob store exists.** All six `video.full` are `""` and `VideoFigure` falls back
   to the loop, which is the specified behaviour. `scripts/transcode.mjs --full` produces the
   six full-length renders the moment a store and token exist; a test asserts `video.full` is
   an absolute URL, so a repo path cannot creep in.

---

## What is still owed — the real-browser pass

**Nothing below has been confirmed by a human in a visible tab**, and this sandbox provably
cannot do it. Proven, not assumed:

- The automation tab reports `visibilityState: "hidden"` even in a non-headless window, so
  autoplay is suspended and CSS transitions are throttled. Correct reveals read `opacity: 0`.
- **`animationend` never fires.** Radix's `Presence` waits for it before unmounting, so a
  dialog or accordion appears never to close. Read `data-state`, not the DOM's existence.
- **Real key events never reach the page.** A bare `<button>` with its own `keydown` listener
  recorded nothing under Enter and Space while `.click()` on the same element worked.
  Keyboard operation cannot be tested here at all.
- **`window.scrollTo`, `scrollIntoView` and anchor scrolling are deferred or no-op.**
- **`img.naturalWidth` is unreliable** — a live `<img>` reported 156×132 for an image whose
  own URL, fetched and decoded in the same page, is 402×341. Size images against the files on
  disk, not against readings taken here.
- `resize_window` does not shrink the rendered viewport; `innerWidth` stays 1512. A
  same-origin iframe sized to 375px does give a real 375px CSS viewport, and every page in
  this build was checked that way — but it does not reproduce touch, DPR or `dvh`.

So the following are owed, on a real device or in a real window:

1. The intro overlay's flat three-second hold; the hero video playing; the mission wash
   climbing and fading the nav; both partner belts running opposite ways; the About stepper
   advancing on its own; the arch curvature. **Add the room belt in Two campuses** — it is a
   `.ticker`, so it is the same mechanism as the partner belts and inherits the same doubt.
2. That the lightbox **unmounts**, restores focus to its trigger, and unlocks body scroll.
   The state machine is verified; the unmount is not.
3. Keyboard operation of every accordion, dialog and tab set — Enter, Space, Escape, Tab.
   ARIA and click are verified everywhere.
4. That the six loops on `/stage` actually autoplay, and that six at once do not stutter.
   They are 7.7 MB together and mechanically correct (silent, 10.000s, 1280×720, faststart).
5. **That the Google map paints.** The embed URL is correct at HTTP level and the frame is
   sized and pointed at it, but this sandbox blocks third-party frames.
6. That `/contact#trial` lands correctly from the masthead pill, on a cold load and on a
   page already scrolled.
7. 375px on a real device for every page.
8. Tasks 7, 8 and 12 never had an independent review — the subagent path has been blocked by
   the account's monthly spend limit since task 7. **The thirteen course pages want a genuine
   reading pass** — almost every string on them was replaced on 8 Sep and none of it has been
   read by anyone but the person who typed it in.
9. **The room belt in Two campuses** — new on 8 Sep. It runs (`is-live` was confirmed) but
   the loop closing seamlessly, the hover pause, and the reduced-motion fallback are all
   `.ticker` behaviours this sandbox cannot judge.
10. **The `.includes` column flow.** The term lists read down the left column and then down
    the right above 700px, which is how the client writes them; below 700px the grid
    collapses to one column and the order is the array's. Confirm that single column reads
    sensibly on a phone — it interleaves the two halves of the client's brief.
11. **The contact sheet on /courses.** Its geometry is confirmed at 375, 900, 1100 and
    2560px — 2, 4, 7 and 7 columns, no holes, no overflow — and a click on a frame was
    confirmed to attach the src, play, and set `is-playing`. What is **not** confirmed is
    the feature frame autoplaying (this sandbox suspends autoplay), the fade from still to
    film, hover and blur on a real pointer, or what sixteen frames cost on a phone.

---

## Known gaps in the build

| Gap | Why |
|---|---|
| ~~The enquiry form does not send~~ | **Closed 20 Sep 2026.** Resend via Vercel Marketplace; see §5 above |
| ~~The Music card image is a 253px thumbnail~~ | **Closed 8 Sep 2026.** The client replaced it with the choir gala frame, which is 1448px. The old file is still at `assets/cards/music.jpg` and is now used by nothing |
| Two team portraits are small | Diana Zhao and Rachel Cai are 262×444 off the client's CDN — that IS the original. `/faculty` holds its portrait column to 260px so nothing upscales; `/about`'s stepper still renders them at 380px |
| One media logo has a screenshot artifact | `assets/partners/media/auyang-media.png` carries a Chinese browser's "AI识图" tooltip baked into the pixels |
| Three partner logos are light-on-light | Venus Art, TL Studio and the Chinese Museum line drawing read faint on the off-white. A source problem, not a CSS one. The museum is fixed on `/about#partners`, where the roll now uses the clean 294x239 cut from `Partner.docx`; the belt still carries the old file |
| CEFA's mark is pale by design | `assets/partners/institutions/cefa.png` is a light blue on what was a white ground, and is the faintest thing on the partners roll once that ground is keyed out. That is the logo as CEFA use it. Asked the client for a darker version — `content/OPEN-QUESTIONS.md` §27 |
| No achievement scans | `lib/content/achievements.ts` leaves `image` undefined on every entry. `/stage#achievements` renders the material as text instead, which is better than a scan on its own terms — but the four sources were never cropped, and one carries the same tooltip defect |
| Three top-level images are misnamed | `assets/choir.jpg` is a reception area, `assets/gala-stage.jpg` is a beach, `assets/roundel.jpg` is the Belt & Road competition. `roundel.jpg` was on the homepage's Born to Fly card until 8 Aug and was the English speech hero until 8 Sep. **Never name or pick an image from its filename or page context — open it and look.** That rule has been broken four times in this repo and caught four times |
| Three courses have no teacher and one has no photograph | Debating, Instrument and MV Production carry `teachers: []` — no card in the 9 Sep set claims any of the three. Dance was the fourth and now has Rachel Cai. Debating carries no `hero`. Every block on a course page is conditional for that reason. `content/OPEN-QUESTIONS.md` §36, §49, §37 |
| Four of the five class galleries the client asked for are empty | `gallery` exists on `Course` and the section renders only when it is populated. There is no class footage to populate it with — the ten new photographs are each a hero, and the eight in `Classroom/` are the 4 Sep room photographs already on the homepage. Item 8 was answered instead by the /courses contact sheet. §35 |
| `assets/cards/language.jpg`, `music.jpg` and `posture.jpg` are now unused | The client replaced all three on 8 Sep. Left on disk; nothing imports them |
| `--arch` is declared but never consumed | `.card__frame` and `.phero--deep` both hardcode the 19% landscape rise; the token holds the 38% portrait crown |
| `components/ui/carousel.tsx` double-subscribes | Two `useSyncExternalStore` calls share one subscribe, so each mount registers four Embla listeners where two would do. No correctness bug |
| Fraunces WONK is not actually on | `--wonk` is applied all over the CSS but the font is loaded without those axes. Turning them on changes how the display face looks, so it is a decision, not a fix |
| Chinese display type not chosen | Latin serif italic has no Chinese equivalent; `/zh` needs its own pairing |
| The Dance & Posture card lists four classes against two course pages | The client lists four (item 36) and a parent scanning for K-pop needs the word. Its count chip says "Two courses, four classes" so the four card counts still sum to the thirteen the headline claims. Hip Hop, K-pop and Chinese Dance all lead to `/courses/dance` |
| `EnquiryForm`'s `defaultCourse` prop is passed by nobody | The course pages were its only caller and their form came off on 8 Sep. Kept, not deleted — §47 says the client may want the form back, and the prop is what makes that a one-line change |
| `lib/content/courses.ts` `leadsTo` is no longer rendered on a course page | Still read by `/courses` (which counts the exam-prep courses off it) and by `/stage#achievements` (which lists them). Not dead data |

---

## Out of scope, deliberately

`/zh` · course fees · a timetable · testimonials · online booking or payment · per-workshop
pages · a news/blog.

---

## Traps that already cost time

- **The map URL.** Must be `www.google.com/maps/embed?pb=…`. The
  `maps.google.com/maps?q=…&output=embed` form 301s and that redirect carries
  `X-Frame-Options: SAMEORIGIN`, which silently kills the frame.
- **framer-motion was removed on purpose.** `AnimatePresence` did not work here: `mode="wait"`
  froze the copy because exits never resolved, and without it the exited nodes were never
  removed. The cross-fades are CSS.
- **Never redeclare `--color-muted` in `@theme inline`.** Tailwind merges every `@theme` block
  into one flat map, last write wins, and `--color-muted` is one of the nine site colours
  (`#4A4A4A`) read via `--muted` in ~30 rules. Redeclaring it turns every muted-text colour
  near-white with no error anywhere.
- **`next-env.d.ts` flips between `.next/types/` and `.next/dev/types/`** depending on whether
  `build` or `dev` ran last. Restore it with `git checkout -- next-env.d.ts` and re-run
  `npm run build` before committing.
- **`git checkout -- <file>` on uncommitted work.** Used to revert a deliberately injected
  test failure, it reverted the whole file. Stash instead.
- **A form dropped into an arbitrary page cannot claim generic element ids.** `EnquiryForm`
  used `id="wechat"`, and `/contact` carries a WeChat entry the footer links to as `#wechat`.
  Field ids are namespaced `enq-*` now.
- **Lint does not catch every raw internal `<a href>`.** `@next/next/no-html-link-for-pages`
  fired for `/courses` and for `/stage#achievements` but not for `/about`. Check by hand.

---

## Where the code lives

| Path | What |
|---|---|
| `lib/content/` | 13 modules, ~2,300 lines. Every fact on the site |
| `lib/content/content.test.ts` | 63 tests over all of it |
| `lib/schema.ts` | JSON-LD, built from the content layer. `SITE_URL` lives here |
| `app/` | 17 route files. Sections are `Section`/`SectionHead`; page headers are `PageHero` |
| `app/globals.css` | 3,342 lines. Tokens in `@theme` at the top, bespoke CSS below with its reasoning, the shadcn mapping at the bottom |
| `components/site/` | Shell: masthead, footer, intro, `page-hero`, `crumbs`, `page-nav`, `section` |
| `components/shared/` | `enquiry-form`, `campus-tabs`, `logo-belt`, `room-grid`, `course-work`, `institution-roll`, `course-icon`, `video-figure`, `lightbox`, `han` |
| `components/ui/` | shadcn output, restyled. Behaviour untouched |
| `components/sections/` | One file per homepage section |
| `scripts/` | Media pipeline: `sweep`, `slice-venue`, `crop-gallery`, `extract-portraits`, `import-faculty-cards`, `crop-wechat-qr`, `transcode`, `import-campus-photos`, `import-course-photos`, `logo-keyout`. `extract-portraits` is superseded for faculty by `import-faculty-cards` and kept for the nine course posters it also cuts |
| `prototype/` | The pre-migration hand-written site. Reference only — **delete once the port is signed off** |

---

## Next actions, in order

0. **Decide what to do about the gates now that the site is live.** Five of the nine are
   things a visitor can reach today: the CEFA sole-centre claim on `/stage#achievements`, the
   enquiry form that validates and then tells the visitor it cannot send, the venue rates, the
   photograph naming a minor on two pages, and the two email addresses. None of them is a
   crisis; all of them are now published rather than pending. Either resolve them or take the
   site off the domain — a decision, either way, rather than a deferral.
1. **Send Rachel and Daisy `content/OPEN-QUESTIONS.md` §35-47, §48-58 and §59-61.** Six change pages
   the moment they are answered — class footage (§35), who teaches Debating, Instrument and MV
   (§36/§49), a photograph for Debating (§37), whether a course page really should end with no
   call to action (§47), which name Shanshan goes by (§48), and whether Becky Li really comes
   off Musical Theatre and Choir (§50). Everything else in this list can proceed without them,
   so this goes first because it is the only item with someone else's turnaround in it.
2. **The real-browser pass above.** It is the biggest outstanding item and nothing else should
   ship before it. The thirteen course pages and the room belt are new since the last pass.
3. **A reading pass over the thirteen course pages, and now over `/faculty`.** Almost every
   string on the course pages changed on 8 Sep, and `/faculty` gained four teachers and lost
   one on 9 Sep. Nobody has read either end to end. Ten cards of credentials, several of them
   translated out of the cards' Chinese, is the largest block of unread copy on the site.
4. **Client review** — Rachel has seen none of this.
5. ~~**Wire the enquiry form**~~ Done 20 Sep 2026 — Resend to `workshop@mirrorartsedu.com`.
   The form appears in exactly two places, `/` and `/contact`.
6. **Answer the gates**, starting with the CEFA sole-centre claim — the 8 Sep rewrite took it
   out of the bilingual hosting course, so it now stands in two places instead of four.
7. Then `/zh`. Note it grew: thirteen courses and five adult programs to write, not nine
   courses, and `cn` is set on every one of the new courses ready for it.
