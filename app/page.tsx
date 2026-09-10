"use client";

import { useReveal } from "@/components/motion/use-reveal";

import HeroReel from "@/components/sections/hero-reel";
import Courses from "@/components/sections/courses";
import FindUs from "@/components/sections/find-us";
import Partners from "@/components/sections/partners";
import Enquiry from "@/components/sections/enquiry";

/* Homepage rule: every nav item gets one summary section, in nav order.
 * The exceptions, all deliberate:
 *
 * Faculty was cut because bios do not help a first-time visitor decide, and
 * the page still exists behind the nav item.
 *
 * About was cut on 8 September 2026 at the client's request. Its section was
 * the "Teaching a child to be understood" block — six things the school
 * teaches around a photograph of the reception — and they asked for it to
 * come out and for the strip of room photographs under it to move into the
 * Two campuses section. What was left would have been a heading and a link,
 * so the section went with it. /about is still in the nav and in the footer.
 *
 * Achievements, Stage and Workshops were cut on 9 September 2026 at Kayden's
 * direction. All three summarised pages that already carry the same material
 * in full — /stage#achievements, /stage and /workshops — and all three are
 * still in the nav and in the footer. The homepage now runs the first screen,
 * what is taught, where it is taught, who backs it, and the enquiry: four
 * sections between the hero and the band, rather than seven. The three
 * section components are kept, unimported, in case any of them comes back.
 *
 * Two campuses moved up the page in an earlier pass, also at their request:
 * it sat second from the bottom, after four sections of proof, and a parent
 * who has decided in the first screen had to scroll past all of it to find
 * out where the school is. It now follows Courses, which is where the
 * question "where is this" actually gets asked.
 *
 * Partners sits above the enquiry rather than near the foot. It is a child of
 * About in the nav (/about#partners), and the proof reads better early: who
 * backs the school answers the question the courses have just raised, instead
 * of arriving after the visitor has already decided.
 *
 * Grounds still alternate: base, alt, base, band. Three `sect` grounds in a
 * row is what a homepage looks like when a section is deleted from the middle
 * of it and nobody re-counts.
 */
export default function Home() {
  useReveal();

  return (
    <>
      <HeroReel />
      <Courses />
      <FindUs />
      <Partners />
      <Enquiry />
    </>
  );
}
