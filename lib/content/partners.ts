import type { Asset } from "./types.ts";

/* Partners and supporters, from content/MIRROR-ARTS-EDUCATION.md §9.
 *
 * Filenames and dimensions were read directly off disk — `ls
 * public/assets/partners/media public/assets/partners/support` — rather
 * than guessed, because a typo here fails the "every partner logo file
 * exists on disk" test immediately. Display names and their Chinese glosses
 * are carried over from components/sections/partners.tsx, which already
 * sliced these out of the two composite sheets for the homepage marquees.
 *
 * Known source defects, from docs/STATE.md. Listed for the client, not
 * worked around in CSS:
 *   - support/venus-art.png and support/tl-studio.png are light-on-light
 *     and read faint on the off-white background, even at full opacity.
 *   - support/chinese-museum.png (the museum's line-drawing mark) has the
 *     same light-on-light problem.
 *   - media/auyang-media.png carries a Chinese browser's "AI识图" tooltip
 *     baked into the pixels — the source sheet was itself a screenshot.
 *     Nothing renders the media belt now, so this one is dormant.
 *
 * Seven supporters came out on 4 September 2026 at the client's request
 * (Revision - Daisy and Rachel, About Page.pdf §9): Grand Show, B612 Art
 * Studio, Jinling Education, New Gold Mountain, SinoBeats, Happy Study
 * Chinese School and Dance Innovation Team. Their files are still on disk.
 *
 * The two that were blocked on files are in. Partner.docx arrived on 8
 * September 2026 carrying six marks — AYACA, the Melbourne Chinese Museum,
 * Salesian College Chadstone, AMEB, CEFA and Trinity College London — as
 * pictures on flat white or near-white grounds. Those grounds are keyed out
 * and the marks trimmed to their ink in public/assets/partners/institutions/;
 * see scripts/logo-keyout.py for how, and re-run it rather than hand-editing
 * a PNG if a replacement file ever comes in.
 *
 * They hang off INSTITUTIONS, not off SUPPORT_LOGOS. A supporter is a mark on
 * a belt because a mark is all the record holds for it; five of these six
 * already had a sentence saying what the relationship is, which is what puts
 * them in the named list, and the mark now sits beside that sentence instead
 * of scrolling past anonymously. Salesian is the exception and is discussed
 * on the Institution type. */

export type Logo = Asset;

export type Institution = {
  slug: string;
  name: string;
  /* Optional because a mark can arrive before a sentence does. Salesian
     College Chadstone came in on 8 September 2026 as a logo and a name and
     nothing else, so its row is carried on the mark alone rather than on a
     relationship we invented for it. See content/OPEN-QUESTIONS.md §27. */
  relationship?: string;
  /* The organisation's own mark, keyed off the flat background it was
     supplied on and trimmed to its ink. Optional, because a named institution
     can be recorded before its mark arrives — see Salesian above. */
  logo?: Logo;
};

/* Three separate top-level bindings rather than one PARTNERS object.
 *
 * The homepage marquees live inside a client component — app/page.tsx is
 * "use client" because scroll drives it — so whatever they import ships to
 * the browser. Properties of a single exported object do not tree-shake, so
 * `import { PARTNERS }` for two logo arrays would also ship every
 * institution's `relationship` paragraph to a page that never renders one.
 * Separate consts do tree-shake, so the belts import the two arrays they
 * need and the institutions stay on the server.
 *
 * This is the same trap that forced lib/courses.ts to stay a hand-kept
 * literal in Task 2, solved this time without the second copy. */

/* Nothing renders this. The media belt came off the homepage and off
   /about#partners on 4 September 2026 (§7 of the revision). The array and
   the eleven files are kept because "remove the belt" is not "delete the
   record", and putting it back is one import. */
export const MEDIA_LOGOS: Logo[] = [
  {
    src: "/assets/partners/media/focus-entertainment.png",
    alt: "Focus Entertainment logo",
    width: 142,
    height: 133,
  },
  {
    src: "/assets/partners/media/united-times.png",
    alt: "United Times logo",
    width: 113,
    height: 133,
  },
  {
    src: "/assets/partners/media/melbourne-mums.png",
    alt: "Melbourne Mums logo",
    width: 111,
    height: 133,
  },
  {
    src: "/assets/partners/media/msj-media.png",
    alt: "MSJ Media logo",
    width: 95,
    height: 133,
  },
  {
    src: "/assets/partners/media/ausaview.png",
    alt: "Ausaview logo",
    width: 107,
    height: 133,
  },
  {
    src: "/assets/partners/media/australia-news.png",
    alt: "Australia News logo",
    width: 202,
    height: 92,
  },
  {
    src: "/assets/partners/media/meltoday.png",
    alt: "Meltoday logo",
    width: 216,
    height: 92,
  },
  {
    src: "/assets/partners/media/australia-chinese-news.png",
    alt: "Australia Chinese News logo",
    width: 239,
    height: 92,
  },
  {
    // Source sheet is itself a screenshot and carries a Chinese browser's
    // "AI识图" tooltip baked into the pixels. Needs a clean file — see
    // the file-level comment above.
    src: "/assets/partners/media/auyang-media.png",
    alt: "Auyang International Media logo",
    width: 209,
    height: 75,
  },
  {
    src: "/assets/partners/media/bc-business-circle.png",
    alt: "BC Business Circle logo",
    width: 210,
    height: 75,
  },
  {
    src: "/assets/partners/media/maoben-online.png",
    alt: "Maoben Online logo",
    width: 205,
    height: 75,
  },
];

export const SUPPORT_LOGOS: Logo[] = [
  {
    src: "/assets/partners/support/central-academy-of-drama.png",
    alt: "The Central Academy of Drama logo",
    width: 210,
    height: 78,
  },
  {
    src: "/assets/partners/support/shanghai-theatre-academy.png",
    alt: "Shanghai Theatre Academy logo",
    width: 217,
    height: 78,
  },
  {
    src: "/assets/partners/support/beijing-dance-academy.png",
    alt: "Beijing Dance Academy logo",
    width: 257,
    height: 78,
  },
  {
    src: "/assets/partners/support/rmit.png",
    alt: "RMIT University logo",
    width: 203,
    height: 123,
  },
  {
    // Line-drawing mark, light-on-light — reads faint on the off-white
    // background even at full opacity. See the file-level comment above.
    src: "/assets/partners/support/chinese-museum.png",
    alt: "Museum of Chinese Australian History logo",
    width: 148,
    height: 123,
  },
  {
    // Light-on-light — reads faint on the off-white background even at
    // full opacity. See the file-level comment above.
    src: "/assets/partners/support/venus-art.png",
    alt: "Venus Art Dance Academy logo",
    width: 141,
    height: 123,
  },
  {
    src: "/assets/partners/support/sync-music.png",
    alt: "Sync logo",
    width: 155,
    height: 141,
  },
  {
    // Light-on-light — reads faint on the off-white background even at
    // full opacity. See the file-level comment above.
    src: "/assets/partners/support/tl-studio.png",
    alt: "TL Studio logo",
    width: 176,
    height: 82,
  },
];

/* Order follows the client's own, from Partner.docx: the six that supplied a
   mark lead, in the order the document lists them, and the two that never did
   sit together at the end. The grid fills row by row, so those two land side
   by side on the last row and read as a deliberate coda rather than as two
   holes punched at random through the list. */
export const INSTITUTIONS: Institution[] = [
  {
    slug: "ayaca",
    name: "Australian Youth Arts & Cultures Association (AYACA)",
    relationship:
      "Named partner organisation, listed in the site's footer alongside Venus Dance and Mingxin Dance School.",
    logo: {
      src: "/assets/partners/institutions/ayaca.png",
      alt: "Australian Youth Arts & Cultures Association logo",
      width: 414,
      height: 220,
    },
  },
  {
    slug: "melbourne-chinese-museum",
    name: "Melbourne Chinese Museum",
    relationship: "Joint programme since 2022, teaching Chinese traditions in English and Mandarin.",
    logo: {
      // Supersedes support/chinese-museum.png, which is the same lockup at a
      // quarter of the resolution and reads faint on the off-white ground.
      // The belt still carries the old file; swapping it is a separate job.
      src: "/assets/partners/institutions/melbourne-chinese-museum.png",
      alt: "Melbourne Chinese Museum logo",
      width: 294,
      height: 239,
    },
  },
  {
    // New on 8 September 2026. Name and mark are the client's; there is no
    // relationship line because they have not given us one, and the roll is
    // built to carry a row without one. See content/OPEN-QUESTIONS.md §27.
    slug: "salesian-college-chadstone",
    name: "Salesian College Chadstone",
    logo: {
      src: "/assets/partners/institutions/salesian-college-chadstone.png",
      alt: "Salesian College Chadstone logo",
      width: 420,
      height: 154,
    },
  },
  {
    slug: "ameb",
    name: "Australian Music Examinations Board (AMEB)",
    relationship:
      "Official AMEB Speech & Performance Examination Centre, offering professional AMEB training and examination pathways in Speech & Performance and Vocal.",
    logo: {
      src: "/assets/partners/institutions/ameb.png",
      alt: "Australian Music Examinations Board logo",
      width: 420,
      height: 193,
    },
  },
  {
    slug: "cefa",
    // Name and relationship are the client's own, supplied 4 September 2026
    // (Revision - Daisy and Rachel, About Page.pdf §8). Note what changed
    // besides the language: this line said "CEFA's only children's
    // language-performance examination centre in Australia" and now says
    // "authorised examination centre". The sole-centre claim is still made
    // in three other places — /stage#achievements twice, and the bilingual
    // hosting course — and whether it should come out of those too is an
    // open question for Rachel, not a change to make on inference.
    name: "China Arts Vocational Education Society (CEFA)",
    relationship:
      "Mirror Arts Education is CEFA's authorised examination centre in Australia, offering professional arts assessments and certification across multiple disciplines.",
    logo: {
      // The mark itself is a pale blue on white and stays pale once the white
      // is gone. That is the logo, not a defect in the keying — CEFA use it
      // this way — but it is the lightest thing in the roll.
      src: "/assets/partners/institutions/cefa.png",
      alt: "China Education Federation of the Arts (CEFA) logo",
      width: 420,
      height: 180,
    },
  },
  {
    slug: "trinity-college-london",
    name: "Trinity College London",
    relationship: "Certifies faculty and provides a student examination pathway.",
    logo: {
      src: "/assets/partners/institutions/trinity-college-london.png",
      alt: "Trinity College London logo, registered exam centre 70716",
      width: 420,
      height: 173,
    },
  },
  /* The Chinese Consulate-General in Melbourne and China Daily were listed
     here until 8 September 2026. Asked directly whether the two were still
     partners, the client answered "No, this is government institution.
     Please remove them" — a broadcaster and a newspaper that carried Mirror's
     work are not partners of Mirror, and listing a government body as one
     claims a relationship that does not exist.

     What they actually did is still on the site, in the place where it is a
     fact rather than a claim: Born to Fly and Brushstrokes of History still
     record where they were broadcast and screened, and the Belt & Road entry
     still records who hosts the competition. Those are events with dates.
     This list is about who Mirror works with. */
];

/* Grouped view, for server components that want all three at once. Anything
   that runs in the browser should import the three consts directly. */
export const PARTNERS: {
  media: Logo[];
  support: Logo[];
  institutions: Institution[];
} = {
  media: MEDIA_LOGOS,
  support: SUPPORT_LOGOS,
  institutions: INSTITUTIONS,
};
