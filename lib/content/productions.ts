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
 * The competition entry changed on 20 September 2026. China Daily's Belt &
 * Road speech competition (2025) came out at the client's request and the
 * 2026 Australia International Youth Drama, Speech & Debate Competition went
 * in, from the film she uploaded to Drive. Belt & Road was held to "the
 * competition and not the results" because no placing was verified; this
 * one may name a result because the client's own certificates document it —
 * first and second prize, junior group, the two scans in certificates.ts —
 * and content.test.ts holds the copy to exactly that. No child is named.
 *
 * video.full is the Vercel Blob URL of the full-length render with audio,
 * which scripts/transcode.mjs --full produces and `vercel blob put` uploads.
 * The store is mirrorarts-productions on the mirrorartsv2 project. An entry
 * whose full is "" runs the loop with no play button, which the player
 * treats as the specified fallback and not a broken one. */

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
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/born-to-fly-1920.mp4",
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
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/brushstrokes-of-history-1920.mp4",
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
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/jungle-book-1920.mp4",
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
    slug: "youth-drama-speech-debate-2026",
    title: "Australia International Youth Drama, Speech & Debate Competition",
    /* No Chinese title is in hand — the client's certificates, the event's
       banners and the film are English only. Left empty rather than
       translated; productionSchema omits alternateName when it is empty. */
    cn: "",
    year: 2026,
    kind: "competition",
    blurb:
      "The 2026 grand final of AYACA's Australia International Youth Drama, Speech & Debate Competition at Glen Eira Town Hall, where Mirror's junior competitors took first and second prize.",
    body: [
      /* Every fact below is read off the film itself or the certificates:
         the pull-up banner names the presenter and the supporter; the opening
         shots and the honour roll place it at Glen Eira (Caulfield) Town Hall;
         the captioned welcome calls it the grand final; the competitors'
         intro slides show the four forms and three age groups. */
      "The Australia International Youth Drama, Speech & Debate Competition is presented by the Australian Youth Arts & Cultures Association (AYACA) and supported by the Victorian State Government. Its 2026 grand final was held at Glen Eira Town Hall in Caulfield, with competitors in public speaking, poetry, dramatic monologue and storytelling across junior, intermediate and senior groups.",
      "Mirror students competed in the junior group and took first and second prize; both certificates are in the competitions section of the achievements on this page. Delyse Weisz, who teaches speech and drama at Mirror, addressed the awards ceremony.",
    ],
    credits: [
      { label: "Presented by", value: "Australian Youth Arts & Cultures Association" },
      { label: "Supported by", value: "Victorian State Government" },
      { label: "Grand final", value: "Glen Eira Town Hall, Caulfield" },
      { label: "Mirror result", value: "First and second prize, junior group" },
    ],
    video: {
      loop: "/assets/video/youth-drama-speech-debate-2026-loop.mp4",
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/youth-drama-speech-debate-2026-1920.mp4",
      poster: {
        src: "/assets/video/youth-drama-speech-debate-2026-poster.jpg",
        alt: "Glen Eira Town Hall in Caulfield, the venue of the 2026 grand final, in afternoon light",
        width: 1920,
        height: 1080,
      },
    },
    /* The film's only subtitle-free stretch is its opening montage, which is
       what the loop and poster are cut from; see scripts/transcode.mjs. No
       photograph of the event is in hand, so no still. The certificates and
       the ceremony photographs on this page carry the result. */
    stills: [],
    relatedCourses: ["english-speech", "debating", "drama"],
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
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/snake-year-gala-1920.mp4",
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
      full: "https://iwj7bule4frfbhsk.public.blob.vercel-storage.com/productions/horse-year-gala-1920.mp4",
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
