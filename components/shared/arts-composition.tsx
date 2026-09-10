"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { StageArtwork, VoiceArtwork } from "@/components/shared/exam-artwork";

// Decorative reuse of the school's existing photographs, without new claims
// or captions. Separate entrance, drift and paper layers keep motion composable.
const PHOTOGRAPHS = {
  story: [
    "/assets/courses/musical-theatre-finale.jpg",
    "/assets/stage/jungle-book-cast.jpg",
    "/assets/courses/dubbing-studio.jpg",
  ],
  workshop: [
    "/assets/video/horse-year-gala-poster.jpg",
    "/assets/courses/choir-gala.jpg",
  ],
  voice: [
    "/assets/courses/vocal-recital.jpg",
    "/assets/courses/speech-competition.jpg",
  ],
  examination: [
    "/assets/stage/jungle-book-cast.jpg",
  ],
};

export default function ArtsComposition({ variant }: { variant: keyof typeof PHOTOGRAPHS }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      el.dataset.running = String(inView && !document.hidden && !preference.matches && !paused);
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      if (inView) el.dataset.seen = "true";
      update();
    }, { threshold: .12 });
    observer.observe(el);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [paused]);

  return (
    <div ref={root} className={`arts-composition arts-composition--${variant}`} data-running="false">
      <div className="arts-composition__canvas" aria-hidden="true">
        {variant === "story" ? (
          <svg className="art-arch" viewBox="0 0 600 700" fill="none">
            <path d="M105 645V275a195 195 0 0 1 390 0v370Z" fill="currentColor" />
            <path d="M75 670V275a225 225 0 0 1 450 0v395" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : variant === "workshop" ? (
          <svg className="art-fan" viewBox="0 0 640 520" fill="none">
            {Array.from({ length: 13 }, (_, i) => (
              <g key={i} className="art-fan__leaf" style={{ "--fan-angle": `${(i - 6) * 13}deg`, "--leaf-color": i % 3 === 0 ? "#C9A227" : i % 2 === 0 ? "#B9ADE8" : "#8C739E" } as CSSProperties}>
                <path d="M320 440 280 113Q320 94 360 113Z" fill="var(--leaf-color)" />
                <path d="M320 437V109" stroke="#211625" strokeWidth="1.3" opacity=".32" />
                <path d="M291 193Q320 181 349 193" stroke="#F0EEF4" strokeWidth="1" opacity=".5" />
              </g>
            ))}
            <circle cx="320" cy="440" r="11" fill="#E3C766" />
            <circle cx="320" cy="440" r="3" fill="#54283F" />
          </svg>
        ) : variant === "voice" ? <VoiceArtwork /> : <StageArtwork />}
        {(variant === "story" || variant === "workshop") && <svg className="art-ribbon" viewBox="0 0 600 700" fill="none">
          <path className="art-ribbon__line" pathLength="1" d={variant === "story"
            ? "M60 92C193 3 550 55 531 260C519 393 78 348 75 504C71 669 487 679 552 554"
            : "M548 91C386 1 92 140 101 347C107 481 500 414 528 547C547 640 353 684 195 619"}
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>}
        {PHOTOGRAPHS[variant].map((src, i) => (
          <div className={`art-print art-print--${i + 1}`} key={src}>
            <div className="art-print__arrival">
              <div className="art-print__paper">
                <div className="art-print__image">
                  <Image src={src} alt="" fill sizes="(min-width: 1000px) 420px, (min-width: 600px) 380px, 75vw" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {(variant === "story" || variant === "workshop") && <svg className="art-spark" viewBox="0 0 100 100" fill="none">
          <path d="M50 0 59 35 85 15 65 41 100 50 65 59 85 85 59 65 50 100 41 65 15 85 35 59 0 50 35 41 15 15 41 35Z" fill="currentColor" />
        </svg>}
      </div>
      <button className="arts-composition__pause" type="button"
        onClick={() => setPaused(value => !value)}
        aria-label={paused ? "Play artwork animation" : "Pause artwork animation"}>
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
