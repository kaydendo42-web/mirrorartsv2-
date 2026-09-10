"use client";

import { useEffect, type RefObject } from "react";

/* A CSS marquee can only loop seamlessly if the track holds two identical
 * copies of the list: the animation travels exactly -50% and lands back where
 * it started. Cloning here rather than in the markup keeps the JSX readable
 * and means the duplicate never reaches the accessibility tree.
 *
 * `is-live` gates the animation, so if this never runs the track stays a
 * plain scrollable strip instead of sliding off.
 *
 * Duration is derived from measured length, not fixed, so a row of eleven
 * logos and a row of fifteen move at the same speed rather than the same beat.
 */
export function useTicker(
  ref: RefObject<HTMLElement | null>,
  trackSelector: string,
  pxPerSecond: number,
  axis: "x" | "y" = "x",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = el.querySelector<HTMLElement>(trackSelector);
    if (!track) return;

    const clone = track.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    // The clone is decoration; nothing in it should be reachable or announced.
    clone
      .querySelectorAll<HTMLElement>("a, button, input")
      .forEach((n) => (n.tabIndex = -1));

    const added = Array.from(clone.childNodes);
    added.forEach((n) => track.appendChild(n));

    const span = axis === "y" ? track.scrollHeight : track.scrollWidth;
    el.style.setProperty("--dur", `${Math.round(span / 2 / pxPerSecond)}s`);
    el.classList.add("is-live");

    return () => {
      added.forEach((n) => n.parentNode?.removeChild(n));
      el.classList.remove("is-live");
    };
  }, [ref, trackSelector, pxPerSecond, axis]);
}
