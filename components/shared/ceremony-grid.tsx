"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import Lightbox from "@/components/shared/lightbox";
import { CEREMONY_PHOTOS } from "@/lib/content/certificates";

/* The award ceremonies, on the same condition grid the campus rooms use
 * (see room-grid.tsx for why a grid and not a belt). Twenty-three
 * photographs instead of seven, so the spans repeat: nine rows that each
 * add up to twelve, and in every row one tile carries the aspect ratio the
 * .rooms CSS gives spans 4, 6 and 7 while its neighbours stretch to match.
 *
 * Nine of the photographs are upright. They go to the 3- and 4-span slots,
 * where three or four columns against a row a square sets is close to their
 * native 3:4 — the same reasoning the campus grid used for its one upright
 * frame, applied to nine. The landscape frames take the rest in the order
 * the client's folder had them. */

const ROWS = [
  [5, 7],
  [3, 4, 5],
  [7, 5],
  [4, 4, 4],
  [6, 6],
  [5, 3, 4],
  [4, 4, 4],
  [7, 5],
  [4, 4, 4],
];
const SPANS = ROWS.flat();

export default function CeremonyGrid() {
  const upright = CEREMONY_PHOTOS.filter((p) => p.height > p.width);
  const wide = CEREMONY_PHOTOS.filter((p) => p.height <= p.width);

  /* Walk the spans; narrow slots draw from the upright pile while it lasts,
     everything else from the landscape pile. */
  const placed = SPANS.slice(0, CEREMONY_PHOTOS.length).map((span) => {
    const photo = span <= 4 && upright.length ? upright.shift() : wide.shift() ?? upright.shift();
    return { span, photo: photo! };
  });

  return (
    <ul className="rooms rooms--ceremonies">
      {placed.map(({ span, photo }) => (
        <li key={photo.src} className="room" data-span={span}>
          <Lightbox
            title="Award ceremony"
            description={photo.alt}
            trigger={
              <button type="button" className="room__hit">
                <Image
                  className="room__img"
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 700px) 55vw, 100vw"
                />
                <span className="room__open" aria-hidden="true">
                  <ArrowUpRight strokeWidth={1.75} />
                </span>
                <span className="sr-only">Open this photograph at full size</span>
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
      ))}
    </ul>
  );
}
