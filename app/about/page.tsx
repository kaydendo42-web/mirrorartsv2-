import type { Metadata } from "next";
import Link from "next/link";

import PartnersDetail from "@/components/sections/partners-detail";
import ArtsComposition from "@/components/shared/arts-composition";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { COURSES } from "@/lib/content/courses";
import { DISCIPLINES } from "@/lib/content/disciplines";
import { TIMELINE } from "@/lib/content/timeline";

/* The story page. The old site's version was four paragraphs of Chinese and a
 * background image; the history was a table in a screenshot.
 *
 * The prose is the client's own, supplied 4 September 2026 (Revision - Daisy
 * and Rachel, About Page.pdf §2–§5). It replaces copy written here from the
 * record, so where the two disagree the client's wins — they are describing
 * their own school.
 *
 * The timeline is the spine. Every claim on it comes from
 * content/MIRROR-ARTS-EDUCATION.md §7 by way of lib/content/timeline.ts, 2023
 * included — which is to say 2023 is absent, because §7 has no milestone for
 * it and the old site groups it loosely with 2022. That gap is a client
 * question, not something to fill in here.
 *
 * The "Two campuses, both in the east" section came off this page on 9
 * September 2026 at Kayden's direction. /contact carries both addresses with
 * maps and every other way to reach the school, and the section here was a
 * shorter copy of it with one extra link; venue hire is in the top-level nav
 * and the footer besides. Nothing linked to /about#campuses. The page now runs
 * what the school is, how it got here, and who backs it.
 *
 * The rename milestone is not on this page at all. §6 of the revision removes
 * the charcoal band that carried it, and the client's own summary line above
 * the spine dates the change to 2024 where TIMELINE has it at 2025. Rendering
 * the milestone underneath a sentence that gives a different year would put
 * the contradiction on one screen, so the spine keeps its filter and the year
 * discrepancy is an open question rather than a silent edit to the record. */

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  /* Under 165 characters since 22 September 2026; the earlier version ran
     to 282 and Google showed barely half of it. */
  description:
    "Mirror Arts Education: from one drama class in 2017 to a performing arts school across drama, speech, vocal, music and dance, at two campuses in Melbourne's east.",
};

const RENAME_YEAR = 2025;

const RENAME = TIMELINE.find((m) => m.year === RENAME_YEAR);
/* If the rename milestone ever leaves the data, the spine keeps every year it
   has rather than the page quietly losing one. */
const SPINE = RENAME ? TIMELINE.filter((m) => m !== RENAME) : TIMELINE;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A drama class in 2017, and <em>everything since</em>
          </>
        }
        standfirst="Mirror Arts Education is a leading performing arts education destination for young people in Melbourne. Since 2017, we have grown from a single drama class into a multidisciplinary creative community, bringing together professional educators, industry-standard facilities and real performance opportunities. Across drama, public speaking, vocal, music and dance, we empower every student to build confidence, develop their craft and shine — in the classroom, on stage and beyond."
        meta={[
          { label: "Founded", value: "2017" },
          { label: "Established", value: "2019" },
          {
            label: "Courses",
            /* Disciplines, not sections: DISCIPLINES also holds the adult
               program, which is not a discipline and holds no courses. The
               /courses headline counts the same four. */
            value: `${COURSES.length} across ${DISCIPLINES.filter((d) => d.id !== "adult").length} disciplines`,
          },
          { label: "Campuses", value: "Surrey Hills · Glen Waverley" },
        ]}
        media={{
          src: "/assets/stage/jungle-book-cast.jpg",
          alt: "Children in animal costume and face paint, sitting close together mid-scene under green stage light in the annual production of The Jungle Book",
          width: 1453,
          height: 870,
        }}
        trail={[{ label: "About" }]}
        density="deep"
      />

      <Section id="school" className="sect--composition sect--story">
        <SectionHead
          eyebrow="What the school is"
          title={
            <>
              Professional training, with{" "}
              <em>real pathways beyond the classroom</em>
            </>
          }
        />
        <div className="prose">
          <p>
            Mirror Arts Education offers a structured arts education programme
            across performance, music, speech and communication, musical
            theatre, dance and creative arts. Our courses are professionally
            designed to build strong foundations, develop advanced skills and
            provide clear progression as students grow.
          </p>
          <p>
            Our teaching team includes experienced educators and industry
            professionals trained at leading institutions in Australia and
            internationally, including the Shanghai Theatre Academy, Xi&apos;an
            Conservatory of Music, Monash University, the University of
            Melbourne and the University of Manchester. Students learn from
            teachers who bring both specialist training and real-world
            experience into the classroom.{" "}
            <Link href="/faculty">Who teaches what</Link>.
          </p>
          <p>
            For students pursuing formal qualifications, Mirror provides
            dedicated preparation for professional examinations and assessments,
            including AMEB Speech &amp; Performance, AMEB Vocal and CEFA
            language-performance certifications. Training is systematic and
            goal-focused, taking students from technique and repertoire
            preparation through to examination readiness.
          </p>
          <p>
            Performance is an essential part of the Mirror experience. Every
            term concludes with a student showcase, giving students a regular
            opportunity to perform what they have learned. Each year, students
            can also take part in two full theatre productions, including a
            major musical production, working through rehearsals and performing
            on a professional stage. Students are further encouraged to take
            part in eisteddfods, performing arts competitions and other external
            performance opportunities throughout the year.
          </p>
          <p>
            Beyond regular classes, Mirror offers an expanding programme of
            workshops, masterclasses, holiday intensives, recording projects and
            creative collaborations. With professional studios, recording
            facilities, performance spaces and production resources, students
            are given opportunities not only to learn, but to create, perform,
            record and experience how the performing arts work beyond the
            classroom.
          </p>
        </div>

        {/* The school's own line. It ran as a Chinese blockquote with the
            English underneath as a caption; the English version carries the
            sentence alone, at the size the Chinese used to have. */}
        <figure className="creed">
          <blockquote>
            At Mirror, every child gets the chance to stand on stage and be seen
            by the world.
          </blockquote>
        </figure>
        <ArtsComposition variant="story" />
      </Section>

      <Section id="history" tone="alt">
        <SectionHead
          eyebrow="Our history"
          title="How it got here"
          note="Founded in 2017 as Mirror Drama Studio, we evolved into Mirror Arts Education, a multidisciplinary arts education institution, in 2024."
        />
        <ol className="tl">
          {SPINE.map((m, i) => (
            /* The row is set from the index rather than left to auto-placement.
               Two items with explicit columns would otherwise pack into one
               row and the spine would read as four pairs instead of a
               sequence. Below 880px it is a single column and this is just
               1, 2, 3. */
            <li className="tl__item" key={m.year} style={{ gridRow: i + 1 }}>
              <p className="tl__year">{m.year}</p>
              <h3 className="tl__title">{m.title}</h3>
              <p className="tl__body">{m.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <PartnersDetail />

      <PageNav next={{ label: "Faculty", href: "/faculty" }} />
    </>
  );
}
