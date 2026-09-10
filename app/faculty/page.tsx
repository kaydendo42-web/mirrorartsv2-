import type { Metadata } from "next";
import ImageFrame from "@/components/shared/image-frame";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHero from "@/components/site/page-hero";
import { Section, SectionHead } from "@/components/site/section";
import { COURSES } from "@/lib/content/courses";
import { DISCIPLINES, getDiscipline } from "@/lib/content/disciplines";
import { FACULTY, type Teacher } from "@/lib/content/faculty";
import { TEAM } from "@/lib/content/team";
import { jsonLd, personSchema } from "@/lib/schema";

/* The old site had no faculty page. Every teacher existed as an 860x1187
 * poster card and nothing else — name, credentials and biography all baked
 * into the pixels.
 *
 * Grouped by discipline, matching the client's own grouping — which, since
 * the September 2026 card set, is literally the folders the ten cards arrived
 * in. Performance leads. content/AUDIENCE.md §3 ranks who teaches the child
 * as the local English-speaking parent's first decision factor, and Delyse
 * Weisz and Anthony Pontonio are the bridge to that market now that Callum
 * Dibbert is off the faculty — leading with the Performance group puts them
 * at the top without reordering anything.
 *
 * Each teacher's courses are DERIVED from the catalogue rather than declared
 * again here, so the page cannot drift out of step with the thirteen course
 * pages and cannot become a cul-de-sac.
 *
 * The page used to close on a charcoal band explaining that Rachel Fu and
 * Koven Song lecture and direct but teach no course in the catalogue, which
 * is why neither appears above. That band is off at the client's direction,
 * along with the whole /about/team leadership page it linked to — the school
 * wants the site to show who teaches, not who manages. The reason the band
 * existed still holds: the two founders are absent from this list on purpose,
 * not by omission. This page is now the only place the site presents people
 * at all. */

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "The ten teachers at Mirror Arts Education — drama, musical theatre, speech, bilingual hosting, dubbing, vocal, choir, music composition, dance and posture, across Surrey Hills and Glen Waverley.",
};

/* A teacher appears once, under the first discipline that claims them, so a
   teacher with two disciplines does not render twice with two ids — the
   course pages link to /faculty#<slug> and a duplicated id breaks the anchor. */
function groupFaculty() {
  const placed = new Set<string>();
  return DISCIPLINES.map((d) => {
    const members = FACULTY.filter(
      (t) => t.disciplines.includes(d.id) && !placed.has(t.slug),
    );
    members.forEach((t) => placed.add(t.slug));
    return { discipline: d, members };
  }).filter((g) => g.members.length > 0);
}

export default function FacultyPage() {
  const groups = groupFaculty();

  return (
    <>
      {/* One Person record per teacher, each anchored to the id its card
          carries, so the course pages' /faculty#<slug> links and the
          structured data point at the same place. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          FACULTY.map((t) => personSchema(t, `/faculty#${t.slug}`)),
        )}
      />
      <PageHero
        eyebrow="Faculty"
        title={
          <>
            The people who <em>run the room</em>
          </>
        }
        standfirst="Ten teachers across four disciplines. Between them: the Shanghai Theatre Academy, the Beijing Dance Academy, the Shenyang and Xi'an conservatories, Anhui Normal, the University of Melbourne, Monash and Chichester."
        trail={[{ label: "Faculty" }]}
        density="deep"
      />

      {groups.map(({ discipline, members }, i) => (
        <Section key={discipline.id} tone={i % 2 ? "alt" : "base"}>
          <SectionHead
            eyebrow={discipline.title}
            title={discipline.title}
            note={discipline.blurb}
          />
          <ul className="facultylist">
            {members.map((t) => (
              <TeacherCard key={t.slug} teacher={t} />
            ))}
          </ul>
        </Section>
      ))}
    </>
  );
}

function TeacherCard({ teacher: t }: { teacher: Teacher }) {
  const teaches = COURSES.filter((c) => c.teachers.includes(t.slug));
  const leadership = TEAM.find((l) => l.slug === t.slug);

  /* Three credentials read as a set; five read as a wall. Above three the tail
     goes behind an accordion, which is one of the two reasons shadcn is
     installed — the trigger carries the aria-expanded and aria-controls
     wiring rather than us re-deriving it per page. */
  const head = t.credentials.slice(0, 3);
  const tail = t.credentials.slice(3);

  return (
    <li className="facultycard" id={t.slug}>
      <ImageFrame asset={t.portrait} kind="portrait" className="facultycard__frame" sizes="260px" enlargeTitle={t.name} />

      <div className="facultycard__body">
        <h3 className="facultycard__name">{t.name}</h3>

        <p className="facultycard__subject">{t.subject}</p>

        {/* Two of the ten also run the school. The role is a credential
            and stays; the link that used to follow it pointed at
            /about/team, which no longer exists. */}
        {leadership && (
          <p className="facultycard__dual">Also {leadership.role}.</p>
        )}

        <ul className="creds">
          {head.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        {tail.length > 0 && (
          <Accordion type="single" collapsible className="creds__more">
            <AccordionItem value="more">
              {/* h4, under the teacher's own h3 name — see the note on the
                  heading prop in components/ui/accordion.tsx. */}
              <AccordionTrigger heading="h4">
                {tail.length} more {tail.length === 1 ? "credential" : "credentials"}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="creds">
                  {tail.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <p className="facultycard__teaches">
          <span className="facultycard__teaches-label">Teaches</span>
          {teaches.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <Link href={`/courses/${c.slug}`}>{c.title}</Link>
            </span>
          ))}
        </p>

        <p className="facultycard__disc">
          {t.disciplines.map((id) => getDiscipline(id).title).join(" · ")}
        </p>
      </div>
    </li>
  );
}
