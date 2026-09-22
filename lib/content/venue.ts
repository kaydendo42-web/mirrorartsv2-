import type { CampusId } from "./site.ts";
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
 * Room photographs: the client's own, assigned by Kayden on 20 September
 * 2026 by file number in Revision/Photos - 1. Numbers 1–7 were already on
 * disk as the campus photographs (lib/content/campus.ts holds the
 * number-to-name mapping in its own words), so five of the six entries
 * below point at /assets/campus rather than carrying a second copy of the
 * same file. Number 8 is new: a three-panel composite of the function room,
 * copied byte-for-byte to /assets/venue/function-room.jpg. The eight
 * 456px slices cut out of the poster that stood in until then are gone.
 * content.test.ts locks the assignment.
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

/* Every space on the rate card is at the main campus. The campus page and
   the FAQ read this rather than repeating "Surrey Hills", so a second
   hireable campus would be one edit here and a `campus` field on
   HireSpace, not a hunt through copy. */
export const VENUE_CAMPUS: CampusId = "surrey-hills";

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
    /* Photos - 1/8.jpg, as supplied: one frame holding three views of the
       room — the full hall with its mirrored end wall on top, and two
       smaller shots under stage lighting below. It ships as the composite
       because that is what the client sent and chose; the .space__photos
       4:3 crop trims its sides a little and nothing else. */
    photos: [
      {
        src: "/assets/venue/function-room.jpg",
        alt: "Three views of the function room: the full hall with a mirrored end wall and sprung timber floor, and two smaller views of the same room under stage lighting with black drapes and a lighting rig",
        width: 1536,
        height: 1024,
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
    /* Photos - 1/3.png — the barre room. */
    photos: [
      {
        src: "/assets/campus/studio-barre.jpg",
        alt: "A movement studio with a ballet barre along the wall under framed FOCUS and DISCIPLINE prints, glazed through to the meeting room beyond",
        width: 1448,
        height: 1086,
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
    /* Photos - 1/1.png. The instruction read "room 3 → 1.png", and there
       is no Room 3 on its own — it is half of "Room 3 & Room 4", which got
       its own file in the same message. Room 1 is the space left without
       one, so this is read as Room 1. Confirm with Kayden. */
    photos: [
      {
        src: "/assets/campus/studio-mirror-wall.jpg",
        alt: "A rehearsal studio with a full mirrored wall, track lighting overhead, a keyboard on a stand and folding chairs set out for a class",
        width: 1448,
        height: 1086,
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
    /* Photos - 1/2.png — the corner studio with the long window. */
    photos: [
      {
        src: "/assets/campus/studio-windows.jpg",
        alt: "A corner studio with mirrored walls meeting a two-storey window that runs the length of the room, looking out into the tree canopy over Canterbury Road",
        width: 1448,
        height: 1086,
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
    /* Photos - 1/6.png then 4.png, in the order given. 6 is the one
       portrait frame in the set; the 4:3 box crops it to its middle band,
       which is the tables, so nothing that matters is lost. */
    photos: [
      {
        src: "/assets/campus/classroom-kitchen.jpg",
        alt: "Hexagonal tables pushed together into a single work surface, with the kitchen and the parents' waiting area behind",
        width: 1086,
        height: 1448,
      },
      {
        src: "/assets/campus/classroom-tables.jpg",
        alt: "A teaching room of hexagonal tables on castors facing a wall-mounted screen, with the glazed corridor running past it",
        width: 1448,
        height: 1086,
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
