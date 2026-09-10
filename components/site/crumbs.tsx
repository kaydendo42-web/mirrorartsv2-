import Link from "next/link";

export type Crumb = { label: string; href?: string };

/* The tree is three deep in places and a parent arriving from a search
   result has no idea where they are. The last crumb carries no href and is
   marked current. */
export default function Crumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            /* Keyed on position, not label: a trail that repeats a label
               — "Workshops / … / Workshops" — collides on a label key and
               React drops one of the crumbs. */
            <li key={`${i}-${c.label}`} aria-current={last ? "page" : undefined}>
              {c.href && !last ? <Link href={c.href}>{c.label}</Link> : c.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
