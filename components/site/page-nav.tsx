import Link from "next/link";

export type NavTarget = { label: string; href: string };

/* No section is allowed to be a dead end — the IA says so explicitly. At the
   foot of a course or a production, the next one is the only thing a reader
   plausibly wants. */
export default function PageNav({
  prev,
  next,
}: {
  prev?: NavTarget;
  next?: NavTarget;
}) {
  if (!prev && !next) return null;
  return (
    <nav className="pagenav" aria-label="More in this set">
      {prev ? (
        <Link className="pagenav__side" href={prev.href}>
          <span className="pagenav__dir">Previous</span>
          <span className="pagenav__label">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link className="pagenav__side pagenav__side--next" href={next.href}>
          <span className="pagenav__dir">Next</span>
          <span className="pagenav__label">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
