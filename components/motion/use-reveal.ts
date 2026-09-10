"use client";

import { useEffect } from "react";

/* Scroll reveal, kept as CSS classes rather than moved to framer-motion.
 *
 * The card curtain — the arch opening from a slit to its full height — is a
 * clip-path transition hung off `.card.reveal.is-in` in globals.css. Driving
 * that from JS would mean reimplementing it as a keyframe and losing the way
 * it composes with the hover scale. So this hook does what motion.js did:
 * tag the elements, then let the stylesheet do the work.
 *
 * Groups stagger; single elements arrive on their own.
 */

const GROUPS: [selector: string, stepMs: number][] = [
  [".cards > .card", 90],
  [".works > .work", 110],
  /* The six things the school teaches, staggered down each column. The block
     they came from staggered with framer-motion's staggerChildren; this is
     the same effect through the observer the page already runs. */
  [".teaches__col > .teach", 90],
  /* The room photographs, down the condition grid. Slower than the cards —
     the tiles are large and two of them share a row, so a 90ms step reads as
     a ripple rather than a sequence. */
  [".rooms > .room", 70],
];

const SINGLES = [
  ".sect__head",
  ".achieve__text",
  ".teaches__media",
  ".families > .family",
  ".find__map",
  ".form",
  ".band__in",
  ".foot__brand",
  ".foot__nav",
  ".sect > .wrap > .ghost",
];

export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: Element[] = [];

    GROUPS.forEach(([selector, step]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
        el.classList.add("reveal");
        el.style.setProperty("--d", `${i * step}ms`);
        targets.push(el);
      });
    });

    SINGLES.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("reveal");
        targets.push(el);
      });
    });

    const showAll = () => targets.forEach((el) => el.classList.add("is-in"));

    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    targets.forEach((el) => io.observe(el));

    /* Safety net. Adding `.reveal` takes these elements to opacity 0 and hands
       responsibility for showing them again to the observer — so anything that
       stops the observer delivering leaves the page blank below the hero.
       Background tabs throttle delivery (which is how this was found), and a
       thrown callback or a dead observer would do the same permanently.
       Nothing about a fade is worth a blank page, so after six seconds
       everything is shown whatever the observer did or did not do. */
    const failsafe = window.setTimeout(showAll, 6000);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);
}
