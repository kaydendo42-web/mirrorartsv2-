"use client";

import BrandMark from "./brand-mark";
import { useEffect, useRef, useState } from "react";

/* Holds the screen while the hero video gets ready, then lifts. Three rules
 * keep it from becoming an obstacle:
 *
 *   - an 850ms hold, so a slow connection never traps anyone
 *   - once per session, so it isn't a toll gate on every page
 *   - skipped entirely under reduced motion — it is atmosphere, and
 *     atmosphere is what that preference asks us to drop
 *
 * A flat hold rather than a wait on the video: gating on the hero's canplay
 * meant an 18 MB file could hold the door for six seconds on a slow line, and
 * the hero has a poster frame, so it looks right the moment it is revealed
 * whether the video has buffered or not.
 */

const HOLD = 850;

export default function Intro() {
  // Rendered only after mount. Server-rendering it would flash the overlay
  // for returning visitors before the session check could remove it.
  const [state, setState] = useState<"pending" | "showing" | "leaving" | "done">(
    "pending",
  );
  const barRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ?intro replays it — sessionStorage survives a reload, so without this
    // there is no way to show the intro again without closing the tab, which
    // makes it impossible to demo.
    const forced = /[?&]intro\b/.test(window.location.search);

    let seen = false;
    if (!forced) {
      try {
        seen = sessionStorage.getItem("mirror.intro") === "1";
      } catch {
        /* private mode — treat as unseen */
      }
    }

    /* react-hooks/set-state-in-effect fires on the two calls below. It is the
       right call to make here and the exception is deliberate: whether this
       overlay should exist at all depends on sessionStorage and a media query,
       neither of which can be read during render or on the server. This is the
       "subscribe to an external system on mount" case the rule allows for — the
       component renders nothing until the answer is known, so there is no
       cascading render, just one transition out of "pending". */
    if (reduced || seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("done");
      return;
    }

    setState("showing");
    document.documentElement.classList.add("intro-lock");

    const started = Date.now();
    // The hairline tracks the real hold, so it lands full just as the intro
    // lifts rather than stalling at 90% the way fake progress bars do.
    const tick = window.setInterval(() => {
      if (barRef.current) {
        const p = Math.min(1, (Date.now() - started) / HOLD);
        barRef.current.style.transform = `scaleX(${p})`;
      }
    }, 60);

    const lift = window.setTimeout(() => {
      window.clearInterval(tick);
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      try {
        sessionStorage.setItem("mirror.intro", "1");
      } catch {
        /* nothing to do */
      }
      document.documentElement.classList.remove("intro-lock");
      setState("leaving");
    }, HOLD);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(lift);
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    const t = window.setTimeout(() => setState("done"), 950);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "done" || state === "pending") return null;

  return (
    <div
      className={`intro${state === "leaving" ? " is-leaving" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro__in">
        <BrandMark />
      </div>
      <span className="intro__bar" aria-hidden="true">
        <i ref={barRef} />
      </span>
    </div>
  );
}
