import { CREDENTIAL_BODIES } from "./achievements.ts";
import { COMPETITIONS } from "./certificates.ts";
import { COURSES, YOUNGEST_AGE, courseFacts, coursesAt, type Course } from "./courses.ts";
import { DISCIPLINES } from "./disciplines.ts";
import { FACULTY, facultyByDiscipline } from "./faculty.ts";
import { PRODUCTIONS } from "./productions.ts";
import { SITE, campusAddress, formatHours, getCampus, otherCampus, type Campus } from "./site.ts";
import { TIMELINE } from "./timeline.ts";
import {
  HIRE_SPACES, VENUE_CAMPUS, VENUE_RATES_AS_AT, VENUE_RATE_UNIT, VENUE_TERMS,
} from "./venue.ts";
import { INCURSION_CRAFT, INCURSION_PERFORMANCE, PARTY_OPTIONS, type WorkshopActivity } from "./workshops.ts";

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

/* "120 minutes" or "30 or 45 minutes" — the same string the hero prints, so
   the two cannot disagree about how long a class is. */
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

/* The same facts a course states on its own hero, as questions. A course
   that does not record a fact gets no question about it — an absent answer
   says nothing, a guessed one says something wrong. */
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
    items.push({
      q: `How long is each ${c.title} class?`,
      a: `${length[0].toUpperCase()}${length.slice(1)}, at ${SITE.name} in ${SITE.campuses[0].suburb} and ${SITE.campuses[1].suburb}.`,
    });
  }
  if (c.leadsTo) {
    items.push(
      c.leadsTo.href === "/stage#achievements"
        ? {
            q: `Does ${c.title} prepare students for exams?`,
            a: `Yes. ${c.title} is one of the courses that prepare students directly for accredited exam grades — see Exams and achievements on the Stage page.`,
          }
        : {
            q: `Where does ${c.title} lead?`,
            a: `To the stage. Students in ${c.title} work towards ${c.leadsTo.label}.`,
          },
    );
  }
  return items;
}

/* ---- Campus pages -------------------------------------------------------
 *
 * The questions a parent asks about a place. The first two and the last are
 * always there; hours, transport and hire appear only when the record has
 * them. Same rule as faqForCourse: an absent answer says nothing, a guessed
 * one says something wrong. */
export function faqForCampus(c: Campus): FaqItem[] {
  const other = otherCampus(c);
  const here = coursesAt(c.id);
  const titles = here.map((x) => x.title).join(", ");
  const items: FaqItem[] = [
    {
      q: `Where is the ${c.suburb} campus?`,
      a: `At ${campusAddress(c)} — ${SITE.name}'s ${c.name}. The other campus is at ${campusAddress(other)}.`,
    },
    {
      q: `Which courses run at ${c.suburb}?`,
      a:
        here.length === COURSES.length
          ? `All ${COURSES.length} courses: ${titles}. Each course page states its own starting age and class length.`
          : `${here.length} of the ${COURSES.length} courses: ${titles}. Each course page states its own starting age and class length.`,
    },
  ];
  if (c.hours) {
    items.push({
      q: `When is the ${c.suburb} campus open?`,
      a: `${formatHours(c.hours).join("; ")}. Class times are set per course — ask when you enquire.`,
    });
  }
  if (c.transport) {
    items.push({
      q: `How do I get to ${c.suburb}, and is there parking?`,
      a: c.transport.join(" "),
    });
  }
  if (c.id === VENUE_CAMPUS) {
    const sqm = HIRE_SPACES.map((s) => s.squareMetres);
    items.push({
      q: `Can I hire a room at ${c.suburb}?`,
      a: `Yes. ${HIRE_SPACES.length} spaces at this campus are hired by the ${VENUE_RATE_UNIT}, from ${Math.min(...sqm)} to ${Math.max(...sqm)} square metres. The studio hire page lists the rooms and the rates, as at ${VENUE_RATES_AS_AT}.`,
    });
  }
  items.push({
    q: `How do I book a trial at ${c.suburb}?`,
    a: `Through the enquiry form on the contact page. Say that ${c.suburb} suits you, give the child's age and what they are already doing, and a person replies with which course fits and whether there is room this term.`,
  });
  return items;
}

/* ---- /workshops ---------------------------------------------------------- */

const popular = (xs: WorkshopActivity[]) => xs.filter((x) => x.popular).map((x) => x.title);
const WORKSHOP_HOME = getCampus(VENUE_CAMPUS);
const PARTY_POPULAR = [...new Set(PARTY_OPTIONS.flatMap((p) => popular(p.activities)))];

export const WORKSHOPS_FAQ: FaqItem[] = [
  {
    q: "What is the difference between an incursion and an excursion?",
    a: `An incursion is a workshop we bring to your school or venue; an excursion brings your group to us at ${campusAddress(WORKSHOP_HOME)}. The performance and craft activities are the same either way.`,
  },
  {
    q: "Which activities can a school choose from?",
    a: `${INCURSION_PERFORMANCE.length} performance experiences and ${INCURSION_CRAFT.length} craft workshops. The most requested are ${[...popular(INCURSION_PERFORMANCE), ...popular(INCURSION_CRAFT)].join(", ")}.`,
  },
  {
    q: "Do you run parties?",
    a: `Yes: ${PARTY_OPTIONS.map((p) => p.title.toLowerCase()).join(" and ")}, built around activities such as ${PARTY_POPULAR.join(", ")}.`,
  },
  {
    q: "How do we book a workshop?",
    a: `Email ${SITE.email} with the occasion, your group size and ages, a preferred date, and whether you would like to visit us or have us come to you.`,
  },
];

/* ---- /workshops/venue ---------------------------------------------------- */

/* "Stage lighting" → "stage lighting" mid-sentence; "LED screen" stays. */
const lowerFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);

const OFF_PEAK_MIN = Math.min(...HIRE_SPACES.map((s) => s.offPeakRate));
const PEAK_MAX = Math.max(...HIRE_SPACES.map((s) => s.peakRate));
const SQM = HIRE_SPACES.map((s) => s.squareMetres);
const EXTRAS = [...new Map(HIRE_SPACES.flatMap((s) => s.extras).map((e) => [e.label, e])).values()];

export const VENUE_FAQ: FaqItem[] = [
  {
    q: "How much does it cost to hire a room?",
    a: `From $${OFF_PEAK_MIN} to $${PEAK_MAX} an ${VENUE_RATE_UNIT}, depending on the room and the time. Off-peak is weekdays before 5pm; evenings and weekends are the peak rate. Rates as at ${VENUE_RATES_AS_AT}.`,
  },
  {
    q: "How big are the spaces?",
    a: `${HIRE_SPACES.length} spaces from ${Math.min(...SQM)} to ${Math.max(...SQM)} square metres: ${HIRE_SPACES.map((s) => `${s.name} (${s.squareMetres} m²)`).join(", ")}.`,
  },
  ...(EXTRAS.length > 0
    ? [
        {
          q: "What can be added to a booking?",
          a: `${EXTRAS.map((e) => `${lowerFirst(e.label)} at $${e.rate} an ${VENUE_RATE_UNIT}`).join(", and ")}, in the rooms that list them.`,
        },
      ]
    : []),
  {
    q: "Are there conditions?",
    a: VENUE_TERMS.join(" "),
  },
  {
    q: "Where is the venue?",
    a: `At ${campusAddress(WORKSHOP_HOME)}, ${SITE.name}'s ${WORKSHOP_HOME.name}. Every space for hire is at this campus.`,
  },
];

/* ---- /faculty ------------------------------------------------------------
 *
 * The training answer names an institution only if it appears verbatim on a
 * teacher's card — the list below is a filter, not a claim. */

const TEACHING_DISCIPLINES = DISCIPLINES.filter((d) => facultyByDiscipline(d.id).length > 0);
const CREDENTIAL_TEXT = FACULTY.flatMap((t) => t.credentials).join("\n");
const INSTITUTIONS = [
  "Shanghai Theatre Academy",
  "Xi'an Conservatory of Music",
  "Shenyang Conservatory of Music",
  "Beijing Dance Academy",
  "Anhui Normal University",
  "Monash University",
  "University of Melbourne",
  "University of Chichester",
].filter((name) => CREDENTIAL_TEXT.includes(name));
const EXAM_TEACHERS = FACULTY.filter((t) => EXAM_COURSES.some((c) => c.teachers.includes(t.slug)));

export const FACULTY_FAQ: FaqItem[] = [
  {
    q: "How many teachers are there, and what do they teach?",
    a: `${FACULTY.length} teachers across ${TEACHING_DISCIPLINES.length} disciplines — ${TEACHING_DISCIPLINES.map((d) => d.title).join(", ")} — teaching the ${COURSES.length} courses. Each card names the courses that teacher takes, and each course page names its teachers.`,
  },
  {
    q: "Where were the teachers trained?",
    a: `Between them, at ${INSTITUTIONS.join(", ")}, among others. Each card lists that teacher's training and experience.`,
  },
  {
    q: "Which teachers prepare students for exams?",
    a: `${EXAM_TEACHERS.length} of the ${FACULTY.length} teach the ${EXAM_COURSES.length} courses that lead to AMEB, Trinity and CEFA grades. See Exams and achievements on the Stage page for the results.`,
  },
];

/* ---- /stage -------------------------------------------------------------- */

const YEARS = PRODUCTIONS.map((p) => p.year);

export const STAGE_FAQ: FaqItem[] = [
  {
    q: "What do students perform in?",
    a: `${PRODUCTIONS.length} productions and films so far, ${Math.min(...YEARS)} to ${Math.max(...YEARS)}: ${PRODUCTIONS.map((p) => p.shortTitle ?? p.title).join("; ")}.`,
  },
  {
    q: "Which examination and credential bodies appear in the results?",
    a: `${CREDENTIAL_BODIES.map((b) => b.name).join("; ")}. Each result on this page names the body, the grade and the outcome.`,
  },
  {
    q: "Which competitions have students entered?",
    a: `${COMPETITIONS.length} so far: ${COMPETITIONS.map((c) => `${c.title} (${c.years})`).join("; ")}. The certificates are on this page.`,
  },
];

/* ---- /about -------------------------------------------------------------- */

const FIRST = TIMELINE[0];
const LAST = TIMELINE[TIMELINE.length - 1];

export const ABOUT_FAQ: FaqItem[] = [
  {
    q: `When did ${SITE.name} start?`,
    a: `In ${FIRST.year} — "${FIRST.title}" is the first milestone on the timeline on this page, which runs to ${LAST.year}.`,
  },
  {
    q: "Was the school called something else?",
    a: `Yes. It began as ${SITE.formerName} and became ${SITE.name} as it grew beyond drama into speech, music and dance. The Chinese name is ${SITE.cn}.`,
  },
  {
    q: "How many courses and campuses are there now?",
    a: `${COURSES.length} courses across ${DISCIPLINES.filter((d) => d.id !== "adult").length} disciplines, at two campuses: ${campusAddress(SITE.campuses[0])} and ${campusAddress(SITE.campuses[1])}.`,
  },
];
