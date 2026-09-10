import type { Asset, Slug } from "./types.ts";

/* The fifteen workshops, from content/MIRROR-ARTS-EDUCATION.md §6, in the
 * client's own three families.
 *
 * Bilingual copy for these already exists on the old site — the raw pages
 * are extraction/pages/item_28760874_0.md (arts), _4024095.md (craft) and
 * _4024093.md + _4024094.md (media). This module edits that existing
 * English into the site's register rather than translating fresh, per the
 * brief: it is the lightest copy work in the plan.
 *
 * materialsProvided is true wherever the old site's own copy states that
 * materials, costumes or props are supplied by the workshop. Seven craft
 * workshops and shadow puppets say so with the fixed phrase "All materials
 * are provided/included." Dragon and lion dance is judged true on weaker
 * evidence — the copy names "authentic costumes and props" as what
 * students perform with, without ever saying "provided" — so that one
 * entry is an interpretive read, not a quote, and is flagged as such here
 * rather than folded silently into the same standard as the rest.
 * Everywhere else the copy neither states nor implies the workshop
 * supplies anything, so materialsProvided is false rather than guessed.
 *
 * keepsWork is explicit on the source for exactly one workshop — shadow
 * puppets, "they get to take home their handmade puppet." The other six
 * craft workshops each describe the student shaping a personal item (a
 * fan, a bracelet, a sachet) with no stated further use for it, so
 * keepsWork is true for those too; that is an inference, not a quote, and
 * is flagged as a judgement call in the task report. The four arts
 * workshops and the three remaining media workshops produce no physical
 * item the copy describes the student keeping, so keepsWork is false.
 *
 * Photographs (21, across item_28760874_*) are Task 8 output. The `image`
 * field exists on the type below so Tasks 8 and 21 have somewhere to put
 * them, but it is left undefined on every workshop here rather than
 * pointed at a path that doesn't exist yet. */

export type FamilyId = "arts" | "craft" | "media";

export type Family = {
  id: FamilyId;
  title: string;
  cn: string;
};

export type Workshop = {
  slug: Slug;
  title: string;
  cn: string;
  family: FamilyId;
  body: string;
  minAge?: number;
  materialsProvided: boolean;
  keepsWork: boolean;
  supervision?: string;
  image?: Asset;
};

export const WORKSHOP_FAMILIES: Family[] = [
  { id: "arts", title: "Traditional Chinese arts performance", cn: "中国传统艺术表演" },
  { id: "craft", title: "Traditional Chinese craft", cn: "中国传统手工工坊" },
  { id: "media", title: "Party hosting & media experiences", cn: "派对承办 & 媒体体验" },
];

export const WORKSHOPS: Workshop[] = [
  // Traditional Chinese arts performance — 中国传统艺术表演
  {
    slug: "traditional-music",
    title: "Traditional Chinese Music Performance",
    cn: "中国传统音乐表演工作坊",
    family: "arts",
    body: "Live performances of classic Chinese pieces led by professional musicians, including High Mountains and Flowing Water, Butterfly Lovers and Jasmine Flower. Students learn the cultural background of the instruments and get a hands-on turn at playing them. Suitable for all ages, beginners welcome.",
    materialsProvided: false,
    keepsWork: false,
  },
  {
    slug: "martial-arts",
    title: "Chinese Martial Arts",
    cn: "中国武术工作坊",
    family: "arts",
    body: "An introduction to Chinese martial arts, covering basic stances, strikes and footwork alongside the discipline's values of respect, balance and self-control. Suitable for all ages, beginners welcome.",
    materialsProvided: false,
    keepsWork: false,
  },
  {
    slug: "dragon-lion-dance",
    title: "Chinese Dragon and Lion Dance",
    cn: "中国舞龙和舞狮工作坊",
    family: "arts",
    body: "Dragon and lion dance performed with authentic costumes and props. Students learn the symbolic movements behind the dance and perform as a team, building coordination along the way. Suitable for all ages, beginners welcome.",
    materialsProvided: true,
    keepsWork: false,
  },
  {
    slug: "traditional-dance",
    title: "Traditional Chinese Dance",
    cn: "中国舞蹈工作坊",
    family: "arts",
    body: "Traditional Chinese dance taught through hand gestures, steps and a short choreographed piece, alongside the cultural history behind the movements. Students perform the choreography to music by the end of the session. Open to all ages and levels.",
    materialsProvided: false,
    keepsWork: false,
  },

  // Traditional Chinese craft — 中国传统手工工坊
  {
    slug: "lacquer-fan",
    title: "Lacquer Fan Making",
    cn: "漆艺扇制作",
    family: "craft",
    body: "Students design and cut their own fan shape, then mix and apply lacquer colours to finish a personal fan. All materials are provided. Suitable for all skill levels.",
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "tie-dye",
    title: "Tie-Dye",
    cn: "扎染工作坊",
    family: "craft",
    body: "Students learn the origins of traditional tie-dye technique, design their own pattern, and dye a 50×50 cm handkerchief. All materials are provided. Suitable for all skill levels.",
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "lacquer-beads",
    title: "Chinese Lacquer Bead Making",
    cn: "中国漆珠工作坊",
    family: "craft",
    body: "Students shape wooden or clay beads, apply lacquer, mix colours and design a pattern, then knot the beads into a bracelet or pendant. All materials are provided.",
    minAge: 5,
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "sachet-making",
    title: "Traditional Chinese Sachet Making",
    cn: "中国香囊制作工作坊",
    family: "craft",
    body: "Students choose fabric and trimmings, learn basic hand-sewing, and fill their own sachet with lavender, mint or dried herbs, finished with ribbon or tassels. All materials are provided. Suitable for students with basic sewing skills.",
    minAge: 12,
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "eco-paper",
    title: "Eco-Friendly Paper Making",
    cn: "环保造纸工作坊",
    family: "craft",
    body: "Recycled paper is turned into new handmade paper, building creativity, teamwork and an understanding of sustainable materials. All materials are provided. Suitable for all skill levels.",
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "incense-making",
    title: "Chinese Incense Making",
    cn: "中国香制作工作坊",
    family: "craft",
    body: "An introduction to incense in Chinese tradition, meditation and ceremony, followed by hand-making a backflow cone or incense stick. All materials are provided. Suitable for all skill levels.",
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "soap-making",
    title: "Traditional Soap Making",
    cn: "传统中式香皂制作工作坊",
    family: "craft",
    body: "Students blend oils and mix, make and cut their own natural soap bars, combining traditional technique with basic chemistry. All materials are provided.",
    minAge: 12,
    materialsProvided: true,
    keepsWork: true,
    supervision: "Requires adult supervision.",
  },

  // Party hosting & media experiences — 派对承办 & 媒体体验
  {
    slug: "chinese-singing",
    title: "Chinese Singing",
    cn: "中国歌曲演唱工作坊",
    family: "media",
    body: "Traditional and contemporary Chinese songs, taught with basic vocal technique — pronunciation, breath control and pitch — and the cultural meaning behind the lyrics.",
    materialsProvided: false,
    keepsWork: false,
  },
  {
    slug: "shadow-puppets",
    title: "Chinese Shadow Puppet Making",
    cn: "中国皮影戏工作坊",
    family: "media",
    body: "An introduction to the cultural significance of Chinese shadow puppetry, followed by making and performing with a handmade puppet. All materials are provided, and students take home the puppet they make.",
    materialsProvided: true,
    keepsWork: true,
  },
  {
    slug: "presenter-broadcasting",
    title: "Presenter and Broadcasting",
    cn: "小主播体验工作坊",
    family: "media",
    body: "A simulated TV studio experience: reading from a teleprompter, controlling voice and body language on camera, and rotating through the roles of presenter, reporter and camera operator across a mock live news broadcast.",
    materialsProvided: false,
    keepsWork: false,
  },
  {
    slug: "voice-over-acting",
    title: "Voice-over and Acting",
    cn: "动画配音工作坊",
    family: "media",
    body: "Vocal warm-ups, character auditions and line rehearsal, then recording a short voice-over clip on real recording equipment, matching voice performance to an animated character.",
    materialsProvided: false,
    keepsWork: false,
  },
];

export function workshopsByFamily(id: FamilyId): Workshop[] {
  return WORKSHOPS.filter((w) => w.family === id);
}
