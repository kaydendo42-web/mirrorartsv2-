import type { CampusId } from "./site.ts";
import type { Asset } from "./types.ts";

/* A room photograph carries a name as well as a description. The alt text
 * describes the frame for someone who cannot see it; the label names the room
 * for someone who can, and the two are not interchangeable — "A movement
 * studio with a ballet barre along the wall under framed FOCUS and DISCIPLINE
 * prints" is the right alt and a useless caption.
 *
 * The names are the school's own, taken off the frames themselves. They are
 * what a parent is told on a tour, which is the whole reason for printing
 * them: a photograph of a room answers "what is it like", and the label
 * answers "what is it". */
export type CampusPhoto = Asset & { label: string };

/* The rooms, photographed by the client and supplied 4 September 2026.
 *
 * These are the first photographs of the school's own spaces that were shot
 * for the purpose. Everything before them was either pulled off a Chinese CDN
 * at web resolution or sliced out of a poster — until 20 September 2026
 * the venue page ran on eight room shots at 456px cut out of the rate card,
 * because the poster was all there was. It now reads these same files; see
 * lib/content/venue.ts.
 *
 * They arrived as PNGs and are converted by scripts/import-campus-photos.mjs;
 * the widths and heights below are the converted files on disk, which the
 * content tests check.
 *
 * Order is a walk through the building rather than the order the files were
 * numbered in: the two studios a parent sees first, the barre room, the two
 * teaching rooms, the recording studio, the foyer last because it is the
 * one frame with the school's name in it and it closes the strip.
 *
 * All seven are the main campus at Surrey Hills. Glen Waverley has not been
 * shot — the three hall photographs in the source folder arrived as one
 * composite contact sheet and were left out for that reason.
 */

export const CAMPUS_PHOTOS: CampusPhoto[] = [
  {
    src: "/assets/campus/studio-windows.jpg",
    label: "Corner studio",
    alt: "A corner studio with mirrored walls meeting a two-storey window that runs the length of the room, looking out into the tree canopy over Canterbury Road",
    width: 1448,
    height: 1086,
  },
  {
    src: "/assets/campus/studio-mirror-wall.jpg",
    label: "Mirror studio",
    alt: "A rehearsal studio with a full mirrored wall, track lighting overhead, a keyboard on a stand and folding chairs set out for a class",
    width: 1448,
    height: 1086,
  },
  {
    src: "/assets/campus/studio-barre.jpg",
    label: "Barre room",
    alt: "A movement studio with a ballet barre along the wall under framed FOCUS and DISCIPLINE prints, glazed through to the meeting room beyond",
    width: 1448,
    height: 1086,
  },
  {
    src: "/assets/campus/classroom-tables.jpg",
    label: "Teaching room",
    alt: "A teaching room of hexagonal tables on castors facing a wall-mounted screen, with the glazed corridor running past it",
    width: 1448,
    height: 1086,
  },
  {
    src: "/assets/campus/classroom-kitchen.jpg",
    label: "Kitchen and waiting area",
    alt: "Hexagonal tables pushed together into a single work surface, with the kitchen and the parents' waiting area behind",
    width: 1086,
    height: 1448,
  },
  {
    src: "/assets/campus/recording-studio.jpg",
    label: "Recording studio",
    alt: "The recording studio: a control desk with monitors, a mixing surface and outboard racks, looking through the glass into the vocal booth",
    width: 1448,
    height: 1086,
  },
  {
    src: "/assets/campus/foyer-arch-mark.jpg",
    label: "Foyer",
    alt: "The foyer, with the gold Mirror Arts Education arch mark lit on the long wall",
    width: 1448,
    height: 1086,
  },
];

/* The campus page asks for its own photographs by id. Surrey Hills gets the
   seven above; Glen Waverley gets an empty list and the page renders no
   rooms section rather than the other campus's rooms — a photograph of the
   wrong building is worse than none. */
export function campusPhotos(id: CampusId): CampusPhoto[] {
  return id === "surrey-hills" ? CAMPUS_PHOTOS : [];
}
