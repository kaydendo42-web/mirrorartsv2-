import { Section, SectionHead } from "@/components/site/section";
import type { FaqItem } from "@/lib/content/faq";
import { faqSchema, jsonLd } from "@/lib/schema";

/* A definition list, not an accordion: the answers are short, the point is
   that they are readable by a parent and by a crawler in the same pass, and
   a closed <details> is one more click on a page whose only job is to get
   someone to the form. Renders nothing for an empty list, so a course with
   no recorded facts shows no empty section. */
export default function Faq({ items, tone = "alt" }: { items: FaqItem[]; tone?: "base" | "alt" }) {
  if (items.length === 0) return null;
  return (
    <Section id="faq" tone={tone}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(items))} />
      <SectionHead eyebrow="Questions" title="Before you write" />
      <dl className="faq">
        {items.map((f) => (
          <div key={f.q} className="faq__item">
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
