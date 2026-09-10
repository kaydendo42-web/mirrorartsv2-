export type NavItem = {
  label: string;
  href: string;
  sub?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "About",
    href: "/about",
    sub: [
      { label: "Our story", href: "/about" },
      { label: "Partners", href: "/about#partners" },
    ],
  },
  {
    label: "Courses",
    href: "/courses",
    // The five section headings on /courses, in the client's own order and
    // wording (8 Sep revision, item 1). The hrefs are the section ids, which
    // did not change with the headings — see the note on DisciplineId.
    sub: [
      { label: "Performance Arts", href: "/courses#performance" },
      { label: "Language & Expression", href: "/courses#language" },
      { label: "Music & Vocal", href: "/courses#music" },
      { label: "Dance & Posture", href: "/courses#posture" },
      { label: "Adult Program", href: "/courses#adult" },
    ],
  },
  // Faculty keeps its nav item and its page. Only the homepage summary
  // section was cut — it was doing bio work the close does not need.
  { label: "Faculty", href: "/faculty" },
  {
    label: "Stage",
    href: "/stage",
    sub: [
      { label: "Productions", href: "/stage" },
      { label: "Exams & achievements", href: "/stage#achievements" },
    ],
  },
  {
    label: "Workshops",
    href: "/workshops",
    sub: [
      { label: "For schools", href: "/workshops#schools" },
      { label: "Cultural workshops", href: "/workshops#workshops" },
    ],
  },
  // Out of the Workshops dropdown and up to the top level. Venue hire is the
  // only thing the school sells to someone who is not enrolling a child, and
  // that buyer arrives looking for a room rather than for a workshop — one
  // level down inside a menu about children's classes is the wrong place to
  // meet them. The URL stays /workshops/venue so nothing that links to it
  // breaks; only where it is surfaced has changed.
  { label: "Venue hire", href: "/workshops/venue" },
  { label: "Contact", href: "/contact" },
];
