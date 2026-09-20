"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

import Lightbox from "@/components/shared/lightbox";
import type { Asset } from "@/lib/content/types";

/* A pile of documents on a desk: certificates and examination reports in
 * paper mounts, dealt across the slot so each one overlaps the last and a
 * corner of every one of them shows. Daisy asked for exactly this on
 * 18 September 2026 — "layered/overlapping, some of them slightly stacked
 * on top of each other" — and it is also the honest way to show eight
 * near-identical CEFA certificates: as a set, not as eight tiles.
 *
 * Every card is a Lightbox trigger, because a certificate that cannot be
 * read is decoration. Hover or focus lifts a card to the top of the pile so
 * the one under the pointer is never hidden by the one dealt after it.
 *
 * Layout is CSS grid with every card in the same cell, offset by margins
 * rather than transforms, so the pile's height is real layout and the
 * section below it never overlaps the last card. --i and --n drive the
 * offsets; --tilt is the card's resting angle, from a fixed sequence so the
 * pile looks the same on every visit.
 *
 * The entrance deals the cards in once the pile scrolls into view; reduced
 * motion, no JavaScript, and a pile already on screen when the script runs
 * all get the pile simply there. */

const TILTS = [-6, 4, -3, 7, -5, 2, -8, 5, -2, 6, -4, 3, 1, -7];

/* Mount colours, mostly paper with the site's accents dealt in. */
const MOUNTS = ["paper", "paper", "lilac", "paper", "gold", "paper", "paper", "wine"];

export default function CertStack({
  items,
  label,
  className = "",
  sizes = "(min-width: 1000px) 360px, 60vw",
}: {
  items: Asset[];
  /* The dialog title: what kind of document this pile holds. */
  label: string;
  className?: string;
  sizes?: string;
}) {
  const root = useRef<HTMLUListElement>(null);

  /* The deal-in follows use-reveal.ts: the server renders every card visible,
     and only once this runs does the pile hide itself and hand the reveal to
     the observer — so a slow hydration, a dead observer or no JS at all still
     leaves the documents on the page. A pile already on screen at mount is
     left as it is rather than blinked out and dealt back in; and after six
     seconds everything is shown whatever the observer did. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { top, bottom } = el.getBoundingClientRect();
    if (top < innerHeight && bottom > 0) return;
    if (!("IntersectionObserver" in window)) return;

    el.dataset.armed = "true";
    const show = () => {
      el.dataset.seen = "true";
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) show();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    const failsafe = window.setTimeout(show, 6000);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const n = items.length;
  /* One document fills most of the slot; a pair leaves room to overlap; a
     pile of three or more settles at the width that lets every card peek. */
  const cardWidth = n === 1 ? "82%" : n === 2 ? "70%" : "58%";

  return (
    <ul
      ref={root}
      className={`certstack ${className}`.trim()}
      style={{ "--n": n, "--card-w": cardWidth } as CSSProperties}
    >
      {items.map((item, i) => (
        <li
          key={item.src}
          className={`certstack__card certstack__card--${MOUNTS[i % MOUNTS.length]}`}
          style={{ "--i": i, "--zig": i % 2, "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
        >
          <Lightbox
            title={label}
            description={item.alt}
            trigger={
              <button
                type="button"
                className="certstack__hit"
                aria-label={`Open at full size: ${item.alt}`}
              >
                <span className="certstack__paper">
                  <span
                    className="certstack__window"
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <Image src={item.src} alt="" fill sizes={sizes} />
                  </span>
                </span>
              </button>
            }
          >
            <Image
              className="lightbox__img"
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 1200px) 1060px, 90vw"
            />
          </Lightbox>
        </li>
      ))}
    </ul>
  );
}
