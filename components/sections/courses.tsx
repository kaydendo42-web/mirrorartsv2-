import Image from "next/image";

/* Four across left each card too small to say anything, so the discipline was
   a caption and nothing more. Two across gives each one a paragraph. The
   image sits above the copy on one diagonal and below it on the other, so the
   four read as a checkerboard rather than a repeated stamp. */

/* A course line in a card. `minutes` is a string because Dubbing and MV are
   holiday programs and Instrument runs at two lengths — "60 min" is not the
   only shape this fact comes in any more. */
type Course = { name: string; minutes: string };

type Discipline = {
  id: string;
  accent: string;
  title: string;
  count: string;
  textFirst?: boolean;
  image: { src: string; alt: string; width: number; height: number };
  copy: React.ReactNode;
  courses: Course[];
  cta: string;
};

/* Four cards, not five. Adult Program is a section on /courses and has no
   card here: the homepage is written to a parent choosing for a child, and a
   fifth card would break the checkerboard to say something to somebody else.
   The nav dropdown carries it, and so does the hub page.

   Still a hand-kept literal rather than a read of lib/content/courses.ts —
   app/page.tsx is "use client", and object properties do not tree-shake, so
   importing the catalogue here ships every course body to the browser. The
   count and the durations are checked against the catalogue in
   lib/content/content.test.ts instead. */
const DISCIPLINES: Discipline[] = [
  {
    id: "performance",
    accent: "#3E7CB1",
    title: "Performance Arts",
    count: "Two courses",
    textFirst: true,
    image: {
      src: "/assets/cards/performance.jpg",
      alt: "Students in animal costume and face paint in the annual production of The Jungle Book",
      width: 1160,
      height: 870,
    },
    copy: (
      <>
        Led by Trinity-certified drama teachers, AMEB examiners and professional
        musical theatre performers, our programs develop acting, voice, movement
        and stagecraft. Each year, two performance terms culminate in full-scale
        Drama and Musical Theatre Productions at professional theatres.
      </>
    ),
    courses: [
      { name: "Drama (Production)", minutes: "120 min" },
      { name: "Musical Theatre (Production)", minutes: "90 min" },
    ],
    cta: "Performance courses",
  },
  {
    id: "language",
    accent: "#D9633B",
    title: "Language & Expression",
    count: "Four courses",
    image: {
      /* Was /assets/cards/language.jpg, which is the choir — a photograph of
         singing standing in for a discipline about speaking. The client
         picked this frame for the whole discipline (item 16). */
      src: "/assets/courses/speech-competition.jpg",
      alt: "A student speaking at the microphone on a school stage, the screen behind him titled Public Speaking above the senior age group",
      width: 1448,
      height: 965,
    },
    copy: (
      <>
        Speech, debating, bilingual hosting and dubbing — developing confident
        communicators, persuasive speakers and expressive performers.
      </>
    ),
    courses: [
      { name: "English Speech (AMEB)", minutes: "60 min" },
      { name: "Debating", minutes: "60 min" },
      { name: "Bilingual Hosting", minutes: "60 min" },
      { name: "Dubbing", minutes: "Holiday program" },
    ],
    cta: "Language courses",
  },
  {
    id: "music",
    accent: "#4F8A5B",
    title: "Music & Vocal",
    count: "Five courses",
    image: {
      /* Was /assets/cards/music.jpg, a 253px thumbnail upscaled 4.6x. The
         client picked the choir frame for the discipline (item 29); it
         carries the photographer's credit burned into the bottom edge. */
      src: "/assets/courses/choir-gala.jpg",
      alt: "The Mirror choir in yellow polo shirts singing on the gala stage, their conductor's raised hand at the edge of the frame",
      width: 1448,
      height: 966,
    },
    copy: (
      <>
        Vocal, choir, composition, instrumental training and MV production, with
        dedicated AMEB exam preparation. Students develop musicianship through
        professional training, performance and creative projects.
      </>
    ),
    courses: [
      { name: "Vocal (AMEB)", minutes: "60 min" },
      { name: "Instrument (AMEB)", minutes: "30 / 45 min" },
      { name: "MV (Production)", minutes: "Holiday program" },
      { name: "Choir", minutes: "120 min" },
      { name: "Music Composition", minutes: "60 min" },
    ],
    cta: "Music courses",
  },
  {
    id: "posture",
    accent: "#7A5A9E",
    title: "Dance & Posture",
    /* The one card whose count is two words long, because it is the one card
       whose list is longer than its course count: four classes live on two
       course pages. Saying "Four courses" here would put the four card counts
       at fifteen against a headline that says thirteen, and saying "Two
       courses" over four listed names reads like a mistake. */
    count: "Two courses, four classes",
    textFirst: true,
    image: {
      /* Was /assets/cards/posture.jpg, which is children running on a beach.
         The client picked the hip-hop frame (item 36). */
      src: "/assets/courses/dance-hip-hop.jpg",
      alt: "Five children in red and black streetwear mid-pose on a smoke-lit stage under the Mirror backdrop",
      width: 1448,
      height: 815,
    },
    copy: (
      <>
        Build confidence, coordination and stage presence through professional
        dance and posture training. Dance runs as Hip Hop, K-pop and Chinese
        Dance, focusing on technique, rhythm, movement and performance. Posture
        Training develops body alignment, balance, walking, standing and
        confident presentation.
      </>
    ),
    /* Four lines against two course pages, which is how the client lists them
       (item 36) and is the right call for a card: a parent scanning for K-pop
       needs to see the word K-pop, not infer it from "Dance". The three
       styles all lead to /courses/dance, where they are three named strands
       of one course — the card is an index, not a set of links. */
    courses: [
      { name: "Hip Hop", minutes: "90 min" },
      { name: "K-pop", minutes: "90 min" },
      { name: "Chinese Dance", minutes: "90 min" },
      { name: "Posture Training", minutes: "90 min" },
    ],
    cta: "Dance and posture courses",
  },
];

export default function Courses() {
  return (
    <section className="sect" id="courses">
      <div className="wrap">
        <div className="sect__head">
          <p className="eyebrow">Courses</p>
          <h2 className="h2">
            Four disciplines. Thirteen courses.
            <br />
            One stage to grow into
          </h2>
          <p className="sect__note">
            Professional arts training for every age group — from weekly classes
            to showcases, productions, competitions and accredited exams.
          </p>
        </div>

        <ul className="cards">
          {DISCIPLINES.map((d) => (
            <li
              key={d.id}
              className={`card${d.textFirst ? " card--text-first" : ""}`}
              style={{ ["--accent" as string]: d.accent }}
            >
              <div className="card__frame">
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  width={d.image.width}
                  height={d.image.height}
                  sizes="(min-width: 880px) 640px, 100vw"
                />
              </div>
              <span className="card__gap" aria-hidden="true" />
              <div className="card__body">
                <div className="card__head">
                  <span className="card__count">{d.count}</span>
                </div>
                <h3 className="card__title">{d.title}</h3>
                <p className="card__copy">{d.copy}</p>
                <ul className="card__courses">
                  {d.courses.map((c) => (
                    <li key={c.name}>
                      {c.name} <span>{c.minutes}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a className="ghost card__cta" href={`/courses#${d.id}`}>
                {d.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
