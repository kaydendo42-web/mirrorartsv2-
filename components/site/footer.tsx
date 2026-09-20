import BrandMark from "./brand-mark";
import Link from "next/link";

import { SITE } from "@/lib/content/site";

/* The three off-site accounts come from the content layer rather than being
   declared again here — they are also in the footer's JSON-LD's ancestor, on
   /contact, and in SITE itself, and three copies of a URL is two too many.

   WeChat and Xiaohongshu are not links out: an ID is copied, not followed.
   They pointed at bare "#wechat" and "#xiaohongshu" hashes, which resolved to
   nothing on every page of the site. /contact now carries both ids. */
const SOCIAL: { label: string; href: string; lang?: string }[] = [
  ...SITE.socials,
  { label: "WeChat", href: "/contact#wechat" },
  { label: "Xiaohongshu", href: "/contact#xiaohongshu" },
];

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "All courses", href: "/courses" },
      { label: "Exams & achievements", href: "/stage#achievements" },
      { label: "Faculty", href: "/faculty" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  {
    title: "School",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Productions", href: "/stage" },
      { label: "Partners", href: "/about#partners" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Surrey Hills campus", href: "/#find-us" },
      { label: "Glen Waverley campus", href: "/#find-us" },
      { label: "Venue hire", href: "/workshops/venue" },
      { label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div className="foot__brand">
          <BrandMark />
          <p className="foot__tag">
            At Mirror, every child gets the chance to stand on stage and be seen.
          </p>
          <ul className="social">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                {s.href.startsWith("/") ? (
                  <Link href={s.href} lang={s.lang}>
                    {s.label}
                  </Link>
                ) : (
                  <a href={s.href} rel="noopener" lang={s.lang}>
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav className="foot__nav" aria-label="Footer">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href}>{l.label}</Link>
                    ) : (
                      <a href={l.href}>{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="wrap foot__base">
        <p>
          © {new Date().getFullYear()} Mirror Arts Education
        </p>
        {/* The 中文 link is out for the same reason it is out of the
            masthead — see the note there. */}
      </div>
    </footer>
  );
}
