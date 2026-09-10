import type { Asset } from "./types.ts";

/* Student outcomes, from content/MIRROR-ARTS-EDUCATION.md §8. What is
 * evidenced, and nothing else — the live site's own China Daily results
 * paragraph is still the unfilled "XXX obtained Third, Second and First
 * places" placeholder; nothing here inherits that pattern, and this test
 * file fails if a placeholder tally ever comes back.
 *
 * Achievement images are Task 8 output (the four source scans named below,
 * cropped or replaced) — `image` is left undefined rather than pointed at
 * a path that doesn't exist yet. */

export type ExamResult = {
  student: string;
  grade: string;
  result: string;
};

export type Achievement = {
  slug: string;
  title: string;
  org: string;
  location?: string;
  year?: number;
  category: "examination" | "competition" | "hosting" | "certificate";
  body: string[];
  results?: ExamResult[];
  examiner?: string;
  examDate?: string;
  image?: Asset;
};

export type CredentialBody = {
  id: string;
  name: string;
};

export const CREDENTIAL_BODIES: CredentialBody[] = [
  { id: "ameb", name: "Australian Music Examinations Board (AMEB)" },
  { id: "cefa", name: "China Arts Vocational Education Society (CEFA)" },
  { id: "trinity", name: "Trinity College London" },
  { id: "lamda", name: "LAMDA" },
  { id: "vce-drama", name: "VCE Drama" },
];

export const ACHIEVEMENTS: Achievement[] = [
  /* Vivian Fu and Adrian Wong are named minors. The table that printed their
   * results came out of /stage#achievements on 6 September 2026 at the
   * client's request, so nothing renders `results` now and the parental
   * consent gate is closed. The entry stays because removing a section is
   * not deleting the record. Render these two names again and the gate
   * re-opens — content.test.ts walks app/ and components/ for exactly that.
   * Source scan: extraction/assets/1768491459884928-8626ad63.png. */
  {
    slug: "ameb-practical-examinations",
    title: "AMEB practical examination reports",
    org: "Australian Music Examinations Board",
    year: 2024,
    category: "examination",
    body: [
      "Two AMEB Speech & Performance practical examination reports, sat by Mirror students and examined by Ms Julianne Eveleigh on 5 September 2024.",
    ],
    results: [
      { student: "Vivian Fu", grade: "Speech & Performance Grade 2", result: "B+ Credit" },
      { student: "Adrian Wong", grade: "Speech & Performance Grade 4", result: "A Honours" },
    ],
    examiner: "Ms Julianne Eveleigh",
    examDate: "5 September 2024",
  },

  {
    slug: "water-cube-cup-chinese-songs-contest",
    title: "Chinese Songs Contest, Cultures of China Water Cube Cup",
    org: "Cultures of China Water Cube Cup",
    location: "Melbourne",
    year: 2023,
    category: "competition",
    body: [
      "Two Mirror students received trophies at the 2023 Chinese Songs Contest award ceremony in Melbourne, part of the Cultures of China Water Cube Cup.",
    ],
    // Source scan: extraction/assets/1768491557135953-8e6e12e7.png
  },

  /* Source scan extraction/assets/1768491565355570-908941cd.png carries a
   * Chinese browser's "AI识图" tooltip baked into the pixels — the same
   * defect class as the partner logo public/assets/partners/media/
   * auyang-media.png (see partners.ts). Needs cropping or replacing before
   * this entry ships with a photo. */
  {
    slug: "sound-of-music-singing",
    title: "Sound of Music",
    org: "Australia-China International Music & Arts Association",
    location: "Melbourne",
    category: "competition",
    /* The four award-ceremony photographs are the evidence for this entry,
       not the entry itself. Written as what happened rather than as what we
       hold: /stage#achievements renders these bodies verbatim, and a page
       that says "appear across four photographs" while showing none reads as
       a broken gallery. */
    body: [
      "Mirror singing students have competed at Sound of Music, run by the Australia-China International Music & Arts Association in Melbourne, and appear in its award-ceremony photographs.",
    ],
  },

  {
    slug: "national-childrens-spring-festival-gala-beijing",
    title: "National Children's Spring Festival Gala",
    org: "National Children's Spring Festival Gala",
    location: "Beijing",
    year: 2026,
    category: "hosting",
    body: ["Mirror students hosted at the 2026 National Children's Spring Festival Gala in Beijing."],
    // Source scan: extraction/assets/1768491477880857-4d33f976.png
  },

  {
    slug: "cefa-language-performance-certificates",
    title: "CEFA language-performance certificates",
    org: "China Arts Vocational Education Society (CEFA)",
    category: "certificate",
    body: [
      "Graded certificates issued by CEFA's children's language-performance examination centre — the assessment Mirror's bilingual hosting students sit twice a year, once they are ready.",
    ],
  },
];
