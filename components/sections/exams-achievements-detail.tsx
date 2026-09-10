import Link from "next/link";
import ArtsComposition from "@/components/shared/arts-composition";

import { Section, SectionHead } from "@/components/site/section";
import { CREDENTIAL_BODIES } from "@/lib/content/achievements";
import { COURSES } from "@/lib/content/courses";
import { INSTITUTIONS } from "@/lib/content/partners";

/* The "Why families ask" prose and the "Enrol" enquiry form came out of this
 * page on 9 September 2026 at the client's request: the header's Book a trial
 * class button is the site's one enrolment path, and a second form this far
 * down the page competed with it. The bodies list moved up into the overview
 * band rather than leaving with the prose that happened to house it. */

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

        <ArtsComposition variant="voice" />

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
        <ArtsComposition variant="examination" />
      </Section>
    </>
  );
}
