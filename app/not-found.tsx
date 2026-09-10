import Link from "next/link";

import PageHero from "@/components/site/page-hero";
import { Section, SectionHead } from "@/components/site/section";
import { DISCIPLINES } from "@/lib/content/disciplines";
import { SITE } from "@/lib/content/site";

/* The old domain gets a blanket 301 to the homepage at cutover, so the common
 * case never reaches this page. What does reach it is a mistyped slug or a
 * link into one of the nineteen wig-shop demo pages that predate this site.
 *
 * So it offers the five course sections rather than a search box: someone who
 * landed on a broken URL of a school's site is looking for a class, and five
 * links is a faster answer than a field to type into. */

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title={
          <>
            That page <em>is not here</em>
          </>
        }
        standfirst="It may have moved, or the address may have a typo in it. Everything the school teaches is in one of these."
        density="bare"
      />

      <Section>
        <SectionHead eyebrow="Try here" title="What the school teaches" />
        <ul className="courselist notfound__list">
          {DISCIPLINES.map((d) => (
            <li
              key={d.id}
              className="courselist__row"
              style={{ ["--accent" as string]: d.accent }}
            >
              <Link className="courselist__link" href={`/courses#${d.id}`}>
                <span className="courselist__text">
                  <span className="courselist__title">{d.title}</span>
                  <span className="courselist__strap">{d.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="band">
        <SectionHead
          eyebrow="Or ask"
          title={
            <>
              Tell us what you were <em>looking for</em>
            </>
          }
          note={`Email ${SITE.email} or call ${SITE.phone}. A person answers.`}
        />
        <Link className="ghost" href="/contact">
          Contact
        </Link>
      </Section>
    </>
  );
}
