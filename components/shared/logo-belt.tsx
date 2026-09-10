"use client";

import { useRef, type ReactNode } from "react";

import { useTicker } from "@/components/motion/use-ticker";

/* One marquee of logos. The homepage runs two of these in opposite
 * directions; the detailed partners section on /about runs the same two.
 *
 * `label` is a ReactNode rather than a string because every label on this
 * site is bilingual and the Chinese half carries lang="zh-Hans". Flattening
 * it to a string would drop that attribute, and a screen reader would then
 * read 媒体支持 in English phonetics.
 *
 * Reduced motion needs no handling here — useTicker checks the media query
 * itself and returns before adding `is-live`, which leaves the track as a
 * plain strip rather than a stalled animation.
 */
export default function LogoBelt({
  logos,
  direction = "left",
  label,
}: {
  logos: readonly { src: string; alt: string }[];
  direction?: "left" | "right";
  label?: ReactNode;
}) {
  const el = useRef<HTMLDivElement>(null);
  useTicker(el, ".ticker__track", 42, "x");

  return (
    <>
      {label && <p className="ticker__lead">{label}</p>}
      <div
        className={`ticker${direction === "right" ? " ticker--rev" : ""}`}
        ref={el}
      >
        <ul className="ticker__track">
          {logos.map((l) => (
            <li key={l.src}>
              {/* Intrinsic sizes vary per logo and the CSS sets the display
                  height, so a plain img is the honest tool here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
