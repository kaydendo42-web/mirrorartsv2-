import InstitutionRoll from "@/components/shared/institution-roll";
import LogoBelt from "@/components/shared/logo-belt";
import { Section, SectionHead } from "@/components/site/section";
import { INSTITUTIONS, SUPPORT_LOGOS } from "@/lib/content/partners";

export default function PartnersDetail() {
  return (
    <>
      <Section id="partners">
        <SectionHead
          eyebrow="Official partners"
          title={
            <>
              Professional pathways <em>&amp; recognition</em>
            </>
          }
          note={`Through partnerships with recognised examination, certification and competition bodies, Mirror connects students with professional assessments, accredited qualifications and prestigious competitions. Here are the ${INSTITUTIONS.length} organisations Mirror works with, and what each relationship is.`}
        />
        <InstitutionRoll institutions={INSTITUTIONS} />
      </Section>

      <section className="sect sect--alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Supporters"
            title="Organisations that stand behind the work"
            note={`The school carries the marks of ${SUPPORT_LOGOS.length} conservatoires, universities, schools and cultural organisations. They are listed as marks because that is all the record holds for them — where there is more to say, the organisation is in the section above.`}
          />
        </div>
        <LogoBelt
          logos={SUPPORT_LOGOS}
          direction="left"
          label="Supporting organisations"
        />
      </section>
    </>
  );
}
