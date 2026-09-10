import type { DisciplineId } from "./types.ts";

export type Discipline = {
  id: DisciplineId;
  title: string;
  cn: string;
  /* From the client's existing poster system. These four already appear in
     components/sections/courses.tsx and must not drift from it. The fifth,
     adult, is not in the poster system — there is no adult poster — so it
     takes the house gold rather than a colour invented to sit beside four
     that were chosen together. */
  accent: string;
  blurb: string;
};

/* Five sections, four of them disciplines and the fifth the adult program.
 *
 * The titles and every blurb below are the client's own, from the 8 September
 * 2026 revision (Revision Part 2/Courses/Courese.pdf, items 1, 4, 15, 28-29,
 * 36 and 38). Voice-over became Dubbing, Music became Music & Vocal, Posture
 * & etiquette became Dance & Posture, and Adult Program is new.
 */
export const DISCIPLINES: Discipline[] = [
  {
    id: "performance",
    title: "Performance Arts",
    cn: "表演类",
    accent: "#3E7CB1",
    blurb:
      "Twenty weeks of drama and musical theatre training, from first rehearsal to final curtain, culminating in a full-scale production on a professional theatre stage.",
  },
  {
    id: "language",
    title: "Language & Expression",
    cn: "语言表达",
    accent: "#D9633B",
    blurb:
      "Speech, debating, bilingual hosting and dubbing — developing confident communicators, persuasive speakers and expressive performers.",
  },
  {
    id: "music",
    title: "Music & Vocal",
    cn: "音乐类",
    accent: "#4F8A5B",
    blurb:
      "Vocal, choir, composition, instrumental training and MV production, with dedicated AMEB exam preparation. Students develop musicianship through professional training, performance and creative projects.",
  },
  {
    id: "posture",
    title: "Dance & Posture",
    cn: "舞蹈与形体",
    accent: "#7A5A9E",
    blurb:
      "Build confidence, coordination and stage presence through professional dance and posture training. Dance classes include Hip Hop, K-pop and Chinese Dance, focusing on technique, rhythm, movement and performance. Posture Training develops body alignment, balance, walking, standing and confident presentation.",
  },
  {
    id: "adult",
    title: "Adult Program",
    cn: "成人课程",
    accent: "#C9A227",
    blurb:
      "Designed for adults who want to develop confidence, communication, creativity and physical wellbeing, our adult programs offer professional training in a relaxed and supportive environment.",
  },
];

/* The adult programs are one line each and have no page of their own, which
   is why they are not Courses. A course page carries body copy, a term
   breakdown, a teacher and a photograph; five pages holding one sentence
   apiece would read as five broken pages. They render as a list inside the
   Adult Program section of /courses instead, and they do appear in the
   enquiry form's <select> — an adult enquiring about mat pilates needs a way
   to say so. */
export type AdultProgram = { name: string; blurb: string };

export const ADULT_PROGRAMS: AdultProgram[] = [
  {
    name: "Adult Hosting",
    blurb:
      "Develop confident presentation, stage presence, interviewing skills and audience engagement.",
  },
  {
    name: "Adult Public Speaking",
    blurb:
      "Build confidence through practical training in speech structure, vocal delivery, expression and communication.",
  },
  {
    name: "Adult Jazz Dance",
    blurb:
      "Improve coordination, flexibility and body control through energetic jazz technique and choreography.",
  },
  {
    name: "Adult Vocal",
    blurb:
      "Professional training in breathing, vocal technique, repertoire and performance for singers of all levels.",
  },
  {
    name: "Adult Mat Pilates",
    blurb:
      "Strengthen the core, improve posture and flexibility, and develop better body alignment through structured low-impact training.",
  },
];

export function getDiscipline(id: DisciplineId): Discipline {
  const found = DISCIPLINES.find((d) => d.id === id);
  if (!found) throw new Error(`unknown discipline: ${id}`);
  return found;
}
