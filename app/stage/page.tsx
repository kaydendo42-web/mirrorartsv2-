import type { Metadata } from "next";
import Link from "next/link";

import ExamsAchievementsDetail from "@/components/sections/exams-achievements-detail";
import VideoFigure from "@/components/shared/video-figure";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { PRODUCTIONS, type Kind } from "@/lib/content/productions";

/* Six works, and the first place on this site where the school's own footage
 * is actually watchable. 4.9 GB of masters sat in a folder nobody could see.
 *
 * Cards run the committed ten-second loop rather than a still, because a
 * still of a stage is a still of an empty stage — these are the only moving
 * images the school has. The six loops together are 7.7 MB, which is the
 * budget this page was allowed to spend.
 *
 * The loop only: `full` is deliberately not passed. The full render is a
 * network dependency and belongs on the case study, and passing it here would
 * put VideoFigure's play <button> inside the card's <a>, which is a button
 * nested in a link — invalid, and the browsers that do render it disagree
 * about which one a click belongs to. */

export const metadata: Metadata = {
  title: "Stage and screen",
  description:
    "Mirror Arts Education's own productions: two original music videos, the annual stage production, two Spring Festival galas, and the China Daily Belt & Road youth speech competition.",
};

const KIND_LABEL: Record<Kind, string> = {
  stage: "Stage production",
  mv: "Music video",
  competition: "Competition",
  gala: "Gala",
};

/* Strongest work first, then newest within each kind. The content layer's own
   order is the order the works were written up, which puts a 2022 music video
   ahead of the annual production the homepage hero is cut from. */
const KIND_ORDER: Kind[] = ["stage", "mv", "competition", "gala"];

const ORDERED = [...PRODUCTIONS].sort(
  (a, b) =>
    KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || b.year - a.year,
);

export default function StagePage() {
  return (
    <>
      <PageHero
        eyebrow="Stage"
        title={
          <>
            Everything the school has <em>put in front of an audience</em>
          </>
        }
        standfirst="An annual stage production, two original music videos that went out on the Beijing Winter Olympics organising committee's site and the Chinese Consulate-General in Melbourne's platform, two Spring Festival galas, and an international speech competition."
        trail={[{ label: "Stage" }]}
        density="shallow"
      />

      <Section>
        <SectionHead
          eyebrow="Works"
          title="Six pieces of work"
          note="Each card runs ten silent seconds of the thing itself. The full film is on its own page."
        />
        <ul className="stagegrid">
          {ORDERED.map((p) => (
            <li className="stagecard" key={p.slug}>
              <Link className="stagecard__link" href={`/stage/${p.slug}`}>
                <VideoFigure
                  loop={p.video.loop}
                  poster={p.video.poster}
                  className="stagecard__vid"
                />
                <p className="stagecard__meta">
                  <span className="stagecard__kind">{KIND_LABEL[p.kind]}</span>
                  <span className="stagecard__year">{p.year}</span>
                </p>
                <h3 className="stagecard__title">{p.title}</h3>
                <p className="stagecard__blurb">{p.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ExamsAchievementsDetail />

      <PageNav
        prev={{ label: "Faculty", href: "/faculty" }}
        next={{ label: "Workshops", href: "/workshops" }}
      />
    </>
  );
}
