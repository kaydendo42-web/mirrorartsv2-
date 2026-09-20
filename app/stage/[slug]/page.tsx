import type { Metadata } from "next";
import ImageFrame from "@/components/shared/image-frame";
import Link from "next/link";
import { notFound } from "next/navigation";

import VideoFigure from "@/components/shared/video-figure";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { getCourse } from "@/lib/content/courses";
import { PRODUCTIONS, productionSlugs, type Kind } from "@/lib/content/productions";
import { jsonLd, productionSchema } from "@/lib/schema";

/* One page per work. 4.9 GB of masters finally has somewhere to be watched.
 *
 * Each says what the work was, who made it, where it played, and which course
 * it grew out of — so a parent who has just watched a choir can reach the
 * choir course in one click.
 *
 * Two constraints hold across all six:
 *
 * The competition entry names only the result the client's certificates
 * document — first and second prize, junior group, 2026 — and never a child.
 * Belt & Road, which it replaced, was held to the competition and not the
 * results because nothing there was verified. A test in lib/content holds
 * the copy to the certificates.
 *
 * Born to Fly was BROADCAST ON the Beijing Winter Olympics Organising
 * Committee's official website and on the Chinese Consulate-General in
 * Melbourne's platform. It was not an official Olympic entry, and no wording
 * here may let it read as one. Both sentences come from the content layer
 * unedited for that reason. */

export const dynamicParams = false;

export function generateStaticParams() {
  return productionSlugs().map((slug) => ({ slug }));
}

const KIND_LABEL: Record<Kind, string> = {
  stage: "Stage production",
  mv: "Music video",
  competition: "Competition",
  gala: "Gala",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PRODUCTIONS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} (${p.year})`, description: p.blurb };
}

export default async function ProductionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PRODUCTIONS.find((x) => x.slug === slug);
  if (!p) notFound();

  const i = PRODUCTIONS.indexOf(p);
  const prev = PRODUCTIONS[i - 1];
  const next = PRODUCTIONS[i + 1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(productionSchema(p))}
      />
      <PageHero
        eyebrow={KIND_LABEL[p.kind]}
        title={p.title}
        standfirst={p.blurb}
        trail={[{ label: "Stage", href: "/stage" }, { label: p.title }]}
        density="bare"
        meta={[
          { label: "Year", value: String(p.year) },
          { label: "Form", value: KIND_LABEL[p.kind] },
        ]}
      />

      <Section>
        {/* full is the Blob URL of the full-length render with audio, and
            VideoFigure shows its play button when it is set. An entry whose
            full is "" runs the ten-second loop with no button — the specified
            fallback, not a degraded one. */}
        <VideoFigure
          loop={p.video.loop}
          full={p.video.full}
          poster={p.video.poster}
          className="prodvideo"
        />

        <div className="prose prodbody">
          {p.body.map((para, n) => (
            <p key={n}>{para}</p>
          ))}
        </div>
      </Section>

      {p.credits.length > 0 && (
        <Section tone="alt">
          <SectionHead eyebrow="Credits" title="Who made it" />
          <dl className="creditlist">
            {p.credits.map((c) => (
              <div key={`${c.label}-${c.value}`}>
                <dt>{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {p.stills.length > 0 && (
        <Section>
          <SectionHead eyebrow="Stills" title="From the night" />
          <ul className="stills">
            {p.stills.map((s) => (
              <li key={s.src}>
                <ImageFrame asset={s} sizes="(min-width: 900px) 620px, 92vw" enlargeTitle={p.title} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {p.relatedCourses.length > 0 && (
        <Section tone="band">
          <SectionHead
            eyebrow="Where it came from"
            title={
              <>
                The courses this <em>grew out of</em>
              </>
            }
            note="Work like this is made inside the ordinary term, by the children already in the room."
          />
          <ul className="relcourses">
            {p.relatedCourses.map((cs) => {
              const c = getCourse(cs);
              return (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`}>
                    <span className="relcourses__title">{c.title}</span>
                    <span className="relcourses__strap">{c.strapline}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <PageNav
        prev={prev && { label: prev.title, href: `/stage/${prev.slug}` }}
        next={next && { label: next.title, href: `/stage/${next.slug}` }}
      />
    </>
  );
}
