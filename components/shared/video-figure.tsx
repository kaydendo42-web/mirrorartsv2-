"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import type { Asset } from "@/lib/content/types";

/* Two different videos wear this component.
 *
 * The card grid runs the committed ten-second loop: silent, muted, looping,
 * autoplaying, no controls — it is a moving thumbnail, not a film.
 *
 * The case study runs the full render, which lives on Vercel Blob and is
 * therefore a network dependency nothing else on the page has. So the poster
 * frame stays up until the video can actually play, and stays permanently if
 * it cannot. The poster is cut from the same timecode as the loop, so the
 * swap has nothing to see.
 *
 * `full` is empty until a Blob store exists. With no full render there is no
 * play button, and the loop is the whole component — which is the specified
 * behaviour, not a degraded one.
 */
export default function VideoFigure({
  loop,
  full,
  poster,
  caption,
  className,
}: {
  loop: string;
  full?: string;
  poster: Asset;
  caption?: ReactNode;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Decorative loops spend their playback budget only while they are visible.
  // Explicit full-film playback retains its native controls and user intent.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || playing) return;
    let visible = false;
    const sync = () => {
      if (visible && !reduced && !document.hidden) void el.play().catch(() => {});
      else el.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: .08 });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [playing, reduced, failed]);

  const hasFull = Boolean(full);
  const src = playing && full ? full : loop;

  return (
    <figure className={`vfig${className ? ` ${className}` : ""}`}>
      <div className="vfig__frame">
        {failed ? (
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
          />
        ) : (
          /* Keyed on src so switching to the full render remounts the element
             rather than asking a playing <video> to swap its own source, which
             browsers handle inconsistently. */
          <video
            key={src}
            ref={videoRef}
            src={src}
            poster={poster.src}
            muted={!playing}
            loop={!playing}
            /* Reduced motion stops the loop rather than removing it. A paused
               <video> shows its poster attribute, so the frame looks exactly
               like the poster-only alternative — and unmounting the element
               instead would be deciding what content exists from a hook that
               reads false on the server and corrects on mount, which is the
               one thing usePrefersReducedMotion's own comment says not to do.
               A click on the play button still plays. */
            autoPlay={playing}
            playsInline
            controls={playing}
            preload="metadata"
            aria-label={playing ? undefined : poster.alt}
            onError={() => setFailed(true)}
          />
        )}

        {hasFull && !playing && !failed && (
          <button
            type="button"
            className="vfig__play"
            onClick={() => setPlaying(true)}
          >
            Play the full film
          </button>
        )}
      </div>

      {caption && <figcaption className="vfig__cap">{caption}</figcaption>}
    </figure>
  );
}
