import type { Metadata } from "next";
import Link from "next/link";

import CampusTabs from "@/components/shared/campus-tabs";
import CourseList from "@/components/shared/course-list";
import Faq from "@/components/shared/faq";
import RoomGrid from "@/components/shared/room-grid";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { campusPhotos } from "@/lib/content/campus";
import { COURSES, YOUNGEST_AGE, coursesAt } from "@/lib/content/courses";
import { DISCIPLINES } from "@/lib/content/disciplines";
import { faqForCampus } from "@/lib/content/faq";
import {
  SITE,
  campusAddress,
  campusPath,
  formatHours,
  otherCampus,
  type Campus,
} from "@/lib/content/site";
import { HIRE_SPACES, VENUE_CAMPUS } from "@/lib/content/venue";
import { OG, campusSchema, jsonLd } from "@/lib/schema";

/* A campus page. Two of them, one component, mounted by app/surrey-hills and
 * app/glen-waverley.
 *
 * It is a place page, not a doorway page: the address and the map, the
 * courses that run here, the rooms, the studio hire that happens here, a
 * FAQ, and a way to the form. The SEO value is that a parent searching a
 * suburb lands on a page about that suburb's campus; the discipline is
 * that nothing on it is true only for SEO. So three things render only
 * when the campus record carries them — hours, how to get here, nearby
 * suburbs — and until Daisy supplies them (docs/SEO-ROUND-2-PICKUP.md)
 * the page simply does not have those sections. No "hours to be
 * confirmed".
 *
 * Today every course names both campuses (see `campuses` on the Course
 * type), so the two course lists are the same list. That is the site's
 * existing claim, restated, and the copy says so plainly rather than
 * pretending the split is known. The rooms section is Surrey Hills only,
 * because those are the only rooms that have been photographed.
 *
 * The map is the same gated CampusTabs the homepage and /contact use,
 * mounted with one campus: same cookie behaviour, same "Show map" press,
 * no tablist. */

function disciplinesAt(c: Campus) {
  const here = coursesAt(c.id);
  return DISCIPLINES.filter((d) => here.some((x) => x.discipline === d.id));
}

export function campusMetadata(c: Campus): Metadata {
  const photo = campusPhotos(c.id).at(0);
  const n = coursesAt(c.id).length;
  return {
    title: `${c.suburb} campus`,
    description: `${SITE.name}'s ${c.name}, ${campusAddress(c)}. ${n === COURSES.length ? `All ${n}` : n} courses — drama, speech, music and dance for children from age ${YOUNGEST_AGE}. Map, rooms and how to book a trial.`,
    /* Glen Waverley has no photograph and falls back to the root card. */
    ...(photo
      ? {
          openGraph: {
            ...OG,
            images: [{ url: photo.src, width: photo.width, height: photo.height, alt: photo.alt }],
          },
        }
      : {}),
  };
}

export default function CampusPage({ campus: c }: { campus: Campus }) {
  const here = coursesAt(c.id);
  const photos = campusPhotos(c.id);
  const other = otherCampus(c);
  const hire = c.id === VENUE_CAMPUS;
  const all = here.length === COURSES.length;
  const groups = disciplinesAt(c).map((d) => ({
    d,
    courses: here.filter((x) => x.discipline === d.id),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(campusSchema(c))} />

      <PageHero
        eyebrow={c.name}
        title={
          <>
            {SITE.name} in <em>{c.suburb}</em>
          </>
        }
        standfirst={`${SITE.name}'s ${c.name} is at ${campusAddress(c)}. ${all ? `All ${COURSES.length} courses run here` : `${here.length} of the ${COURSES.length} courses run here`} — ${disciplinesAt(c).map((d) => d.title.toLowerCase()).join(", ")} — for children from age ${YOUNGEST_AGE}.${hire ? ` The ${HIRE_SPACES.length} rooms for hire are here too.` : ""} Trials are free and you are welcome to sit in.`}
        meta={[
          { label: "Address", value: campusAddress(c) },
          { label: "Courses", value: all ? `All ${COURSES.length}` : `${here.length} of ${COURSES.length}` },
          ...(c.hours ? [{ label: "Open", value: formatHours(c.hours).join("; ") }] : []),
          ...(hire ? [{ label: "Studio hire", value: `${HIRE_SPACES.length} rooms by the hour` }] : []),
        ]}
        media={photos.at(0)}
        trail={[{ label: `${c.suburb} campus` }]}
        density={photos.length > 0 ? "deep" : "shallow"}
      />

      <Section id="map">
        <SectionHead
          eyebrow="Find us"
          title={
            <>
              On the <em>map</em>
            </>
          }
          note={
            c.nearby
              ? `Families come from ${c.nearby.join(", ")} as well as ${c.suburb} itself.`
              : undefined
          }
        />
        <div className="find__grid">
          <CampusTabs campuses={[c]} linkToPage={false} />
          {/* The right-hand column: how to get here, in the client's words,
              once she has given them; and always the other campus, so the
              parent who searched the wrong suburb is one click from the
              right one. */}
          <div className="prose">
            {c.transport && (
              <>
                <h3>Getting here</h3>
                {c.transport.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </>
            )}
            <h3>Also at {other.suburb}</h3>
            <p>
              {SITE.name}&apos;s {other.name} is at {campusAddress(other)}.{" "}
              <Link href={campusPath(other)}>About the {other.suburb} campus</Link>.
            </p>
          </div>
        </div>
      </Section>

      <Section id="courses" tone="alt">
        <SectionHead
          eyebrow="Courses"
          title={
            <>
              What runs at <em>{c.suburb}</em>
            </>
          }
          note={
            all
              ? "Every course in the catalogue runs at this campus. Ask about days and times when you enquire."
              : "Ask about days and times when you enquire."
          }
        />
        {groups.map(({ d, courses }) => (
          <div key={d.id} className="campus-group">
            <h3 className="campus-group__title">{d.title}</h3>
            <CourseList courses={courses} />
          </div>
        ))}
      </Section>

      {photos.length > 0 && (
        <Section id="rooms">
          <SectionHead
            eyebrow="The rooms"
            title={
              <>
                What it is <em>like inside</em>
              </>
            }
            note={`${photos.length} of the rooms at ${c.suburb}, photographed by the school. Open one to see it at full size.`}
          />
          <RoomGrid photos={photos} />
        </Section>
      )}

      {hire && (
        <Section id="hire" tone="band">
          <SectionHead
            eyebrow="Studio hire"
            title={
              <>
                Rooms to hire, <em>by the hour</em>
              </>
            }
            note={`${HIRE_SPACES.map((s) => s.name).join(", ")} — all at ${c.suburb}.`}
          />
          <Link className="ghost" href="/workshops/venue">
            Rooms and rates
          </Link>
        </Section>
      )}

      <Faq items={faqForCampus(c)} tone="base" />

      <Section tone="band" id="trial">
        <SectionHead
          eyebrow="Book a trial"
          title={
            <>
              Come and <em>watch a class</em>
            </>
          }
          note={`Tell us that ${c.suburb} suits you, the child's age and what they are already doing.`}
        />
        <Link className="pill pill--on-dark" href="/contact#trial">
          Enquire about a trial
        </Link>
      </Section>

      <PageNav
        prev={{ label: `${other.suburb} campus`, href: campusPath(other) }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}
