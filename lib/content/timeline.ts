import type { Asset } from "./types.ts";

/* The company timeline, from content/MIRROR-ARTS-EDUCATION.md §7.
 *
 * §7 gives milestones for 2017, 2018, 2019, 2020, 2021, 2022, 2024 and 2025
 * — eight years, not nine. 2023 has no milestone of its own; the old site's
 * table groups 2022 and 2023 together with a note to "confirm exact split".
 * That split is unresolved and belongs to the client, not to this file, so
 * 2023 is left out rather than invented. It is on the pre-launch client gate
 * list. */

export type Milestone = {
  year: number;
  title: string;
  body: string;
  image?: Asset;
};

export const TIMELINE: Milestone[] = [
  {
    year: 2017,
    title: "Drama training in Australia",
    body: "Mirror enters Australia, partnering with well-known local film and television companies to offer professional drama and screen-acting training.",
  },
  {
    year: 2018,
    title: "Bilingual courses launch",
    body: "Mirror partners with professional instructors from mainland China and Melbourne, launching bilingual drama-performance and language-expression courses.",
  },
  {
    year: 2019,
    title: "Mirror Drama Studio is established",
    body: "Mirror Drama Studio is formally established, with campuses across Melbourne CBD, Kew, Glen Waverley and Doncaster.",
  },
  {
    year: 2020,
    title: "Music courses added",
    body: "Mirror collaborates with independent musicians and adds multiple music courses, broadening the curriculum's scope.",
  },
  {
    year: 2021,
    title: "Original film and music production begins",
    body: "Mirror begins independently producing and filming short drama films and original music videos, and takes part in major local performance events.",
  },
  {
    year: 2022,
    title: "Partnership with the Melbourne Chinese Museum",
    body: "Mirror partners with the Melbourne Chinese Museum, performing and teaching Chinese traditions in English and Mandarin.",
  },
  {
    year: 2024,
    title: "Melbourne's first Year of the Dragon gala",
    body: "As chief producer and director, Mirror co-organises Melbourne's first Year of the Dragon Children's Spring Festival Gala with other local education institutions.",
  },
  {
    year: 2025,
    title: "Mirror Drama Studio becomes Mirror Arts Education",
    body: "Mirror Drama Studio is officially renamed Mirror Arts Education.",
  },
];
