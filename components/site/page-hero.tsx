import ImageFrame from "@/components/shared/image-frame";
import KineticText from "@/components/motion/kinetic-text";

import type { Asset, Meta } from "@/lib/content/types";

import Crumbs, { type Crumb } from "./crumbs";

export type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  standfirst?: React.ReactNode;
  meta?: Meta[];
  media?: Asset;
  /* The course or discipline accent. Used on the eyebrow's hairline and
     nothing larger — the accents behave like gold does. */
  accent?: string;
  density?: "deep" | "shallow" | "bare";
  trail?: Crumb[];
};

export default function PageHero({
  eyebrow,
  title,
  standfirst,
  meta,
  media,
  accent,
  density = "shallow",
  trail,
}: PageHeroProps) {
  return (
    <header
      className={`phero phero--${density}`}
      data-scene={eyebrow}
      style={accent ? ({ ["--accent" as string]: accent }) : undefined}
    >
      <div className="page-cue" aria-hidden="true"><span /><span /><span /></div>
      <div className="wrap">
        {trail && <Crumbs trail={trail} />}
        <p className="eyebrow phero__eyebrow">{eyebrow}</p>
        <h1 className="h1"><KineticText page>{title}</KineticText></h1>
        {standfirst && <p className="phero__standfirst">{standfirst}</p>}
        {meta && (
          <dl className="phero__meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {media && (
        <figure className="phero__media">
          <ImageFrame asset={media} kind="hero" sizes="(min-width: 1500px) 1372px, 94vw" preload />
        </figure>
      )}
    </header>
  );
}
