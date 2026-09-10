import type { ReactNode } from "react";

/* One drawing per course, for the /courses hub.
 *
 * The rows used to carry a photograph each, and there were never enough
 * photographs — /assets/cards/performance.jpg stood in for English drama,
 * gala-hosting.jpg for both bilingual hosting and voice-over, and so on. Cut
 * to a 130px arch, four of the nine were literally the same picture as their
 * neighbour, which told a parent scanning the page that the courses were
 * interchangeable. They are not.
 *
 * So each course gets an object from its own room instead: the two masks,
 * the handheld mic, the pop filter, the tuning fork, the book on the head.
 * Drawn rather than photographed, which also means the set stays true when
 * the school adds a course and has no picture of it yet — which is exactly
 * what happened on 8 September 2026, when four arrived at once. Debating,
 * Instrument, MV Production and Dance were drawn that day; Drama, Dubbing and
 * Posture Training are the same three drawings under the client's new names.
 *
 * Thirteen keys for thirteen courses. Adult Program is not here: its five
 * programs render as a list rather than as rows, so they need no drawing —
 * and five variations on one adult figure would have reproduced the exact
 * problem this file exists to solve.
 *
 * Everything below is stroked in currentColor and inherits the discipline
 * accent from the row (--accent, set in app/courses/page.tsx from
 * lib/content/disciplines.ts). The only exceptions are the fills that need
 * the page ground behind them, and they read --icon-ground so they follow the
 * section's base / base-2 / band alternation. See the block under
 * "course icons" in globals.css.
 *
 * Motion lives in CSS, keyed off the row's :hover and :focus-visible, so this
 * stays a server component — nine icons is nine drawings, not nine bundles.
 * Class names are the hook; the transform that positions a group is an SVG
 * attribute, and the transform that animates it is a CSS rule on a child, so
 * the two never fight over the same property.
 *
 * The 48x48 box is drawn to a 4px margin so a rotating group has somewhere to
 * go without clipping — the SVG is not overflow-hidden, but a stroke that
 * leaves the box lands on the row's hairline and looks like a mistake. */

const ART: Record<string, ReactNode> = {
  /* Comedy in front, tragedy behind and turned away. The front mask is
     filled rather than open so it reads as the nearer of the two. */
  drama: (
    <>
      <g transform="translate(30 16)">
        <g className="ci-mask ci-mask--back">
          <path
            className="ci-ground"
            d="M-7.4 -8.2 H7.4 V-1.6 A7.4 7.8 0 0 1 -7.4 -1.6 Z"
          />
          <path d="M-4.8 -3.6 a2 2 0 0 0 3.6 0" />
          <path d="M1.2 -3.6 a2 2 0 0 0 3.6 0" />
          <path d="M-3.4 3.4 a3.4 2.6 0 0 1 6.8 0" />
        </g>
      </g>
      <g transform="translate(19 24)">
        <g className="ci-mask ci-mask--front">
          <path
            className="ci-ground"
            d="M-8.6 -9.6 H8.6 V-1.8 A8.6 9 0 0 1 -8.6 -1.8 Z"
          />
          <path d="M-5.6 -4.6 a2.3 2.3 0 0 1 4.2 0" />
          <path d="M1.4 -4.6 a2.3 2.3 0 0 1 4.2 0" />
          <path d="M-4.2 1.8 a4.2 3.2 0 0 0 8.4 0" />
        </g>
      </g>
    </>
  ),

  /* A lantern, its beam, and a note standing in the pool it throws. The pool
     is what makes the beam read as light rather than as a bucket — without
     it the same trapezoid is just a shape. Hovering swings the light, and
     the note stays where it is, because the performer does not move when the
     operator does. */
  "musical-theatre": (
    <>
      <path d="M24 2.6 V5.4" />
      <path d="M19.6 5.4 H28.4" />
      <path d="M19.4 5.4 h9.2 l2 6 h-13.2 z" />
      <g className="ci-beam">
        <path className="ci-wash" d="M17.4 11.4 h13.2 L38.6 34 h-29.2 z" />
        <path d="M17.4 11.4 L9.4 34" />
        <path d="M30.6 11.4 L38.6 34" />
        <ellipse cx="24" cy="34" rx="14.6" ry="3.6" />
      </g>
      <g className="ci-lit">
        <ellipse
          cx="20.4"
          cy="29.6"
          rx="3.2"
          ry="2.5"
          transform="rotate(-20 20.4 29.6)"
        />
        <path d="M23.4 28.9 V18" />
        <path d="M23.4 18 c3.4 1 4.6 3.2 3.9 5.8" />
      </g>
    </>
  ),

  /* The one course in this discipline with no microphone in it: an AMEB
     speech exam is a child standing in a room, projecting. So it is a face
     rather than equipment — which is also what keeps it from reading as a
     third variation on the two mics below. */
  "english-speech": (
    <>
      <path d="M20 6.4 C14.4 6.4 11.2 10.8 11.2 16.4 C11.2 20.6 11.7 23.8 12.7 26.6 C13.9 29.9 17.2 32.2 20.9 32.2 H24.4 V27.4 C24.4 26.4 25.2 25.6 26.2 25.4 L28.8 24.8 C29.9 24.6 30.3 23.5 29.6 22.6 L26.5 18.4 C26.7 11.8 24.7 6.4 20 6.4 Z" />
      <path d="M20.8 32.2 V35.4" />
      <path d="M24.4 32.2 V36" />
      <path d="M11.6 40.4 a11 11 0 0 1 18.4 0" />
      <g className="ci-say">
        <path className="ci-say--1" d="M33.6 22.6 a5 5 0 0 0 0 -7" />
        <path className="ci-say--2" d="M37.2 25.4 a9 9 0 0 0 0 -12.6" />
        <path className="ci-say--3" d="M40.8 28.2 a13 13 0 0 0 0 -18.2" />
      </g>
    </>
  ),

  /* Two bubbles, the second answering the first. The near one is filled with
     the page ground so it reads as in front rather than as a shape crossing a
     shape, the same trick the drama masks use. Dashed lines in the far one:
     the side that has not spoken yet is the side still holding an argument.
     On hover they take turns, because a debate is not two people talking. */
  debating: (
    <>
      <g className="ci-argue ci-argue--a">
        <rect x="5" y="8.6" width="20" height="14" rx="3" />
        <path d="M10 22.6 L9 27.8 L15.6 22.6" />
        <path d="M9.4 13.4 H20.6" />
        <path d="M9.4 17.6 H17.2" />
      </g>
      <g className="ci-argue ci-argue--b">
        <rect
          className="ci-ground"
          x="23"
          y="21"
          width="20"
          height="14"
          rx="3"
        />
        <path d="M38 35 L39 40.2 L32.4 35" />
        <path d="M27.4 25.8 H38.6" strokeDasharray="3 2.4" />
        <path d="M27.4 30 H35.2" strokeDasharray="3 2.4" />
      </g>
    </>
  ),

  /* Two languages leaving one microphone. The dashed side answers the solid
     side on hover, in turn — the class is run as call and response. */
  "bilingual-hosting": (
    <>
      <rect x="19.6" y="6" width="8.8" height="15" rx="4.4" />
      <path d="M20.6 11 H27.4" />
      <path d="M20.6 15 H27.4" />
      <path d="M21.4 21 H26.6 V38 a2.6 2.6 0 0 1 -5.2 0 Z" />
      <g className="ci-tongue ci-tongue--a">
        <path d="M18.05 8.15 a8 8 0 0 0 0 10.7" />
        <path d="M15.45 5.81 a11.5 11.5 0 0 0 0 15.38" />
      </g>
      <g className="ci-tongue ci-tongue--b" strokeDasharray="3 2.6">
        <path d="M29.95 8.15 a8 8 0 0 1 0 10.7" />
        <path d="M32.55 5.81 a11.5 11.5 0 0 1 0 15.38" />
      </g>
    </>
  ),

  /* A large-diaphragm condenser on a desk stand, over the take it just
     recorded. The waveform is what separates this course from the two that
     also involve a microphone: hosting and speech end in a room, and this one
     ends in a file. Drawn for Voice-over, which the client renamed Dubbing on
     8 September; a condenser over its own take is still what the course is. */
  dubbing: (
    <>
      <g className="ci-shock">
        <rect x="19.6" y="3" width="8.8" height="15.6" rx="4.4" />
        <path d="M20.9 7.6 H27.1" />
        <path d="M20.9 11 H27.1" />
        <path d="M20.9 14.4 H27.1" />
        <path d="M15.6 15.6 v2 a8.4 8.4 0 0 0 16.8 0 v-2" />
      </g>
      <path d="M24 26 V29.6" />
      <path d="M18.6 29.6 H29.4" />
      <path
        className="ci-trace"
        pathLength={100}
        d="M5 40 H9.6 L12 35.4 L14.4 40 H17.6 L20 33.4 L22.4 40 H25.6 L28 35.8 L30.4 40 H33.6 L36 37.2 L38.4 40 H43"
      />
    </>
  ),

  /* A tuning fork, because what this course actually trains is pitch and
     aural skill — the AMEB grades are graded on hearing, not volume. */
  vocal: (
    <>
      <g className="ci-ring">
        <circle className="ci-ring--1" cx="23" cy="18" r="12" />
        <circle className="ci-ring--2" cx="23" cy="18" r="12" />
      </g>
      <path className="ci-tine ci-tine--l" d="M18.6 8 V24" />
      <path className="ci-tine ci-tine--r" d="M27.4 8 V24" />
      <path d="M18.6 24 C18.6 29.4 20.8 31.6 23 31.6 C25.2 31.6 27.4 29.4 27.4 24" />
      <path d="M23 31.6 V39.6" />
      <circle cx="23" cy="41.4" r="1.8" />
    </>
  ),

  /* A keyboard, because piano is the pathway most of these lessons follow and
     a flute drawn at 48px is a line with holes in it. One key goes down on
     hover and the note above it comes up — a lesson is one child and one
     instrument, so there is only ever one key. */
  instrument: (
    <>
      <g className="ci-note">
        <ellipse
          cx="30.4"
          cy="12"
          rx="2.8"
          ry="2.2"
          transform="rotate(-20 30.4 12)"
        />
        <path d="M33.1 11.4 V3.4" />
        <path d="M33.1 3.4 c3 0.9 4.1 2.8 3.4 5" />
      </g>
      <rect x="6" y="18.6" width="36" height="17.4" rx="1.6" />
      <rect className="ci-key" x="18.2" y="18.8" width="5.6" height="17" />
      <path d="M12 18.6 V36" />
      <path d="M18 18.6 V36" />
      <path d="M24 18.6 V36" />
      <path d="M30 18.6 V36" />
      <path d="M36 18.6 V36" />
      <rect className="ci-wash" x="10.4" y="18.6" width="3.2" height="10.4" />
      <rect className="ci-wash" x="16.4" y="18.6" width="3.2" height="10.4" />
      <rect className="ci-wash" x="28.4" y="18.6" width="3.2" height="10.4" />
      <rect className="ci-wash" x="34.4" y="18.6" width="3.2" height="10.4" />
    </>
  ),

  /* A clapperboard with a note on the slate — the two halves of the program in
     one object, since an MV is a recording session and a shoot and neither on
     its own is the course. The arm snaps shut on hover. */
  "mv-production": (
    <>
      <rect x="7" y="18.6" width="34" height="19.4" rx="2" />
      <g className="ci-clap">
        <path d="M7 15.6 L39.2 9.2 L40.4 14 L8.2 20.4 Z" />
        <path d="M15.4 14 L18 18.9" />
        <path d="M24.6 12.2 L27.2 17.1" />
        <path d="M33.8 10.4 L36.4 15.3" />
      </g>
      <g className="ci-note">
        <ellipse
          cx="19.6"
          cy="32.4"
          rx="2.8"
          ry="2.2"
          transform="rotate(-20 19.6 32.4)"
        />
        <path d="M22.3 31.8 V23.4" />
        <path d="M22.3 23.4 c3 0.9 4.1 2.8 3.4 5" />
      </g>
    </>
  ),

  /* Three singers, the middle one a head taller because the choir stands in
     an arc. They lift left to right on hover, the way a phrase travels along
     a row. */
  choir: (
    <>
      <g className="ci-note">
        <ellipse
          cx="21.6"
          cy="11.4"
          rx="2.6"
          ry="2"
          transform="rotate(-20 21.6 11.4)"
        />
        <path d="M24 10.8 V3.6" />
        <path d="M24 3.6 c2.8 0.8 3.8 2.6 3.2 4.6" />
      </g>
      <g className="ci-voice ci-voice--1">
        <circle cx="11" cy="26" r="3.4" />
        <path d="M5 36 a6 6 0 0 1 12 0" />
      </g>
      <g className="ci-voice ci-voice--2">
        <circle cx="24" cy="21.5" r="3.8" />
        <path d="M17.2 32 a6.8 6.8 0 0 1 13.6 0" />
      </g>
      <g className="ci-voice ci-voice--3">
        <circle cx="37" cy="26" r="3.4" />
        <path d="M31 36 a6 6 0 0 1 12 0" />
      </g>
    </>
  ),

  /* A written phrase, ascending. Hovering runs a playhead across it and each
     note sounds as the line reaches it — what a student does the moment they
     have finished writing something down. */
  "music-composition": (
    <>
      <g className="ci-stave">
        <path d="M6 16 H42" />
        <path d="M6 21 H42" />
        <path d="M6 26 H42" />
        <path d="M6 31 H42" />
        <path d="M6 36 H42" />
      </g>
      <path className="ci-play" d="M6 11 V41" />
      <g className="ci-beat ci-beat--1">
        <ellipse
          cx="13"
          cy="33.5"
          rx="3"
          ry="2.3"
          transform="rotate(-20 13 33.5)"
        />
        <path d="M15.9 32.9 V22.5" />
      </g>
      <g className="ci-beat ci-beat--2">
        <ellipse
          cx="23"
          cy="28.5"
          rx="3"
          ry="2.3"
          transform="rotate(-20 23 28.5)"
        />
        <path d="M25.9 27.9 V17.5" />
      </g>
      <g className="ci-beat ci-beat--3">
        <ellipse
          cx="33"
          cy="23.5"
          rx="3"
          ry="2.3"
          transform="rotate(-20 33 23.5)"
        />
        <path d="M35.9 22.9 V12.5" />
        <path d="M35.9 12.5 c3 0.9 4.1 2.8 3.4 5" />
      </g>
    </>
  ),

  /* A figure caught mid-step rather than standing, which is the one thing that
     separates this drawing from the posture one below it. Hovering takes the
     step: the legs swing from the hip and the arms answer them. */
  dance: (
    <>
      <path className="ci-floor" d="M8 41.4 H40" />
      <circle cx="22.6" cy="9.8" r="3.6" />
      <path d="M22.6 13.4 L21 24.2" />
      <g className="ci-arms">
        <path d="M21.6 17.4 L12.4 12.4" />
        <path d="M21.4 18.2 L31.8 21.6" />
      </g>
      <g className="ci-step">
        <path d="M21 24.2 L15.4 36.4" />
        <path d="M21 24.2 L28.8 33.2 L33.4 38.4" />
      </g>
    </>
  ),

  /* The oldest posture exercise there is, and the only one a six-year-old
     needs explained once. Hovering stands the body up and the book comes
     level with it — which is the whole course in one gesture. */
  "posture-training": (
    <>
      <path className="ci-floor" d="M14.8 42.6 H33.2" />
      <g className="ci-stand">
        <g className="ci-book">
          <path d="M18.4 5 H29.6 V8.6 H18.4 Z" />
          <path d="M18.4 6.8 H29.6" />
        </g>
        <circle cx="24" cy="14" r="3.8" />
        <path d="M24 17.8 V29.6" />
        <path d="M18.8 21.4 H29.2" />
        <path d="M24 29.6 L20.6 40" />
        <path d="M24 29.6 L27.4 40" />
      </g>
    </>
  ),
};

/* Throws rather than falling back to a placeholder, on the same principle as
   getDiscipline() in lib/content/disciplines.ts: a tenth course added without
   a drawing should stop the build, not ship a blank column. */
export default function CourseIcon({ slug }: { slug: string }) {
  const art = ART[slug];
  if (!art) throw new Error(`no course icon for: ${slug}`);

  return (
    <svg className="ci" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {art}
    </svg>
  );
}
