import Link from "next/link";

import { Section, SectionHead } from "@/components/site/section";
import { WORKSHOPS, WORKSHOP_FAMILIES } from "@/lib/content/workshops";

const NO_MIN = WORKSHOPS.filter((workshop) => !workshop.minAge).length;
const WITH_MATERIALS = WORKSHOPS.filter(
  (workshop) => workshop.materialsProvided,
).length;
const AGE_LIMITED = WORKSHOPS.filter((workshop) => workshop.minAge).sort(
  (a, b) => (a.minAge ?? 0) - (b.minAge ?? 0),
);

export default function SchoolsWorkshopsDetail() {
  return (
    <>
      <Section id="schools" tone="band">
        <SectionHead
          eyebrow="For schools and organisations"
          title={
            <>
              We bring it <em>to your room</em>
            </>
          }
          note={`${WORKSHOPS.length} workshops in Chinese performance, craft and media, run as incursions for schools, councils and community groups. Delivered to a group, in English and Mandarin.`}
        />
        <div className="prose prose--on-band">
          <p>
            A workshop is a single session delivered to a group, either at your
            site or at the Surrey Hills campus, and it is taught in English and
            Mandarin.
          </p>
          <p>
            {WITH_MATERIALS} of the {WORKSHOPS.length} arrive with their
            materials, so a craft session needs somewhere to work and nothing
            else from you. The performance workshops want room to move rather
            than equipment.
          </p>
          <p>
            The three families: {WORKSHOP_FAMILIES.map((family) => family.title).join(" · ")}.{" "}
            <Link href="/workshops#workshops">Every workshop is listed</Link>,
            with what happens in each.
          </p>
          <p>
            Mirror has taught and performed Chinese traditions with the
            Melbourne Chinese Museum since 2022, in English and Mandarin.
          </p>
        </div>
      </Section>

      <Section tone="band">
        <SectionHead
          eyebrow="Age bands"
          title="What suits which year level"
          note={`${NO_MIN} of the ${WORKSHOPS.length} state no minimum age. The rest do, and those limits are the ones worth planning around.`}
        />
        <ul className="agebands">
          {AGE_LIMITED.map((workshop) => (
            <li key={workshop.slug}>
              <span className="agebands__age">{workshop.minAge}+</span>
              <span className="agebands__name">
                {workshop.title}
                {workshop.supervision && (
                  <span className="agebands__note">
                    {" "}
                    {workshop.supervision}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="What we need to know"
          title="Four things, and then we can answer properly"
        />
        <ol className="asklist">
          <li>Which workshops, or what the session is meant to do.</li>
          <li>How many students, and their year level.</li>
          <li>The date you have in mind, and how long you have them for.</li>
          <li>Your site or ours — and if yours, what the room has in it.</li>
        </ol>
        <p className="sect__note">
          Availability, group size and cost come back by email. There is no
          online booking and no published rate card for incursions; a workshop
          day is quoted against what you actually want.
        </p>
      </Section>
    </>
  );
}
