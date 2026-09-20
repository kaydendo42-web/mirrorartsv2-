import Link from "next/link";

import CeremonyGrid from "@/components/shared/ceremony-grid";
import CertStack from "@/components/shared/cert-stack";
import { Section, SectionHead } from "@/components/site/section";
import { CREDENTIAL_BODIES } from "@/lib/content/achievements";
import {
  AMEB_DOCUMENTS,
  CEFA_CERTIFICATES,
  COMPETITIONS,
} from "@/lib/content/certificates";
import { COURSES } from "@/lib/content/courses";
import { INSTITUTIONS } from "@/lib/content/partners";

/* The "Why families ask" prose and the "Enrol" enquiry form came out of this
 * page on 9 September 2026 at the client's request: the header's Book a trial
 * class button is the site's one enrolment path, and a second form this far
 * down the page competed with it. The bodies list moved up into the overview
 * band rather than leaving with the prose that happened to house it.
 *
 * On 18 September 2026 the client sent the documents themselves: AMEB
 * examination reports, CEFA certificates, competition certificates and the
 * ceremony photographs. The two animated artworks that had stood in for them
 * (ArtsComposition "voice" and "examination", kept unimported in
 * components/shared) gave up the right column to the real thing, and a
 * Competitions section joined the two examining bodies. */

const EXAM_PREP = COURSES.filter(
  (course) => course.leadsTo?.href === "/stage#achievements",
);
const CEFA_INSTITUTION = INSTITUTIONS.find(
  (institution) => institution.slug === "cefa",
);

export default function ExamsAchievementsDetail() {
  return (
    <>
      <Section id="achievements" tone="band">
        <SectionHead
          eyebrow="Exams &amp; achievements"
          title={
            <>
              Australia&apos;s only CEFA children&apos;s language-performance{" "}
              <em>examination centre</em>
            </>
          }
          note="Grades are optional, and they are the reason a lot of families start. AMEB Speech & Performance, AMEB Vocal, and CEFA certification are all prepared for inside the ordinary course."
        />

        <h3 className="minihead">Bodies we prepare students for</h3>
        <ul className="bodies">
          {CREDENTIAL_BODIES.map((body) => (
            <li key={body.id}>{body.name}</li>
          ))}
        </ul>
      </Section>

      <Section id="ameb" className="sect--exam-composition">
        <SectionHead
          eyebrow="AMEB"
          title="Speech &amp; Performance, and Vocal"
          note="The Australian Music Examinations Board sets the syllabus and sends an examiner. It is the same board, and the same grades, a music student sits for piano."
        />
        <div className="prose">
          <p>
            Preparation is not a separate class. It runs inside the course a
            child is already in, and a family decides term by term whether to
            enter. Nothing here requires an exam.
          </p>
          <p>
            The speech teacher has taught at Trinity and Caulfield Grammar and
            has served as an AMEB speech examiner and a competition adjudicator
            — which means the person preparing a child for the room has sat on
            the other side of it.
          </p>
        </div>

        <CertStack
          items={AMEB_DOCUMENTS}
          label="AMEB examination report"
          className="certstack--exam"
        />

        <h3 className="minihead">Courses that prepare for grades directly</h3>
        <ul className="includes">
          {EXAM_PREP.map((course) => (
            <li key={course.slug}>
              <Link href={`/courses/${course.slug}`}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="cefa" className="sect--exam-composition">
        <SectionHead
          eyebrow="CEFA"
          title="The examination centre"
          note={CEFA_INSTITUTION?.relationship}
        />
        <div className="prose">
          {/* PRE-LAUNCH GATE #2. This remains the school's own claim until
              CEFA confirms the sole-centre wording in writing. */}
          <p>
            Mirror Arts Education is, on the school&apos;s own account,
            CEFA&apos;s only children&apos;s language-performance examination centre
            in Australia. Students sit the assessment twice a year, once they
            are ready, and receive a CEFA-issued certificate at the grade they
            reach.
          </p>
          <p>
            Sitting it here means not travelling for it, and it means the
            teacher preparing a child knows the syllabus rather than reading it.
          </p>
        </div>
        <CertStack
          items={CEFA_CERTIFICATES}
          label="CEFA certificate"
          className="certstack--exam"
        />
      </Section>

      <Section id="competitions" tone="alt" className="sect--competitions">
        <SectionHead
          eyebrow="Competitions"
          title={
            <>
              Eisteddfods, contests and <em>speech finals</em>
            </>
          }
          note="What the students have brought home since 2023, one pile per event. Every certificate opens at full size."
        />

        <ul className="shelf">
          {COMPETITIONS.map((c) => (
            <li key={c.slug} className="shelf__pile" data-count={c.certificates.length}>
              <CertStack
                items={c.certificates}
                label={`${c.title}, ${c.years}`}
                sizes="(min-width: 1000px) 30vw, 70vw"
              />
              <div className="shelf__label">
                <h3 className="shelf__title">{c.title}</h3>
                <p className="shelf__meta">
                  <span>{c.years}</span>
                  <span>{c.categories}</span>
                  <span>
                    {c.certificates.length}{" "}
                    {c.certificates.length === 1 ? "certificate" : "certificates"}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="minihead">From the ceremonies</h3>
        <CeremonyGrid />
      </Section>
    </>
  );
}
