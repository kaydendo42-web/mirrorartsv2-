import type { Asset, DisciplineId, Slug } from "./types.ts";

/* The ten teaching faculty, from the client's own teacher cards in
 * `Revision - Daisy and Rachel/Faculty/` (supplied 9 Sep 2026) — ten cards as
 * a PDF, and the same ten as JPEGs filed under four discipline folders.
 *
 * That set replaces content/MIRROR-ARTS-EDUCATION.md §5's faculty table,
 * which had six rows and is now a year out of date. What changed:
 *
 * - Callum Dibbert has no card and is gone. He was half the English-language
 *   bridge content/AUDIENCE.md §3 leans on; Delyse Weisz still carries it,
 *   and Anthony Pontonio is the other native-English teacher now.
 * - Anthony Pontonio and Zoe Sun are new.
 * - Joyce Wu, Toni Cao and Shanshan were three of the four cards the first
 *   pass could not place — they had no row in §5, so scripts/extract-portraits
 *   .mjs left them unextracted. They are named faculty now. The fourth,
 *   Lindy Zhang, has no card in the new set either and stays off.
 * - Becky Li's card reads VOCAL TEACHER only, so her disciplines narrow to
 *   music and she comes off Musical Theatre and Choir in courses.ts. Flagged
 *   in content/OPEN-QUESTIONS.md — it is the one place the new cards take
 *   something away rather than adding it.
 *
 * `disciplines` is the client's own folder grouping, not our reading of the
 * subject line: Delyse's card is filed — byte-identical — under both
 * Performance Arts and Language, and every other card sits in exactly one
 * folder. Anthony's second discipline is the exception, and it is his card's
 * own side rail: MUSIC THEATER & DUBBING, and dubbing is Language.
 *
 * Diana Zhao and Rachel Cai each hold a second, leadership role — Operations
 * Director and Marketing Director. alsoLeadership marks both; both also
 * appear in team.ts. Rachel Fu and Koven Song, the two founders, lecture but
 * teach no course and stay in team.ts alone.
 *
 * Credentials are one claim per string, so a page can render them as a set
 * rather than a paragraph. Each one is on the teacher's own card, in the
 * card's English or its Chinese — where only the Chinese carries it, the
 * romanisation is ours and is on the open-questions list. */

export type Teacher = {
  slug: Slug;
  name: string;
  cn?: string;
  disciplines: DisciplineId[];
  subject: string;
  subjectCn: string;
  credentials: string[];
  portrait: Asset;
  alsoLeadership?: boolean;
};

export const FACULTY: Teacher[] = [
  {
    slug: "delyse-weisz",
    name: "Delyse Weisz",
    disciplines: ["performance", "language"],
    subject: "Drama & speech",
    subjectCn: "演讲·戏剧",
    credentials: [
      "Award-winning director and educator, over twenty years and more than a hundred children's productions",
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

  {
    slug: "anthony-pontonio",
    name: "Anthony Pontonio",
    disciplines: ["performance", "language"],
    subject: "Musical theatre & dubbing",
    subjectCn: "音乐剧·配音",
    credentials: [
      "Australian-based performer and coach, on stage and on screen",
      "Has performed in Aladdin, Beauty and the Beast and Wicked",
      "Former Musical Director, Disney's The Little Mermaid Jr.",
      "Experienced teacher of performers and singers across every age group",
    ],
    portrait: {
      src: "/assets/faculty/anthony-pontonio.jpg",
      alt: "Anthony Pontonio, musical theatre and dubbing teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "zoe-sun",
    name: "Zoe Sun",
    cn: "孙盈",
    disciplines: ["performance"],
    subject: "Musical theatre & drama",
    subjectCn: "音乐剧·戏剧",
    credentials: [
      "Graduate of the Shanghai Theatre Academy",
      "MBA, EM Normandie Business School, France",
      "Member of the Shanghai Dramatists Association and the China Musical Theatre Association",
      "Lead performer and acting coach, Monash University's PhD experimental theatre production The Seagull Flies Southeast",
      "Credits include Mamma Mia!, Dim Sum Warriors and multiple Mahua FunAge productions",
      "Former Artistic Director and Head of Musical Theatre Education",
    ],
    portrait: {
      src: "/assets/faculty/zoe-sun.jpg",
      alt: "Zoe Sun, musical theatre and drama teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "diana-zhao",
    name: "Diana Zhao",
    cn: "戴安娜",
    disciplines: ["language"],
    subject: "Bilingual hosting & dubbing",
    subjectCn: "双语主持·配音",
    credentials: [
      "Trained bilingual MC, Shanghai Theatre Academy, broadcasting and hosting",
      "Over ten years and more than 1,000 events as a bilingual MC",
      /* 白马商会 and 澳洲茅台 romanised rather than dropped — they are two
         named clients and cutting them would cut the credential down to
         "brand events". Baima Chamber of Commerce and Moutai Australia are
         our reading of the two names, not Diana's own English for them, so
         they are on the open-questions list for her to confirm. */
      "Regular MC for the Baima Chamber of Commerce, Moutai Australia, the Victorian Government and multiple brand events",
    ],
    portrait: {
      src: "/assets/faculty/diana-zhao.jpg",
      alt: "Diana Zhao, bilingual hosting and dubbing teacher",
      width: 800,
      height: 1000,
    },
    alsoLeadership: true,
  },

  {
    slug: "becky-li",
    name: "Becky Li",
    cn: "李思沅",
    disciplines: ["music"],
    subject: "Vocal",
    subjectCn: "声乐",
    credentials: [
      "Bachelor of Vocal Performance, Xi'an Conservatory of Music",
      "Studied under Cha Dalin, Hou Xiping and Zhou Xiaoyan",
    ],
    portrait: {
      src: "/assets/faculty/becky-li.jpg",
      alt: "Becky Li, vocal teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    /* The card prints SHANSHAN and 姜雨姗; the client's own filename for it is
       Angela.jpg. Which of the two she goes by, and how she spells her family
       name in English, is on the open-questions list. */
    slug: "shanshan",
    name: "Shanshan",
    cn: "姜雨姗",
    disciplines: ["music"],
    subject: "Vocal",
    subjectCn: "声乐",
    credentials: [
      "Soprano; Bachelor of Music (Honours) in vocal education, Shenyang Conservatory of Music",
      "Full-scholarship National Outstanding Graduate, and taught at the conservatory afterwards",
      "Member of the Global Music Educators Association",
      "Specialises in children's and young people's vocal training",
    ],
    portrait: {
      src: "/assets/faculty/shanshan.jpg",
      alt: "Shanshan, vocal teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "joyce-wu",
    name: "Joyce Wu",
    cn: "伍炫桦",
    disciplines: ["music"],
    subject: "Vocal & choir",
    subjectCn: "声乐·合唱",
    credentials: [
      "Vocal Performance, University of Melbourne",
      "Contracted actor with the Melbourne Youth Theatre",
      "Youth Champion, Melbourne Singing Competition",
      "Conductor of the Australian University Students' Choir",
      "Certified in the Kodály and Orff methods",
    ],
    portrait: {
      src: "/assets/faculty/joyce-wu.jpg",
      alt: "Joyce Wu, vocal and choir teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "toni-cao",
    name: "Toni Cao",
    cn: "曹玥",
    disciplines: ["music"],
    subject: "Vocal & musical theatre",
    subjectCn: "声乐·音乐剧",
    credentials: [
      "Dual degrees in Music Education and Piano Performance, Anhui Normal University",
      /* 陆洪菲 and 时白林, from the card's Chinese only. Both romanisations
         are ours, as is reading them as the two writers of 《天仙配》. */
      "Studied under Lu Hongfei and Shi Bailin, the writers of The Fairy Couple《天仙配》",
      "Years of children's music education, and children's musical theatre in particular",
    ],
    portrait: {
      src: "/assets/faculty/toni-cao.jpg",
      alt: "Toni Cao, vocal and musical theatre teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "joshua-dai",
    name: "Joshua Dai",
    cn: "戴约成",
    disciplines: ["music"],
    subject: "Music composition",
    subjectCn: "音乐创作",
    credentials: [
      "Piano Performance graduate, University of Melbourne",
      "Current Film Composition master's student, University of Chichester, UK",
      "Composed more than seventy songs for SMG's Magic Town",
      "Scored 360° panoramic films for Shenzhen Happy Valley",
      /* The card's English calls 《笔画春秋》 Brushstrokes of Spring and
         Autumn. team.ts calls it Brushstrokes of History, which is the title
         the site has carried since August; the two are glosses of the same
         Chinese and one of them has to go. Open question, so nothing moves
         until they say which. */
      "Composer of Born to Fly and Brushstrokes of History",
    ],
    portrait: {
      src: "/assets/faculty/joshua-dai.jpg",
      alt: "Joshua Dai, music composition teacher",
      width: 800,
      height: 1000,
    },
  },

  {
    slug: "rachel-cai",
    name: "Rachel Cai",
    /* 蔡心翼 on the new card. The site carried 蔡馨熠 from §5 — same reading,
       different characters, and the card is the client's own and newer. */
    cn: "蔡心翼",
    disciplines: ["posture"],
    subject: "Dance & posture",
    subjectCn: "形体·舞蹈",
    credentials: [
      "Master of Education, Monash University",
      "Beijing Dance Academy teaching certification",
      "ACIC-certified Senior Trainer in Posture & Etiquette",
      "Over twenty years of dance and stage experience",
      "Specialises in Chinese dance, jazz and posture training",
      "Former etiquette and posture trainer for an international airline",
    ],
    portrait: {
      src: "/assets/faculty/rachel-cai.jpg",
      alt: "Rachel Cai, dance and posture teacher",
      width: 800,
      height: 1000,
    },
    alsoLeadership: true,
  },
];

export function getTeacher(slug: Slug): Teacher {
  const found = FACULTY.find((t) => t.slug === slug);
  if (!found) throw new Error(`unknown teacher: ${slug}`);
  return found;
}

export function facultyByDiscipline(id: DisciplineId): Teacher[] {
  return FACULTY.filter((t) => t.disciplines.includes(id));
}

export function teacherSlugs(): string[] {
  return FACULTY.map((t) => t.slug);
}
