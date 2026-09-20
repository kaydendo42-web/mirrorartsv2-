import type { Asset } from "./types.ts";

/* The client's "Achievements final" folder, uploaded to Google Drive on
 * 18 September 2026: the scans and photographs behind /stage#achievements.
 *
 * Four groups, as she sent them. AMEB and CEFA are the two examining bodies
 * the page already introduces; the competition certificates are grouped by
 * the event that issued them, because a certificate is only legible as one
 * of a set; the ceremony photographs are one loose gallery.
 *
 * Alt text describes the document — body, year, grade or award, category —
 * and never the child. Every certificate here carries a child's name in its
 * pixels, and the client supplied them for publication, but the words we
 * write around them are ours, and the consent gate in content.test.ts is the
 * reason no name is repeated. certificates.test.ts holds that line.
 *
 * Processing: EXIF orientation applied, longest edge 1600px, JPEG q85, from
 * the originals in Revision/Achievements final. Hashes of every source are
 * in docs/achievement-image-sources.json. */

const ROOT = "/assets/achievements";

const asset = (path: string, width: number, height: number, alt: string): Asset => ({
  src: `${ROOT}/${path}.jpg`,
  alt,
  width,
  height,
});

/* Seven practical examination reports and one framed certificate. The
   report that arrived as a PDF (V6202) is rasterised like the rest. One of
   the eight scans was a byte-for-byte repeat of the flute report and is not
   here twice. */
export const AMEB_DOCUMENTS: Asset[] = [
  asset("ameb/voice-communication-grade-3-2023", 1084, 1530,
    "AMEB practical examination report, Voice & Communication Grade 3, examined November 2023"),
  asset("ameb/speech-performance-grade-2-2024-a", 1008, 1600,
    "AMEB practical examination report, Speech & Performance Grade 2, examined October 2024"),
  asset("ameb/speech-performance-grade-2-2024-b", 1132, 1600,
    "AMEB practical examination report, Speech & Performance Grade 2, examined October 2024, second candidate"),
  asset("ameb/speech-performance-grade-3-2024", 1125, 1573,
    "AMEB practical examination report, Speech & Performance Grade 3, examined October 2024"),
  asset("ameb/flute-comprehensive-grade-2-2024", 1106, 1569,
    "AMEB practical examination report, Flute Comprehensive Grade 2, examined November 2024"),
  asset("ameb/practice-of-music-grade-1-certificate-2025", 1200, 1600,
    "Framed AMEB certificate, Practice of Music Grade 1 in Singing Repertoire, 2025"),
  asset("ameb/piano-comprehensive-grade-6-2026", 1109, 1556,
    "AMEB practical examination report, Piano Comprehensive Grade 6, examined May 2026"),
  asset("ameb/piano-video-repertoire-grade-2-2026", 1131, 1600,
    "AMEB practical examination report, Piano Video Repertoire Grade 2, examined September 2026"),
];

/* Eight Certificates of Social Arts Level Examination in Language Arts
   Performance, issued by the China Education Federation of the Arts. The
   same certificate eight times over is the point: it is what the
   examination centre issues. */
export const CEFA_CERTIFICATES: Asset[] = Array.from({ length: 8 }, (_, i) =>
  asset(`cefa/language-arts-performance-${String(i + 1).padStart(2, "0")}`, 750, 1050,
    `CEFA Certificate of Social Arts Level Examination in Language Arts Performance, certificate ${i + 1} of 8`),
);

export type Competition = {
  slug: string;
  title: string;
  /* A year, or a span written "2025–2026". */
  years: string;
  /* What the school's students entered, in the event's own category words. */
  categories: string;
  certificates: Asset[];
};

/* Ordered by how many certificates each event produced, so the shelf reads
   from the fullest pile to the thinnest. */
export const COMPETITIONS: Competition[] = [
  {
    slug: "boroondara-eisteddfod",
    title: "Boroondara Eisteddfod",
    years: "2025–2026",
    categories: "Contemporary vocal solo and musical theatre",
    certificates: [
      asset("competitions/boroondara-eisteddfod-2025-third-place-vocal-solo", 1104, 1512,
        "Boroondara Eisteddfod 2025 certificate, third place, contemporary vocal solo, 14 years and under"),
      asset("competitions/boroondara-eisteddfod-2025-honourable-mention-vocal-solo", 1200, 1600,
        "Boroondara Eisteddfod 2025 certificate, honourable mention, contemporary vocal solo, 14 years and under"),
      asset("competitions/boroondara-eisteddfod-2026-third-place-contemporary-vocal-solo", 1200, 1600,
        "Boroondara Eisteddfod 2026 certificate, third place, contemporary vocal solo, 10 years and under"),
      asset("competitions/boroondara-eisteddfod-2026-honourable-mention-contemporary-vocal-solo-a", 1200, 1600,
        "Boroondara Eisteddfod 2026 certificate, honourable mention, contemporary vocal solo, 10 years and under"),
      asset("competitions/boroondara-eisteddfod-2026-honourable-mention-contemporary-vocal-solo-b", 1200, 1600,
        "Boroondara Eisteddfod 2026 certificate, honourable mention, contemporary vocal solo, 10 years and under, second entrant"),
      asset("competitions/boroondara-eisteddfod-2026-honourable-mention-musical-theatre-a", 1200, 1600,
        "Boroondara Eisteddfod 2026 certificate, honourable mention, musical theatre, 10 years and under"),
      asset("competitions/boroondara-eisteddfod-2026-honourable-mention-musical-theatre-b", 1200, 1600,
        "Boroondara Eisteddfod 2026 certificate, honourable mention, musical theatre, 10 years and under, second entrant"),
    ],
  },
  {
    slug: "eisteddfod-by-the-bay",
    title: "Eisteddfod by the Bay",
    years: "2026",
    categories: "Junior vocal, solo and duo",
    certificates: [
      asset("competitions/eisteddfod-by-the-bay-2026-junior-vocal-second-prize", 1200, 1600,
        "Eisteddfod by the Bay 2026 certificate, junior vocal second prize, 8 years and under solo song of own choice"),
      asset("competitions/eisteddfod-by-the-bay-2026-junior-vocal-honourable-mention-duo", 1600, 1170,
        "Eisteddfod by the Bay 2026 certificate, junior vocal honourable mention, 14 years and under duo or trio"),
    ],
  },
  {
    slug: "youth-drama-speech-debate",
    title: "Australia International Youth Drama Speech & Debate Competition",
    years: "2026",
    categories: "Junior group",
    certificates: [
      asset("competitions/youth-drama-speech-debate-2026-first-prize-junior", 1536, 1024,
        "2026 Australia International Youth Drama Speech and Debate Competition certificate of achievement, first prize, junior group"),
      asset("competitions/youth-drama-speech-debate-2026-second-prize-junior", 1536, 1024,
        "2026 Australia International Youth Drama Speech and Debate Competition certificate of achievement, second prize, junior group"),
    ],
  },
  {
    slug: "water-cube-cup",
    title: "Cultures of China Water Cube Cup, Chinese Songs Contest",
    years: "2023–2024",
    categories: "Melbourne division, children's group",
    certificates: [
      asset("competitions/water-cube-cup-2023-certificate-of-award", 1200, 1600,
        "2023 Cultures of China Water Cube Cup Chinese Songs Contest certificate of award, Future Star, Melbourne division"),
      asset("competitions/water-cube-cup-2024-certificate-of-participation", 1200, 1600,
        "2024 Cultures of China Water Cube Cup Chinese Songs Contest certificate of participation, Melbourne division"),
    ],
  },
  {
    slug: "sound-of-music",
    title: "Sound of Music",
    years: "2024",
    categories: "Vocal, toddler group",
    certificates: [
      asset("competitions/sound-of-music-2024-first-prize-vocal-toddler", 1200, 1600,
        "Sound of Music 2024 certificate of award from the Australia-China International Music and Arts Association, first prize, vocal, toddler group"),
    ],
  },
];

/* Twenty-three photographs from the award ceremonies, in the order the
   client's folder sorted them. Alt text says what the frame shows; it does
   not say who won what, because the certificates already do. */
export const CEREMONY_PHOTOS: Asset[] = [
  [1600, 1066, "Students on stage under an Excellence Award screen at a competition ceremony"],
  [1600, 1066, "Award recipients lined up across the stage with the adjudicators after the ceremony"],
  [1200, 1600, "A student in a gold gown holding her certificate and medal in the foyer"],
  [1600, 1200, "Three students holding certificates beside their teachers on a piano recital stage"],
  [1440, 960, "The full field of winners with certificates on the stage of a heritage hall"],
  [1440, 960, "A third prize certificate beside two medals in their presentation box"],
  [1199, 1600, "A student holding her certificate beside the Eisteddfod by the Bay banner"],
  [1054, 1600, "Two students with certificates beside an adjudicator after the results"],
  [1200, 1600, "A student holding her certificate at the Kingston Arts chamber door during Eisteddfod by the Bay"],
  [1600, 1200, "Students waiting to perform beside the piano at an eisteddfod session"],
  [1440, 960, "Speech and debate competitors lined up with certificates on a school hall stage"],
  [1440, 960, "A second group of speech and debate competitors with certificates and medals"],
  [1440, 960, "Students with certificates and trophies beside their adjudicator on stage"],
  [1440, 960, "Competitors on stage at the speech and debate results with the adjudicator at the lectern"],
  [1440, 960, "The competitors and their teachers gathered under a Congrats screen"],
  [1440, 960, "Two trophies, a certificate and medals laid out on the awards table"],
  [1600, 1200, "Students on stage during the results announcement at an eisteddfod"],
  [1200, 1600, "Students celebrating with certificates and their teacher on a red-curtained stage"],
  [1200, 1600, "Three students holding certificates in front of the Boroondara Eisteddfod screen"],
  [1131, 848, "A student with his certificate between two adjudicators at Eisteddfod by the Bay"],
  [1199, 1600, "A student holding his certificate and medal beside the Eisteddfod by the Bay banner"],
  [1199, 1600, "Students and the adjudicator on stage as the results are read"],
  [1199, 1600, "A student holding her certificate with a medal around her neck backstage"],
].map(([width, height, alt], i) =>
  asset(`ceremonies/ceremony-${String(i + 1).padStart(2, "0")}`, width as number, height as number, alt as string),
);

export function allCertificateAssets(): Asset[] {
  return [
    ...AMEB_DOCUMENTS,
    ...CEFA_CERTIFICATES,
    ...COMPETITIONS.flatMap((c) => c.certificates),
    ...CEREMONY_PHOTOS,
  ];
}
