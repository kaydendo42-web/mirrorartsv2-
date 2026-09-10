import type { Asset, Slug } from "./types.ts";

/* Studio-hire rates, recovered from the studio-hire poster
 * (extraction/assets/tmp1779196320_2319209_s-1502aaec.jpg) via OCR. The old
 * site rendered this page as an undisplayed background image with no text
 * at all — this is the first time the rate card has existed as readable
 * copy.
 *
 * All five spaces are at the main campus, 1F/244 Canterbury Rd, Surrey
 * Hills. offPeakRate is the weekday-before-5pm rate.
 *
 * Room photographs (eight, sliced out of the poster) are Task 7 output —
 * `photos` is left as a literal empty array with a comment rather than a
 * guessed path, and the brief's own photograph test is written to run
 * after Task 7, so it is deliberately not added here.
 *
 * Venue rates are a pre-launch gate (design spec §9, gate 3) — Rachel needs
 * to confirm they are still current before this goes live. */

export type HireSpace = {
  slug: Slug;
  name: string;
  squareMetres: number;
  peakRate: number;
  offPeakRate: number;
  inclusions: string[];
  extras: { label: string; rate: number }[];
  photos: Asset[];
};

export const VENUE_RATES_AS_AT = "January 2026";

/* Every rate on the poster is printed "/HOUR", including both extras —
   "LED Screen available (Extra $50/Hour)". The numbers below are therefore
   dollars per hour, and the unit lives here rather than being typed into the
   page, because a rate card whose unit is a hard-coded string in one
   component is a rate card that means nothing the day someone reuses it. */
export const VENUE_RATE_UNIT = "hour";

export const HIRE_SPACES: HireSpace[] = [
  {
    slug: "function-room",
    name: "Function room",
    squareMetres: 150,
    peakRate: 100,
    offPeakRate: 80,
    inclusions: [],
    extras: [
      { label: "LED screen", rate: 50 },
      { label: "Stage lighting", rate: 30 },
    ],
    /* One photograph, not two. The pair were the same room in two states —
       empty, then lit purple for a showcase — and side by side at half width
       they rendered smaller than every single-photograph room under them, so
       the largest space on the rate card looked like the least important one.
       The showcase shot is still on disk at
       /assets/venue/function-room-lit.jpg if it is ever wanted back. */
    photos: [
      {
        src: "/assets/venue/function-room-empty.jpg",
        alt: "The function room empty, with a row of black folding chairs facing a large wall-mounted screen and a lighting rig overhead",
        width: 456,
        height: 337,
      },
    ],
  },
  {
    slug: "room-2",
    name: "Room 2",
    squareMetres: 47,
    peakRate: 65,
    offPeakRate: 50,
    inclusions: ["Air conditioning"],
    extras: [],
    /* See the note in scripts/slice-venue.mjs: the poster heads this pair
       "Room1 32M² & Room2 47M²" and never captions which photograph is which
       room. The pairing follows the poster's reading order — left photograph
       to the first room named. Confirm with the client. */
    photos: [
      {
        src: "/assets/venue/rooms-1-2-b.jpg",
        alt: "A studio room with a ballet barre along the left wall, a support column, and a glazed wall looking through to a meeting area and greenery beyond",
        width: 402,
        height: 341,
      },
    ],
  },
  {
    slug: "room-1",
    name: "Room 1",
    squareMetres: 32,
    peakRate: 55,
    offPeakRate: 40,
    inclusions: ["Air conditioning"],
    extras: [],
    photos: [
      {
        src: "/assets/venue/rooms-1-2-a.jpg",
        alt: "A studio room with a mirrored wall, track lighting, a whiteboard and windows opening onto trees",
        width: 477,
        height: 381,
      },
    ],
  },
  {
    slug: "rooms-3-4",
    name: "Room 3 & Room 4",
    squareMetres: 27,
    peakRate: 45,
    offPeakRate: 30,
    inclusions: ["Air conditioning"],
    extras: [],
    photos: [
      {
        src: "/assets/venue/rooms-3-4-a.jpg",
        alt: "A studio room with a mirrored end wall and a full-height window wall looking onto trees",
        width: 439,
        height: 297,
      },
      {
        src: "/assets/venue/rooms-3-4-b.jpg",
        alt: "A studio room with corner window walls onto a suburban street, track lighting and a timber floor",
        width: 503,
        height: 377,
      },
    ],
  },
  {
    slug: "workshop-space",
    name: "Workshop space",
    squareMetres: 80,
    peakRate: 70,
    offPeakRate: 60,
    inclusions: ["Air conditioning"],
    extras: [],
    photos: [
      {
        src: "/assets/venue/workshop-space-a.jpg",
        alt: "The workshop space set with mobile tables and chairs, a glazed partition along one side and a wall-mounted screen at the far end",
        width: 674,
        height: 391,
      },
      {
        src: "/assets/venue/workshop-space-b.jpg",
        alt: "Hexagonal tables pushed together into a cluster with chairs around them, a kitchenette along the back wall",
        width: 377,
        height: 341,
      },
    ],
  },
];

/* Printed verbatim on the poster. Both are conditions an organisation needs
   before it enquires, so they are content, not fine print. */
export const VENUE_TERMS = [
  "Parties and events that include catering incur an additional cleaning fee.",
  "Bump in and out exceeding 20 minutes incurs an additional AUD 20 per half hour.",
];
