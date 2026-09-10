"use client";

import Link from "next/link";
import { useRef } from "react";
import { useTicker } from "@/components/motion/use-ticker";

/* Blueprint splits this one: the claim and a tally on the left, a slow
   vertical reel of the record on the right, faded top and bottom. */

const TALLY = [
  { figure: "2", label: ["examination boards", "CEFA and AMEB"] },
  /* Was "9 courses, every one exam-prepared". The 8 September 2026 revision
     took the catalogue to thirteen and four of the new ones — Debating, MV
     Production, Dance and Posture Training — have no graded pathway, so the
     second half of that claim stopped being true at the same moment the
     first half did. */
  { figure: "13", label: ["courses across", "four disciplines"] },
  { figure: "50+", label: ["countries in the", "China Daily field"] },
  { figure: "2017", label: ["teaching in", "Melbourne since"] },
];

const RECORD = [
  {
    name: "CEFA language and performance grades",
    by: "Mirror is the examination centre — the only one in Australia",
  },
  {
    name: "AMEB Speech & Drama",
    by: "Australian Music Examinations Board",
  },
  {
    name: "AMEB Singing",
    by: "Australian Music Examinations Board",
  },
  {
    name: "China Daily Belt & Road Youth English Speech Competition",
    by: "Entrants from more than fifty countries and regions",
  },
  {
    name: "China–Australia International Culture & Arts Exchange Competition",
    by: "Held in Melbourne",
  },
  {
    name: "Chinese Songs Contest, Melbourne",
    by: "Vocal",
  },
  {
    name: "National Children's Spring Festival Gala, Beijing",
    by: "Hosting",
  },
  {
    name: "Melbourne Children's Spring Festival Gala",
    by: "Melbourne's first — we co-direct it",
  },
];

export default function Achievements() {
  const reel = useRef<HTMLDivElement>(null);
  useTicker(reel, ".vtick__track", 26, "y");

  return (
    <section className="sect sect--alt" id="achievements">
      <div className="wrap achieve">
        <div className="achieve__text">
          <p className="eyebrow">Achievements</p>
          <h2 className="h2">
            Sat, graded and
            <br />
            <em>entered</em>, every term
          </h2>
          <p className="sect__note">
            Mirror is an examination centre, not only a school. These are the
            boards our students are graded by and the competitions they are
            entered in.
          </p>

          <dl className="tally">
            {TALLY.map((t) => (
              <div key={t.figure}>
                <dt>{t.figure}</dt>
                <dd>
                  {t.label[0]}
                  <br />
                  {t.label[1]}
                </dd>
              </div>
            ))}
          </dl>

          {/* The detailed exams and certification story now follows the
              productions on /stage rather than living on a second page. */}
          <Link className="pill" href="/stage#achievements">
            Exams and achievements
          </Link>
        </div>

        <div className="achieve__reel" ref={reel}>
          <ul className="vtick__track">
            {RECORD.map((r) => (
              <li key={r.name}>
                <span className="vtick__name">{r.name}</span>
                <span className="vtick__by">{r.by}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
