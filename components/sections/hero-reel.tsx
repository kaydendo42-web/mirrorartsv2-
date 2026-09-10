import Link from "next/link";
import KineticText from "@/components/motion/kinetic-text";

/* The nine disciplines, in the client's own order (Revision - Daisy and
   Rachel, Homepage.pdf §3). Not the same list as lib/content/disciplines.ts,
   which groups the courses into four families — this is the marketing line
   under the welcome, naming what is taught rather than how the catalogue is
   filed. Every one of the nine now has a course page behind it; Dance,
   Debate and Instrument were the three that did not until 8 September 2026,
   which is what the second revision added. */
const DISCIPLINES_TAUGHT = [
  "Drama",
  "Speech",
  "Debate",
  "Musical Theatre",
  "Vocal",
  "Hosting",
  "Dubbing",
  "Dance",
  "Instrument",
];

/* Two full-height layers stacked with position:sticky: the hero video, then
   the mission wash which lets the video read through it. The title card is
   not part of this — it is the intro overlay in the layout. */
export default function HeroReel() {
  return (
    <>
      <div className="reel">
        {/* Layer 1 · hero video */}
        <section className="layer layer--hero">
          <div className="hero__media">
            {/* Decorative and silent — aria-hidden, so no captions track. */}
            <video
              className="hero__video"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/video/hero-poster.jpg"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source
                src="/assets/video/hero-jungle-book-1920.mp4"
                type="video/mp4"
                media="(min-width:900px)"
              />
              <source
                src="/assets/video/hero-jungle-book-1280.mp4"
                type="video/mp4"
              />
            </video>
            <div className="hero__scrim" />
          </div>

          <div className="hero__body">
            <p className="eyebrow eyebrow--light">
              Melbourne · Surrey Hills &amp; Glen Waverley
            </p>
            <h1 className="hero__title"><KineticText>
              Drama, speech, music and dance for children who want a{" "}
              <em>stage</em>
            </KineticText></h1>
            <p className="hero__sub">
              Creative performing arts programmes for all age groups. Build
              confidence, find your voice, and shine on stage.
            </p>
            <div className="hero__acts">
              <Link className="pill pill--lg" href="/contact#trial">
                Book a trial class
              </Link>
              <Link className="ghost" href="/courses">
                See the courses
              </Link>
            </div>
          </div>

          <p className="hero__credit">
            2025 annual production · <em>The Jungle Book</em>
          </p>
          <span className="scroll-cue" aria-hidden="true">
            <span />
          </span>
        </section>

        {/* Layer 2 · mission wash */}
        <section className="layer layer--wash">
          <div className="wrap wrap--narrow wash__in">
            <span className="arch-rule" aria-hidden="true" />
            <p className="wash__lead"><KineticText wash>
              Welcome to Mirror Arts Education, where young talent takes{" "}
              <em>centre stage</em>.
            </KineticText></p>
            <p className="wash__body">
              Expert teachers. Professional stages. Exceptional facilities. Real
              performance opportunities.
            </p>
            {/* The nine disciplines as the client lists them, set as a list
                rather than a sentence with middots typed into it — a screen
                reader reads a list of nine as nine things, and reads the same
                nine separated by · as one long word. The separator is drawn in
                CSS for the same reason. */}
            <ul className="wash__disciplines">
              {DISCIPLINES_TAUGHT.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="wash__note">Professional AMEB Examination Centre</p>
          </div>
        </section>

        {/* Runway. Without it the last layer reaches its sticky position
            exactly as the reel ends, so it never holds. This gives it one
            screen. */}
        <span className="reel__dwell" aria-hidden="true" />
      </div>
      <span id="reel-end" aria-hidden="true" />
    </>
  );
}
