import type { Asset, Meta, Slug } from "./types.ts";

/* The six productions with a video master in hand, from
 * content/MIRROR-ARTS-EDUCATION.md §8 and media/MANIFEST.md.
 *
 * §8's table dates 笔画春秋 (Brushstrokes of History) to Sep 08 2022 and
 * Koven Song's §5 bio bundles it under 2022 beside Born to Fly, while §4.5's
 * poster copy and Rachel Fu's §5 credit list both put it at 2023. The source
 * is split 2-2, not 2-1 — an earlier version of this comment claimed "two
 * independent bio entries beat one table cell", which misstates the evidence.
 * `year` below is 2023 on a different ground: §4.5's 2023年推出 is the most
 * specific statement in the source, and it is what courses.ts already prints,
 * so the site does not show two years for one work. The Consulate-General's
 * Teachers' Day screening is its own dated fact, also 2023. The split itself
 * stays a client question; this file does not resolve it.
 *
 * The 2024 Year of the Dragon gala — Melbourne's first children's Spring
 * Festival gala, Rachel Fu chief director — has no video master of its own,
 * so it is not a seventh production here. It appears as a credits line on
 * the two later gala entries and as its own 2024 milestone in timeline.ts.
 *
 * Belt & Road carries the competition and not the results. The live site
 * still reads "XXX obtained Third, Second and First places" — that sentence
 * is dropped, not filled in, and content.test.ts fails if any placing claim
 * comes back.
 *
 * video.full is a Vercel Blob URL Task 9 produces. Until then it is the
 * empty string and the player falls back to the poster frame — the
 * behaviour the spec calls for anyway. video.loop and video.poster, and
 * every still, are Task 9 and Task 8 output too: real paths, 404 today,
 * deliberately not asset-tested here. Poster width/height below are the
 * planned 16:9 render size (design spec §5, "CRF 27 at 1920"); Task 9 may
 * correct them once the actual crops exist. */

export type Kind = "mv" | "stage" | "gala" | "competition";

export type Production = {
  slug: Slug;
  title: string;
  cn: string;
  year: number;
  kind: Kind;
  blurb: string;
  body: string[];
  credits: Meta[];
  video: { loop: string; full: string; poster: Asset };
  stills: Asset[];
  relatedCourses: Slug[];
};

export const PRODUCTIONS: Production[] = [
  {
    slug: "born-to-fly",
    title: "Born to Fly",
    cn: "此生飞翔",
    year: 2022,
    kind: "mv",
    blurb:
      "Mirror's original Olympic-season music video, broadcast on the Beijing Winter Olympics Organising Committee's official website and the Chinese Consulate-General in Melbourne's official platform, 2022.",
    body: [
      "Born to Fly is an original music video Mirror wrote for its students to sing; the students recorded it. It was broadcast on the official website of the Beijing Winter Olympics Organising Committee and on the Chinese Consulate-General in Melbourne's official platform in 2022.",
      "Rachel Fu served as executive producer and chief planner, Koven Song as chief planner and director, and Joshua Dai composed the score.",
      "The video grew out of the choir and vocal courses, where studio recording sessions and MV shoots are built into the term, and out of music composition, Joshua Dai's own course.",
    ],
    credits: [
      { label: "Executive producer & chief planner", value: "Rachel Fu" },
      { label: "Chief planner & director", value: "Koven Song" },
      { label: "Composer", value: "Joshua Dai" },
    ],
    video: {
      loop: "/assets/video/born-to-fly-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/born-to-fly-poster.jpg",
        alt: "The Mirror choir performing in the Born to Fly music video",
        width: 1920,
        height: 1080,
      },
    },
    stills: [],
    relatedCourses: ["choir", "vocal", "music-composition"],
  },

  {
    slug: "brushstrokes-of-history",
    title: "Brushstrokes of History",
    cn: "笔画春秋",
    year: 2023,
    kind: "mv",
    blurb:
      "Mirror's second original music video, released 2023 and screened at the Chinese Consulate-General in Melbourne's Teachers' Day event that year.",
    body: [
      "Brushstrokes of History is Mirror's second original music video, released in 2023. It was screened at the Chinese Consulate-General in Melbourne's Teachers' Day event that year.",
      "Rachel Fu served as executive producer and chief planner, Koven Song as chief planner and director, and Joshua Dai composed the score — the same three credits as Born to Fly.",
    ],
    credits: [
      { label: "Executive producer & chief planner", value: "Rachel Fu" },
      { label: "Chief planner & director", value: "Koven Song" },
      { label: "Composer", value: "Joshua Dai" },
    ],
    video: {
      loop: "/assets/video/brushstrokes-of-history-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/brushstrokes-of-history-poster.jpg",
        alt: "A still from the Brushstrokes of History music video",
        width: 1920,
        height: 1080,
      },
    },
    stills: [],
    relatedCourses: ["vocal", "music-composition"],
  },

  {
    slug: "jungle-book",
    title: "The Jungle Book",
    cn: "2025年度舞台剧",
    year: 2025,
    kind: "stage",
    blurb: "Mirror's 2025 annual stage production, and the footage the homepage hero runs.",
    body: [
      "The Jungle Book is Mirror's 2025 annual stage production, staged in full costume and drawn from the English drama and musical theatre courses.",
      "The wide establishing shot and the closing award ceremony from this production are the footage the homepage hero runs.",
    ],
    credits: [{ label: "Category", value: "2025 annual stage production" }],
    video: {
      loop: "/assets/video/jungle-book-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/jungle-book-poster.jpg",
        alt: "The cast of The Jungle Book on stage in animal costume and face paint",
        width: 1920,
        height: 1080,
      },
    },
    /* The one photograph in public/assets/stage that is unmistakably this
       production — animal costume, face paint, the same green wash the loop
       carries. Opened and identified from the frame, not from its filename;
       four of the six names in that folder were wrong the first time for
       exactly that reason. */
    stills: [
      {
        src: "/assets/stage/jungle-book-cast.jpg",
        alt: "Children in animal costume and face paint sitting close together mid-scene under green stage light",
        width: 1453,
        height: 870,
      },
    ],
    relatedCourses: ["drama", "musical-theatre"],
  },

  {
    slug: "belt-and-road-2025",
    title: "Belt & Road Youth English Speech Competition",
    cn: '2025英文演讲比赛"一带一路"',
    year: 2025,
    kind: "competition",
    blurb:
      "The 2025 seventh global final of China Daily's Belt & Road Youth English Speech Competition, run since 2019 for entrants from more than fifty countries and regions.",
    body: [
      "The Belt & Road Youth English Speech Competition is hosted by China Daily. Since its 2019 launch, the competition has drawn young participants from more than fifty countries and regions.",
      /* Verbatim off the competition's own title slide, read at 00:44 of
         media/2025-belt-and-road-speech-competition.mp4. §8 of the content
         file renders it "how can we overcome prejudice in building a more
         connected world?", which is what the old site printed — but that is
         second-hand, and this is the event projecting its own theme behind
         the speakers. A sentence inside quotation marks has to match
         something; the slide is the closest thing to a primary source we
         hold. Flagged to the client. */
      'The 2025 seventh global final\'s theme was "As global citizens in the digital age, how can we overcome bias as we build a connected world?" Mirror students competed.',
    ],
    credits: [
      { label: "Host", value: "China Daily" },
      { label: "Running since", value: "2019" },
    ],
    video: {
      loop: "/assets/video/belt-and-road-2025-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/belt-and-road-2025-poster.jpg",
        alt: "A speaker at the microphone in the finals of the China Daily Belt and Road Youth English Speech Competition",
        width: 1920,
        height: 1080,
      },
    },
    /* The competition's own title slide is projected in this frame and reads
       "The 7th China Daily, Belt and Road Yout[h]" with the theme under it,
       which is what identifies the photograph — and what corroborates the
       theme wording quoted above. The segment on screen is the adult group's,
       so the alt says a speaker, not a student. */
    stills: [
      {
        src: "/assets/stage/belt-and-road-stage.jpg",
        alt: "A speaker at the microphone on the competition stage beside the two hosts, judges at a table in front, and the competition's theme slide projected behind",
        width: 1523,
        height: 870,
      },
    ],
    relatedCourses: ["english-speech"],
  },

  {
    slug: "snake-year-gala",
    title: "Year of the Snake Gala",
    cn: "2025年蛇年春晚宣传片",
    year: 2025,
    kind: "gala",
    blurb: "Promotional film for Mirror's 2025 Year of the Snake Spring Festival gala.",
    body: [
      "Snake Year Gala is the promotional film for Mirror's 2025 Year of the Snake Spring Festival gala.",
      "It follows Melbourne's first Year of the Dragon Children's Spring Festival Gala in 2024, which Mirror co-organised with other local education institutions, Rachel Fu serving as chief director.",
    ],
    credits: [{ label: "Chief director, Year of the Dragon gala, 2024", value: "Rachel Fu" }],
    video: {
      loop: "/assets/video/snake-year-gala-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/snake-year-gala-poster.jpg",
        alt: "A promotional still from Mirror's 2025 Year of the Snake gala",
        width: 1920,
        height: 1080,
      },
    },
    stills: [],
    relatedCourses: [],
  },

  {
    slug: "horse-year-gala",
    title: "Year of the Horse Gala",
    cn: "2026年马年春晚宣传片",
    year: 2026,
    kind: "gala",
    blurb: "Promotional film for Mirror's 2026 Year of the Horse Spring Festival gala.",
    body: [
      "Horse Year Gala is the promotional film for Mirror's 2026 Year of the Horse Spring Festival gala.",
      "Like the Snake Year gala before it, it follows Melbourne's first Year of the Dragon Children's Spring Festival Gala in 2024, which Mirror co-organised with other local education institutions, Rachel Fu serving as chief director.",
    ],
    credits: [{ label: "Chief director, Year of the Dragon gala, 2024", value: "Rachel Fu" }],
    video: {
      loop: "/assets/video/horse-year-gala-loop.mp4",
      full: "",
      poster: {
        src: "/assets/video/horse-year-gala-poster.jpg",
        alt: "A promotional still from Mirror's 2026 Year of the Horse gala",
        width: 1920,
        height: 1080,
      },
    },
    stills: [],
    relatedCourses: [],
  },
];

export function getProduction(slug: Slug): Production {
  const found = PRODUCTIONS.find((p) => p.slug === slug);
  if (!found) throw new Error(`unknown production: ${slug}`);
  return found;
}

export function productionSlugs(): string[] {
  return PRODUCTIONS.map((p) => p.slug);
}
