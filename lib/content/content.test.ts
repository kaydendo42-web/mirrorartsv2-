import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

import { SITE } from "./site.ts";
import { ADULT_PROGRAMS, DISCIPLINES, getDiscipline } from "./disciplines.ts";
import {
  COURSES,
  YOUNGEST_AGE,
  courseFactLine,
  courseFacts,
  getCourse,
  coursesByDiscipline,
  courseSlugs,
} from "./courses.ts";
import { COURSES as ENQUIRY_COURSES } from "../courses.ts";
import { FACULTY, getTeacher, facultyByDiscipline, teacherSlugs } from "./faculty.ts";
import { TEAM, getLeader } from "./team.ts";
import { TIMELINE } from "./timeline.ts";
import { PRODUCTIONS, getProduction, productionSlugs } from "./productions.ts";
import { INCURSION_PERFORMANCE, INCURSION_CRAFT, PARTY_OPTIONS, WORKSHOP_FEATURES } from "./workshops.ts";
import { HIRE_SPACES, VENUE_TERMS, VENUE_RATES_AS_AT } from "./venue.ts";
import { ACHIEVEMENTS, CREDENTIAL_BODIES } from "./achievements.ts";
import { COMPETITIONS } from "./certificates.ts";
import { CAMPUS_PHOTOS } from "./campus.ts";
import { PARTNERS } from "./partners.ts";
import { NAV } from "../navigation.ts";
import nextConfig from "../../next.config.ts";

test("site carries the locked contact details verbatim", () => {
  assert.equal(SITE.phone, "+61 498 183 332");
  assert.equal(SITE.whatsapp, "0422 362 426");
  assert.equal(SITE.email, "workshop@mirrorartsedu.com");
  assert.equal(SITE.wechat, "MirrorArtsEdu");
});

test("site carries the locked xiaohongshu ID verbatim", () => {
  assert.equal(SITE.xiaohongshu, "789947009");
});

test("socials carry the three exact URLs", () => {
  const hrefs = SITE.socials.map((s) => s.href);
  assert.ok(
    hrefs.includes(
      "https://www.facebook.com/p/Mirror-Arts-Education-61575724035583/",
    ),
    "Facebook URL missing or wrong",
  );
  assert.ok(
    // The "mirrorartseducation" here is the real Instagram handle, not the
    // banned poster email domain — do not change it.
    hrefs.includes("https://www.instagram.com/mirrorartseducation/"),
    "Instagram URL missing or wrong",
  );
  assert.ok(
    hrefs.includes("https://www.youtube.com/@mirrordramastudio2722"),
    "YouTube URL missing or wrong",
  );
});

test("site does not carry the poster's wrong email", () => {
  const blob = JSON.stringify(SITE).toLowerCase();
  assert.ok(
    !blob.includes("mirrorartseducation.com"),
    "the studio-hire poster's address is an error and must not appear",
  );
});

/* The ATO's ABN check: subtract one from the first digit, weight the eleven
   digits 10,1,3,5,7,9,11,13,15,17,19, and the sum divides by 89. A typo in
   the footer's ABN is a legal identifier pointing at a different business,
   and nothing else on the site would notice. */
function abnIsValid(abn: string): boolean {
  const digits = abn.replace(/\s/g, "").split("").map(Number);
  if (digits.length !== 11 || digits.some(Number.isNaN)) return false;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  digits[0] -= 1;
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  return sum % 89 === 0;
}

test("site carries the registered entity and a checksum-valid ABN", () => {
  assert.equal(SITE.legal.entity, "The Trustee for Mirror Arts Unit Trust");
  assert.equal(SITE.legal.abn, "46 672 926 216");
  assert.ok(abnIsValid(SITE.legal.abn), "ABN fails the ATO checksum");
  assert.ok(!abnIsValid("46 672 926 217"), "checksum helper must reject a wrong digit");
});

test("the privacy policy carries a real last-updated date that is not in the future", () => {
  const d = new Date(SITE.legal.policyUpdated);
  assert.ok(!Number.isNaN(d.getTime()), "policyUpdated is not a parseable date");
  assert.match(SITE.legal.policyUpdated, /^\d{4}-\d{2}-\d{2}$/, "policyUpdated must be ISO yyyy-mm-dd");
  assert.ok(d.getTime() <= Date.now(), "policyUpdated is in the future");
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
      c.mapEmbed.startsWith("https://www.google.com/maps/embed?") &&
        c.mapEmbed.includes("pb="),
      `${c.id} must use the /maps/embed?…pb=… form`,
    );
  }
});

test("there are five sections and their ids are unique", () => {
  // Four disciplines and the adult program. The adult program is a section
  // rather than a discipline — it holds no courses — and the /courses headline
  // counts the four, so this number and that one are not the same number.
  assert.equal(DISCIPLINES.length, 5);
  assert.equal(new Set(DISCIPLINES.map((d) => d.id)).size, 5);
  assert.equal(DISCIPLINES.at(-1)?.id, "adult", "adult closes the list");
});

test("the adult programs are five, each with a name and a sentence", () => {
  assert.equal(ADULT_PROGRAMS.length, 5);
  for (const p of ADULT_PROGRAMS) {
    assert.ok(p.name.startsWith("Adult "), `${p.name} is an adult program`);
    assert.ok(p.blurb.length > 40, `${p.name} blurb`);
  }
});

test("every discipline accent is a six-digit hex", () => {
  for (const d of DISCIPLINES) {
    assert.match(d.accent, /^#[0-9A-Fa-f]{6}$/, `${d.id} accent`);
  }
});

test("getDiscipline throws on an unknown id rather than returning undefined", () => {
  assert.throws(() => getDiscipline("dance" as never), /unknown discipline/i);
});

test("there are thirteen courses with unique slugs", () => {
  assert.equal(COURSES.length, 13);
  assert.equal(new Set(COURSES.map((c) => c.slug)).size, 13);
});

test("every course belongs to a real discipline", () => {
  const ids = new Set(DISCIPLINES.map((d) => d.id));
  for (const c of COURSES) {
    assert.ok(ids.has(c.discipline), `${c.slug} has discipline ${c.discipline}`);
  }
});

test("the four disciplines partition the thirteen courses 2/4/5/2", () => {
  assert.equal(coursesByDiscipline("performance").length, 2);
  assert.equal(coursesByDiscipline("language").length, 4);
  assert.equal(coursesByDiscipline("music").length, 5);
  assert.equal(coursesByDiscipline("posture").length, 2);
  // Adult Program holds programs, not courses. If a course ever lands here the
  // /courses page will render it in a list that has no links in it.
  assert.equal(coursesByDiscipline("adult").length, 0);
});

test("the enquiry list stays in step with the course catalogue", () => {
  // lib/courses.ts is deliberately a literal rather than a derivation — deriving
  // it would pull the whole catalogue into the client bundle through find-us.tsx,
  // which is a client component. This test is what keeps the two honest instead.
  assert.deepEqual(
    [...ENQUIRY_COURSES],
    [
      ...COURSES.map((c) => c.title),
      ...ADULT_PROGRAMS.map((p) => p.name),
      "Not sure yet",
    ],
  );
});

test("the durations that differ from the default survive", () => {
  // The facts most likely to be flattened to "60 min · 10 sessions".
  assert.equal(getCourse("drama").minutes, 120);
  assert.equal(getCourse("drama").sessionsPerTerm, 20);
  assert.equal(getCourse("musical-theatre").minutes, 90);
  assert.equal(getCourse("musical-theatre").sessionsPerTerm, 20);
  assert.equal(getCourse("choir").minutes, 120);
  assert.deepEqual(getCourse("instrument").minutes, [30, 45]);
  assert.equal(getCourse("dance").minutes, 90);
  assert.equal(getCourse("posture-training").minutes, 90);
});

test("nothing claims a minimum age the catalogue does not offer", () => {
  // "children aged 6+" was in the site's meta description and in its
  // organisation record until Musical Theatre and Vocal dropped to four. Both
  // now read this number instead of restating one.
  assert.equal(YOUNGEST_AGE, 4);
  const stale = /age(d)?\s*(six|6)\b/i;
  for (const f of ["app/layout.tsx", "lib/schema.ts"]) {
    // Comments stripped first: the note explaining the change quotes the old
    // string, and a test that fails on its own explanation is a bad test.
    const code = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    assert.ok(!stale.test(code), `${f} states an age of its own`);
  }
});

test("the two production courses admit younger children than the rest", () => {
  // Five and four, against six everywhere the client did not say otherwise.
  // These are the two numbers a parent of a four-year-old is reading for.
  assert.equal(getCourse("drama").minAge, 5);
  assert.equal(getCourse("musical-theatre").minAge, 4);
  assert.equal(getCourse("vocal").minAge, 4);
  assert.equal(getCourse("dubbing").minAge, 5);
});

test("the two holiday programs carry no term length", () => {
  for (const slug of ["dubbing", "mv-production"]) {
    const c = getCourse(slug);
    assert.ok(c.holiday, `${slug} is a holiday program`);
    assert.equal(c.sessionsPerTerm, undefined, `${slug} sessions`);
  }
  assert.equal(getCourse("dubbing").holiday?.days, 5);
});

test("no course carries a class cap", () => {
  // Bilingual hosting capped at eight until 8 September 2026, when the client
  // asked for the cap to come off (item 21). The field survives for the next
  // course that has one; nothing should be asserting eight any more.
  for (const c of COURSES) {
    assert.equal(c.maxStudents, undefined, `${c.slug} cap`);
  }
});

test("music composition is the only course with an entry requirement", () => {
  const gated = COURSES.filter((c) => c.entry);
  assert.deepEqual(gated.map((c) => c.slug), ["music-composition"]);
  assert.match(gated[0].entry!, /AMEB Grade 5/);
});

test("every course has body copy, and a term breakdown or strands", () => {
  for (const c of COURSES) {
    assert.ok(c.body.length >= 1, `${c.slug} body`);
    if (c.highlights) assert.equal(c.highlights.length, 2, `${c.slug} pair`);
    assert.ok(
      c.includes.length > 0 || (c.strands?.length ?? 0) > 0 || c.highlights,
      `${c.slug} says nothing about what it contains`,
    );
  }
});

test("a course states its facts once, and the list and the page agree", () => {
  // courseFactLine is the /courses row; courseFacts is the strip under the
  // heading. The row is the same facts minus the entry requirement, which is
  // a clause and not a chip.
  const composition = getCourse("music-composition");
  assert.equal(courseFactLine(composition), "60 minutes · 10 sessions");
  assert.ok(courseFacts(composition).some((f) => f.label === "Entry"));

  assert.equal(
    courseFactLine(getCourse("dubbing")),
    "Holiday program · 5-day camp · 5 and up",
  );
  assert.equal(
    courseFactLine(getCourse("instrument")),
    "30 or 45 minutes",
  );
  assert.equal(
    courseFactLine(getCourse("drama")),
    "120 minutes · 20 sessions · 5 and up",
  );
});

test("the courses the client renamed kept nothing of the old name", () => {
  // The two renames of 8 September 2026. Voice-over and Posture & etiquette
  // survive only inside the archived poster paths and their alt text, which
  // describe an artefact that really is titled that.
  const facing = JSON.stringify(
    COURSES.map((c) => ({ ...c, poster: undefined })),
  );
  assert.ok(!/voice-?over/i.test(facing), "voice-over survived on a page");
  assert.ok(!/etiquette/i.test(facing), "the old posture title survived");
  assert.equal(getCourse("dubbing").title, "Dubbing");
  assert.equal(getCourse("posture-training").title, "Posture Training");
  assert.equal(getCourse("drama").title, "Drama (Production)");
});

test("no course carries a price or a timetable", () => {
  // There are none. If one appears here it was invented.
  const blob = JSON.stringify(COURSES);
  assert.ok(
    !/\$\s*\d|\bdollars\b|AUD\s*\d+/i.test(blob),
    "a dollar figure appeared in the catalogue",
  );
  assert.ok(
    !/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)s?\b/i.test(
      blob,
    ),
    "a weekday appeared in the catalogue",
  );
});

test("courseSlugs returns every slug", () => {
  assert.deepEqual(
    courseSlugs().sort(),
    COURSES.map((c) => c.slug).sort(),
  );
});

test("there are ten teachers with unique slugs", () => {
  // The client's September 2026 card set: ten cards, ten people. Callum
  // Dibbert has no card in it and is off the faculty.
  assert.equal(FACULTY.length, 10);
  assert.equal(new Set(FACULTY.map((t) => t.slug)).size, 10);
  assert.ok(
    !FACULTY.some((t) => t.slug === "callum-dibbert"),
    "Callum Dibbert is off the faculty and must not be referenced",
  );
});

test("every course's teachers resolve to a real faculty slug", () => {
  const known = new Set(teacherSlugs());
  for (const c of COURSES) {
    for (const t of c.teachers) {
      assert.ok(known.has(t), `${c.slug} references unknown teacher ${t}`);
    }
  }
});

test("every course a teacher's card names has that teacher on it", () => {
  // The three courses with no teacher are the three no card claims. If a
  // fourth ever empties out, someone has removed a teacher without moving
  // their course.
  const empty = COURSES.filter((c) => c.teachers.length === 0).map((c) => c.slug);
  assert.deepEqual(empty.sort(), ["debating", "instrument", "mv-production"]);
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

test("facultyByDiscipline returns the performance teachers", () => {
  // Exercises the produced helper directly — the tests above only ever walk
  // FACULTY itself, so this is what would catch facultyByDiscipline silently
  // returning the wrong slice.
  assert.deepEqual(
    facultyByDiscipline("performance")
      .map((t) => t.slug)
      .sort(),
    ["anthony-pontonio", "delyse-weisz", "zoe-sun"],
  );
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

test("the 2026 competition entry claims only the prizes the certificates show", () => {
  /* Belt & Road, the entry this one replaced on 20 September 2026, was
     forbidden any placing claim because none was verified. This one may
     name a result, but only the two the client's certificates document —
     first and second prize, junior group — and it must attribute them the
     way certificates.ts does. Nothing here may name a child. */
  const p = getProduction("youth-drama-speech-debate-2026");
  const blob = [p.blurb, ...p.body, ...p.credits.map((c) => c.value)].join(" ");
  assert.match(blob, /Australian Youth Arts/);
  assert.equal(p.year, 2026);
  assert.equal(p.kind, "competition");
  assert.ok(!/third/i.test(blob), "a third-prize claim has no certificate behind it");
  assert.ok(!/place\b/i.test(blob), "the certificates say prize, not place");

  const certified = COMPETITIONS.find((c) => c.slug === "youth-drama-speech-debate");
  assert.ok(certified, "the certificates section still holds this competition");
  assert.equal(certified.certificates.length, 2);
  assert.match(blob, /first and second prize/i);
  assert.match(blob, /junior/i);

  const named = /\b(Isabella|Xi)\b/;
  assert.ok(!named.test(blob), "a competitor's name leaked into the production copy");
  assert.ok(!PRODUCTIONS.some((x) => x.slug === "belt-and-road-2025"), "Belt & Road is gone");
});

test("Daisy's revised incursion menu includes every performance and craft offering", () => {
  assert.deepEqual(INCURSION_PERFORMANCE.map((a) => a.title), [
    "Traditional Chinese Music", "Chinese Martial Arts", "Dragon and Lion Dance",
    "Traditional Chinese Dance", "Drama", "Puppet Show", "Storytelling & Picture Book Reading",
  ]);
  assert.deepEqual(INCURSION_CRAFT.map((a) => a.title), [
    "Lacquer Fan Making", "Tie-dye", "Chinese Lacquer Beads", "Sachet Making",
    "Eco-friendly Paper", "Chinese Incense", "Traditional Soap", "Perfume Making",
  ]);
});

test("party conditions and options remain specific to the party audience", () => {
  const adult = PARTY_OPTIONS.find((p) => p.id === "adult-parties")!;
  const birthday = PARTY_OPTIONS.find((p) => p.id === "birthday-parties")!;
  assert.deepEqual(adult.notes, ["No alcohol", "Events finish by 8:30 pm"]);
  assert.deepEqual(birthday.notes, ["Suitable for all ages"]);
  assert.ok(adult.activities.some((a) => a.title === "Perfume Making"));
  assert.ok(!birthday.activities.some((a) => a.title === "Perfume Making"));
  for (const party of PARTY_OPTIONS) {
    assert.deepEqual(party.activities.filter((a) => a.popular).map((a) => a.title), ["Natural Soap Making", "Baking Workshop"]);
  }
});

test("all five workshop visuals have a local image and readable supporting content", () => {
  assert.equal(WORKSHOP_FEATURES.length, 5);
  for (const feature of WORKSHOP_FEATURES) {
    assert.ok(existsSync(`public${feature.image.src}`), feature.image.src);
    assert.ok(feature.description.length > 40);
    assert.ok(feature.highlights.length >= 3);
  }
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
  const institutionLogos = PARTNERS.institutions.flatMap((i) => (i.logo ? [i.logo] : []));
  for (const l of [...PARTNERS.media, ...PARTNERS.support, ...institutionLogos]) {
    assert.ok(existsSync(`public${l.src}`), `missing ${l.src}`);
  }
});

test("the partner counts match what was sliced out of the sheets", () => {
  // Eleven media marks and fifteen supporters came out of the two composite
  // sheets. Seven supporters were withdrawn by the client on 4 September
  // 2026, so eight of the fifteen are still carried; the media array is
  // whole and unrendered.
  assert.equal(PARTNERS.media.length, 11);
  assert.equal(PARTNERS.support.length, 8);
  // Six named institutions. Eight until 8 September 2026, when the client
  // withdrew the Chinese Consulate-General in Melbourne and China Daily —
  // both government institutions rather than partners. An exact number, not
  // a floor: this list only ever changes because the client says so.
  assert.equal(PARTNERS.institutions.length, 6);
  assert.ok(
    !PARTNERS.institutions.some((i) => /consulate|china daily/i.test(i.name)),
    "a withdrawn government institution is back on the partners roll",
  );
});

/* A row on the partners roll has to earn its place with something the client
   actually supplied: a sentence saying what the relationship is, or a mark.
   Salesian College Chadstone arrived on 8 September 2026 with only the mark,
   which is why the sentence is no longer required of every row — but a row
   with neither is a row we invented, and that is what this catches. */
test("every named institution carries either a relationship or a mark", () => {
  for (const i of PARTNERS.institutions) {
    if (i.relationship === undefined) {
      assert.ok(i.logo, `${i.name} has neither a relationship nor a logo`);
      continue;
    }
    assert.ok(i.relationship.length > 20, `${i.name} relationship is too thin`);
  }
});

test("the six marks from Partner.docx are on the institutions they belong to", () => {
  // Partner.docx, 8 September 2026. Fewer than six here means a mark was
  // dropped in a refactor; the client sent exactly these.
  const withMarks = PARTNERS.institutions.filter((i) => i.logo).map((i) => i.slug);
  assert.deepEqual(withMarks.sort(), [
    "ameb",
    "ayaca",
    "cefa",
    "melbourne-chinese-museum",
    "salesian-college-chadstone",
    "trinity-college-london",
  ]);
});

test("achievements carry no invented tallies", () => {
  const blob = JSON.stringify(ACHIEVEMENTS);
  assert.ok(!/XXX/i.test(blob), "placeholder text survived");
  assert.ok(CREDENTIAL_BODIES.length >= 3);
});

/* The AMEB results table came out of /stage#achievements on 6 September 2026 at
   the client's request. The two students are named minors, so the pre-launch
   consent gate re-opens the moment anything renders them again. The entry stays
   in ACHIEVEMENTS as a record; this walks the rendered source instead of the
   data, because the failure to catch is a component reading it, not the data
   existing. */
test("no rendered source names the two AMEB students", () => {
  const named = ACHIEVEMENTS.flatMap((a) => a.results ?? []).map((r) => r.student);
  assert.ok(named.length > 0, "the results are gone from the record entirely");

  const roots = ["../../app", "../../components"];
  const files: string[] = [];
  for (const root of roots) {
    const dir = new URL(`${root}/`, import.meta.url);
    const walk = (at: URL) => {
      for (const e of readdirSync(at, { withFileTypes: true })) {
        const next = new URL(`${e.name}${e.isDirectory() ? "/" : ""}`, at);
        if (e.isDirectory()) walk(next);
        else if (/\.(tsx?|css)$/.test(e.name)) files.push(readFileSync(next, "utf8"));
      }
    };
    walk(dir);
  }
  const source = files.join("\n");

  for (const student of named) {
    assert.ok(
      !source.includes(student),
      `${student} is named in app/ or components/ — the consent gate is open again`,
    );
  }
});

test("every venue photograph named in content exists on disk", () => {
  // The alt-length check is here because "venue photo" would pass a
  // presence test and tell a screen reader nothing.
  let total = 0;
  for (const s of HIRE_SPACES) {
    for (const p of s.photos) {
      total += 1;
      assert.ok(existsSync(`public${p.src}`), `missing ${p.src}`);
      assert.ok(p.alt.length > 15, `${p.src} needs real alt text`);
    }
  }
  // Six photographs across five spaces. A count rather than a >= so a
  // silently dropped photograph still fails here.
  assert.equal(total, 6, "six room photographs should be wired up");
});

test("the venue photographs are the ones the client assigned on 20 September 2026", () => {
  // Kayden's instruction, by the numbers in Revision/Photos - 1: function
  // room 8, Room 2 → 3, Room 1 → 1, Room 3 & 4 → 2, workshop space 6 then 4.
  // Files 1–7 are the campus photographs already on disk under
  // /assets/campus (see campus.ts for the number-to-name mapping); 8 is the
  // function-room composite and is new. Locked here so a later "tidy" of
  // the venue page cannot quietly put the poster slices back.
  const by = Object.fromEntries(HIRE_SPACES.map((s) => [s.slug, s.photos.map((p) => p.src)]));
  assert.deepEqual(by["function-room"], ["/assets/venue/function-room.jpg"]);
  assert.deepEqual(by["room-2"], ["/assets/campus/studio-barre.jpg"]);
  assert.deepEqual(by["room-1"], ["/assets/campus/studio-mirror-wall.jpg"]);
  assert.deepEqual(by["rooms-3-4"], ["/assets/campus/studio-windows.jpg"]);
  assert.deepEqual(by["workshop-space"], [
    "/assets/campus/classroom-kitchen.jpg",
    "/assets/campus/classroom-tables.jpg",
  ]);
});

test("every faculty portrait exists on disk", () => {
  for (const t of FACULTY) {
    assert.ok(existsSync(`public${t.portrait.src}`), `missing ${t.portrait.src}`);
  }
});

test("every course photograph that is declared exists on disk", () => {
  // Posters are an archive of the nine courses that had one, heroes are absent
  // on Debating, and galleries are empty until the client sends class footage.
  // What is declared has to be there; what is not declared is not a failure.
  for (const c of COURSES) {
    if (c.poster) {
      assert.ok(existsSync(`public${c.poster.src}`), `missing ${c.poster.src}`);
    }
    if (c.hero) {
      assert.ok(existsSync(`public${c.hero.src}`), `missing ${c.hero.src}`);
    }
    for (const g of c.gallery ?? []) {
      assert.ok(existsSync(`public${g.src}`), `missing ${g.src}`);
    }
  }
});

test("every production still exists on disk", () => {
  for (const p of PRODUCTIONS) {
    for (const s of p.stills) {
      assert.ok(existsSync(`public${s.src}`), `missing ${s.src}`);
    }
  }
});

test("every declared image dimension matches the file on disk", async () => {
  /* Existence is the cheap half. The expensive half is that next/image
     reserves layout from the declared width and height, so a wrong number
     ships a page that jumps once the real file decodes. That has already
     happened twice here — the choir hero was declared 1248x748 against a real
     1448x870, and all nine course posters were declared 860x1200 against a
     real 860x1217 — and nothing in a build, a lint or an existence test
     catches it. */
  const { default: sharp } = await import("sharp");

  const declared: [string, { src: string; width: number; height: number }][] = [
    ...COURSES.flatMap(
      (c) =>
        [
          ...(c.poster ? [[`course ${c.slug} poster`, c.poster]] : []),
          ...(c.hero ? [[`course ${c.slug} hero`, c.hero]] : []),
          ...(c.gallery ?? []).map((g, n) => [
            `course ${c.slug} gallery ${n}`,
            g,
          ]),
        ] as [string, { src: string; width: number; height: number }][],
    ),
    ...FACULTY.map(
      (t) =>
        [`faculty ${t.slug}`, t.portrait] as [
          string,
          { src: string; width: number; height: number },
        ],
    ),
    ...TEAM.map(
      (l) =>
        [`team ${l.slug}`, l.portrait] as [
          string,
          { src: string; width: number; height: number },
        ],
    ),
    ...PRODUCTIONS.map(
      (p) =>
        [`production ${p.slug} video poster`, p.video.poster] as [
          string,
          { src: string; width: number; height: number },
        ],
    ),
    ...PRODUCTIONS.flatMap((p) =>
      p.stills.map(
        (s, i) =>
          [`production ${p.slug} still ${i}`, s] as [
            string,
            { src: string; width: number; height: number },
          ],
      ),
    ),
    ...HIRE_SPACES.flatMap((s) =>
      s.photos.map(
        (p, i) =>
          [`venue ${s.slug} photo ${i}`, p] as [
            string,
            { src: string; width: number; height: number },
          ],
      ),
    ),
    ...CAMPUS_PHOTOS.map(
      (p, i) =>
        [`campus photo ${i}`, p] as [
          string,
          { src: string; width: number; height: number },
        ],
    ),
    /* The partner marks are in the sweep for the same reason as everything
       else, even though they render through a plain img: the roll's rail is a
       fixed height and these are the numbers on the width/height attributes,
       so a wrong pair still ships a row that shifts when the file decodes. */
    ...PARTNERS.institutions.flatMap((i) =>
      i.logo
        ? [
            [`institution ${i.slug} logo`, i.logo] as [
              string,
              { src: string; width: number; height: number },
            ],
          ]
        : [],
    ),
  ];

  assert.ok(declared.length > 30, "the asset sweep should not have gone empty");

  for (const [label, a] of declared) {
    const meta = await sharp(`public${a.src}`).metadata();
    assert.equal(
      `${meta.width}x${meta.height}`,
      `${a.width}x${a.height}`,
      `${label} (${a.src}) is declared at the wrong size`,
    );
  }
});

test("every production has a committed loop and poster on disk", () => {
  for (const p of PRODUCTIONS) {
    assert.ok(existsSync(`public${p.video.loop}`), `missing ${p.video.loop}`);
    assert.ok(
      existsSync(`public${p.video.poster.src}`),
      `missing poster for ${p.slug}`,
    );
  }
});

test("full renders are hosted, not committed", () => {
  /* video.full is "" until a Vercel Blob store exists — VideoFigure falls
     back to the poster, which is the specified behaviour. What this guards
     is the other failure: someone filling in a repo path instead of a URL
     and adding ~110 MB of full-length renders to every clone. */
  for (const p of PRODUCTIONS) {
    if (!p.video.full) continue;
    assert.ok(
      p.video.full.startsWith("https://"),
      `${p.slug} full render must be an absolute URL, not a repo path`,
    );
  }
});

test("every committed loop is silent, ten seconds, and 1280 wide", async () => {
  /* The loops autoplay in a card grid. A loop that carries an audio track is
     a page that makes noise on scroll, and browsers block autoplay outright
     unless it is muted — so an audio stream here is not a size problem, it is
     a video that never starts. Checked against the file rather than trusting
     the transcode flags. */
  const { execFileSync } = await import("node:child_process");

  for (const p of PRODUCTIONS) {
    const probe = (args: string[]) =>
      execFileSync("ffprobe", ["-v", "error", ...args, `public${p.video.loop}`])
        .toString()
        .trim();

    assert.equal(
      probe(["-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0"]),
      "",
      `${p.slug} loop carries an audio track`,
    );
    assert.equal(
      probe([
        "-select_streams", "v:0",
        "-show_entries", "stream=width", "-of", "csv=p=0",
      ]),
      "1280",
      `${p.slug} loop is not 1280 wide`,
    );
    assert.equal(
      Math.round(
        Number(probe(["-show_entries", "format=duration", "-of", "csv=p=0"])),
      ),
      10,
      `${p.slug} loop is not ten seconds`,
    );
  }
});

test("the contact sheet's frame count still fills its grid exactly", () => {
  /* app/courses/page.tsx builds the /courses contact sheet from two arrays:
     every course hero that lives under /assets/courses/ (the 8 September
     shoot) and the six production loops. Its 1100px layout is 7 columns by
     3 rows — 21 cells — with the feature frame spanning 3x2. Six cells for
     the feature leaves fifteen singles, so the sheet needs exactly sixteen
     frames. Seventeen adds a fourth row holding one picture and six holes;
     fifteen leaves one hole. Neither fails a build, a lint or an eye that is
     not looking for it, which is why it is asserted here. */
  const photos = COURSES.filter((c) =>
    c.hero?.src.startsWith("/assets/courses/"),
  );
  assert.equal(photos.length, 10, "course photographs from the 8 Sep shoot");
  assert.equal(PRODUCTIONS.length, 6, "production loops");

  const frames = photos.length + PRODUCTIONS.length;
  assert.equal(frames, 16);
  // The feature is 3 wide by 2 deep; every other frame is one cell.
  assert.equal(3 * 2 + (frames - 1), 7 * 3);
  // And the two smaller layouts need the count to divide by their columns.
  assert.equal(frames % 2, 0, "2-column layout leaves a hole");
  assert.equal(frames % 4, 0, "4-column layout leaves a hole");

  // The interleave is two photographs to a film, so it needs five films after
  // the feature and ten photographs to pair off against them.
  assert.equal(PRODUCTIONS.length - 1, 5);
  assert.equal(photos.length, (PRODUCTIONS.length - 1) * 2);
});

test("the sitemap is built from the content layer, not a second list", () => {
  // app/sitemap.ts spreads courseSlugs() and productionSlugs() into a literal
  // of the static routes. Restating that list here would only restate the
  // implementation, so this asserts the two counts it is built from — the
  // numbers that change when someone adds a course and forgets the sitemap.
  assert.equal(courseSlugs().length, 13);
  assert.equal(productionSlugs().length, 6);
});

test("the three renamed course slugs redirect to their new URLs", async () => {
  // Renamed on 8 September 2026. Every redirect destination has to be a slug
  // that exists, or the redirect is a 404 with extra steps.
  const redirects = (await nextConfig.redirects?.()) ?? [];
  const slugs = new Set(courseSlugs());
  const renamed = redirects.filter((r) => r.source.startsWith("/courses/"));

  for (const [from, to] of [
    ["/courses/english-drama", "/courses/drama"],
    ["/courses/voice-over", "/courses/dubbing"],
    ["/courses/posture", "/courses/posture-training"],
  ]) {
    const hit = renamed.find((r) => r.source === from);
    assert.ok(hit, `no redirect from ${from}`);
    assert.equal(hit.destination, to);
    assert.equal(hit.permanent, true);
    assert.ok(slugs.has(to.replace("/courses/", "")), `${to} is not a course`);
    assert.ok(!slugs.has(from.replace("/courses/", "")), `${from} still exists`);
  }
});

test("the retired Belt & Road case study redirects to the entry that replaced it", async () => {
  // Live at /stage/belt-and-road-2025 until 20 September 2026, so an indexed
  // link or a bookmark has to land somewhere that still exists.
  const redirects = (await nextConfig.redirects?.()) ?? [];
  const hit = redirects.find((r) => r.source === "/stage/belt-and-road-2025");
  assert.ok(hit, "no redirect from /stage/belt-and-road-2025");
  assert.equal(hit.destination, "/stage/youth-drama-speech-debate-2026");
  assert.equal(hit.permanent, true);
  assert.ok(productionSlugs().includes("youth-drama-speech-debate-2026"));
});

test("old section URLs redirect permanently to their parent anchors", async () => {
  const redirects = await nextConfig.redirects?.();
  const merged = redirects?.filter((redirect) =>
    [
      "/about/partners",
      "/stage/achievements",
      "/workshops/schools",
    ].includes(redirect.source),
  );

  assert.deepEqual(merged, [
    {
      source: "/about/partners",
      destination: "/about#partners",
      permanent: true,
    },
    {
      source: "/stage/achievements",
      destination: "/stage#achievements",
      permanent: true,
    },
    {
      source: "/workshops/schools",
      destination: "/workshops#schools",
      permanent: true,
    },
  ]);
});

test("merged nav items link to sections on their parent pages", () => {
  const submenu = (label: string) =>
    NAV.find((item) => item.label === label)?.sub;

  assert.deepEqual(submenu("About"), [
    { label: "Our story", href: "/about" },
    { label: "Partners", href: "/about#partners" },
  ]);
  assert.deepEqual(submenu("Stage"), [
    { label: "Productions", href: "/stage" },
    { label: "Exams & achievements", href: "/stage#achievements" },
    { label: "Competitions", href: "/stage#competitions" },
  ]);
  assert.deepEqual(submenu("Workshops"), [
    { label: "Incursions", href: "/workshops#schools" },
    { label: "Excursions", href: "/workshops#excursions" },
    { label: "Customised parties", href: "/workshops#parties" },
  ]);
});

test("no page-level hreflang points at a route that does not exist", () => {
  // /zh is not built. An hreflang aimed at it tells a search engine a
  // translation exists and then hands it a 404, which is worse than saying
  // nothing. This asserts the layout carries no alternates block at all.
  const layout = readFileSync(new URL("../../app/layout.tsx", import.meta.url), "utf8");
  // `alternates:` with the colon, not the bare word — the comment above the
  // metadata block explains why the key is absent, and a bare-word match
  // fails on the explanation rather than on the code.
  assert.ok(
    !/alternates\s*:/.test(layout),
    "app/layout.tsx declares an alternates key; /zh does not exist yet",
  );
});

test("every static page route is listed in the sitemap", () => {
  // The sitemap's static list is a literal (see app/sitemap.ts for why), so a
  // new page.tsx can be added and quietly left out of it. This walks app/ for
  // every non-dynamic page.tsx and checks its route string is in the source.
  // Dynamic segments ([slug]) are generated from the content layer and are
  // covered by the slug helpers, not here.
  const appDir = new URL("../../app/", import.meta.url);
  const routes: string[] = [];
  const walk = (at: URL, route: string) => {
    for (const e of readdirSync(at, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (e.name.startsWith("[")) continue;
        walk(new URL(`${e.name}/`, at), `${route}/${e.name}`);
      } else if (e.name === "page.tsx") {
        routes.push(route || "/");
      }
    }
  };
  walk(appDir, "");

  const sitemap = readFileSync(new URL("../../app/sitemap.ts", import.meta.url), "utf8");
  for (const r of routes) {
    assert.ok(sitemap.includes(`"${r}"`), `${r} has a page.tsx but is not in app/sitemap.ts`);
  }
  assert.ok(routes.includes("/privacy"), "the privacy policy page does not exist");
});

test("the footer and the enquiry form both link the privacy policy", () => {
  // APP 5: a collection notice at the point of collection, and APP 1: the
  // policy reachable from every page. The form is the only point of
  // collection and the footer is on every page, so those two files are the
  // whole requirement. Source-level, like the consent-gate test above,
  // because there is no component runner and a missing link is a legal
  // gap rather than a visual one.
  const src = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");
  const footer = src("../../components/site/footer.tsx");
  const form = src("../../components/shared/enquiry-form.tsx");
  assert.ok(footer.includes('"/privacy"'), "footer does not link /privacy");
  assert.ok(footer.includes("/privacy#cookies"), "footer does not link /privacy#cookies");
  assert.ok(footer.includes("SITE.legal.abn"), "footer does not print the ABN from SITE.legal");
  assert.ok(form.includes('"/privacy"'), "enquiry form carries no collection notice linking /privacy");
});
