import { COURSES, YOUNGEST_AGE, courseFacts, type Course } from "./courses.ts";
import { SITE, campusAddress } from "./site.ts";

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
