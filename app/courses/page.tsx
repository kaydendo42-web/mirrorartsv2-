import type { Metadata } from "next";
import Link from "next/link";

import CourseIcon from "@/components/shared/course-icon";
import CourseWork, { type WorkTile } from "@/components/shared/course-work";
import PageHero from "@/components/site/page-hero";
import { Section, SectionHead } from "@/components/site/section";
import {
  COURSES,
  courseFactLine,
  coursesByDiscipline,
} from "@/lib/content/courses";
import { ADULT_PROGRAMS, DISCIPLINES } from "@/lib/content/disciplines";
import { PRODUCTIONS } from "@/lib/content/productions";

/* The hub. Four disciplines and the adult program, thirteen courses, in the
 * client's own order.
 *
 * It extends the homepage's 2x2 of disciplines rather than replacing it, so a
 * visitor arriving from there recognises the shape and knows where they are.
 * The five section ids are load-bearing: masthead.tsx links straight to
 * /courses#performance, #language, #music, #posture and #adult, and a renamed
 * id breaks five nav items with no error anywhere.
 *
 * Adult Program is the odd section out and is meant to be. It has no course
 * pages under it — five programs of one sentence each — so it renders the
 * programs as a list and closes with the client's own invitation to get in
 * touch rather than nine-tenths of an empty catalogue row. */

export const metadata: Metadata = {
  title: "Courses",
  alternates: { canonical: "/courses" },
  description:
    "Professional arts training for all ages — performance arts, language and expression, music and vocal, dance and posture, and adult programs, in Surrey Hills and Glen Waverley.",
};

const EXAM_COURSES = COURSES.filter(
  (c) => c.leadsTo?.href === "/stage#achievements",
).length;

/* Spelled out because the headline is display type and "13" in Fraunces at
   64px reads as a price. Only ever asked for the two numbers below, both of
   which come off the arrays rather than out of a writer's memory — the last
   revision left "Nine courses across four disciplines" standing over a page
   that had stopped holding nine of anything. */
const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
];
const word = (n: number) => WORDS[n] ?? String(n);

const CHILD_DISCIPLINES = DISCIPLINES.filter((d) => d.id !== "adult");

/* The contact sheet's sixteen frames, assembled here rather than inside
   CourseWork. CourseWork is a client component: importing PRODUCTIONS or
   COURSES from inside it would ship every production body, credit list and
   course paragraph to the browser to fill a band that reads two fields off
   each. This page is a server component, so the arrays stay on the server and
   only the sixteen {src, alt, width, height} tiles cross.
 *
 * Ten photographs: every course hero the client supplied on 8 September, which
 * is exactly the set under /assets/courses/. Drama and Bilingual Hosting are
 * not in it — their heroes predate the shoot — and Debating has no photograph
 * at all yet, so the filter is on where the file lives rather than on a list
 * that would need editing when the missing one arrives.
 *
 * Six films: the production loops, in catalogue order. Born to Fly leads and
 * is the frame that plays by itself — it is the studio, which is the closest
 * of the six to a course at work rather than a performance of one.
 *
 * The order interleaves two photographs to a film, so the band does not read
 * as ten pictures followed by six. Sixteen frames is not a free number: the
 * 1100px layout is 7 columns by 3 rows with the feature spanning 3x2, which
 * is 21 cells against 6 + 15. A test holds the count. */
const WORK_TILES: WorkTile[] = (() => {
  const photos = COURSES.flatMap((c) =>
    c.hero?.src.startsWith("/assets/courses/") ? [{ still: c.hero }] : [],
  );
  const films = PRODUCTIONS.map((p) => ({
    still: p.video.poster,
    video: p.video.loop,
    title: p.title,
  }));

  const sheet: WorkTile[] = [films[0]];
  for (let i = 0; i < 5; i += 1) {
    sheet.push(photos[i * 2], photos[i * 2 + 1], films[i + 1]);
  }
  return sheet;
})();

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title={
          <>
            {word(CHILD_DISCIPLINES.length)} disciplines.{" "}
            {word(COURSES.length)} courses.
            <br />
            One stage to <em>grow into</em>
          </>
        }
        standfirst="Professional arts training for every age group — from weekly classes to showcases, productions, competitions and accredited exams."
        trail={[{ label: "Courses" }]}
        density="deep"
      />

      <CourseWork
        tiles={WORK_TILES}
        slug="Film and photographs from Mirror's classes, rehearsals, recording sessions and productions, shot across 2025 and 2026. Five of the frames move — hover, tap or tab to one to play it."
      />

      {DISCIPLINES.map((d, i) => (
        <Section key={d.id} id={d.id} tone={i % 2 ? "alt" : "base"}>
          <SectionHead eyebrow={d.title} title={d.title} note={d.blurb} />

          {d.id === "adult" ? (
            <>
              <ul className="strands" style={{ ["--accent" as string]: d.accent }}>
                {ADULT_PROGRAMS.map((p) => (
                  <li key={p.name} className="strand">
                    <h3 className="strand__name">{p.name}</h3>
                    <p className="strand__blurb">{p.blurb}</p>
                  </li>
                ))}
              </ul>
              <p className="sect__note">
                Ready to get started?{" "}
                <Link href="/contact">Contact us today</Link> to learn more and
                find the right class for you.
              </p>
            </>
          ) : (
            <ul className="courselist">
              {coursesByDiscipline(d.id).map((c) => (
                <li
                  key={c.slug}
                  className="courselist__row"
                  style={{ ["--accent" as string]: c.accent }}
                >
                  <Link href={`/courses/${c.slug}`} className="courselist__link">
                    {/* A drawing, not a photograph. There are thirteen courses
                        and nine usable photographs between them, so four rows
                        would show the same picture as the row beside them —
                        see the note at the top of
                        components/shared/course-icon.tsx. The photographs
                        still lead each course's own page, where they are large
                        enough to be worth looking at. */}
                    <span className="courselist__icon" aria-hidden="true">
                      <CourseIcon slug={c.slug} />
                    </span>
                    <span className="courselist__body">
                      <span className="courselist__title">{c.title}</span>
                      <span className="courselist__strap">
                        {c.summary ?? c.strapline}
                      </span>
                      <span className="courselist__meta">
                        {courseFactLine(c)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>
      ))}

      <Section tone="band">
        <SectionHead
          eyebrow="Exams"
          title={
            <>
              Every discipline has a <em>graded</em> path out of it
            </>
          }
          note={`AMEB Speech & Performance and Vocal, and CEFA. ${EXAM_COURSES} of the ${COURSES.length} prepare students for grades directly.`}
        />
        <Link className="ghost" href="/stage#achievements">
          Exams and achievements
        </Link>
      </Section>
    </>
  );
}
