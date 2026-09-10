import Image from "next/image";
import Link from "next/link";

/* Three of the six works, as the homepage's sample. Kept as a literal rather
 * than read from lib/content/productions.ts: app/page.tsx is "use client", so
 * importing the catalogue here would ship every production's body copy and
 * credits to the browser to fill three cards. Same trade lib/courses.ts makes
 * for the enquiry <select>.
 *
 * The images are the loop poster frames Task 9 cut, so what a card shows is a
 * frame of the film it links to. They used to be three top-level assets whose
 * filenames were assigned from page context rather than from the picture, and
 * one of them was wrong: /assets/roundel.jpg is the Belt & Road speech
 * competition, and it sat on the Born to Fly card.
 */
const WORKS = [
  {
    href: "/stage/born-to-fly",
    img: "/assets/video/born-to-fly-poster.jpg",
    alt: "The Mirror choir performing in the Born to Fly music video",
    year: "2022",
    title: (
      <>
        Born to Fly
      </>
    ),
    blurb:
      "Original music video, broadcast on the Beijing Winter Olympics organising committee's official site.",
  },
  {
    href: "/stage/jungle-book",
    img: "/assets/video/jungle-book-poster.jpg",
    alt: "The cast of The Jungle Book on stage in animal costume and face paint",
    year: "2025",
    title: <>The Jungle Book</>,
    blurb:
      "The annual stage production — a full cast, a full house, and a certificate for every performer.",
  },
  {
    /* Was /stage/spring-festival-gala, which is not a route and never has
       been — a 404 from the homepage, found by crawling the site. The galas
       are one page each; this points at the most recent. */
    href: "/stage/horse-year-gala",
    img: "/assets/video/horse-year-gala-poster.jpg",
    alt: "A promotional still from Mirror's 2026 Year of the Horse gala",
    year: "2024 —",
    title: <>Children&apos;s Spring Festival Gala</>,
    blurb:
      "Melbourne's first was co-directed by Mirror in 2024. The Snake and Horse year films followed.",
  },
];

export default function Stage() {
  return (
    <section className="sect" id="stage">
      <div className="wrap">
        <div className="sect__head">
          <p className="eyebrow">Stage</p>
          <h2 className="h2">Our students made these</h2>
          <p className="sect__note">
            Original music videos, an annual production, and Melbourne&apos;s
            children&apos;s Spring Festival Gala, which we co-direct.
          </p>
        </div>

        <ul className="works">
          {WORKS.map((w) => (
            <li className="work" key={w.href}>
              <Link href={w.href}>
                <span className="work__frame">
                  <Image
                    src={w.img}
                    alt={w.alt}
                    width={1920}
                    height={1080}
                    sizes="(min-width: 900px) 33vw, 100vw"
                  />
                </span>
                <span className="work__year">{w.year}</span>
                <h3 className="work__title">{w.title}</h3>
                <p>{w.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
