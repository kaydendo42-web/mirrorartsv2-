"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Lightbox from "@/components/shared/lightbox";
import { CAMPUS_PHOTOS } from "@/lib/content/campus";

/* The rooms, on a grid, inside the Two campuses section.
 *
 * This replaced the marquee on 9 September 2026. The belt moved the
 * photographs past the reader at a fixed height, which meant every frame was
 * cropped to the same letterbox, none of them was ever whole on the screen at
 * once, and the one thing a parent wants to do with a photograph of a room —
 * stop and look at it — was the one thing the section would not let them.
 *
 * The layout is ui-layouts' condition grid: a twelve-column grid whose tiles
 * take alternating spans, so no two rows divide the same way and the eye has
 * a reason to travel down rather than skim across. Ported, not installed —
 * the source ships `motion/react` for a fade-in and four Unsplash demo
 * projects; the fade here is the site's own `.reveal` (see use-reveal.ts) and
 * the content is the seven photographs the client shot.
 *
 * SPANS is what makes it a condition grid, and the numbers are chosen against
 * the photographs rather than picked for variety:
 *
 *   row 1   5 | 7      row 2   7 | 5      row 3   3 | 4 | 5
 *
 * Rows are auto-placed, and one tile per row carries an aspect ratio while
 * its neighbours stretch to match and crop (see globals.css — a ratio beats
 * `align-self: stretch`, so a row where every tile declares one is a row of
 * ragged bottom edges). The tile that gives up the most is always a wide
 * room shot losing its ceiling and its floor, which is the right way round:
 * the wide frames here are wide rooms.
 *
 * The upright frame — the kitchen and the parents' waiting area — takes the
 * 3-span slot for the same reason. Three columns against a row whose height a
 * portrait sets is very close to its native 3:4, so the one photograph that a
 * belt or a uniform grid had to butcher is the one that is barely cropped.
 *
 * Any eighth photograph (Glen Waverley has not been shot; see campus.ts)
 * falls through to a 6-span half-width tile rather than breaking the grid.
 */

/* Column spans by position, from 700px up. Below that the grid is two columns
   under a full-width lead frame and these are ignored — see the .rooms block
   in globals.css. */
const SPANS = [5, 7, 7, 5, 3, 4, 5];
const FALLBACK_SPAN = 6;

export default function RoomGrid() {
  return (
    <ul className="rooms">
      {CAMPUS_PHOTOS.map((photo, i) => {
        const span = SPANS[i] ?? FALLBACK_SPAN;

        return (
          <li key={photo.src} className="room" data-span={span}>
            <Lightbox
              title={photo.label}
              description={photo.alt}
              trigger={
                <button type="button" className="room__hit">
                  <Image
                    className="room__img"
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    /* Widest tile is 7 of 12 columns inside a 1300px wrap,
                       which is about 55vw. Below the grid's breakpoint the
                       lead frame is the full column width. */
                    sizes="(min-width: 700px) 55vw, 100vw"
                  />
                  <span className="room__name">{photo.label}</span>
                  {/* Not decoration, and not a link out — the badge is the
                      affordance for the thing the tile actually does, which
                      is open the photograph at full size. The button's
                      accessible name below says so in words. */}
                  <span className="room__open" aria-hidden="true">
                    <ArrowUpRight strokeWidth={1.75} />
                  </span>
                  <span className="sr-only">
                    Open the {photo.label.toLowerCase()} photograph at full
                    size
                  </span>
                </button>
              }
            >
              <Image
                className="lightbox__img"
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 900px) 860px, 92vw"
              />
            </Lightbox>
          </li>
        );
      })}
    </ul>
  );
}
