import type { Metadata } from "next";
import ImageFrame from "@/components/shared/image-frame";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { COURSES, courseFacts, courseSlugs } from "@/lib/content/courses";
import { getDiscipline } from "@/lib/content/disciplines";
import { getTeacher } from "@/lib/content/faculty";
import { courseSchema, jsonLd } from "@/lib/schema";

/* One page per course.
 *
 * The client's own poster used to close the page, behind a lightbox, as the
 * artefact every word here was originally locked inside. They asked for that
 * section to come out on 8 September 2026 (items 14 and 20). The posters are
 * still recorded in lib/content/courses.ts and still on disk — removing a
 * section is not deleting the record — but nothing renders one.
 *
 * The "Where it leads" band and the "Start a conversation" enquiry form both
 * came off on 8 September 2026, at the client's request. Two consequences
 * worth knowing:
 *
 *   - `leadsTo` is still on the Course type and still set on ten courses. It
 *     is read by /courses, which counts the exam-preparation courses off it,
 *     and by /stage#achievements, which lists them. Nothing renders it here
 *     any more; it is not dead data.
 *   - **A course page now ends without a call to action.** The masthead's
 *     "Book a trial class" pill and the footer are the only routes out to
 *     /contact from one. That is the client's call, recorded in
 *     content/OPEN-QUESTIONS.md §47.
 *
 * Four of the thirteen courses are new and carry no teacher and no photograph
 * yet, and two carry no term breakdown. Every block below is conditional for
 * that reason: a heading with nothing under it is worse than a shorter page.
 *
 * dynamicParams is false so an unknown slug 404s instead of rendering an
 * empty shell of headings with nothing under them. */

export const dynamicParams = false;

export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COURSES.find((x) => x.slug === slug);
  if (!c) return {};
  const facts = courseFacts(c)
    .map((f) => f.value.toLowerCase())
    .join(", ");
  return {
    title: c.title,
    description: `${c.strapline}. ${facts}, at Mirror Arts Education in Melbourne.`,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COURSES.find((x) => x.slug === slug);
  if (!c) notFound();

  const d = getDiscipline(c.discipline);
  const i = COURSES.indexOf(c);
  const prev = COURSES[i - 1];
  const next = COURSES[i + 1];
  const accent = { ["--accent" as string]: c.accent };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(courseSchema(c))}
      />
      <PageHero
        eyebrow={d.title}
        title={c.title}
        standfirst={c.strapline}
        accent={c.accent}
        density="deep"
        media={c.hero}
        trail={[{ label: "Courses", href: "/courses" }, { label: c.title }]}
        meta={courseFacts(c)}
      />

      <Section>
        {c.lede && <SectionHead eyebrow="The program" title={c.lede} />}

        <div className="prose" style={accent}>
          {c.body.map((p, n) => (
            <p key={n}>{p}</p>
          ))}
        </div>

        {/* The three dance styles, or the two halves of Posture Training.
            Named parts of one course rather than courses of their own. */}
        {c.strands && (
          <ul className="strands" style={accent}>
            {c.strands.map((s) => (
              <li key={s.name} className="strand">
                <h3 className="strand__name">
                  {s.name}
                  {s.minutes && (
                    <span className="strand__min">{s.minutes} min</span>
                  )}
                </h3>
                <p className="strand__blurb">{s.blurb}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Two statements, kept as a pair because that is how the client
            writes them. On most courses they are now the two terms in order,
            and those carry the label that says so. */}
        {c.highlights && (
          <div className="claimset" style={accent}>
            {c.highlightsLabel && (
              <p className="eyebrow">{c.highlightsLabel}</p>
            )}
            <ul className="claims">
              {c.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {c.includes.length > 0 && (
        <Section tone="alt">
          <SectionHead
            eyebrow={c.includesLabel ?? "A term contains"}
            title="What you actually do"
          />
          {/* --rows is half the list, rounded up, so the grid can run
              column-major and the list reads down the left column and then
              down the right — the order the client writes them in. */}
          <ul
            className="includes"
            style={{
              ...accent,
              ["--rows" as string]: String(Math.ceil(c.includes.length / 2)),
            }}
          >
            {c.includes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Photographs from the class itself, which the client asked for under
          five courses (items 8, 13, 19, 26 and 32). It renders where there is
          real class footage and nowhere else — see the note on `gallery` in
          lib/content/courses.ts. */}
      {c.gallery && c.gallery.length > 0 && (
        <Section>
          <SectionHead eyebrow="In the room" title="Inside the class" />
          <ul className="stills">
            {c.gallery.map((g) => (
              <li key={g.src}>
                <ImageFrame asset={g} sizes="(min-width: 900px) 620px, 92vw" enlargeTitle={c.title} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {c.teachers.length > 0 && (
        <Section>
          <SectionHead eyebrow="Taught by" title="Who runs the room" />
          <ul className="teachercards">
            {c.teachers.map((teacherSlug) => {
              const t = getTeacher(teacherSlug);
              return (
                <li key={t.slug} className="teachercard">
                  <ImageFrame asset={t.portrait} kind="portrait" className="teachercard__frame" sizes="(min-width: 700px) 240px, 45vw" />
                  <h3 className="teachercard__name">{t.name}</h3>
                  <p className="teachercard__subject">{t.subject}</p>
                  <p className="teachercard__cred">{t.credentials[0]}</p>
                  <Link className="ghost" href={`/faculty#${t.slug}`}>
                    Full biography
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <PageNav
        prev={prev && { label: prev.title, href: `/courses/${prev.slug}` }}
        next={next && { label: next.title, href: `/courses/${next.slug}` }}
      />
    </>
  );
}
