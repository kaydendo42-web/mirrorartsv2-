/* The three grounds the site alternates between. The homepage does this with
   .sect / .sect--alt already, and the workshops section reaches for the same
   charcoal ground the CTA band uses; this is the same idea as a component so
   inner pages cannot invent a fourth ground of their own. */

type Tone = "base" | "alt" | "band";

export function Section({
  id,
  tone = "base",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = tone === "base" ? "sect" : `sect sect--${tone}`;
  return (
    <section className={`${cls} ${className}`.trim()} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* eyebrow is a ReactNode rather than a string because half of them are the
   client's own Chinese section labels, and every Chinese string on this site
   carries lang="zh-Hans" — without it a screen reader reads 表演类 with an
   English voice and produces nothing a listener can use. A string prop gave
   the caller nowhere to put the attribute. */
export function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <div className="sect__head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2">{title}</h2>
      {note && <p className="sect__note">{note}</p>}
    </div>
  );
}
