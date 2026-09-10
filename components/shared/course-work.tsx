"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import type { Asset } from "@/lib/content/types";

/* A contact sheet of the school at work, directly under the /courses hero.
 *
 * Sixteen frames: ten photographs the client shot for the courses, and the
 * six production loops. A contact sheet rather than a gallery because that is
 * what it is — one strip of everything shot this year, frames abutting on a
 * 3px hairline, no captions, no radius, no cards. It is the only thing on the
 * page that is not words, and it sits before the thirteen course names for
 * that reason: a parent scanning a catalogue wants to know what the room
 * looks like before they read what is taught in it.
 *
 * **No arch here.** The arch is the school's signature and it is already on
 * the hero, the homepage cards and every course header. Sixteen of them in
 * one band would turn a signature into wallpaper.
 *
 * Motion is spent once. The feature frame plays on its own; the other five
 * films hold still until someone hovers, focuses or taps them. Six
 * autoplaying videos above the fold is the thing /stage already carries a
 * question mark about (docs/STATE.md), and it is not worth carrying twice.
 *
 * Nothing downloads until it is asked for. Every frame draws its still
 * through next/image, which serves it at the ~200px it is actually painted at
 * rather than the 1920px the production posters are stored at, and a film's
 * <video> has no src until its first play.
 *
 * The <video> elements stay mounted under prefers-reduced-motion rather than
 * being removed — usePrefersReducedMotion reads false on the server and
 * corrects on mount, so it may decide whether something moves and never
 * whether something exists. See the note on the hook. Nothing plays; the band
 * is sixteen photographs.
 */

export type WorkTile = {
  still: Asset;
  /* Present on the six production frames. Absent on the ten photographs. */
  video?: string;
  /* The work the film is from, for the control's label. */
  title?: string;
};

export default function CourseWork({
  tiles,
  slug,
}: {
  tiles: WorkTile[];
  /* One line under the sheet saying what it is. Not a heading — the band runs
     straight off the hero, and a second heading between them would be two
     headings arguing about which one starts the page. */
  slug: string;
}) {
  const [feature, ...rest] = tiles;

  return (
    <section
      className="cwork"
      aria-label="Photographs and film from Mirror's classes, rehearsals and productions"
    >
      <ul className="cwork__sheet">
        <Frame tile={feature} feature />
        {rest.map((t) => (
          <Frame key={t.still.src} tile={t} />
        ))}
      </ul>
      <div className="wrap">
        <p className="cwork__slug">{slug}</p>
      </div>
    </section>
  );
}

function Frame({ tile, feature = false }: { tile: WorkTile; feature?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  /* The preference can flip to true after the feature has already started —
     the hook reads false for one frame by design. Stopping it here is the
     only way that frame does not leave a video running against the setting. */
  useEffect(() => {
    if (reduced) video.current?.pause();
  }, [reduced]);

  /* The src is attached on the first play and never removed, so a second
     hover resumes instead of re-downloading. */
  const play = useCallback(() => {
    const el = video.current;
    if (!el || reduced || !tile.video) return;
    if (!el.src) el.src = tile.video;
    el.muted = true;
    void el.play().catch(() => {});
  }, [reduced, tile.video]);

  const pause = useCallback(() => video.current?.pause(), []);

  const still = (
    <Image
      className="cwork__still"
      src={tile.still.src}
      alt={tile.still.alt}
      width={tile.still.width}
      height={tile.still.height}
      sizes={
        feature
          ? "(min-width: 1100px) 44vw, (min-width: 700px) 25vw, 50vw"
          : "(min-width: 1100px) 15vw, (min-width: 700px) 25vw, 50vw"
      }
      priority={feature}
    />
  );

  const film = tile.video ? (
    <video
      ref={video}
      className="cwork__vid"
      /* The feature is the only one that arrives with a source. preload="none"
         keeps even that off the wire when the setting says not to move. */
      src={feature ? tile.video : undefined}
      autoPlay={feature && !reduced}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
    />
  ) : null;

  const cls = [
    "cwork__tile",
    feature ? "cwork__tile--feature" : "",
    playing ? "is-playing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  /* A photograph is a picture. A film the visitor can start is a control, and
     a control has to be reachable by keyboard — so the five hoverable frames
     are real buttons and the ten photographs are not. The feature needs no
     control; it is already playing. */
  if (tile.video && !feature) {
    return (
      <li className={cls}>
        <button
          type="button"
          className="cwork__hit"
          aria-label={`Play a clip from ${tile.title ?? "this production"}`}
          onPointerEnter={play}
          onPointerLeave={pause}
          onFocus={play}
          onBlur={pause}
          onClick={play}
        >
          {still}
          {film}
          <span className="cwork__mark" aria-hidden="true" />
        </button>
      </li>
    );
  }

  return (
    <li className={cls}>
      {still}
      {film}
    </li>
  );
}
