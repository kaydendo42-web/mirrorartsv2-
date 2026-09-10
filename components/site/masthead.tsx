"use client";

import BrandMark from "./brand-mark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NAV } from "@/lib/navigation";

export default function Masthead() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  /* Transparent while the opening reel is on screen, solid once it is behind
   * you. Driven by where the layers actually are rather than a hard-coded
   * scroll offset, so it survives any change to their height. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const reel = document.querySelector<HTMLElement>(".reel");
    if (!reel) {
      bar.classList.remove("is-over");
      bar.style.opacity = "";
      bar.style.pointerEvents = "";
      bar.inert = false;
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wash = document.querySelector<HTMLElement>(".layer--wash");
    const heroCopy = document.querySelectorAll<HTMLElement>(
      ".hero__body, .hero__credit",
    );
    const barDepth = bar.getBoundingClientRect().height; // the point on screen the bar actually occupies

    const setBar = () => {
      const onReel = reel.getBoundingClientRect().bottom > barDepth;
      bar.classList.toggle("is-over", onReel);

      // The wash is deliberately translucent so the video still reads through
      // it — but that also lets the hero's headline ghost through, which just
      // looks like a bug. Fade the hero copy out as the wash climbs over it.
      // The bar goes with it: the wash is a held statement, and it reads as
      // one only if nothing else competes for attention on screen.
      if (!wash || reduced) return;

      // Hold at full strength until the wash is within 60% of a screen, so the
      // hero reads properly during its own dwell rather than dimming the
      // moment the next layer appears at the bottom edge.
      const runway = (window.innerHeight || 1) * 0.6;
      const climb = (runway - wash.getBoundingClientRect().top) / runway;
      const hidden = onReel ? Math.min(1, Math.max(0, climb)) : 0;

      heroCopy.forEach((el) => {
        el.style.opacity = String(1 - hidden);
        el.inert = hidden > 0.9;
      });
      bar.style.opacity = String(1 - hidden);
      // Once it is invisible it must stop catching clicks.
      bar.style.pointerEvents = hidden > 0.9 ? "none" : "";
      bar.inert = hidden > 0.9;
    };

    // Called inline rather than deferred to requestAnimationFrame: it is two
    // getBoundingClientRect reads, and rAF gets throttled in background tabs
    // and low-power mode, which would freeze the bar mid-state.
    setBar();
    window.addEventListener("scroll", setBar, { passive: true });
    window.addEventListener("resize", setBar);
    return () => {
      window.removeEventListener("scroll", setBar);
      window.removeEventListener("resize", setBar);
      bar.inert = false;
      heroCopy.forEach((el) => { el.inert = false; });
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="masthead" id="masthead" ref={barRef}>
      <div className="masthead__in">
        <Link className="brand" href="/" aria-label="Mirror Arts Education">
          <BrandMark />
        </Link>

        <nav
          className={`nav${open ? " is-open" : ""}`}
          id="nav-panel"
          aria-label="Main"
          // A tap on a link inside the panel should close it.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="nav__list">
            {NAV.map((item) => (
              <li
                key={item.href}
                className={`nav__item${item.sub ? " has-sub" : ""}`}
              >
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}><span className="roll-label"><span>{item.label}</span><span aria-hidden="true">{item.label}</span></span></Link>
                {item.sub && (
                  <ul className="sub">
                    {item.sub.map((s) => (
                      <li key={s.label}>
                        <Link href={s.href}>{s.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* No 中文 switch here. It pointed at /zh, which is not built — the
            link 404'd, which is a worse experience for a Chinese-reading
            parent than no link at all. The pages already carry Chinese
            alongside the English (every eyebrow, every course title), so the
            site is bilingual today; it is the second full translation that
            does not exist yet. Put the switch back the day /zh ships. */}
        <div className="masthead__end">
          <Link className="pill" href="/contact#trial">
            Book a trial class
          </Link>
          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
