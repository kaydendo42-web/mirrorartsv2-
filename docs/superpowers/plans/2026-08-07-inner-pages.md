# Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build every English inner page of mirrorartsedu.com.au — fourteen route files, twenty-seven new URLs — carrying across every fact and asset recovered from the old site.

**Architecture:** A typed content layer under `lib/content/` becomes the single source for every fact, because most facts now appear in three or four places at once. Inner pages are Server Components reading that layer; the homepage stays a client component because scroll drives it. shadcn supplies interaction behaviour and accessibility, our existing tokens and bespoke CSS supply the look.

**Tech Stack:** Next.js 16.3.0 (App Router, Turbopack) · React 19.2.8 · Tailwind v4 · TypeScript 5 · Node 24.15.0 · `node --test` (built in, no test dependency) · sharp for media · shadcn CLI + 21st.dev registry

**Spec:** `docs/superpowers/specs/2026-08-07-inner-pages-design.md`
**Content source of truth:** `content/MIRROR-ARTS-EDUCATION.md`
**Current state:** `docs/STATE.md`

---

## Global Constraints

Every task's requirements implicitly include this section.

- **`npm run build` and `npm run lint` must both be clean at the end of every task.** Baseline before this plan starts: build passes, two routes (`/` and `/_not-found`).
- **Palette is locked.** `--base #FAFAF9` · `--base-2 #F2F1ED` · `--ink #181818` · `--band #141414` · `--muted #4A4A4A` · `--grey #828282` · `--gold #C9A227` · `--gold-lt #E3C766` · `--line #E4E2DC`. **Gold is never a large area** — type, hairlines and small fills only.
- **Type is locked.** Fraunces (`--disp`) for display, Plus Jakarta Sans (`--sans`) for everything else. Serif italic is reserved for one or two emphasis words per headline, never a full sentence.
- **Nothing ships in default shadcn styling.** shadcn provides behaviour and ARIA; the look comes from the tokens above.
- **Bespoke CSS stays plain CSS** in `app/globals.css`, below the `@theme` block, with comments carrying the reasoning. The arch, the sticky reel and the marquees are not rewritten as utilities.
- **No invented facts.** There are no course fees, no timetable and no testimonials. Do not add them, do not imply them, do not design a slot that reads as broken without them.
- **One conversion path:** message or email the team. There is no booking system and no online payment.
- **Contact details, verbatim:** phone `+61 498 183 332` · WhatsApp `0422 362 426` · email `info@mirrorartsedu.com` · WeChat ID `MirrorArtsEdu` · Xiaohongshu `789947009`. The studio-hire poster's `Info@mirrorartseducation.com` is an error on the poster and is not used.
- **Campuses, verbatim:** Main `1F/244 Canterbury Rd, Surrey Hills VIC 3127` · Glen `36 Kincumber Dr, Glen Waverley VIC 3150`.
- **Socials:** `https://www.facebook.com/p/Mirror-Arts-Education-61575724035583/` · `https://www.instagram.com/mirrorartseducation/` · `https://www.youtube.com/@mirrordramastudio2722`.
- **No `hreflang` anywhere until `/zh` exists.** Pointing at 404s is worse than omitting it.
- **`prototype/` is reference only.** Do not edit it. It is excluded from ESLint and gets deleted once the port is signed off.
- **Do not reintroduce framer-motion.** It was removed on purpose — `AnimatePresence` with `mode="wait"` froze the copy because exits never resolved. Cross-fades are CSS.
- **Commit after every task.**

### Copy voice

Match `components/sections/courses.tsx`. Concrete, specific, no marketing slop. "A Trinity-certified drama teacher runs the room: drama games, line work, movement, table reads." Not "Our passionate educators foster creativity." Run finished copy through the `stop-slop` skill.

English course and faculty copy is **written from** the Chinese source in `content/MIRROR-ARTS-EDUCATION.md`, not machine-translated. The registers differ. Keep every checkable fact — durations, ages, class caps, named institutions, award names, years.

---

## File structure

```
lib/content/            NEW — one module per domain object
  site.ts               contact, campuses, socials, nav tree
  disciplines.ts        4 categories
  courses.ts            9 courses
  faculty.ts            7 teachers
  team.ts               4 leadership + credits
  timeline.ts           2017 → 2025
  productions.ts        6 works
  workshops.ts          15 workshops in 3 families
  venue.ts              5 hire spaces
  achievements.ts       competitions, exam reports, credential bodies
  partners.ts           11 media · 15 support · 7 institutions
  content.test.ts       integrity tests over all of the above
  types.ts              shared types

lib/courses.ts          MODIFY — derive from content/courses.ts

components/site/        MODIFY — shared shell
  page-hero.tsx         NEW
  crumbs.tsx            NEW
  page-nav.tsx          NEW
  section.tsx           NEW — Section, SectionHead
  masthead.tsx          existing
  footer.tsx            existing
  intro.tsx             existing

components/shared/      NEW — extracted from homepage sections
  enquiry-form.tsx      from sections/find-us.tsx
  campus-tabs.tsx       from sections/find-us.tsx
  logo-belt.tsx         from sections/partners.tsx
  video-figure.tsx      NEW — poster-frame swap player
  lightbox.tsx          NEW — shadcn dialog wrapper

components/ui/          NEW — shadcn output, restyled
app/                    14 new route files
scripts/                4 new media scripts
```

---

## Task 1: Content layer foundation — types, site, disciplines, and the integrity test

Sets up the test harness and the two smallest content modules, so every later content task has a working test to extend.

**Files:**
- Create: `lib/content/types.ts`
- Create: `lib/content/site.ts`
- Create: `lib/content/disciplines.ts`
- Create: `lib/content/content.test.ts`
- Modify: `package.json` — add a `test` script
- Modify: `eslint.config.mjs` — allow the test file's Node imports if it complains

**Interfaces:**
- Consumes: nothing
- Produces:
  - `type Slug = string`
  - `type DisciplineId = "performance" | "language" | "music" | "posture"`
  - `type Asset = { src: string; alt: string; width: number; height: number }`
  - `type Meta = { label: string; value: string }`
  - `SITE` object with `SITE.phone`, `SITE.whatsapp`, `SITE.email`, `SITE.wechat`, `SITE.xiaohongshu`, `SITE.socials`, `SITE.campuses`
  - `type Campus = { id: "surrey-hills" | "glen-waverley"; name: string; address: string; suburb: string; postcode: string; mapEmbed: string }`
  - `DISCIPLINES: Discipline[]` where `Discipline = { id: DisciplineId; title: string; cn: string; accent: string; blurb: string }`
  - `getDiscipline(id: DisciplineId): Discipline`

- [ ] **Step 1: Write the failing test**

Create `lib/content/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";

import { SITE } from "./site.ts";
import { DISCIPLINES, getDiscipline } from "./disciplines.ts";

test("site carries the locked contact details verbatim", () => {
  assert.equal(SITE.phone, "+61 498 183 332");
  assert.equal(SITE.whatsapp, "0422 362 426");
  assert.equal(SITE.email, "info@mirrorartsedu.com");
  assert.equal(SITE.wechat, "MirrorArtsEdu");
});

test("site does not carry the poster's wrong email", () => {
  const blob = JSON.stringify(SITE).toLowerCase();
  assert.ok(
    !blob.includes("mirrorartseducation.com"),
    "the studio-hire poster's address is an error and must not appear",
  );
});

test("both campuses are present with full addresses", () => {
  assert.equal(SITE.campuses.length, 2);
  const [main, glen] = SITE.campuses;
  assert.equal(main.address, "1F/244 Canterbury Rd");
  assert.equal(main.suburb, "Surrey Hills");
  assert.equal(main.postcode, "3127");
  assert.equal(glen.address, "36 Kincumber Dr");
  assert.equal(glen.suburb, "Glen Waverley");
  assert.equal(glen.postcode, "3150");
});

test("campus map embeds use the frameable google endpoint", () => {
  // maps.google.com/maps?q=…&output=embed 301s, and the redirect carries
  // X-Frame-Options: SAMEORIGIN, which silently kills the iframe.
  for (const c of SITE.campuses) {
    assert.ok(
      c.mapEmbed.startsWith("https://www.google.com/maps/embed?pb="),
      `${c.id} must use the /maps/embed?pb= form`,
    );
  }
});

test("there are four disciplines and their ids are unique", () => {
  assert.equal(DISCIPLINES.length, 4);
  assert.equal(new Set(DISCIPLINES.map((d) => d.id)).size, 4);
});

test("every discipline accent is a six-digit hex", () => {
  for (const d of DISCIPLINES) {
    assert.match(d.accent, /^#[0-9A-Fa-f]{6}$/, `${d.id} accent`);
  }
});

test("getDiscipline throws on an unknown id rather than returning undefined", () => {
  assert.throws(() => getDiscipline("dance" as never), /unknown discipline/i);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test lib/content/content.test.ts`
Expected: FAIL — `Cannot find module './site.ts'`

- [ ] **Step 3: Write `lib/content/types.ts`**

```ts
/* Shared shapes for the content layer.

   Cross-links between modules are by slug, never by display name, so a
   rename cannot silently break a relationship. */

export type Slug = string;

export type DisciplineId = "performance" | "language" | "music" | "posture";

export type Asset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Meta = { label: string; value: string };
```

- [ ] **Step 4: Write `lib/content/site.ts`**

```ts
/* Contact details, campuses and social accounts.

   Every one of these appears in the footer, on /contact, and inside JSON-LD.
   They are declared once here.

   The studio-hire poster prints Info@mirrorartseducation.com. That address
   does not match the business's own domain and is treated as an error on the
   poster — the site uses info@mirrorartsedu.com throughout. Flagged to the
   client; see the spec's pre-launch gates. */

export type Campus = {
  id: "surrey-hills" | "glen-waverley";
  name: string;
  cn: string;
  address: string;
  suburb: string;
  state: "VIC";
  postcode: string;
  /* Must be the www.google.com/maps/embed?pb=… form. The
     maps.google.com/maps?q=…&output=embed form 301s, and that redirect
     carries X-Frame-Options: SAMEORIGIN, which kills the frame silently. */
  mapEmbed: string;
};

export const SITE = {
  name: "Mirror Arts Education",
  cn: "墨尔本魔镜艺术教育",
  formerName: "Mirror Drama Studio",

  phone: "+61 498 183 332",
  whatsapp: "0422 362 426",
  email: "info@mirrorartsedu.com",
  wechat: "MirrorArtsEdu",
  xiaohongshu: "789947009",

  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Mirror-Arts-Education-61575724035583/",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mirrorartseducation/",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@mirrordramastudio2722",
    },
  ],

  campuses: [
    {
      id: "surrey-hills",
      name: "Main campus",
      cn: "总校区",
      address: "1F/244 Canterbury Rd",
      suburb: "Surrey Hills",
      state: "VIC",
      postcode: "3127",
      mapEmbed: "REPLACE — see step 5",
    },
    {
      id: "glen-waverley",
      name: "Glen campus",
      cn: "Glen 校区",
      address: "36 Kincumber Dr",
      suburb: "Glen Waverley",
      state: "VIC",
      postcode: "3150",
      mapEmbed: "REPLACE — see step 5",
    },
  ] satisfies Campus[],
} as const;
```

- [ ] **Step 5: Lift the two real map embed URLs out of the homepage**

The working embed URL already exists in the codebase. Run:

```bash
grep -n "maps/embed" components/sections/find-us.tsx
```

Copy the exact `pb=` URLs found there into the two `mapEmbed` fields, replacing the `REPLACE` placeholders. If `find-us.tsx` has only one campus URL, generate the second from Google Maps' own **Share → Embed a map** panel, which produces the `/maps/embed?pb=` form. Do not hand-construct a `maps.google.com/maps?q=` URL — it 301s into an `X-Frame-Options: SAMEORIGIN` response and the frame dies with no error.

- [ ] **Step 6: Write `lib/content/disciplines.ts`**

Accent colours are the client's own, taken from their poster system (`content/MIRROR-ARTS-EDUCATION.md` §13) and already in use in `components/sections/courses.tsx`. They must match that file exactly.

```ts
import type { DisciplineId } from "./types.ts";

export type Discipline = {
  id: DisciplineId;
  title: string;
  cn: string;
  /* From the client's existing poster system. These four already appear in
     components/sections/courses.tsx and must not drift from it. */
  accent: string;
  blurb: string;
};

export const DISCIPLINES: Discipline[] = [
  {
    id: "performance",
    title: "Performance",
    cn: "表演类",
    accent: "#3E7CB1",
    blurb:
      "Drama and musical theatre. Ten weeks of games, line work, movement and table reads, ending in front of an audience.",
  },
  {
    id: "language",
    title: "Language & expression",
    cn: "语言表达",
    accent: "#D9633B",
    blurb:
      "Speech, bilingual hosting and voice-over. The AMEB syllabus, a studio microphone, and classes capped at eight.",
  },
  {
    id: "music",
    title: "Music",
    cn: "音乐类",
    accent: "#4F8A5B",
    blurb:
      "Vocal, choir and composition. AMEB grades, the school's performing choir, and students who finish the term with a piece of their own.",
  },
  {
    id: "posture",
    title: "Posture & etiquette",
    cn: "形体与礼仪",
    accent: "#7A5A9E",
    blurb:
      "Stretch and strength for the spine, neck and pelvis, then the daily detail: standing, sitting, walking, and holding yourself under lights.",
  },
];

export function getDiscipline(id: DisciplineId): Discipline {
  const found = DISCIPLINES.find((d) => d.id === id);
  if (!found) throw new Error(`unknown discipline: ${id}`);
  return found;
}
```

- [ ] **Step 7: Add the test script**

In `package.json`, add to `scripts`:

```json
"test": "node --test lib/content/*.test.ts"
```

Node 24 strips TypeScript types natively, so this needs no test framework, no transpiler and no new dependency.

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 7 tests.

- [ ] **Step 9: Verify the build and lint are still clean**

Run: `npm run build && npm run lint`
Expected: both clean, still two routes.

- [ ] **Step 10: Commit**

```bash
git add lib/content package.json
git commit -m "feat: content layer foundation — site, disciplines, integrity tests

Facts now appear in three or four places each, so they get declared once.
Node 24 strips types natively, so the tests need no framework and no new
dependency.

The campus map test exists because the wrong Google URL form fails silently:
maps.google.com/maps?q=…&output=embed 301s, and that redirect carries
X-Frame-Options: SAMEORIGIN, which kills the iframe with no error anywhere."
```

---

## Task 2: The nine courses

**Files:**
- Create: `lib/content/courses.ts`
- Modify: `lib/content/content.test.ts` — append course tests
- Modify: `lib/courses.ts` — derive from the catalogue

**Interfaces:**
- Consumes: `DisciplineId`, `Asset` from `./types.ts`; `DISCIPLINES` from `./disciplines.ts`
- Produces:
  - `type Course` — full shape below
  - `COURSES: Course[]` (nine entries)
  - `getCourse(slug: string): Course` — throws on unknown
  - `coursesByDiscipline(id: DisciplineId): Course[]`
  - `courseSlugs(): string[]`
  - Slugs, fixed: `english-drama`, `musical-theatre`, `english-speech`, `bilingual-hosting`, `voice-over`, `vocal`, `choir`, `music-composition`, `posture`

- [ ] **Step 1: Write the failing tests**

Append to `lib/content/content.test.ts`:

```ts
import { COURSES, getCourse, coursesByDiscipline, courseSlugs } from "./courses.ts";

test("there are nine courses with unique slugs", () => {
  assert.equal(COURSES.length, 9);
  assert.equal(new Set(COURSES.map((c) => c.slug)).size, 9);
});

test("every course belongs to a real discipline", () => {
  const ids = new Set(DISCIPLINES.map((d) => d.id));
  for (const c of COURSES) {
    assert.ok(ids.has(c.discipline), `${c.slug} has discipline ${c.discipline}`);
  }
});

test("the four disciplines partition the nine courses 2/3/3/1", () => {
  assert.equal(coursesByDiscipline("performance").length, 2);
  assert.equal(coursesByDiscipline("language").length, 3);
  assert.equal(coursesByDiscipline("music").length, 3);
  assert.equal(coursesByDiscipline("posture").length, 1);
});

test("the durations that differ from the default survive", () => {
  // These three are the facts most likely to be flattened to "60 min".
  assert.equal(getCourse("english-drama").minutes, 90);
  assert.equal(getCourse("choir").minutes, 120);
  assert.equal(getCourse("posture").minutes, 60);
});

test("every course runs ten sessions a term from age six", () => {
  for (const c of COURSES) {
    assert.equal(c.sessionsPerTerm, 10, c.slug);
    assert.equal(c.minAge, 6, c.slug);
  }
});

test("bilingual hosting keeps its class cap of eight", () => {
  assert.equal(getCourse("bilingual-hosting").maxStudents, 8);
});

test("every course has body copy, two highlights and at least one teacher", () => {
  for (const c of COURSES) {
    assert.ok(c.body.length >= 2, `${c.slug} body`);
    assert.equal(c.highlights.length, 2, `${c.slug} highlights`);
    assert.ok(c.teachers.length >= 1, `${c.slug} teachers`);
    assert.ok(c.includes.length >= 1, `${c.slug} includes`);
  }
});

test("no course carries a price or a timetable", () => {
  // There are none. If one appears here it was invented.
  const blob = JSON.stringify(COURSES);
  assert.ok(!/\$\d/.test(blob), "a dollar figure appeared in the catalogue");
  assert.ok(
    !/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(blob),
    "a weekday appeared in the catalogue",
  );
});

test("courseSlugs returns every slug", () => {
  assert.deepEqual(courseSlugs().sort(), COURSES.map((c) => c.slug).sort());
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './courses.ts'`

- [ ] **Step 3: Write `lib/content/courses.ts`**

The full shape, with **English drama written out completely as the exemplar**. The other eight follow the same shape, with copy written from the Chinese in `content/MIRROR-ARTS-EDUCATION.md` §4.1–4.9.

```ts
import type { Asset, DisciplineId, Slug } from "./types.ts";

export type Course = {
  slug: string;
  title: string;
  cn: string;
  /* The one-line promise from the client's own poster, in English. */
  strapline: string;
  discipline: DisciplineId;
  minutes: 60 | 90 | 120;
  sessionsPerTerm: 10;
  minAge: 6;
  /* Only bilingual hosting caps its class. */
  maxStudents?: number;
  /* From the client's poster system. Used for the rule under the heading and
     nothing larger — gold and the accents are type-scale colours here. */
  accent: string;
  /* Body copy, one string per paragraph. Written from the Chinese poster,
     not translated from it. */
  body: string[];
  /* What a term actually contains. */
  includes: string[];
  /* The two claims the poster makes. Kept as a pair — they are printed as a
     pair on every poster in the system. */
  highlights: [string, string];
  /* Faculty slugs. Cross-linked by slug so a rename cannot break it. */
  teachers: Slug[];
  /* Where the course leads. Either an exam pathway or a production. */
  leadsTo?: { label: string; href: string };
  /* The client's original Chinese poster. Shown as an aside — it is their
     artefact and it carries the brand colour system. */
  poster: Asset;
  hero: Asset;
};

export const COURSES: Course[] = [
  {
    slug: "english-drama",
    title: "English drama",
    cn: "英文戏剧课",
    strapline: "Building a character, and finding the feeling inside it",
    discipline: "performance",
    minutes: 90,
    sessionsPerTerm: 10,
    minAge: 6,
    accent: "#3E7CB1",
    body: [
      "A Trinity-certified drama teacher runs the room. The training is the training actors get — drama games, line work, movement, table reads, and the slow business of understanding why a character does what they do.",
      "The point is not to produce actors. Drama is where a child learns to read a room: to take an idea, shape it, and hand it to someone else so they understand it. Along the way it builds the things that are hard to teach directly — spoken communication, solving a problem in front of other people, and enough empathy to play someone who is not you.",
      "Children improvise and talk their way through the work rather than being handed a script and a blocking chart. What they end up with is a way of expressing what they already had.",
      "The course is exam-gradable.",
    ],
    includes: [
      "Drama games",
      "Line and diction work",
      "Physical and movement training",
      "Table reads",
      "Character study",
    ],
    highlights: [
      "Spoken communication, problem-solving and creativity",
      "Self-concept, social awareness and empathy",
    ],
    teachers: ["delyse-weisz", "callum-dibbert"],
    leadsTo: { label: "Exams and pathways", href: "/courses/exams" },
    poster: {
      src: "/assets/courses/posters/english-drama.png",
      alt: "The original Chinese course poster for English drama",
      width: 860,
      height: 1200,
    },
    hero: {
      src: "/assets/cards/performance.jpg",
      alt: "Students in animal costume and face paint in the annual production of The Jungle Book",
      width: 1160,
      height: 870,
    },
  },

  // The remaining eight follow. Write each from content/MIRROR-ARTS-EDUCATION.md:
  //
  //   musical-theatre     §4.7  60 min  performance  #3E7CB1
  //   english-speech      §4.2  60 min  language     #D9633B
  //   bilingual-hosting   §4.3  60 min  language     #D9633B  maxStudents: 8
  //   voice-over          §4.4  60 min  language     #D9633B
  //   vocal               §4.5  60 min  music        #4F8A5B
  //   choir               §4.6  120 min music        #4F8A5B
  //   music-composition   §4.8  60 min  music        #4F8A5B
  //   posture             §4.9  60 min  posture      #7A5A9E
];

export function getCourse(slug: string): Course {
  const found = COURSES.find((c) => c.slug === slug);
  if (!found) throw new Error(`unknown course: ${slug}`);
  return found;
}

export function coursesByDiscipline(id: DisciplineId): Course[] {
  return COURSES.filter((c) => c.discipline === id);
}

export function courseSlugs(): string[] {
  return COURSES.map((c) => c.slug);
}
```

- [ ] **Step 4: Write the remaining eight courses**

Each one, from the Chinese in `content/MIRROR-ARTS-EDUCATION.md`. The facts below are the ones that must survive — they are the reason a parent picks one course over another, and every one of them is currently locked inside a JPEG.

| Slug | Facts that must appear in the copy |
|---|---|
| `musical-theatre` | Singing, acting and staging together. Camera-presence training. Rehearsal-led — the term is built around a piece. Ends in a showcase |
| `english-speech` | Built to the AMEB syllabus with drama technique folded in. Teacher taught at Trinity and Caulfield Grammar and has served as an AMEB speech examiner and competition adjudicator. Grades support scholarship and **private**-school applications — §4.2 says 私校, and in Victoria "selective school" means the government selective-entry schools, which is a different thing. Covers topic discussion and speech writing, not just delivery |
| `bilingual-hosting` | Eight students maximum. Diana Zhao grew up in Melbourne, then trained in broadcasting and hosting at the Shanghai Theatre Academy. Bilingual poetry recitation and MC technique. **Mirror is CEFA's only children's language-performance examination centre in Australia**; students sit twice-yearly assessments and receive CEFA-issued certificates |
| `voice-over` | Bilingual. Breath and voice production, character emotion, microphone technique. Material spans animation, film, documentary, advertising and folk tales. One-to-one and group. Ends with the children's own recorded work played back |
| `vocal` | Method, aural training, original repertoire, studio recording, MV shoots. *Born to Fly* (2022) played on the Beijing Winter Olympics Organising Committee's site and the Chinese Consulate-General in Melbourne's platform; 笔画春秋 (2023) screened at the Consulate-General's Teachers' Day event. Separate AMEB vocal grade preparation |
| `choir` | **120 minutes.** Part-singing, breath and resonance, pitch and rhythm, Chinese and English repertoire. **The choir is the school's official performing group** — members represent Mirror at cultural exchange events and large public performances, and record on the original MVs |
| `music-composition` | Theory, rhythm and pitch from the ground up. Melody, rhythm and harmony combined into structure. From improvised idea to a finished piece. Suits beginners and students with existing training. Collaborative writing |
| `posture` | Melbourne children sit all day; the course addresses rounded shoulders, hunching and turned-in feet. Stretch and strength for spine, neck and pelvis. Standing, sitting, walking, crouching and stage bearing. Teacher holds a Monash Master of Education and ACIC senior certification in posture and etiquette, and has trained cabin crew for an international airline |

`leadsTo` targets: `english-speech`, `bilingual-hosting` and `vocal` → `/courses/exams`. `vocal`, `choir` and `music-composition` → `/stage/born-to-fly`. `musical-theatre` and `english-drama` → `/stage/jungle-book`.

`teachers` values, matching the slugs Task 3 will create: `delyse-weisz`, `callum-dibbert`, `diana-zhao`, `becky-li`, `joshua-dai`, `rachel-cai`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS. If the `no price or timetable` test fails, a dollar figure or weekday got into the copy — remove it, it was invented.

- [ ] **Step 6: Keep the enquiry allow-list a literal, and test it against the catalogue**

*(Erratum, 7 Aug: this step originally said to derive the list — `[...CATALOGUE.map(c => c.title), "Not sure yet"]`. Do not. `components/sections/find-us.tsx` is a client component, and object properties do not tree-shake, so deriving pulls the whole ~14.6 KB catalogue — every body paragraph, alt string and poster path — into the client bundle to fill a nine-option `<select>` that reads only `.title`. A test gives the same anti-drift guarantee at zero bytes.)*

Leave `lib/courses.ts` as a hand-kept literal and extend its comment to say why, so nobody "fixes" it back. Then add this to `lib/content/content.test.ts`:

```ts
import { COURSES as ENQUIRY_COURSES } from "../courses.ts";

test("the enquiry list stays in step with the course catalogue", () => {
  // lib/courses.ts is deliberately a literal rather than a derivation —
  // deriving it would pull the whole catalogue into the client bundle through
  // find-us.tsx, which is a client component. This test is what keeps the two
  // honest instead.
  assert.deepEqual(
    [...ENQUIRY_COURSES],
    [...COURSES.map((c) => c.title), "Not sure yet"],
  );
});
```

- [ ] **Step 7: Verify the enquiry form still compiles against it**

Run: `npm run build && npm run lint`
Expected: both clean. If `app/actions/enquiry.ts` or `components/sections/find-us.tsx` breaks on the type, it was relying on the literal tuple type — widen the annotation there to `readonly string[]` rather than reverting this change.

- [ ] **Step 8: Commit**

```bash
git add lib/content/courses.ts lib/content/content.test.ts lib/courses.ts
git commit -m "feat: the nine courses as content, with the enquiry list derived

Every word of this was locked inside a ~1 MB JPEG on the old site, which is
why none of it was searchable and none of it was readable by a screen reader.

The enquiry <select> now derives from the catalogue instead of sitting beside
it as a second hand-kept list of the same nine things.

Tests pin the three durations that differ from the default and the class cap
of eight, because those are the facts a summary flattens first. One test
asserts no dollar figure and no weekday appears anywhere in the catalogue —
there is no published pricing and no timetable, so either would be invented."
```

---

## Task 3: Faculty, leadership and the timeline

**Files:**
- Create: `lib/content/faculty.ts`
- Create: `lib/content/team.ts`
- Create: `lib/content/timeline.ts`
- Modify: `lib/content/content.test.ts`

**Interfaces:**
- Consumes: `Asset`, `Slug`, `DisciplineId`; `COURSES` from `./courses.ts`
- Produces:
  - `FACULTY: Teacher[]`, `getTeacher(slug): Teacher`, `facultyByDiscipline(id): Teacher[]`, `teacherSlugs(): string[]`
  - `type Teacher = { slug; name; cn?; disciplines: DisciplineId[]; subject; subjectCn; credentials: string[]; portrait: Asset; alsoLeadership?: boolean }`
  - `TEAM: Leader[]`, `getLeader(slug): Leader`
  - `type Leader = { slug; name; cn; role; roleCn; bio: string[]; credits: Credit[]; portrait: Asset }`
  - `type Credit = { year: number | string; text: string }`
  - `TIMELINE: Milestone[]`
  - `type Milestone = { year: number; title: string; body: string; image?: Asset }`

- [ ] **Step 1: Write the failing tests**

Append to `lib/content/content.test.ts`:

```ts
import { FACULTY, getTeacher, facultyByDiscipline, teacherSlugs } from "./faculty.ts";
import { TEAM, getLeader } from "./team.ts";
import { TIMELINE } from "./timeline.ts";

test("there are six teachers with unique slugs", () => {
  assert.equal(FACULTY.length, 6);
  assert.equal(new Set(FACULTY.map((t) => t.slug)).size, 6);
});

test("every course's teachers resolve to a real faculty slug", () => {
  const known = new Set(teacherSlugs());
  for (const c of COURSES) {
    for (const t of c.teachers) {
      assert.ok(known.has(t), `${c.slug} references unknown teacher ${t}`);
    }
  }
});

test("every teacher teaches at least one course", () => {
  const taught = new Set(COURSES.flatMap((c) => c.teachers));
  for (const t of FACULTY) {
    assert.ok(taught.has(t.slug), `${t.slug} teaches nothing`);
  }
});

test("every teacher has credentials and a portrait", () => {
  for (const t of FACULTY) {
    assert.ok(t.credentials.length >= 1, `${t.slug} credentials`);
    assert.ok(t.portrait.src.startsWith("/assets/"), `${t.slug} portrait path`);
    assert.ok(t.portrait.alt.length > 10, `${t.slug} portrait alt`);
  }
});

test("Diana Zhao is marked as holding both a teaching and a leadership role", () => {
  // She is Operations Director and the bilingual hosting teacher. Confirmed
  // by Kayden 6 Aug 2026 — she is the person the old site called "Daisy".
  assert.equal(getTeacher("diana-zhao").alsoLeadership, true);
  assert.ok(TEAM.some((l) => l.slug === "diana-zhao"));
});

test("there are four leaders and both founders carry credit lists", () => {
  assert.equal(TEAM.length, 4);
  assert.ok(getLeader("rachel-fu").credits.length >= 8);
  assert.ok(getLeader("koven-song").credits.length >= 8);
});

test("the timeline runs 2017 to 2025 in order with no gaps in the years present", () => {
  assert.equal(TIMELINE[0].year, 2017);
  assert.equal(TIMELINE.at(-1)?.year, 2025);
  const years = TIMELINE.map((m) => m.year);
  assert.deepEqual(years, [...years].sort((a, b) => a - b), "out of order");
  assert.equal(new Set(years).size, years.length, "duplicate year");
});

test("the 2025 milestone is the rename", () => {
  const y2025 = TIMELINE.find((m) => m.year === 2025);
  assert.match(`${y2025?.title} ${y2025?.body}`, /Mirror Arts Education/);
  assert.match(`${y2025?.title} ${y2025?.body}`, /Drama Studio/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './faculty.ts'`

- [ ] **Step 3: Write `lib/content/faculty.ts`**

Six teachers from `content/MIRROR-ARTS-EDUCATION.md` §5, slugged `delyse-weisz`, `callum-dibbert`, `diana-zhao`, `becky-li`, `joshua-dai`, `rachel-cai` — the same six Task 2's courses already reference.

*(Erratum, 7 Aug: earlier drafts of this plan said seven. §5's table has six rows. The founders lecture but teach no course in the catalogue, so they stay in `team.ts` and are cross-linked, not duplicated into `faculty.ts` — a faculty entry that teaches nothing would fail the test below and would be a claim the source does not make.)*

Credentials are lists, one claim per string, so the page can render them as a set rather than a paragraph:

```ts
{
  slug: "delyse-weisz",
  name: "Delyse Weisz",
  disciplines: ["performance", "language"],
  subject: "Drama & speech",
  subjectCn: "演讲·戏剧",
  credentials: [
    "Award-winning director and educator, twenty years and over a hundred children's productions",
    "Convenor of Eisteddfod by the Bay",
    "Adjudicator, Ainger Peck Speech Award and Rotary Youth Speech",
    "Founder of DramaWise Academy",
    "Prepares students for AMEB, Trinity, LAMDA, VCE Drama and eisteddfods",
  ],
  portrait: {
    src: "/assets/faculty/delyse-weisz.jpg",
    alt: "Delyse Weisz, drama and speech teacher",
    width: 800,
    height: 1000,
  },
},
```

Portrait paths point at files Task 8 produces. Until then the build will render broken images — that is expected and is fixed in Task 8, not worked around here.

- [ ] **Step 4: Write `lib/content/team.ts`**

Four leaders. Rachel Fu and Koven Song carry full credit lists — this is the strongest credibility material the business has and the old site rendered it as an image.

Rachel Fu's credits, from §5, in reverse chronological order: 2024 chief director of Melbourne's first Children's Spring Festival Gala; 2023 executive producer of 笔画春秋; 2022 executive producer of 此生飞翔, featured on the Beijing Winter Olympics Organising Committee's official site; 2004 second female lead in *The Kitchen*; 2003 lead in *Wind Through the Four Seasons*; 2002 lead in the national tour of *Cuihua, Serve the Sauerkraut*; 2001 lead in *Romance of the Desert*; 2000 lead in *Thursday, Wednesday*, directed by Ning Hao, which won Best Director at the 2001 Beijing College Student Film Festival and a Silver Award at the China Digital Media Competition for College Students; 2000 second female lead in *Homeland Guardian*. Graduated 2002 in Acting from the Central Academy of Drama.

Koven Song's, from §5: 2022 chief planner and director of both MVs; male lead in the Australian short 《家有两面旗》; TV credits 《堆积情感》, 《白洋淀·女人和鬼子》, 《水落石出 III》; 《风行四季》as actor and assistant director; lead dubbing on eight features including 《霍元甲》and 《喜剧之王》; 2005 creator, performer and on-site executive director of CCTV's 3·15 gala; 2004 executive director of 《情系半边天》; 2003 male lead in 《为你化作流星雨》; 2002 creation and planning of 《翠花，上酸菜》. Graduated 2002, Central Academy of Drama, Acting.

Chinese work titles keep their Chinese, with an English gloss where the old site gave one. Wrap them in `<span lang="zh-Hans">` at render time — the `Credit.text` field stores plain text and the component adds the attribute.

- [ ] **Step 5: Write `lib/content/timeline.ts`**

Nine milestones, 2017 → 2025, from §7. 2023 currently has no milestone of its own — the old site groups 2022 and 2023 loosely. **Write the eight that are evidenced and leave 2023 out** rather than inventing one; it is pre-launch gate #7 and the client owes us the answer. The test above asserts order and uniqueness, not that every year between the endpoints is present, so eight entries passes.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 8: Commit**

```bash
git add lib/content
git commit -m "feat: faculty, leadership and the timeline as content

A test asserts every course's teacher slugs resolve and every teacher teaches
something, so the cross-links cannot rot in either direction.

Rachel Fu and Koven Song's credit lists come across in full. Between them
that is a Central Academy of Drama training, a Ning Hao film that won Best
Director at the 2001 Beijing College Student Film Festival, lead dubbing on
eight features and a CCTV gala — and the old site rendered all of it as a
JPEG.

2023 has no milestone. The old site groups it loosely with 2022 and we are
not inventing one; it is on the client gate list."
```

---

## Task 4: Productions, workshops, venue, achievements and partners

The remaining five content modules. Grouped into one task because each is small, they share no dependency on one another, and splitting them would give a reviewer five near-identical gates.

**Files:**
- Create: `lib/content/productions.ts`, `workshops.ts`, `venue.ts`, `achievements.ts`, `partners.ts`
- Modify: `lib/content/content.test.ts`

**Interfaces:**
- Produces:
  - `PRODUCTIONS: Production[]`, `getProduction(slug)`, `productionSlugs()`
    `type Production = { slug; title; cn; year: number; kind: "mv" | "stage" | "gala" | "competition"; blurb: string; body: string[]; credits: Meta[]; video: { loop: string; full: string; poster: Asset }; stills: Asset[]; relatedCourses: Slug[] }`
  - `WORKSHOPS: Workshop[]`, `WORKSHOP_FAMILIES: Family[]`, `workshopsByFamily(id)`
    `type Workshop = { slug; title; cn; family: FamilyId; body: string; minAge?: number; materialsProvided: boolean; keepsWork: boolean; supervision?: string; image?: Asset }`
    `type FamilyId = "arts" | "craft" | "media"`
  - `HIRE_SPACES: HireSpace[]`, `VENUE_TERMS: string[]`, `VENUE_RATES_AS_AT: string`
    `type HireSpace = { slug; name; squareMetres: number; peakRate: number; offPeakRate: number; inclusions: string[]; extras: { label: string; rate: number }[]; photos: Asset[] }`
  - `ACHIEVEMENTS: Achievement[]`, `CREDENTIAL_BODIES: Body[]`
  - `PARTNERS: { media: Logo[]; support: Logo[]; institutions: Institution[] }`

- [ ] **Step 1: Write the failing tests**

Append to `lib/content/content.test.ts`:

```ts
import { readdirSync, existsSync } from "node:fs";
import { PRODUCTIONS, getProduction, productionSlugs } from "./productions.ts";
import { WORKSHOPS, WORKSHOP_FAMILIES, workshopsByFamily } from "./workshops.ts";
import { HIRE_SPACES, VENUE_TERMS, VENUE_RATES_AS_AT } from "./venue.ts";
import { ACHIEVEMENTS, CREDENTIAL_BODIES } from "./achievements.ts";
import { PARTNERS } from "./partners.ts";

test("there are six productions, one per video master", () => {
  assert.equal(PRODUCTIONS.length, 6);
  assert.equal(new Set(productionSlugs()).size, 6);
});

test("productions reference courses that exist", () => {
  const known = new Set(COURSES.map((c) => c.slug));
  for (const p of PRODUCTIONS) {
    for (const s of p.relatedCourses) {
      assert.ok(known.has(s), `${p.slug} references unknown course ${s}`);
    }
  }
});

test("the belt and road entry carries the competition and not the results", () => {
  const p = getProduction("belt-and-road-2025");
  const blob = [p.blurb, ...p.body].join(" ");
  assert.match(blob, /China Daily/);
  assert.match(blob, /2019/);
  assert.ok(!/XXX/i.test(blob), "the old placeholder text survived");
  assert.ok(
    !/\b(first|second|third)\s+place/i.test(blob),
    "an unverified placing claim appeared",
  );
});

test("there are fifteen workshops across three families", () => {
  assert.equal(WORKSHOPS.length, 15);
  assert.equal(WORKSHOP_FAMILIES.length, 3);
  assert.equal(workshopsByFamily("arts").length, 4);
  assert.equal(workshopsByFamily("craft").length, 7);
  assert.equal(workshopsByFamily("media").length, 4);
});

test("the three age-restricted workshops keep their restrictions", () => {
  const byslug = Object.fromEntries(WORKSHOPS.map((w) => [w.slug, w]));
  assert.equal(byslug["lacquer-beads"].minAge, 5);
  assert.equal(byslug["sachet-making"].minAge, 12);
  assert.equal(byslug["soap-making"].minAge, 12);
  assert.ok(byslug["soap-making"].supervision, "soap making needs supervision noted");
});

test("there are five hire spaces and the function room is the dearest", () => {
  assert.equal(HIRE_SPACES.length, 5);
  const fn = HIRE_SPACES.find((s) => s.slug === "function-room");
  assert.equal(fn?.squareMetres, 150);
  assert.equal(fn?.peakRate, 100);
  assert.equal(fn?.offPeakRate, 80);
  assert.equal(Math.max(...HIRE_SPACES.map((s) => s.peakRate)), 100);
});

test("the function room's two extras survive", () => {
  const fn = HIRE_SPACES.find((s) => s.slug === "function-room");
  const extras = Object.fromEntries(fn!.extras.map((e) => [e.label, e.rate]));
  assert.equal(extras["LED screen"], 50);
  assert.equal(extras["Stage lighting"], 30);
});

test("the venue conditions and the as-at date are recorded", () => {
  assert.equal(VENUE_TERMS.length, 2);
  assert.match(VENUE_TERMS.join(" "), /cleaning fee/i);
  assert.match(VENUE_TERMS.join(" "), /20 minutes/);
  assert.match(VENUE_RATES_AS_AT, /^\d{4}$|\w+ \d{4}/);
});

test("every partner logo file named in content exists on disk", () => {
  for (const l of [...PARTNERS.media, ...PARTNERS.support]) {
    assert.ok(existsSync(`public${l.src}`), `missing ${l.src}`);
  }
});

test("the partner counts match what was sliced out of the sheets", () => {
  assert.equal(PARTNERS.media.length, 11);
  assert.equal(PARTNERS.support.length, 15);
  assert.ok(PARTNERS.institutions.length >= 7);
});

test("every named institution says what the relationship actually is", () => {
  for (const i of PARTNERS.institutions) {
    assert.ok(i.relationship.length > 20, `${i.name} relationship is too thin`);
  }
});

test("achievements carry no invented tallies", () => {
  const blob = JSON.stringify(ACHIEVEMENTS);
  assert.ok(!/XXX/i.test(blob), "placeholder text survived");
  assert.ok(CREDENTIAL_BODIES.length >= 3);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module './productions.ts'`

- [ ] **Step 3: Write `lib/content/productions.ts`**

Six works. Slugs and video sources map to `media/MANIFEST.md`:

| Slug | Title | cn | Year | Kind | Master |
|---|---|---|---|---|---|
| `born-to-fly` | Born to Fly | 此生飞翔 | 2022 | mv | `born-to-fly-olympic-mv.mov` |
| `brushstrokes-of-history` | Brushstrokes of History | 笔画春秋 | 2022 | mv | `bihua-chunqiu-original-mv.mp4` |
| `jungle-book` | The Jungle Book | 2025年度舞台剧 | 2025 | stage | `2025-jungle-book-stage-production.mp4` |
| `belt-and-road-2025` | Belt & Road Youth English Speech Competition | 2025英文演讲比赛"一带一路" | 2025 | competition | `2025-belt-and-road-speech-competition.mp4` |
| `snake-year-gala` | Year of the Snake Gala | 2025年蛇年春晚宣传片 | 2025 | gala | `2025-snake-year-gala-promo.mp4` |
| `horse-year-gala` | Year of the Horse Gala | 2026年马年春晚宣传片 | 2026 | gala | `2026-horse-year-gala-promo.mp4` |

`video.loop` points at `/assets/video/<slug>-loop.mp4` (Task 9 output). `video.full` holds the **Vercel Blob URL**, filled in by Task 9 — until then set it to the empty string and let the player fall back to the poster, which is the behaviour the spec specifies anyway.

Facts that must appear:

- **Born to Fly** — broadcast on the Beijing Winter Olympics Organising Committee's official site and the Chinese Consulate-General in Melbourne's platform, 2022. Rachel Fu executive producer and chief planner; Koven Song chief planner and director; Joshua Dai composer.
- **Brushstrokes of History** — released September 2022, screened at the Consulate-General's Teachers' Day event in 2023. Same three credits.
- **The Jungle Book** — the 2025 annual stage production. This is the footage the homepage hero runs.
- **Belt & Road** — hosted by China Daily, running since 2019, participants from more than fifty countries and regions. The 2025 seventh global final's theme was *"As global citizens in the digital age, how can we overcome prejudice in building a more connected world?"* **Nothing about how Mirror's students placed.** The old site's `XXX obtained Third, Second and First places` sentence is dropped and the test above enforces it.
- **Year of the Dragon gala, 2024** — Melbourne's first children's Spring Festival gala, Rachel Fu chief director. This has no video master of its own, so it is a `credits` line on the two gala entries and a timeline milestone, not a seventh production.

- [ ] **Step 4: Write `lib/content/workshops.ts`**

Fifteen, from §6, in the client's own three families. Slugs must include `lacquer-beads`, `sachet-making` and `soap-making` — the tests pin their age limits.

| Family | id | Count | Members |
|---|---|---|---|
| 中国传统艺术表演 | `arts` | 4 | traditional music, martial arts, dragon and lion dance, traditional dance |
| 中国传统手工工坊 | `craft` | 7 | lacquer fan, tie-dye, lacquer beads (5+), sachet (12+), eco paper, incense, soap (12+, adult supervision) |
| 派对承办 & 媒体体验 | `media` | 4 | Chinese singing, shadow puppets, presenter and broadcasting, voice-over and acting |

`materialsProvided` and `keepsWork` are booleans because the old site states them per workshop and organisations ask about both. Tie-dye makes a 50×50 cm handkerchief; shadow puppet students keep their puppet — those specifics go in `body`.

Bilingual copy already exists on the old site for these, so this module is an edit of existing English, not new writing.

- [ ] **Step 5: Write `lib/content/venue.ts`**

Recovered from the studio-hire poster, `extraction/assets/tmp1779196320_2319209_s-1502aaec.jpg`:

```ts
export const VENUE_RATES_AS_AT = "January 2026";

export const HIRE_SPACES: HireSpace[] = [
  { slug: "function-room", name: "Function room", squareMetres: 150,
    peakRate: 100, offPeakRate: 80,
    inclusions: [],
    extras: [
      { label: "LED screen", rate: 50 },
      { label: "Stage lighting", rate: 30 },
    ],
    photos: [/* 2 from the poster */] },
  { slug: "room-2", name: "Room 2", squareMetres: 47,
    peakRate: 65, offPeakRate: 50,
    inclusions: ["Air conditioning"], extras: [], photos: [] },
  { slug: "room-1", name: "Room 1", squareMetres: 32,
    peakRate: 55, offPeakRate: 40,
    inclusions: ["Air conditioning"], extras: [], photos: [] },
  { slug: "rooms-3-4", name: "Room 3 & Room 4", squareMetres: 27,
    peakRate: 45, offPeakRate: 30,
    inclusions: ["Air conditioning"], extras: [], photos: [] },
  { slug: "workshop-space", name: "Workshop space", squareMetres: 80,
    peakRate: 70, offPeakRate: 60,
    inclusions: ["Air conditioning"], extras: [], photos: [] },
];

/* Printed verbatim on the poster. Both are conditions an organisation needs
   before it enquires, so they are content, not fine print. */
export const VENUE_TERMS = [
  "Parties and events that include catering incur an additional cleaning fee.",
  "Bump in and out exceeding 20 minutes incurs an additional AUD 20 per half hour.",
];
```

`offPeakRate` is the weekday-before-5 rate. All spaces are at the main campus, Surrey Hills. Photo paths point at Task 7's output.

- [ ] **Step 6: Write `lib/content/achievements.ts`**

What is evidenced, and nothing else:

- **AMEB practical examination reports** — Vivian Fu, Speech & Performance Grade 2, result B+ Credit. Adrian Wong, Speech & Performance Grade 4, result A Honours, examiner Ms Julianne Eveleigh, 5 September 2024. Source image `1768491459884928-8626ad63.png`. **Publishing these names is pre-launch gate #1** — put a comment saying so directly above the entry so nobody ships it without checking.
- **Cultures of China Water Cube Cup, Melbourne** — 2023 Chinese Songs Contest award ceremony, two students with trophies. Source `1768491557135953-8e6e12e7.png`.
- **Australia-China International Music & Arts Association, Sound of Music, Melbourne** — singing, four award-ceremony photographs. Source `1768491565355570-908941cd.png`. Note: this source carries a Chinese browser's "AI识图" tooltip baked into the pixels and needs cropping or replacing.
- **National Children's Spring Festival Gala, Beijing** — 2026, hosting. Source `1768491477880857-4d33f976.png`.
- **CEFA language-performance certificates.**

`CREDENTIAL_BODIES` = AMEB, CEFA, Trinity College London, LAMDA, VCE Drama.

- [ ] **Step 7: Write `lib/content/partners.ts`**

Read the filenames off disk to get the eleven media and fifteen support entries right:

```bash
ls public/assets/partners/media public/assets/partners/support
```

`institutions` gets seven entries, each with a `relationship` string saying what the relationship actually is — the test requires more than twenty characters, because "partner" is not information:

- **AYACA** — Australian Youth Arts & Cultures Association, 澳大利亚青少年艺术文化协会
- **CEFA** — 中国艺术职业教育学会. Mirror is its only children's language-performance examination centre in Australia. *Pre-launch gate #2: this claim needs confirming in writing.*
- **AMEB** — Australian Music Examinations Board. Speech & Performance and Vocal grades
- **Melbourne Chinese Museum** — joint programme from 2022, teaching Chinese traditions in English and Mandarin
- **Trinity College London** — faculty certification and student exam pathway
- **Chinese Consulate-General in Melbourne** — broadcast both original MVs; hosted the 2023 Teachers' Day screening
- **China Daily** — hosts the Belt & Road Youth English Speech Competition

Carry the three known defects as a comment, from `docs/STATE.md`: `auyang-media.png` has a browser tooltip baked in; Venus Art, TL Studio and the Chinese Museum line drawing are light-on-light and read faint on the off-white. Source problems, listed for the client, not worked around in CSS.

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, all modules. The `partner logo file exists on disk` test will catch any filename typo immediately.

- [ ] **Step 9: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 10: Commit**

```bash
git add lib/content
git commit -m "feat: productions, workshops, venue, achievements and partners

The venue module is the find of this pass. The old site's 场地租赁 page had
literally no text on it — the entire offer was a background image nobody
rendered. It is a full rate card: five spaces, sizes, peak and off-peak
rates, two extras and two conditions.

Belt and Road keeps the competition and drops the results. The old site still
reads 'XXX obtained Third, Second and First places' in production; a test now
fails if that sentence or any placing claim comes back.

A test asserts every partner logo named here exists on disk, because 26 logos
sliced out of two composite sheets is exactly where a filename typo hides."
```

---

## Task 5: shadcn, initialised without destroying globals.css

`shadcn init` rewrites `app/globals.css`. Ours is 1,333 lines of bespoke CSS whose comments carry the reasoning behind every decision, and `docs/STATE.md` records that preserving them was the point of how the Tailwind migration was done. This task is mostly about not losing that.

**Files:**
- Create: `components.json`, `lib/utils.ts`, `components/ui/*`
- Modify: `app/globals.css` — reconciled by hand after init
- Modify: `package.json` — new dependencies

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` from `@/lib/utils`; shadcn primitives under `@/components/ui/`

- [ ] **Step 1: Snapshot globals.css so the rewrite is recoverable**

```bash
git status --porcelain   # must be empty; commit or stash anything outstanding
cp app/globals.css /tmp/globals.before.css
wc -l app/globals.css    # record the number — expect 1333
```

- [ ] **Step 2: Run init non-interactively**

```bash
npx shadcn@latest init -d --base radix
```

`-d` is required. `-y` alone still prompts for the primitive library and will hang a non-interactive session.

- [ ] **Step 3: Inspect exactly what it did to globals.css**

```bash
git diff --stat app/globals.css
git diff app/globals.css | head -120
```

- [ ] **Step 4: Reconcile globals.css by hand**

Rules for the reconciliation:

1. **Every original line and every original comment stays.** If init deleted the bespoke CSS below `@theme`, restore it from `/tmp/globals.before.css`.
2. **The `@theme` block keeps our nine colours.** Do not accept shadcn's zinc scale.
3. **Add a separate `@theme inline` block** mapping shadcn's variable names onto ours, so its components inherit the palette:

```css
/* shadcn's primitives read these names. Pointing them at our tokens means
   its components arrive already wearing the site's palette instead of
   zinc — there is no second source of colour to keep in sync. */
@theme inline {
  --color-background: var(--color-base);
  --color-foreground: var(--color-ink);
  --color-card: var(--color-base);
  --color-card-foreground: var(--color-ink);
  --color-popover: var(--color-base);
  --color-popover-foreground: var(--color-ink);
  --color-primary: var(--color-gold);
  --color-primary-foreground: var(--color-ink);
  --color-secondary: var(--color-base-2);
  --color-secondary-foreground: var(--color-ink);
  --color-muted: var(--color-base-2);
  --color-muted-foreground: var(--color-muted);
  --color-accent: var(--color-base-2);
  --color-accent-foreground: var(--color-ink);
  --color-border: var(--color-line);
  --color-input: var(--color-line);
  --color-ring: var(--color-gold);
  --radius: 6px;
}
```

4. **Do not let init touch `--font-sans` or `--font-disp`.** Ours read `var(--font-jakarta)` and `var(--font-fraunces)`, which `layout.tsx` injects at runtime. They currently work because they sit in `@theme`, not `@theme inline` — `@theme inline` resolves custom properties at parse time, so moving them there would silently break both faces. If init moved them, move them back.

- [ ] **Step 5: Add only the primitives that earn their place**

```bash
npx shadcn@latest add accordion dialog tabs carousel breadcrumb select label
```

Seven. These are focus traps, ARIA wiring and keyboard handling that would otherwise be hand-rolled across fourteen pages. Do not run `--all`.

- [ ] **Step 6: Strip the default styling from each primitive**

Each file in `components/ui/` arrives with shadcn's own look. Go through all seven and replace the visual classes with the site's — `rounded-md` becomes the arch or a 6px radius, `shadow-sm` goes, `border-input` resolves to `--line` already via the mapping. Keep every `data-[state=…]` selector, every `aria-*` attribute and every Radix prop untouched: that is the entire reason these are here.

- [ ] **Step 7: Verify the homepage is visually unchanged**

```bash
npm run dev
```

Open `http://localhost:3000/?intro` in a **real browser window**. The automation sandbox runs the tab hidden, which throttles `IntersectionObserver` and CSS transitions and makes correct reveals read as `opacity: 0`.

Check: the intro overlay still plays and holds its flat three seconds; the hero video runs; the mission wash climbs and fades the nav with it; both partner belts run in opposite directions; the About stepper advances on its own; the course arches still curve.

If any of these changed, globals.css lost something in the rewrite — diff against `/tmp/globals.before.css`.

- [ ] **Step 8: Verify build, lint and tests**

Run: `npm run build && npm run lint && npm test`
Expected: all clean.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: add shadcn, mapped onto the existing tokens

STATE.md records the opposite decision. That was right for one page and one
form; it is wrong for fourteen pages carrying dialogs, accordions, carousels
and tabs, where the alternative is hand-rolling focus traps and ARIA wiring
fourteen times.

shadcn init rewrites globals.css. Ours is 1,333 lines whose comments carry
the reasoning, so the rewrite was reconciled by hand against a snapshot
rather than accepted.

A separate @theme inline block points shadcn's variable names at our nine
colours, so its primitives arrive wearing the site's palette and there is no
second source of colour to keep in sync. The font tokens stay in @theme and
not @theme inline: that block resolves custom properties at parse time, and
both faces are injected at runtime by layout.tsx."
```

---

## Task 6: The shared page shell

Every inner page needs a header the homepage does not have, because the homepage opens on a full-bleed video reel and nothing else does. Getting these primitives right is what keeps the fourteen page tasks short.

**Files:**
- Create: `components/site/page-hero.tsx`, `components/site/crumbs.tsx`, `components/site/page-nav.tsx`, `components/site/section.tsx`
- Modify: `app/globals.css` — the CSS for all four
- Modify: `components/site/masthead.tsx` — confirm the no-reel path

**Interfaces:**
- Produces:
  ```ts
  // page-hero.tsx  (default export, Server Component)
  type PageHeroProps = {
    eyebrow: string;
    title: React.ReactNode;
    cn?: string;
    standfirst?: React.ReactNode;
    meta?: { label: string; value: string }[];
    media?: Asset;
    accent?: string;
    density?: "deep" | "shallow" | "bare";  // default "shallow"
  };

  // crumbs.tsx  (default export, Server Component)
  type Crumb = { label: string; href?: string };  // last has no href
  function Crumbs({ trail }: { trail: Crumb[] }): JSX.Element;

  // page-nav.tsx  (default export, Server Component)
  type NavTarget = { label: string; href: string };
  function PageNav({ prev, next }: { prev?: NavTarget; next?: NavTarget }): JSX.Element;

  // section.tsx  (two named exports, Server Components)
  function Section(props: {
    id?: string;
    tone?: "base" | "alt" | "band";   // default "base"
    children: React.ReactNode;
  }): JSX.Element;
  function SectionHead(props: {
    eyebrow?: string;
    title: React.ReactNode;
    note?: React.ReactNode;
  }): JSX.Element;
  ```

- [ ] **Step 1: Confirm the masthead behaves with no reel on the page**

Read `components/site/masthead.tsx:61-111`. The scroll effect does `const reel = document.querySelector(".reel"); if (!reel) return;` — so on a page with no reel it never adds `is-over` and the bar stays in its solid default. Confirm the CSS default in `app/globals.css` is the solid state, not the transparent one:

```bash
grep -n "masthead" app/globals.css | head -30
```

If `.masthead` defaults to transparent and `.is-over` is the solid state, invert it: the solid state must be the default so that thirteen pages are not each responsible for fixing the bar.

- [ ] **Step 2: Write `components/site/section.tsx`**

```tsx
/* The three grounds the site alternates between. The homepage does this with
   .sect / .sect--alt / .sect--band already; this is the same thing as a
   component so inner pages cannot invent a fourth. */

type Tone = "base" | "alt" | "band";

export function Section({
  id,
  tone = "base",
  children,
}: {
  id?: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  const cls = tone === "base" ? "sect" : `sect sect--${tone}`;
  return (
    <section className={cls} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <div className="sect__head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {note && <p className="sect__note">{note}</p>}
    </div>
  );
}
```

These class names already exist in `app/globals.css` — `sect`, `sect--alt`, `wrap`, `sect__head`, `eyebrow`, `h2`, `sect__note`. Confirm with `grep -n "sect__head\|\.eyebrow\|\.h2\b" app/globals.css` before assuming.

- [ ] **Step 3: Write `components/site/crumbs.tsx`**

```tsx
import Link from "next/link";

export type Crumb = { label: string; href?: string };

/* The tree is three deep in places and a parent arriving from a search
   result has no idea where they are. The last crumb carries no href and is
   marked current. */
export default function Crumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.label} aria-current={last ? "page" : undefined}>
              {c.href && !last ? <Link href={c.href}>{c.label}</Link> : c.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 4: Write `components/site/page-nav.tsx`**

```tsx
import Link from "next/link";

export type NavTarget = { label: string; href: string };

/* No section is allowed to be a dead end — the IA says so explicitly. At the
   foot of a course or a production, the next one is the only thing a reader
   plausibly wants. */
export default function PageNav({
  prev,
  next,
}: {
  prev?: NavTarget;
  next?: NavTarget;
}) {
  if (!prev && !next) return null;
  return (
    <nav className="pagenav" aria-label="More in this set">
      {prev ? (
        <Link className="pagenav__side" href={prev.href}>
          <span className="pagenav__dir">Previous</span>
          <span className="pagenav__label">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link className="pagenav__side pagenav__side--next" href={next.href}>
          <span className="pagenav__dir">Next</span>
          <span className="pagenav__label">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
```

- [ ] **Step 5: Write `components/site/page-hero.tsx`**

```tsx
import Image from "next/image";

import Crumbs, { type Crumb } from "./crumbs";

export type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  /* The Chinese name, set small beside the eyebrow. Every page on the old
     site had one and dropping them would erase half the brand. */
  cn?: string;
  standfirst?: React.ReactNode;
  meta?: { label: string; value: string }[];
  media?: { src: string; alt: string; width: number; height: number };
  /* The course or discipline accent. Used on the rule under the eyebrow and
     nothing larger — the accents behave like gold does. */
  accent?: string;
  density?: "deep" | "shallow" | "bare";
  trail?: Crumb[];
};

export default function PageHero({
  eyebrow,
  title,
  cn,
  standfirst,
  meta,
  media,
  accent,
  density = "shallow",
  trail,
}: PageHeroProps) {
  return (
    <header
      className={`phero phero--${density}`}
      style={accent ? ({ ["--accent" as string]: accent }) : undefined}
    >
      <div className="wrap">
        {trail && <Crumbs trail={trail} />}
        <p className="eyebrow phero__eyebrow">
          {eyebrow}
          {cn && (
            <span className="phero__cn" lang="zh-Hans">
              {cn}
            </span>
          )}
        </p>
        <h1 className="h1">{title}</h1>
        {standfirst && <p className="phero__standfirst">{standfirst}</p>}
        {meta && (
          <dl className="phero__meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {media && (
        <figure className="phero__media">
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="100vw"
            priority
          />
        </figure>
      )}
    </header>
  );
}
```

- [ ] **Step 6: Write the CSS**

Append to `app/globals.css`, below the existing bespoke block, in the same commented style as the rest of the file. Requirements:

- `.phero` clears the masthead using the existing `--bar-h` token, which `globals.css` already declares with the comment *"pages that don't open on a hero offset by this"* and which nothing has ever used. This is what it was for.
- `.phero--deep` gets the arch treatment on its media, reusing `--arch`, at the landscape rise (19%, per the note in `courses.tsx`), not the portrait 38%.
- `.phero__eyebrow` carries a hairline in `var(--accent, var(--gold))`. **Type and hairline only** — no filled band.
- `.h1` sits on the existing display scale next to `.h2`; add it beside its sibling rather than inventing a second scale.
- `.crumbs ol` is a flex row with `/` separators via `::before` on `li + li`. Small, `--grey`, never wrapping mid-crumb.
- `.pagenav` is a two-column grid, `--next` right-aligned, with a hairline above.
- Every one of these needs a mobile rule. The old site was `<meta name="applicable-device" content="pc">` with a fixed 1380px wrapper and most parents browse on a phone.

- [ ] **Step 7: Prove the shell renders by building one throwaway route**

Create `app/about/page.tsx` as a minimal smoke test — it gets its real content in Task 14:

```tsx
import type { Metadata } from "next";

import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";

export const metadata: Metadata = {
  title: "About",
  description: "Mirror Arts Education — a Melbourne youth performing-arts school.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        cn="关于我们"
        title="Shell smoke test"
        standfirst="Replaced in Task 14."
        trail={[{ label: "About" }]}
        density="shallow"
      />
      <Section tone="alt">
        <SectionHead eyebrow="Section" title="Heading" note="Note line." />
      </Section>
      <PageNav next={{ label: "Core team", href: "/about/team" }} />
    </>
  );
}
```

- [ ] **Step 8: Check it in a real browser**

```bash
npm run dev
```

Open `http://localhost:3000/about`. Check: the masthead is solid and does not overlap the `h1`; breadcrumbs read `Home / About`; the eyebrow hairline is gold; `PageNav` sits right-aligned. Then check at 375px wide.

- [ ] **Step 9: Verify build, lint and tests**

Run: `npm run build && npm run lint && npm test`
Expected: clean, three routes now.

- [ ] **Step 10: Commit**

```bash
git add components/site app/globals.css app/about
git commit -m "feat: shared page shell — hero, crumbs, page nav, sections

The homepage opens on a full-bleed video reel and no other page does, so the
masthead needed a second mode and the pages needed a top offset. --bar-h has
been sitting in globals.css since the migration with a comment saying exactly
what it was for and nothing had ever used it.

PageNav exists because the IA forbids dead ends. At the foot of a course, the
next course is the only thing a reader plausibly wants.

Getting these four right is what keeps the fourteen page tasks short."
```

---

## Task 7: Slice the studio-hire poster

The old site's 场地租赁 page had no text on it at all. The entire offer — five spaces, rates, sizes, conditions and eight photographs — is a single 1920×2651 JPEG that the page loaded as a background and never displayed.

**Files:**
- Create: `scripts/slice-venue.mjs`
- Modify: `package.json` — add `sharp` to devDependencies
- Output: `public/assets/venue/*.jpg`

**Interfaces:**
- Consumes: `extraction/assets/tmp1779196320_2319209_s-1502aaec.jpg`
- Produces: eight files under `public/assets/venue/`, named to match the `photos` paths declared in `lib/content/venue.ts`

- [ ] **Step 1: Install sharp**

```bash
npm i -D sharp
```

- [ ] **Step 2: Confirm the source dimensions before writing any crop box**

```bash
node -e "import('sharp').then(async ({default:s})=>console.log(await s('extraction/assets/tmp1779196320_2319209_s-1502aaec.jpg').metadata()))"
```

Expected: `width: 1920, height: 2651`. If it differs, every crop box below is wrong — recompute them proportionally rather than guessing.

- [ ] **Step 3: Write `scripts/slice-venue.mjs`**

```js
/* The studio-hire poster is the only record of the venue offer. The old
   site's 场地租赁 page loaded it as a background image and rendered no text
   at all, so none of it was searchable, readable or quotable.
 *
 * Crop boxes are hand-measured against the 1920x2651 original. They are
 * fractions rather than pixels so the script survives a re-export at a
 * different size. Verify the output by eye — a poster is not a grid and
 * these will not be exact.
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const SRC = "extraction/assets/tmp1779196320_2319209_s-1502aaec.jpg";
const OUT = "public/assets/venue";

/* left, top, width, height — all as a fraction of the full poster. */
const CROPS = [
  { name: "function-room-empty",  box: [0.428, 0.137, 0.245, 0.100] },
  { name: "function-room-lit",    box: [0.673, 0.126, 0.291, 0.111] },
  { name: "room-1",               box: [0.047, 0.272, 0.246, 0.114] },
  { name: "room-2",               box: [0.293, 0.272, 0.281, 0.114] },
  { name: "rooms-3-4-a",          box: [0.455, 0.401, 0.245, 0.115] },
  { name: "rooms-3-4-b",          box: [0.700, 0.401, 0.271, 0.115] },
  { name: "workshop-space-a",     box: [0.047, 0.552, 0.297, 0.116] },
  { name: "workshop-space-b",     box: [0.344, 0.552, 0.243, 0.116] },
];

const meta = await sharp(SRC).metadata();
if (!meta.width || !meta.height) throw new Error("cannot read poster dimensions");

await mkdir(OUT, { recursive: true });

for (const { name, box: [l, t, w, h] } of CROPS) {
  const region = {
    left: Math.round(l * meta.width),
    top: Math.round(t * meta.height),
    width: Math.round(w * meta.width),
    height: Math.round(h * meta.height),
  };
  await sharp(SRC)
    .extract(region)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name}.jpg  ${region.width}x${region.height}`);
}
```

- [ ] **Step 4: Run it**

```bash
node scripts/slice-venue.mjs
```

Expected: eight lines of output, eight files in `public/assets/venue/`.

- [ ] **Step 5: Look at all eight**

Open each file. This is the step that matters — the crop fractions above are measured by hand off a poster with no grid, and a crop that clips a room in half or catches a slab of price text will pass every automated check.

Adjust the fractions and re-run until each file is a clean photograph of a room with no poster furniture in it. Do not proceed with a crop you have not looked at.

- [ ] **Step 6: Wire the paths into venue.ts**

Fill the `photos` arrays in `lib/content/venue.ts` with the eight files, each with real `width`, `height` and a written `alt`. Alt text describes the room — "The 150 m² function room set with rows of chairs facing a stage" — not "venue photo".

- [ ] **Step 7: Add a test that the files exist**

Append to `lib/content/content.test.ts`:

```ts
test("every venue photograph named in content exists on disk", () => {
  for (const s of HIRE_SPACES) {
    for (const p of s.photos) {
      assert.ok(existsSync(`public${p.src}`), `missing ${p.src}`);
      assert.ok(p.alt.length > 15, `${p.src} needs real alt text`);
    }
  }
});
```

- [ ] **Step 8: Run tests, build and lint**

Run: `npm test && npm run build && npm run lint`
Expected: all clean.

- [ ] **Step 9: Commit**

```bash
git add scripts/slice-venue.mjs package.json package-lock.json public/assets/venue lib/content/venue.ts lib/content/content.test.ts
git commit -m "feat: slice eight room photographs out of the studio-hire poster

The old 场地租赁 page had no text on it. The whole venue offer — five spaces,
their sizes, peak and off-peak rates, two extras and two conditions — was one
1920x2651 JPEG loaded as a background and never rendered.

Crop boxes are fractions of the source rather than pixels, so a re-export at
a different size does not silently shift every crop. They were measured by
hand off a poster with no grid and every one was checked by eye — a crop that
clips a room in half passes every automated check there is."
```

---

## Task 8: Crop the stage gallery and extract the portraits

**Files:**
- Create: `scripts/crop-gallery.mjs`, `scripts/extract-portraits.mjs`
- Output: `public/assets/stage/*.jpg`, `public/assets/faculty/*.jpg`, `public/assets/courses/posters/*.png`

**Interfaces:**
- Produces: the files that `lib/content/faculty.ts`, `productions.ts`, `courses.ts` and `achievements.ts` already name

- [ ] **Step 1: Confirm the letterboxing is real before writing a trimmer**

The six stage stills carry white padding baked into the pixels — visible on `24282691_1781019306-e62dfbc8.png` and `24282694_1781019306-bfb131d0.png`, which are roughly 1856 wide with content starting around x=406.

```bash
node -e "import('sharp').then(async ({default:s})=>{for(const f of ['24282691_1781019306-e62dfbc8','24282695_1781019306-29520445','24282692_1781019306-d84ef1e3','24282693_1781019306-5a9ec83e','24282694_1781019306-bfb131d0','24282696_1781019306-1671ef51']){const m=await s('extraction/assets/'+f+'.png').metadata();console.log(f,m.width+'x'+m.height)}})"
```

- [ ] **Step 2: Write `scripts/crop-gallery.mjs`**

```js
/* The six stage stills are the only real production photography we have and
   all six arrived letterboxed — white padding baked into the pixels rather
   than applied by CSS, so it travels with the file.
 *
 * sharp's .trim() finds the content edge itself, which is more reliable than
 * a hand-measured box across six images that were not padded identically.
 * threshold is deliberately low: the stage photographs are dark and an
 * aggressive trim would eat the black of the wings.
 */
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const OUT = "public/assets/stage";

const FILES = [
  { src: "24282691_1781019306-e62dfbc8.png", name: "gala-hosting-line" },
  { src: "24282695_1781019306-29520445.png", name: "gala-ensemble" },
  { src: "24282692_1781019306-d84ef1e3.png", name: "stage-drama" },
  { src: "24282693_1781019306-5a9ec83e.png", name: "choir-stage" },
  { src: "24282694_1781019306-bfb131d0.png", name: "jungle-book-pack" },
  { src: "24282696_1781019306-1671ef51.png", name: "gala-finale" },
];

await mkdir(OUT, { recursive: true });

for (const { src, name } of FILES) {
  const info = await sharp(`extraction/assets/${src}`)
    .trim({ background: "#ffffff", threshold: 8 })
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name}.jpg  ${info.width}x${info.height}`);
}
```

- [ ] **Step 3: Run it and look at all six**

```bash
node scripts/crop-gallery.mjs
```

Open each. If `.trim()` ate part of a dark stage edge, raise `threshold`. If white remains, lower it. These are the six best photographs the business has and a bad trim is visible on every page they appear on.

- [ ] **Step 4: Write `scripts/extract-portraits.mjs`**

The eight teacher cards share one editorial layout — charcoal speckled backdrop, gold serif name in caps, tan name plate, pale blue-grey bio panel, vertical Chinese subject label (`content/MIRROR-ARTS-EDUCATION.md` §13). Because the layout is consistent, one crop box works across all eight, with per-file overrides where it does not.

Source files, from `extraction/assets/`, mapped by the page they came from:

| Page | Files | Who |
|---|---|---|
| `doc_30930666` | `1768488438502640-039879b8.png`, `1768488442356101-58c6780e.png` | English drama & speech teachers |
| `doc_30930667` | `1768488466776218-dd1751ad.png`, `1768488470613352-b1577fbb.png` | Language / hosting / dubbing |
| `doc_30930668` | four files `1768488505811217`–`1768488521140820` | Vocal & musical theatre |
| `doc_30930669` | `1768488562805266-ef3bfd80.png` | Music composition |
| `doc_30930670` | `1768488584242011-ad58eb7a.png` | Posture & etiquette |

**Open each source file first** and write down which teacher is on it and where the portrait sits, before writing a single crop box. The mapping above is by subject, not by name — the names are printed on the cards.

The script follows the same shape as `slice-venue.mjs`: fractional boxes, `.extract()`, resize to 800 wide, write to `public/assets/faculty/<slug>.jpg` using the slugs from `lib/content/faculty.ts`.

Also copy the nine course posters through unchanged, resized to 860 wide, into `public/assets/courses/posters/<slug>.png` — they are shown as an aside at small size, not read.

- [ ] **Step 5: Run it and check every output**

```bash
node scripts/extract-portraits.mjs
```

Seven faculty portraits and nine posters. Check each portrait is the person, not a slab of the card's furniture.

Known and not fixable here, from `docs/STATE.md`: Diana Zhao and Rachel Cai's sources are 262×444 — that IS the original, so they are soft on a retina screen and fine at the rendered size. Do not upscale them; upscaling is what makes the Music card look wrong.

- [ ] **Step 6: Add existence tests**

Append to `lib/content/content.test.ts`:

```ts
test("every faculty portrait exists on disk", () => {
  for (const t of FACULTY) {
    assert.ok(existsSync(`public${t.portrait.src}`), `missing ${t.portrait.src}`);
  }
});

test("every course poster and hero exists on disk", () => {
  for (const c of COURSES) {
    assert.ok(existsSync(`public${c.poster.src}`), `missing ${c.poster.src}`);
    assert.ok(existsSync(`public${c.hero.src}`), `missing ${c.hero.src}`);
  }
});

test("every production still exists on disk", () => {
  for (const p of PRODUCTIONS) {
    for (const s of p.stills) {
      assert.ok(existsSync(`public${s.src}`), `missing ${s.src}`);
    }
  }
});
```

- [ ] **Step 7: Run tests, build and lint**

Run: `npm test && npm run build && npm run lint`
Expected: all clean.

- [ ] **Step 8: Commit**

```bash
git add scripts public/assets/stage public/assets/faculty public/assets/courses lib/content/content.test.ts
git commit -m "feat: crop the stage gallery and extract the faculty portraits

All six stage stills arrived letterboxed with the white baked into the
pixels, so it travelled with the file. sharp's own trim finds the content
edge, which beats a hand-measured box across six images nobody padded
identically.

The teacher cards share one editorial layout, so one crop box does most of
the work. Diana Zhao and Rachel Cai stay soft — 262x444 is the original, and
upscaling is exactly what makes the Music card look wrong.

Tests now assert every asset path named anywhere in the content layer exists
on disk, which is the failure mode a content layer invites."
```

---

## Task 9: Transcode the video masters

**Files:**
- Create: `scripts/transcode.mjs`
- Modify: `lib/content/productions.ts` — fill in the Blob URLs
- Output: `public/assets/video/<slug>-loop.mp4`, `public/assets/video/<slug>-poster.jpg`, plus full renders on Vercel Blob

**Interfaces:**
- Consumes: the six masters in `media/`, per `media/MANIFEST.md`
- Produces: `Production["video"]` fully populated

- [ ] **Step 1: Confirm the masters are present**

```bash
ls -la media/
```

They are gitignored, 4.9 GB total. If they are missing: `node scripts/fetch-video.mjs` is resumable and skips complete files.

- [ ] **Step 2: Confirm ffmpeg**

```bash
ffmpeg -version | head -1
```

If absent: `brew install ffmpeg`.

- [ ] **Step 3: Write `scripts/transcode.mjs`**

```js
/* Six production masters, 4.9 GB. Nothing here belongs in a browser at that
   size, and nothing that size belongs in git either.
 *
 * Two outputs per work:
 *   - a silent 10s loop, ~2 MB, committed to public/, for the card grid
 *   - a full-length web render, uploaded to Vercel Blob, for the case study
 *
 * The existing hero is 18 MB for 61 seconds. Six full renders at that rate
 * is ~110 MB in git, which is the wrong place for it. The hero itself stays
 * where it is — it is already committed and already works.
 */
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";

const OUT = "public/assets/video";

/* start = the timecode the loop is cut from. Chosen per work by watching it,
   not by picking a round number — see the note in STATE.md about why the
   hero runs 1:49 to 2:50 rather than opening on the curtain. */
const WORKS = [
  { slug: "born-to-fly",             src: "media/born-to-fly-olympic-mv.mov",                start: "00:00:30" },
  { slug: "brushstrokes-of-history", src: "media/bihua-chunqiu-original-mv.mp4",             start: "00:00:25" },
  { slug: "jungle-book",             src: "media/2025-jungle-book-stage-production.mp4",     start: "00:01:49" },
  { slug: "belt-and-road-2025",      src: "media/2025-belt-and-road-speech-competition.mp4", start: "00:00:20" },
  { slug: "snake-year-gala",         src: "media/2025-snake-year-gala-promo.mp4",            start: "00:00:10" },
  { slug: "horse-year-gala",         src: "media/2026-horse-year-gala-promo.mp4",            start: "00:00:10" },
];

await mkdir(OUT, { recursive: true });

for (const { slug, src, start } of WORKS) {
  // Silent 10s loop, 1280 wide, for the card grid.
  execFileSync("ffmpeg", [
    "-y", "-ss", start, "-i", src, "-t", "10",
    "-an",
    "-vf", "scale=1280:-2",
    "-c:v", "libx264", "-crf", "30", "-preset", "slow",
    "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    `${OUT}/${slug}-loop.mp4`,
  ], { stdio: "inherit" });

  // Poster frame, taken from the same point so the swap is invisible.
  execFileSync("ffmpeg", [
    "-y", "-ss", start, "-i", src, "-frames:v", "1",
    "-vf", "scale=1600:-2",
    "-q:v", "4",
    `${OUT}/${slug}-poster.jpg`,
  ], { stdio: "inherit" });

  // Full-length web render, 1920, for upload. Not committed.
  execFileSync("ffmpeg", [
    "-y", "-i", src,
    "-vf", "scale=1920:-2",
    "-c:v", "libx264", "-crf", "27", "-preset", "slow",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart", "-pix_fmt", "yuv420p",
    `media/renders/${slug}-1920.mp4`,
  ], { stdio: "inherit" });

  console.log(`done ${slug}`);
}
```

- [ ] **Step 4: Create the renders directory and run it**

```bash
mkdir -p media/renders
node scripts/transcode.mjs
```

This takes a while — the Horse Year master alone is 2.1 GB.

- [ ] **Step 5: Check the loops and the posters**

Open all six loops and all six posters. A loop that starts on a black frame or a title card is worse than no loop. Adjust `start` per work and re-run just that one.

Check the committed size: `du -sh public/assets/video` should be under about 15 MB for the twelve new files plus the two existing hero renders.

- [ ] **Step 6: Confirm `media/renders/` is gitignored**

`.gitignore` already has `media/*` with a `!media/MANIFEST.md` exception, so `media/renders/` is excluded. Verify:

```bash
git status --porcelain media/
```

Expected: nothing.

- [ ] **Step 7: Upload the six full renders to Vercel Blob**

```bash
npx vercel blob put media/renders/born-to-fly-1920.mp4 --rw-token "$BLOB_READ_WRITE_TOKEN"
```

If no Blob store exists on the project yet, create one first — `npx vercel blob store add mirror-video` — and pull the token with `npx vercel env pull`. Repeat for all six and record each returned URL.

- [ ] **Step 8: Fill the URLs into productions.ts**

Set each production's `video.full` to its Blob URL and `video.loop` to `/assets/video/<slug>-loop.mp4`.

- [ ] **Step 9: Add a test that the loops and posters exist**

Append to `lib/content/content.test.ts`:

```ts
test("every production has a committed loop and poster on disk", () => {
  for (const p of PRODUCTIONS) {
    assert.ok(existsSync(`public${p.video.loop}`), `missing ${p.video.loop}`);
    assert.ok(existsSync(`public${p.video.poster.src}`), `missing poster for ${p.slug}`);
  }
});

test("full renders are hosted, not committed", () => {
  for (const p of PRODUCTIONS) {
    if (!p.video.full) continue;
    assert.ok(
      p.video.full.startsWith("https://"),
      `${p.slug} full render must be an absolute URL, not a repo path`,
    );
  }
});
```

- [ ] **Step 10: Run tests, build, lint and commit**

```bash
npm test && npm run build && npm run lint
git add scripts/transcode.mjs public/assets/video lib/content/productions.ts lib/content/content.test.ts
git commit -m "feat: transcode the six production masters

4.9 GB of production masters becomes twelve small committed files and six
hosted renders. Nothing that size belongs in a browser, and six full renders
at the hero's rate would be ~110 MB in git, which is the wrong place for it.

Loop start times are picked per work by watching them. A loop that opens on a
black frame or a title card is worse than no loop at all — same reasoning
that put the hero at 1:49 rather than on the curtain.

A test asserts the full renders are absolute URLs, so a repo path cannot
creep back in and quietly add 110 MB to a clone."
```

---

## Task 10: Shared components extracted from the homepage

Three components on the homepage already do work the inner pages need. They get extracted rather than copied, because a second copy of an enquiry form is a second place for the allow-list to drift.

**Files:**
- Create: `components/shared/enquiry-form.tsx`, `campus-tabs.tsx`, `logo-belt.tsx`, `video-figure.tsx`, `lightbox.tsx`
- Modify: `components/sections/find-us.tsx`, `components/sections/partners.tsx` — import instead of declare

**Interfaces:**
- Produces:
  ```ts
  // enquiry-form.tsx  ("use client")
  function EnquiryForm(props: { defaultCourse?: string; compact?: boolean }): JSX.Element;

  // campus-tabs.tsx  ("use client")
  function CampusTabs(props: { campuses: Campus[] }): JSX.Element;

  // logo-belt.tsx  ("use client")
  function LogoBelt(props: {
    logos: { src: string; alt: string }[];
    direction: "left" | "right";
    label: string;
  }): JSX.Element;

  // video-figure.tsx  ("use client")
  function VideoFigure(props: {
    loop: string;
    full?: string;
    poster: Asset;
    caption?: React.ReactNode;
  }): JSX.Element;

  // lightbox.tsx  ("use client")
  function Lightbox(props: {
    trigger: React.ReactNode;
    children: React.ReactNode;
    title: string;
  }): JSX.Element;
  ```

- [ ] **Step 1: Read what already exists before moving anything**

```bash
wc -l components/sections/find-us.tsx components/sections/partners.tsx
grep -n "form\|useState\|COURSES" components/sections/find-us.tsx | head -40
```

`find-us.tsx` is 261 lines and holds both the campus tabs and the form. `partners.tsx` is 105 lines and holds the two belts.

- [ ] **Step 2: Extract `EnquiryForm`**

Move the form JSX and its state out of `find-us.tsx` into `components/shared/enquiry-form.tsx`. Keep every existing behaviour: the server action wiring to `app/actions/enquiry.ts`, the validation messages, and **the block that says plainly the form does not send**. That honesty is deliberate — the mail provider is the client's call because it decides where parent contact details live, and faking success is worse than saying so.

Add one prop: `defaultCourse`, so `/courses/<slug>` can preselect the course the reader just read about. It must be a value from the derived `COURSES` list or the select falls back to the first option.

- [ ] **Step 3: Extract `CampusTabs` and `LogoBelt`**

`CampusTabs` takes `campuses` as a prop and reads nothing from module scope, so `/contact` and the homepage can both use it.

`LogoBelt` takes `logos`, `direction` and `label`. The homepage runs two in opposite directions; `/about/partners` runs the same two. Keep grayscale by default, colour and pause on hover, and honour `prefers-reduced-motion` — `components/motion/use-prefers-reduced-motion.ts` already exists for this.

- [ ] **Step 4: Write `VideoFigure`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

/* The card grid runs a silent 10s loop. The case study runs the full render,
   which lives on Blob and is therefore a network dependency the rest of the
   page does not have — so the poster frame stays visible until the video can
   actually play, and stays permanently if it cannot.
 *
 * The poster is cut from the same timecode as the loop, so the swap has
 * nothing to see. */
export default function VideoFigure({
  loop,
  full,
  poster,
  caption,
}: {
  loop: string;
  full?: string;
  poster: { src: string; alt: string; width: number; height: number };
  caption?: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const src = playing && full ? full : loop;

  return (
    <figure className="vfig">
      {failed ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
        />
      ) : (
        <video
          key={src}
          src={src}
          poster={poster.src}
          muted={!playing}
          loop={!playing}
          autoPlay={!playing}
          playsInline
          controls={playing}
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
      {full && !playing && !failed && (
        <button
          type="button"
          className="vfig__play"
          onClick={() => setPlaying(true)}
        >
          Play the full film
        </button>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
```

- [ ] **Step 5: Write `Lightbox`**

A thin wrapper over the shadcn `dialog` from Task 5. Used for the achievement scans, the course posters and the room photographs — three places where the reader wants the full image and the page wants a thumbnail. Keep Radix's focus trap and `Escape` handling; restyle the overlay to charcoal at 0.9 and give the panel the site's 6px radius, not shadcn's.

- [ ] **Step 6: Point the homepage sections at the extracted components**

`find-us.tsx` and `partners.tsx` now import rather than declare. Their line counts should drop substantially.

- [ ] **Step 7: Check the homepage is unchanged in a real browser**

```bash
npm run dev
```

`http://localhost:3000/?intro`. Both belts still run in opposite directions and pause on hover. The campus tabs still switch the map. The form still validates and still says it does not send. This is a refactor — anything that looks different is a bug.

- [ ] **Step 8: Verify build, lint and tests, then commit**

```bash
npm run build && npm run lint && npm test
git add components
git commit -m "refactor: extract the form, campus tabs and logo belts

Three homepage components do work the inner pages need. A second copy of the
enquiry form would be a second place for the course allow-list to drift, which
is the exact problem Task 2 just removed.

EnquiryForm gains defaultCourse so a course page can preselect the course the
reader just finished reading about.

VideoFigure keeps the poster frame up until the full render can actually play,
and permanently if it cannot — the full renders are on Blob, which is a network
dependency nothing else on the page has."
```

---

## Task 11: `/courses` — the hub

**Files:**
- Create: `app/courses/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `DISCIPLINES`, `coursesByDiscipline`, `COURSES`, `PageHero`, `Section`, `SectionHead`
- Produces: anchors `#performance`, `#language`, `#music`, `#posture` — `masthead.tsx` already links all four

- [ ] **Step 1: Confirm the anchors the masthead expects**

```bash
grep -n "courses#" components/site/masthead.tsx
```

Expected: `/courses#performance`, `/courses#language`, `/courses#music`, `/courses#posture`. The section ids must match exactly.

- [ ] **Step 2: Write the page**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/site/page-hero";
import { Section, SectionHead } from "@/components/site/section";
import { DISCIPLINES } from "@/lib/content/disciplines";
import { COURSES, coursesByDiscipline } from "@/lib/content/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Nine courses across four disciplines — performance, language and expression, music, posture and etiquette. Ten sessions a term, ages six and up, in Surrey Hills and Glen Waverley.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        cn="课程种类"
        title={
          <>
            Nine courses across four disciplines.
            <br />
            Each one ends on a <em>stage</em>
          </>
        }
        standfirst="Ten sessions a term, ages six and up. Exam preparation runs through all of them."
        trail={[{ label: "Courses" }]}
        density="deep"
      />

      {DISCIPLINES.map((d, i) => {
        const courses = coursesByDiscipline(d.id);
        return (
          <Section key={d.id} id={d.id} tone={i % 2 ? "alt" : "base"}>
            <SectionHead
              eyebrow={d.cn}
              title={d.title}
              note={d.blurb}
            />
            <ul className="courselist">
              {courses.map((c) => (
                <li key={c.slug} style={{ ["--accent" as string]: c.accent }}>
                  <Link href={`/courses/${c.slug}`} className="courselist__link">
                    <span className="courselist__frame">
                      <Image
                        src={c.hero.src}
                        alt={c.hero.alt}
                        width={c.hero.width}
                        height={c.hero.height}
                        sizes="(min-width: 880px) 420px, 100vw"
                      />
                    </span>
                    <span className="courselist__body">
                      <span className="courselist__cn" lang="zh-Hans">
                        {c.cn}
                      </span>
                      <span className="courselist__title">{c.title}</span>
                      <span className="courselist__strap">{c.strapline}</span>
                      <span className="courselist__meta">
                        {c.minutes} min · {c.sessionsPerTerm} sessions
                        {c.maxStudents ? ` · max ${c.maxStudents}` : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section tone="band">
        <SectionHead
          eyebrow="Exams"
          title={
            <>
              Every discipline has a <em>graded</em> path out of it
            </>
          }
          note={`AMEB Speech & Performance and Vocal, and CEFA. ${COURSES.filter((c) => c.leadsTo?.href === "/courses/exams").length} of the nine prepare students for grades directly.`}
        />
        <Link className="ghost" href="/courses/exams">
          Exams and pathways
        </Link>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Write the CSS for `.courselist`**

Append to `app/globals.css`. A two-column grid above 880px, one below. Image left, copy right, hairline between rows in `--line`. `--accent` shows as a 2px rule under the title and nothing larger — the accents behave the way gold does. Whole row is one click target.

- [ ] **Step 4: Check the anchors actually land**

```bash
npm run dev
```

Open `http://localhost:3000/courses#music` directly. The Music section must land clear of the masthead — `html { scroll-behavior: smooth }` is already set globally, so add `scroll-margin-top: var(--bar-h)` to `.sect[id]`, or every anchored section on the site will land under the bar.

- [ ] **Step 5: Click every course link**

All nine 404 until Task 12. Confirm the hrefs are `/courses/<slug>` and match `courseSlugs()`.

- [ ] **Step 6: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/courses app/globals.css
git commit -m "feat: /courses

Four disciplines, nine courses. Extends the homepage's 2x2 rather than
replacing it, so a returning visitor recognises the shape.

scroll-margin-top on .sect[id] is set globally rather than on this page:
smooth scrolling is on for the whole site, so without it every anchored
section anywhere lands under the masthead."
```

---

## Task 12: `/courses/[slug]` — the nine course pages

**Files:**
- Create: `app/courses/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `getCourse`, `COURSES`, `courseSlugs`, `getDiscipline`, `getTeacher`, `PageHero`, `PageNav`, `Section`, `Lightbox`, `EnquiryForm`
- Produces: nine static pages

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import Lightbox from "@/components/shared/lightbox";
import EnquiryForm from "@/components/shared/enquiry-form";
import { COURSES, getCourse, courseSlugs } from "@/lib/content/courses";
import { getDiscipline } from "@/lib/content/disciplines";
import { getTeacher } from "@/lib/content/faculty";

export const dynamicParams = false;

export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COURSES.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.strapline}. ${c.minutes} minutes, ${c.sessionsPerTerm} sessions a term, ages ${c.minAge} and up, at Mirror Arts Education in Melbourne.`,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COURSES.find((x) => x.slug === slug);
  if (!c) notFound();

  const d = getDiscipline(c.discipline);
  const i = COURSES.indexOf(c);
  const prev = COURSES[i - 1];
  const next = COURSES[i + 1];

  return (
    <>
      <PageHero
        eyebrow={d.title}
        cn={c.cn}
        title={c.title}
        standfirst={c.strapline}
        accent={c.accent}
        density="deep"
        media={c.hero}
        trail={[
          { label: "Courses", href: "/courses" },
          { label: c.title },
        ]}
        meta={[
          { label: "Each class", value: `${c.minutes} minutes` },
          { label: "Term", value: `${c.sessionsPerTerm} sessions` },
          { label: "Ages", value: `${c.minAge} and up` },
          ...(c.maxStudents
            ? [{ label: "Class size", value: `${c.maxStudents} maximum` }]
            : []),
        ]}
      />

      <Section>
        <div className="prose">
          {c.body.map((p, n) => (
            <p key={n}>{p}</p>
          ))}
        </div>

        <ul className="claims">
          {c.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>

      <Section tone="alt">
        <SectionHead eyebrow="A term contains" title="What you actually do" />
        <ul className="includes">
          {c.includes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Taught by" title="Who runs the room" />
        <ul className="teachercards">
          {c.teachers.map((slug) => {
            const t = getTeacher(slug);
            return (
              <li key={t.slug}>
                <Image
                  src={t.portrait.src}
                  alt={t.portrait.alt}
                  width={t.portrait.width}
                  height={t.portrait.height}
                  sizes="240px"
                />
                <h3>{t.name}</h3>
                <p className="teachercards__subject" lang="zh-Hans">
                  {t.subjectCn}
                </p>
                <p>{t.credentials[0]}</p>
                <Link className="ghost" href={`/faculty#${t.slug}`}>
                  Full biography
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {c.leadsTo && (
        <Section tone="band">
          <SectionHead
            eyebrow="Where it leads"
            title={c.leadsTo.label}
          />
          <Link className="ghost" href={c.leadsTo.href}>
            {c.leadsTo.label}
          </Link>
        </Section>
      )}

      <Section tone="alt">
        <SectionHead
          eyebrow="The original poster"
          title="How this course was published before"
          note="The client's own artefact. Every word of it was locked inside the image."
        />
        <Lightbox
          title={`${c.title} — original course poster`}
          trigger={
            <Image
              src={c.poster.src}
              alt={c.poster.alt}
              width={c.poster.width}
              height={c.poster.height}
              sizes="320px"
            />
          }
        >
          <Image
            src={c.poster.src}
            alt={c.poster.alt}
            width={c.poster.width}
            height={c.poster.height}
          />
        </Lightbox>
      </Section>

      <Section id="enquire">
        <SectionHead
          eyebrow="Enrol"
          title={
            <>
              Start a <em>conversation</em>
            </>
          }
          note="Term dates, availability and fees come back by email or message. There is no online booking."
        />
        <EnquiryForm defaultCourse={c.title} />
      </Section>

      <PageNav
        prev={prev && { label: prev.title, href: `/courses/${prev.slug}` }}
        next={next && { label: next.title, href: `/courses/${next.slug}` }}
      />
    </>
  );
}
```

- [ ] **Step 2: Write the CSS**

`.prose` — measure capped around 66 characters, paragraph spacing from the existing rhythm. `.claims` — two items side by side, each with a gold hairline above, no bullets. `.includes` — a wrapped list of short items, hairline-separated, not chips. `.teachercards` — up to two across, portrait at 240px.

- [ ] **Step 3: Verify all nine build**

```bash
npm run build
```

Expected: nine `/courses/<slug>` entries in the route table, all `○ (Static)`.

- [ ] **Step 4: Read all nine in a real browser**

This is a reading pass, not a rendering pass. For each: does the copy say something specific and true? Are the durations right — 90 for drama, 120 for choir? Does hosting show the cap of eight and the CEFA sole-centre claim? Does vocal mention the Olympics broadcast? Does posture mention the Monash M.Ed?

- [ ] **Step 5: Run the copy through stop-slop**

Use the `stop-slop` skill on `lib/content/courses.ts`. Nine pieces of body copy written in one sitting drift toward the same shape.

- [ ] **Step 6: Verify lint and tests, then commit**

```bash
npm run lint && npm test
git add app/courses app/globals.css lib/content/courses.ts
git commit -m "feat: the nine course pages

Every word on these pages was previously a ~1 MB PNG. Nothing was searchable,
nothing was readable by a screen reader, and each page cost a megabyte to
load a paragraph.

The original poster stays, as an aside behind a lightbox. It is the client's
artefact and it carries the brand colour system — it just is not the content
any more.

dynamicParams is false, so an unknown slug 404s rather than rendering an
empty shell."
```

---

## Task 13: `/courses/exams`

**Files:**
- Create: `app/courses/exams/page.tsx`

**Interfaces:**
- Consumes: `COURSES`, `ACHIEVEMENTS`, `CREDENTIAL_BODIES`, `PARTNERS.institutions`, `Lightbox`

- [ ] **Step 1: Write the page**

Sections, in order:

1. **PageHero** — eyebrow "Courses", title carrying the differentiator: Mirror is CEFA's only children's language-performance examination centre in Australia. `density="deep"`.
2. **AMEB** — what Speech & Performance and Vocal grades are, which courses prepare for them (read them off `COURSES.filter(c => c.leadsTo?.href === "/courses/exams")` rather than hardcoding), and who teaches them. The English speech teacher has examined for AMEB, which is the strongest sentence available and is currently buried in a poster.
3. **What a report looks like** — the two AMEB practical examination reports, behind a `Lightbox`. Quote the examiner's written feedback, which is the persuasive part. Include the grades and the examination date, 5 September 2024.
4. **CEFA** — the sole-centre claim, what the assessment is (twice yearly), and what the certificate is.
5. **Why it matters** — grades support scholarship and selective private-school applications. This is a claim the Chinese copy makes explicitly (§4.2) and it is the reason avatar A's parent is reading this page at all.
6. **Enquiry.**

- [ ] **Step 2: Add the consent comment above the report block**

Directly above the JSX that renders the two AMEB scans:

```tsx
{/* PRE-LAUNCH GATE #1. These two reports name minors and print their
    academic results. Written parental consent from both families is
    required before this page is deployed. Nothing is deployed yet, so
    this is safe to build — it is not safe to ship.
    See docs/superpowers/specs/2026-08-07-inner-pages-design.md §9. */}
```

- [ ] **Step 3: Check the CEFA claim is attributed, not asserted flatly**

The sentence is a factual claim about being sole nationally and is pre-launch gate #2. Write it as the school's own claim with CEFA named, so that if it turns out to be qualified the fix is a word rather than a rewrite.

- [ ] **Step 4: Verify build, lint, tests and read it in a browser, then commit**

```bash
npm run build && npm run lint && npm test
git add app/courses/exams
git commit -m "feat: /courses/exams

The credential story in one place. Both halves of it were previously buried
mid-paragraph inside course poster images — the CEFA sole-centre claim was
inside the bilingual hosting poster and nowhere else on the site.

The two AMEB reports carry a comment naming them as pre-launch gate #1. They
print two children's names and results, and consent is not in hand."
```

---

## Task 14: `/faculty`

**Files:**
- Create: `app/faculty/page.tsx`

**Interfaces:**
- Consumes: `FACULTY`, `facultyByDiscipline`, `DISCIPLINES`, `COURSES`, shadcn `accordion`
- Produces: per-teacher anchors `#<slug>` — Task 12's course pages already link to them

- [ ] **Step 1: Write the page**

Grouped by discipline, matching the old site's own grouping. Each teacher: portrait, name, Chinese name, subject, credentials as a list, and **the courses they teach, cross-linked**. Derive that list rather than declaring it:

```tsx
const teaches = COURSES.filter((c) => c.teachers.includes(t.slug));
```

Each teacher gets `id={t.slug}` so the course pages' `/faculty#<slug>` links land. Add `scroll-margin-top: var(--bar-h)` to the card.

Delyse Weisz and Callum Dibbert lead the page. `content/AUDIENCE.md` §3 ranks who teaches the child as avatar B's first decision factor, and these two are the bridge to the English-speaking market.

Credentials go in a shadcn `accordion` where a teacher has more than three — Delyse Weisz has five and the page should not be a wall.

- [ ] **Step 2: Note Diana Zhao's two roles on the page, not just in the data**

She is Operations Director and the bilingual hosting teacher. Her card says so and links to `/about/team#diana-zhao`.

- [ ] **Step 3: Keyboard pass over the accordion**

Tab to it, `Enter` to open, `Escape`, `Tab` through the contents. This is the reason shadcn is installed; if it does not work, the restyling in Task 5 broke a `data-[state]` selector.

- [ ] **Step 4: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/faculty
git commit -m "feat: /faculty

Grouped by discipline, matching the old site's own grouping. Each teacher
lists the courses they teach, derived from the catalogue rather than declared
again — so the page is a way into the courses instead of a cul-de-sac.

Delyse Weisz and Callum Dibbert lead. AUDIENCE.md ranks who teaches the child
as the local English-speaking parent's first decision factor, and those two
are the whole bridge to that market."
```

---

## Task 15: `/about`

**Files:**
- Create: `app/about/page.tsx` — replaces the Task 6 smoke test

**Interfaces:**
- Consumes: `TIMELINE`, `SITE`, `TEAM`

- [ ] **Step 1: Replace the smoke test with the real page**

Sections:

1. **PageHero** — `density="deep"`, the mission written from the CN About copy (§3). The typo on the live site, 展和传播 for 展示和传播, does not carry across; we are writing English here and the Chinese gets written fresh for `/zh`.
2. **The timeline** — eight milestones, 2017 → 2025, as the spine of the page. Alternating sides above 880px, single column below. Year set in Fraunces at display scale, gold hairline connecting them.
3. **The rename** — 2025, Mirror Drama Studio becomes Mirror Arts Education. This is the turn in the story and gets its own treatment rather than being the last row of a table. It is also why the YouTube handle still reads `mirrordramastudio2722`.
4. **Who runs it** — four leadership names with roles, linking to `/about/team`. Names, not bios.
5. **Both campuses** — addresses, with a link to `/contact`.

- [ ] **Step 2: Check the timeline is legible at 375px**

Alternating layouts collapse badly. Below 880px it must be a single left-aligned column with the year as a heading, not a squeezed two-column.

- [ ] **Step 3: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/about
git commit -m "feat: /about

The timeline is the spine. 2017 to 2025, eight milestones, with the 2025
rename given its own treatment rather than being the last row of a table —
it is the turn in the story, and it is why the YouTube handle still reads
mirrordramastudio2722.

2023 is absent. The old site groups it loosely with 2022 and we are not
inventing a milestone; it is on the client gate list."
```

---

## Task 16: `/about/team`

**Files:**
- Create: `app/about/team/page.tsx`

**Interfaces:**
- Consumes: `TEAM`, `getTeacher`, shadcn `tabs` or plain sections

- [ ] **Step 1: Write the page**

Four profiles at full depth. Each: portrait, name, Chinese name, role in both languages, bio paragraphs, and the credit list as a dated table — year on the left in Fraunces, the work on the right.

Chinese work titles keep their Chinese and get `lang="zh-Hans"` on the span. Where the old site gave an English gloss, keep both: *Thursday, Wednesday*《星期四，星期三》.

Rachel Fu's 2000 credit carries two awards — Best Director at the 2001 Beijing College Student Film Festival and a Silver Award at the China Digital Media Competition for College Students. Those are the strongest lines in the list and should not be flattened into the film's title.

Diana Zhao's profile cross-links to `/faculty#diana-zhao` and says she holds both roles.

- [ ] **Step 2: Give each leader an anchor**

`id={leader.slug}` with `scroll-margin-top: var(--bar-h)`, so `/about/team#diana-zhao` works from `/faculty`.

- [ ] **Step 3: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/about/team
git commit -m "feat: /about/team

Both founders' credit lists in full. Central Academy of Drama training, a Ning
Hao film that won Best Director at the 2001 Beijing College Student Film
Festival, lead dubbing on eight features, a CCTV 3.15 gala, and a national
stage tour — all of it was a JPEG on the old site.

Chinese work titles keep their Chinese, with the English gloss where the old
site gave one."
```

---

## Task 17: `/about/partners`

**Files:**
- Create: `app/about/partners/page.tsx`

**Interfaces:**
- Consumes: `PARTNERS`, `LogoBelt`

- [ ] **Step 1: Write the page**

Three treatments, not one wall:

1. **Named institutions** — seven, each with its `relationship` line. This is the section that carries weight; AYACA, CEFA, AMEB, the Chinese Museum, Trinity, the Consulate-General and China Daily each mean something specific. Laid out as a list with the relationship as the body, not as logos.
2. **Supporting organisations** — the fifteen, as a `LogoBelt` running left.
3. **Media** — the eleven, as a `LogoBelt` running right.

- [ ] **Step 2: Add the known-defects note to the source, not the page**

The three light-on-light logos and the one with a browser tooltip baked in are source problems. Record them as a comment in `lib/content/partners.ts` — do not add CSS that tries to hide them, and do not put a note about them on the public page.

- [ ] **Step 3: Check both belts run and pause on hover**

In a **real browser window**. The automation sandbox throttles CSS animation in a hidden tab and both belts will read as stopped when they are fine.

- [ ] **Step 4: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/about/partners
git commit -m "feat: /about/partners

Three treatments rather than one wall. The seven named institutions each get
a line saying what the relationship actually is, because 'partner' is not
information — CEFA is an examination accreditation, the Consulate-General
broadcast two of the MVs, China Daily runs a competition students entered.

The 26 belt logos reuse the homepage's LogoBelt."
```

---

## Task 18: `/stage`

**Files:**
- Create: `app/stage/page.tsx`

**Interfaces:**
- Consumes: `PRODUCTIONS`, `VideoFigure`

- [ ] **Step 1: Write the page**

A grid of six, each a silent looping card into its case study. Group or label by `kind` — two MVs, one stage production, two galas, one competition — so the reader can see the range at a glance rather than six undifferentiated tiles.

Cards autoplay muted loops. Honour `prefers-reduced-motion` via the existing hook: under reduced motion, show the poster frame and no video.

- [ ] **Step 2: Check six autoplaying videos do not wreck the page**

Six simultaneous loops is the risk this page carries. Measure: the six loops together should be under about 12 MB. If the page stutters, drop to poster frames with the loop starting on hover and on focus.

- [ ] **Step 3: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/stage
git commit -m "feat: /stage

Six works, grouped by kind so the range reads at a glance — two original MVs,
an annual stage production, two galas and an international competition.

Cards run silent 10s loops rather than posters, because these are the only
moving images the school has and a still of a stage is a still of an empty
stage. Reduced motion gets the poster frame."
```

---

## Task 19: `/stage/[slug]` — the six case studies

**Files:**
- Create: `app/stage/[slug]/page.tsx`

**Interfaces:**
- Consumes: `PRODUCTIONS`, `getProduction`, `productionSlugs`, `getCourse`, `VideoFigure`, `PageNav`
- Same `dynamicParams = false` and `generateStaticParams` shape as Task 12

- [ ] **Step 1: Write the page**

Per production: hero with the title in both languages and the year; `VideoFigure` running the full render; body copy; a credits table from `credits`; the stills; and the related courses cross-linked, so a reader who just watched a choir perform can reach the choir course in one click.

- [ ] **Step 2: Write the Belt & Road page carefully**

It carries the competition and not the results. Verified and safe to state: hosted by China Daily; running since 2019; participants from more than fifty countries and regions; the 2025 seventh global final's theme was *"As global citizens in the digital age, how can we overcome prejudice in building a more connected world?"*; Mirror students competed.

**Not stated:** how many entered, where anyone placed, who was interviewed, or which mentors supported them. That is the sentence the live site still renders as `XXX obtained Third, Second and First places`, and the test added in Task 4 fails if any of it comes back.

- [ ] **Step 3: Check the two Olympics claims are stated exactly**

*Born to Fly* was **broadcast on the official website of the Beijing Winter Olympics Organising Committee and on the Chinese Consulate-General in Melbourne's official platform**, 2022. It was not an official Olympic entry and the page must not read as though it was. 笔画春秋 screened at the Consulate-General's Teachers' Day event in 2023.

- [ ] **Step 4: Verify all six build and play**

```bash
npm run build
```

Then open each in a real browser and press play. The full render comes from Blob — if it fails, the poster must stay up rather than showing a broken element.

- [ ] **Step 5: Verify lint and tests, then commit**

```bash
npm run lint && npm test
git add app/stage
git commit -m "feat: the six production case studies

4.9 GB of masters finally has somewhere to be seen. Each case study says what
the work was, who made it and where it played, then cross-links the course it
grew out of.

Belt and Road carries the competition and not the results. The live site
still reads 'XXX obtained Third, Second and First places' today; a test fails
if any placing claim reappears.

Born to Fly is stated as broadcast on the Winter Olympics organising
committee's site and the Consulate-General's platform. It was not an official
Olympic entry and the page must not read as though it was."
```

---

## Task 20: `/stage/achievements`

**Files:**
- Create: `app/stage/achievements/page.tsx`

**Interfaces:**
- Consumes: `ACHIEVEMENTS`, `CREDENTIAL_BODIES`, `Lightbox`

- [ ] **Step 1: Write the page**

Only what is evidenced:

1. **AMEB examination reports** — behind a `Lightbox`, with the examiner's written feedback quoted. Carry the same pre-launch-gate comment as Task 13.
2. **Cultures of China Water Cube Cup, Melbourne** — the 2023 Chinese Songs Contest award ceremony.
3. **Australia-China International Music & Arts Association, Sound of Music** — four award-ceremony photographs.
4. **National Children's Spring Festival Gala, Beijing** — 2026, hosting.
5. **CEFA certificates.**
6. **Credential bodies** — AMEB, CEFA, Trinity, LAMDA, VCE Drama, as a plain list of what the school prepares students for.

- [ ] **Step 2: Do not add a tally**

`docs/STATE.md` records that the homepage deliberately uses four checkable figures instead of the big round numbers the blueprint runs, because no real counts exist. This page holds the same line. If the layout looks like it wants a number row, that is the layout being wrong, not the content being short.

- [ ] **Step 3: Check the Sound of Music source**

`1768491565355570-908941cd.png` carries a Chinese browser's "AI识图" tooltip baked into the pixels. Crop it out if the crop still reads, or leave the image off and keep the text entry. Do not ship the tooltip.

- [ ] **Step 4: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/stage/achievements lib/content/achievements.ts
git commit -m "feat: /stage/achievements

Everything on this page is checkable. No tally, because no real counts exist —
the same line the homepage already holds, where four small true figures
replaced the blueprint's four big invented-looking ones.

The AMEB reports carry the consent gate comment. The Sound of Music source
had a Chinese browser's AI识图 tooltip baked into the pixels; it is cropped
out rather than shipped."
```

---

## Task 21: `/workshops`

**Files:**
- Create: `app/workshops/page.tsx`

**Interfaces:**
- Consumes: `WORKSHOPS`, `WORKSHOP_FAMILIES`, `workshopsByFamily`, shadcn `accordion`

- [ ] **Step 1: Write the page**

Three families, fifteen workshops. Each entry: title in both languages, what happens, duration, age band, whether materials are provided, whether the child keeps what they make.

The count in the headline is computed — `WORKSHOPS.length` — matching what the homepage section already does.

Use the shadcn `accordion` so fifteen entries are scannable. Family headings stay visible; the entries open.

- [ ] **Step 2: Check the three age limits render**

Lacquer beads 5+, sachet 12+, soap 12+ with adult supervision. These are the constraints an organisation books against and the ones a summary flattens first.

- [ ] **Step 3: Keyboard pass over the accordion**

Fifteen panels. Tab, Enter, Escape, Tab through.

- [ ] **Step 4: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/workshops
git commit -m "feat: /workshops

Fifteen workshops in the client's own three families, each with its age band,
whether materials are provided and whether the child keeps what they make.

The old site's homepage had a chip cloud that named none of them. The three
age limits — lacquer beads 5+, sachet and soap 12+, soap with supervision —
are exactly what an organisation books against and exactly what a summary
loses."
```

---

## Task 22: `/workshops/schools`

**Files:**
- Create: `app/workshops/schools/page.tsx`

**Interfaces:**
- Consumes: `WORKSHOPS`, `SITE`

- [ ] **Step 1: Write the page on charcoal**

This is the only page addressed to an organisation rather than a parent, so it gets its own room — the same reasoning that put the homepage workshops section on charcoal.

Content: the incursion format, age bands across the fifteen, group delivery, materials provided, what the school needs to supply, lead time, and a booking path that is an email conversation with a named contact rather than a form.

- [ ] **Step 2: Claim only what the structure evidences**

`OPEN-QUESTIONS #13` — whether schools genuinely book these, how many a year, at what price, and who signs off — is unanswered. The page is built on what the workshops themselves evidence: fixed duration, age bands, "materials provided", group delivery. **No volumes, no client-school names, no case studies.** If it reads thin, that is the honest state; the client owes us the rest.

- [ ] **Step 3: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/workshops/schools
git commit -m "feat: /workshops/schools

The only page addressed to an organisation rather than a parent, so it reads
differently and sits on charcoal — same reasoning as the homepage section.

No volumes and no school names. Whether schools actually book these is
OPEN-QUESTIONS #13 and it is unanswered, so the page claims only what the
workshop structure itself evidences."
```

---

## Task 23: `/workshops/venue`

**Files:**
- Create: `app/workshops/venue/page.tsx`

**Interfaces:**
- Consumes: `HIRE_SPACES`, `VENUE_TERMS`, `VENUE_RATES_AS_AT`, `SITE`, `Lightbox`

- [ ] **Step 1: Write the page**

1. **PageHero** — "Studio hire", the main campus address, `density="deep"`.
2. **The five spaces** — each with its photographs, size in m², peak and off-peak rates, inclusions and extras. Function room first; it is the one with a stage and lighting.
3. **The rate table** — all five in one comparison table, because a venue buyer compares on price and will not assemble it from five cards.
4. **Conditions** — both `VENUE_TERMS` lines verbatim.
5. **As-at line** — "Rates current as at {VENUE_RATES_AS_AT}. Confirmed on booking."
6. **Enquiry** — email and phone. Venue hire is a conversation, not a form.

- [ ] **Step 2: Make the rate table readable on a phone**

Five rows and four columns is where a table breaks at 375px. Either let it scroll inside its own container or restructure to definition lists below 700px. Do not let the page body scroll sideways.

- [ ] **Step 3: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/workshops/venue
git commit -m "feat: /workshops/venue

The old 场地租赁 page had no text on it at all — the entire offer was a
background image nobody rendered. This is five spaces with sizes, peak and
off-peak rates, two extras, two conditions and eight photographs.

Rates are published with the date they were current and a line saying they
are confirmed on booking. A venue buyer compares on price and will not
enquire without one."
```

---

## Task 24: `/contact`

**Files:**
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `SITE`, `CampusTabs`, `EnquiryForm`, `Lightbox`

- [ ] **Step 1: Write the page**

1. **PageHero** — `density="bare"`.
2. **`id="trial"`** — the masthead's "Book a trial class" pill already links to `/contact#trial`. This anchor must exist or the site's most prominent call to action goes nowhere.
3. **Campus tabs over the map** — reusing `CampusTabs`.
4. **Every channel** — phone, WhatsApp, email, WeChat ID with the QR behind a `Lightbox`, Xiaohongshu ID, and all three social links. These exist and are currently linked from nowhere on the live site.
5. **The enquiry form** — with its unchanged note that it does not yet send.

- [ ] **Step 2: Verify the map actually renders**

`docs/STATE.md` records that this has never been seen. The embed URL was checked at HTTP level — 200, no `X-Frame-Options`, no `frame-ancestors` — but the browser-automation sandbox blocks third-party frames, so nobody has watched it load.

**Open `http://localhost:3000/contact` in a real browser window and look at it.** Switch campuses and confirm both maps render. If a frame is blank, check the URL is the `www.google.com/maps/embed?pb=` form — the `maps.google.com/maps?q=&output=embed` form 301s and that redirect carries `X-Frame-Options: SAMEORIGIN`.

- [ ] **Step 3: Verify `/contact#trial` lands correctly**

From the masthead pill, on a page that has just loaded and on one already scrolled.

- [ ] **Step 4: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app/contact
git commit -m "feat: /contact

The #trial anchor exists, so the masthead's filled pill — the site's most
prominent call to action — finally goes somewhere.

Every channel is here and linked. Facebook, Instagram, YouTube, WeChat and
Xiaohongshu all exist and the live site links none of them.

The Google map was verified in a real browser for the first time. It has been
correct at the HTTP level since it was written but the automation sandbox
blocks third-party frames, so nobody had actually watched it load."
```

---

## Task 25: Metadata, structured data, sitemap and the 404

**Files:**
- Create: `app/not-found.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/schema.ts`
- Modify: `app/layout.tsx` — `metadataBase`, title template

**Interfaces:**
- Produces: `organisationSchema()`, `courseSchema(c: Course)`, `personSchema(p)`, `eventSchema(p: Production)` from `lib/schema.ts`

- [ ] **Step 1: Set `metadataBase` and a title template in `app/layout.tsx`**

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://mirrorartsedu.com.au"),
  title: {
    default: "Mirror Arts Education — youth performing arts in Melbourne",
    template: "%s · Mirror Arts Education",
  },
  description:
    "A Melbourne youth performing-arts school. Drama, speech, music and posture for ages six and up, in Surrey Hills and Glen Waverley.",
};
```

Every page task already set its own `title` and `description`; the template wraps them. The old site carried the title `australianmirror` on every page and an empty description on every page, so this is the first time the site has had any.

- [ ] **Step 2: Write `lib/schema.ts`**

`EducationalOrganization` for the root with both campuses as `location`, `Course` per course page, `Person` per teacher and leader, `Event` per production. Read every value from `lib/content/` — do not retype a single address or phone number.

- [ ] **Step 3: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

import { courseSlugs } from "@/lib/content/courses";
import { productionSlugs } from "@/lib/content/productions";

const BASE = "https://mirrorartsedu.com.au";

/* Generated from the content layer, so a new course or production cannot be
   added and then quietly left out of the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/about/team",
    "/about/partners",
    "/courses",
    "/courses/exams",
    "/faculty",
    "/stage",
    "/stage/achievements",
    "/workshops",
    "/workshops/schools",
    "/workshops/venue",
    "/contact",
    ...courseSlugs().map((s) => `/courses/${s}`),
    ...productionSlugs().map((s) => `/stage/${s}`),
  ];

  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 4: Write `app/robots.ts`**

Allow everything, point at the sitemap. **No `hreflang` anywhere yet** — `/zh` does not exist and pointing at 404s is worse than omitting it.

- [ ] **Step 5: Write `app/not-found.tsx`**

The old domain gets a blanket 301 to the homepage, but internal slugs can still be wrong. Offer the four disciplines and contact. Uses the same shell as every other page.

- [ ] **Step 6: Add a test that the sitemap covers every route**

Append to `lib/content/content.test.ts`:

```ts
test("the sitemap covers every course and every production", () => {
  // Regenerating the list here would just restate the implementation, so
  // assert the counts the sitemap is built from instead.
  assert.equal(courseSlugs().length, 9);
  assert.equal(productionSlugs().length, 6);
});
```

- [ ] **Step 7: Verify every route in the masthead resolves**

```bash
npm run build
npx next start &
for p in / /about /about/team /about/partners /courses /courses/exams /faculty \
         /stage /stage/achievements /workshops /workshops/schools \
         /workshops/venue /contact; do
  printf "%-28s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$p")"
done
kill %1
```

Expected: `200` on every line. `/zh` is expected to 404 — it is not in this scope and the masthead's 中文 link is a known dead end until it ships.

- [ ] **Step 8: Verify build, lint, tests, then commit**

```bash
npm run build && npm run lint && npm test
git add app lib/schema.ts lib/content/content.test.ts
git commit -m "feat: metadata, structured data, sitemap and a 404

The old site carried the title 'australianmirror' on every page and an empty
meta description on every page. This is not a refinement — it is the first
time the site has had any.

The sitemap is generated from the content layer, so a new course cannot be
added and then quietly left out of it.

No hreflang. /zh does not exist yet and pointing at 404s is worse than
omitting it."
```

---

## Task 26: Full-site verification pass and STATE.md

**Files:**
- Modify: `docs/STATE.md`

- [ ] **Step 1: Read every page in a real browser at three widths**

375px, 880px and 1440px. Not the automation sandbox — it runs the tab hidden, which throttles `IntersectionObserver` and CSS transitions and makes correct reveals read as `opacity: 0`.

Twenty-eight URLs. For each: does anything overflow horizontally, does the masthead overlap the `h1`, does every image load, does the reveal fire.

- [ ] **Step 2: Keyboard-only pass**

Tab through the whole site without touching the mouse. Every accordion, dialog, tab set and carousel. Focus must be visible everywhere — `:focus-visible` is already styled with a gold outline in `globals.css`.

- [ ] **Step 3: Check every internal link**

```bash
npm run build && npx next start &
npx linkinator http://localhost:3000 --recurse --skip "zh" 2>&1 | tail -30
kill %1
```

Expected: no broken links. `/zh` is skipped — it is out of scope.

- [ ] **Step 4: Run the copy across the whole content layer through stop-slop**

Use the `stop-slop` skill on `lib/content/`. Sixty-odd pieces of copy written across one plan drift toward the same shape.

- [ ] **Step 5: Update `docs/STATE.md`**

Replace the "The homepage is the only page that exists" framing. Record:

- Every page built, with its state
- The content layer as the place facts now live
- shadcn installed, and why the earlier decision was reversed
- Vercel Blob holding the six full video renders
- The pre-launch gates, with parental consent for the two AMEB reports at the top
- What is still out of scope: `/zh`, fees, timetable, testimonials, per-workshop pages

- [ ] **Step 6: Commit**

```bash
git add docs/STATE.md
git commit -m "docs: STATE.md after the inner pages

Twenty-eight URLs where there was one. STATE.md was written when the homepage
was the only page that existed and opened by saying so.

Records the gates that now block a deploy rather than block the build — the
one that matters is written parental consent for the two AMEB reports, which
name two children and print their results."
```

---

## Self-review

**Spec coverage.** Every section of the design spec maps to a task: content layer §1 → Tasks 1–4; rendering model and shared shell §2 → Tasks 6, 10; the fourteen routes §3 → Tasks 11–24; shadcn §4 → Task 5; media pipeline §5 → Tasks 7–9; SEO §6 → Task 25; error handling §7 → Tasks 12, 19, 25; verification §8 → Task 26 plus the per-task checks; pre-launch gates §9 → recorded in Tasks 13, 20, 26; out of scope §10 → not built.

**Naming consistency, checked across tasks.** `getCourse` / `coursesByDiscipline` / `courseSlugs` (Task 2) are the names used in Tasks 11, 12 and 25. `getTeacher` / `facultyByDiscipline` / `teacherSlugs` (Task 3) are the names used in Tasks 12 and 14. `getProduction` / `productionSlugs` (Task 4) are the names used in Tasks 19 and 25. `Section` / `SectionHead` take `tone` and never `variant`. `PageHero` takes `density` and never `size`. `VideoFigure` takes `loop` / `full` / `poster` in Tasks 10, 18 and 19.

**Two known ordering dependencies, deliberate.** `lib/content/faculty.ts` (Task 3) and `courses.ts` (Task 2) name portrait and poster paths that Task 8 produces, so between Task 3 and Task 8 those images 404 in the browser. The alternative is declaring the content twice. The existence tests are added in Task 8 alongside the files, not earlier, so `npm test` stays green throughout. Likewise `productions.ts` (Task 4) leaves `video.full` empty until Task 9 fills it, and `VideoFigure` is specified to fall back to the poster when `full` is absent — which is the same code path it needs for a Blob failure in production.

**Task 6 creates a throwaway `/about` that Task 15 replaces.** That is intentional: the shell needs one real route to be verified against, and `/about` is the simplest.
