import type { Asset, DisciplineId, Meta, Slug } from "./types.ts";

/* The thirteen courses.
 *
 * Rewritten wholesale on 8 September 2026 from the client's second revision
 * (Revision - Daisy and Rachel/Revision Part 2/Courses/Courese.pdf, 38 numbered
 * items against screenshots of the built pages). Almost every string below is
 * theirs. What changed:
 *
 *   - Two courses were renamed. Voice-over is Dubbing; Posture & etiquette is
 *     Posture Training. English drama is Drama (Production) and is 120 minutes
 *     over twenty sessions, not 90 over ten.
 *   - Four are new: Debating, Instrument (AMEB), MV (Production) and Dance.
 *   - The two production courses run twenty sessions across two terms and end
 *     on a professional stage; that is the whole shape of the Performance Arts
 *     section now.
 *   - Dubbing and MV are holiday programs, not term courses, so they carry no
 *     session count. Instrument is 30 or 45 minutes and carries none either.
 *     Neither is a gap in the data: a camp does not have a term length.
 *
 * The original copy was written out of ~1 MB Chinese poster images on the old
 * site, and the note that used to stand here explaining that is in git. The
 * posters are still recorded on the nine courses that had one — `poster` is
 * kept as a record — but nothing renders them any more. The client asked for
 * the "How this course was published before" section to come out (items 14
 * and 20).
 *
 * Nothing here is invented. There is still no published pricing and no
 * timetable anywhere in the source material, so neither appears;
 * content.test.ts fails the build if a dollar figure or a weekday shows up. */

export type Course = {
  slug: string;
  title: string;
  cn: string;
  /* The one-line promise. Runs as the hero standfirst. */
  strapline: string;
  /* The shorter line the client wrote for the course lists, where one exists.
     Four of the Language & Expression courses have both — a full sentence on
     the page and a phrase in the list — and collapsing them to one would
     throw away whichever the client wrote second. Falls back to strapline. */
  summary?: string;
  discipline: DisciplineId;
  /* Absent on the two holiday programs. A pair on Instrument, which runs at
     either length. */
  minutes?: number | [number, number];
  /* Ten for a term course, twenty for the two production courses that run
     across both terms. Absent where the client states no term length. */
  sessionsPerTerm?: number;
  minAge?: number;
  /* Only ever set on a course the school caps. Bilingual hosting was the one
     and the client removed its cap on 8 September (item 21); the field stays
     because a capped class is a real thing this school sells. */
  maxStudents?: number;
  /* A holiday camp rather than a term class. */
  holiday?: { days?: number };
  /* Music Composition is the only course with an entry requirement. */
  entry?: string;
  /* From the client's poster system. Used for the rule under the heading and
     nothing larger — gold and the accents are type-scale colours here. */
  accent: string;
  /* A heading over the body copy, where the client wrote one. */
  lede?: string;
  /* Body copy, one string per paragraph. */
  body: string[];
  /* What a term actually contains. Rendered column-major, so the array reads
     down the left column and then down the right — which is how the client
     wrote every one of these lists ("Left: … Right: …"). */
  includes: string[];
  /* "A term contains" unless the course says otherwise. The two production
     courses say "20-week program", because they do not run in one. */
  includesLabel?: string;
  /* The pair of claims. On most courses these are now the two terms, in
     order, which is why they can carry a label. */
  highlights?: [string, string];
  highlightsLabel?: string;
  /* Named parts of a course that are not a term breakdown: the three dance
     styles, and the two halves of Posture Training. Each is a name and a
     sentence, which is more than a list item and less than a course. */
  strands?: { name: string; blurb: string; minutes?: number }[];
  /* Faculty slugs. Cross-linked by slug so a rename cannot break it. Every
     assignment below is the teacher's own card in `Revision - Daisy and
     Rachel/Faculty/` — the subject line printed down its right edge, matched
     to the course of that name. Debating, Instrument and MV (Production) are
     still empty: no card claims any of the three, and a name is not a thing
     to guess at. */
  teachers: Slug[];
  /* Where the course leads. Either an exam pathway or a production. */
  leadsTo?: { label: string; href: string };
  /* The client's original Chinese poster, where the course had one. Kept as a
     record; no page renders it. */
  poster?: Asset;
  /* Absent on Debating, which is new and has no photograph yet. */
  hero?: Asset;
  /* Photographs from the class itself. The client asked for one of these
     under five courses (items 8, 13, 19, 26, 32) and has not supplied the
     footage; the section renders only where there is something real to put
     in it. */
  gallery?: Asset[];
};

export const COURSES: Course[] = [
  /* ------------------------------------------------ performance arts ---- */

  {
    slug: "drama",
    title: "Drama (Production)",
    cn: "英文戏剧课",
    strapline: "Develop confidence, creativity, and authentic stage presence",
    discipline: "performance",
    minutes: 120,
    sessionsPerTerm: 20,
    minAge: 5,
    accent: "#3E7CB1",
    body: [
      "Led by Trinity-certified drama teachers, AMEB examiners, experienced theatre directors, and former Heads of Drama from leading private schools, our Drama program provides structured actor training in improvisation, character development, script and scene work, voice, movement and stagecraft.",
      "Students learn to build believable characters, understand motivation, work with scripts and respond naturally on stage. Through drama games, table reads, ensemble work and scene rehearsals, they develop strong acting technique, creativity and confidence.",
      "Twice a year, students take their training from the classroom to the professional stage, rehearsing and performing in a full-scale theatre production. From auditions and casting to rehearsals and live performance, they experience the complete process of bringing a production to life.",
      "The program also supports preparation for AMEB and Trinity Drama examinations, while developing communication, collaboration, confidence and creative independence.",
    ],
    includesLabel: "20-week program",
    includes: [
      "Drama games & improvisation",
      "Voice, movement & stage presence",
      "Character development",
      "Script, scene & acting techniques",
      "Rehearsal & ensemble work",
      "Full-scale theatre production",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Acting, Improvisation & Character Development",
      "Professional Productions, Performance & Examinations",
    ],
    teachers: ["delyse-weisz", "zoe-sun"],
    leadsTo: { label: "Exams and achievements", href: "/stage#achievements" },
    poster: {
      src: "/assets/courses/posters/english-drama.jpg",
      alt: "The original Chinese course poster for English drama",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/cards/performance.jpg",
      alt: "Students in animal costume and face paint in the annual production of The Jungle Book",
      width: 1160,
      height: 870,
    },
  },

  {
    slug: "musical-theatre",
    title: "Musical Theatre (Production)",
    cn: "音乐剧课",
    strapline: "Training for real musical theatre productions",
    discipline: "performance",
    minutes: 90,
    sessionsPerTerm: 20,
    minAge: 4,
    accent: "#3E7CB1",
    body: [
      "Our 20-week Musical Theatre program provides comprehensive training in singing, acting and movement through 90-minute weekly classes.",
      "Led by professional musical theatre performers actively working in Australia, students develop vocal technique, character, choreography, stage movement and ensemble skills while rehearsing a complete production.",
      "The program culminates in a fully staged production in a professional theatre, giving students the experience of performing for a live audience on a real stage.",
    ],
    includesLabel: "20-week program",
    includes: [
      "Vocal & song work",
      "Acting through song",
      "Blocking & stage movement",
      "Character & scene work",
      "Ensemble rehearsal",
      "End-of-term showcase",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Singing, Acting & Movement — Trained Together",
      "20 Weeks of Training. One Real Theatre Production.",
    ],
    teachers: ["anthony-pontonio", "zoe-sun", "toni-cao"],
    leadsTo: { label: "The Jungle Book", href: "/stage/jungle-book" },
    poster: {
      src: "/assets/courses/posters/musical-theatre.jpg",
      alt: "The original Chinese course poster for musical theatre",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/musical-theatre-finale.jpg",
      alt: "Around fifteen children in bright summer clothes on a theatre stage, arms lifted in the closing pose of a musical-theatre number under blue and magenta light",
      width: 1448,
      height: 897,
    },
  },

  /* -------------------------------------------- language & expression ---- */

  {
    slug: "english-speech",
    title: "English Speech (AMEB)",
    cn: "英文演讲课",
    strapline: "Building confident, articulate and expressive speakers",
    discipline: "language",
    minutes: 60,
    sessionsPerTerm: 10,
    minAge: 6,
    accent: "#D9633B",
    body: [
      "Our Speech program covers four core areas: public speaking, storytelling, monologue and poetry performance. Training follows the syllabus and assessment standards of both AMEB and Trinity College London, developing confident, articulate and expressive speakers through structured, progressive learning.",
      "Students build skills in speech writing, storytelling, character interpretation, vocal technique, diction, stage presence and physical expression. Classes are led by an experienced VCE Speech & Drama examiner, with a strong focus on both examination preparation and performance development.",
      "Throughout the year, students have opportunities to work towards AMEB and Trinity examinations, participate in speech and drama competitions, and perform in a Showcase every term — building real stage experience alongside recognised qualifications.",
    ],
    includes: [
      "Public speaking & topic discussion",
      "Storytelling & character interpretation",
      "Monologue & poetry performance",
      "Speech writing & structure",
      "Voice, diction & physical delivery",
      "AMEB & Trinity exam preparation",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Speech Technique, Storytelling & Performance",
      "Exam Preparation, Competitions & Term Showcases",
    ],
    teachers: ["delyse-weisz"],
    leadsTo: { label: "Exams and achievements", href: "/stage#achievements" },
    poster: {
      src: "/assets/courses/posters/english-speech.jpg",
      alt: "The original Chinese course poster for English speech",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/speech-competition.jpg",
      alt: "A student speaking at the microphone on a school stage, the screen behind him titled Public Speaking above the senior age group",
      width: 1448,
      height: 965,
    },
  },

  {
    slug: "debating",
    title: "Debating",
    cn: "辩论课",
    strapline:
      "Building persuasive arguments, critical thinking and confident delivery",
    discipline: "language",
    minutes: 60,
    sessionsPerTerm: 10,
    accent: "#D9633B",
    body: [
      "Debating develops critical thinking, persuasive communication and the confidence to speak under pressure. Our small-group classes focus on argument structure, evidence, rebuttal, questioning and strategic thinking.",
      "Students learn through hands-on debate practice, taking on different roles, responding to opposing arguments and participating in regular mock debates. The small-group format ensures every student has the opportunity to speak, challenge ideas and receive individual feedback.",
      "Through collaborations with university debating clubs, students gain exposure to experienced debaters, workshops and real debating environments, with opportunities to participate in debate competitions and practical events throughout the year.",
    ],
    includes: [
      "Argument structure",
      "Evidence and rebuttal",
      "Questioning and strategic thinking",
      "Mock debates, and speaking to a role",
      "University debating club workshops",
      "Debate competitions and practical events",
    ],
    highlights: [
      "Small-group training & hands-on debate practice",
      "University club collaborations & competitions",
    ],
    teachers: [],
  },

  {
    slug: "bilingual-hosting",
    title: "Bilingual Hosting",
    cn: "双语主持课",
    strapline:
      "Professional bilingual hosting training in English and Mandarin, building confident voices and strong stage presence",
    summary:
      "Developing stage presence, bilingual presentation and hosting skills",
    discipline: "language",
    minutes: 60,
    sessionsPerTerm: 10,
    minAge: 6,
    accent: "#D9633B",
    body: [
      "Small-group training gives every student regular microphone and stage time. Students develop bilingual hosting, poetry recitation, interviewing and live presentation skills.",
      "Through partnerships with schools and organisations, students gain opportunities to host real events on professional stages and participate in English interview-style programs, developing both live and on-camera presenting experience.",
    ],
    includes: [
      "Bilingual hosting & presentation",
      "Script reading & writing",
      "CEFA grade preparation",
      "MC techniques & stage presence",
      "Microphone & on-camera skills",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Professional Hosting on Real Stages",
      "Interviewing & On-Camera Presentation",
    ],
    teachers: ["diana-zhao"],
    leadsTo: { label: "Exams and achievements", href: "/stage#achievements" },
    poster: {
      src: "/assets/courses/posters/bilingual-hosting.jpg",
      alt: "The original Chinese course poster for bilingual hosting",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/gala-hosting.jpg",
      alt: "Five children beside their host on the gala stage: the girls in blue, white tulle and pink hold microphones, the boy in a black suit and the girl in a white dress do not",
      width: 1248,
      height: 748,
    },
  },

  {
    slug: "dubbing",
    title: "Dubbing",
    cn: "配音课",
    strapline:
      "Our most popular holiday program, bringing famous animated characters to life through professional dubbing in a real recording studio",
    summary:
      "A signature holiday program featuring cartoon & animation dubbing",
    discipline: "language",
    holiday: { days: 5 },
    minAge: 5,
    accent: "#D9633B",
    body: [
      "Dubbing combines vocal performance, character work and imagination. Students explore animation, film and a variety of character styles while developing vocal expression, pronunciation, timing, emotion and microphone technique.",
      "Through practical dubbing exercises, students learn to match their voice to a character's personality, movement and emotion. They progress from recreating existing characters to developing their own vocal interpretations, building confidence and expressive performance skills.",
      "Training takes place in a professional recording studio, giving students hands-on experience with scripts, microphones and real recording equipment. Students complete their own recorded dubbing pieces and experience the full process from rehearsal to final recording.",
    ],
    includesLabel: "The camp contains",
    includes: [
      "Vocal expression and pronunciation",
      "Timing, emotion and character work",
      "Microphone technique",
      "Animation and film material",
      "Original vocal interpretations",
      "Studio recording, rehearsal to final take",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Professional studio practice, from rehearsal to recording",
      "Character voices, emotion and expressive performance",
    ],
    teachers: ["diana-zhao", "anthony-pontonio"],
    poster: {
      src: "/assets/courses/posters/voice-over.jpg",
      alt: "The original Chinese course poster for voice-over, the course Dubbing was renamed from",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/dubbing-studio.jpg",
      alt: "Four children reading from scripts at a studio microphone while their teacher directs, an animated film playing on the screen beside them",
      width: 1448,
      height: 807,
    },
  },

  /* -------------------------------------------------- music & vocal ---- */

  {
    slug: "vocal",
    title: "Vocal (AMEB)",
    cn: "声乐课",
    strapline:
      "Professional vocal training combining technique, performance and AMEB exam preparation",
    summary:
      "Professional vocal training in technique, musicianship and performance, with AMEB exam preparation available",
    discipline: "music",
    minutes: 60,
    sessionsPerTerm: 10,
    minAge: 4,
    accent: "#4F8A5B",
    lede: "Professional Vocal Training, From Technique to Stage",
    body: [
      "Our Vocal Program is led by professionally trained teachers from leading music conservatories and universities, specialising in Vocal Performance and Music Education. Training covers voice production, breathing, aural skills, sight-singing and repertoire in both English and Chinese.",
      "Students can choose between two pathways: a Vocal Performance Program for students who enjoy singing and performing, and a structured AMEB Vocal Exam Preparation Program with syllabus-based training and dedicated pre-exam coaching.",
      "Performance is an essential part of the program. Every term concludes with a Showcase, while students also have opportunities to perform at concerts, community events and major year-end productions. Studio recording and MV production are also incorporated into selected programs, giving students experience both on stage and in the studio.",
    ],
    includes: [
      "Singing and vocal training",
      "Voice production and breathing",
      "Aural training and sight-singing",
      "Repertoire in Chinese and English",
      "Stage performance and microphone skills",
      "Showcase and live performance",
      "AMEB vocal exam preparation, as a separate program",
    ],
    highlightsLabel: "Two terms",
    highlights: [
      "Professional Vocal Faculty & AMEB Training",
      "Term Showcases, Studio Recording & Live Performance",
    ],
    teachers: ["becky-li", "shanshan", "joyce-wu", "toni-cao"],
    leadsTo: { label: "Exams and achievements", href: "/stage#achievements" },
    poster: {
      src: "/assets/courses/posters/vocal.jpg",
      alt: "The original Chinese course poster for vocal performance and AMEB grades",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/vocal-recital.jpg",
      alt: "A girl singing at the microphone on a concert stage, her accompanist at a grand piano behind her",
      width: 1448,
      height: 965,
    },
  },

  {
    slug: "instrument",
    title: "Instrument (AMEB)",
    cn: "器乐课",
    strapline:
      "Individual instrumental lessons developing technique, musicianship and confident performance skills",
    discipline: "music",
    minutes: [30, 45],
    accent: "#4F8A5B",
    lede: "Piano · Flute · Cello",
    body: [
      "Our Instrument Training program provides structured, individualised instruction in piano, flute and cello, building strong foundations in technique, music reading, rhythm, tone and musical expression.",
      "Students can learn for enjoyment or follow a structured AMEB examination pathway, with performance preparation, exam guidance and regular opportunities to perform in Showcases and professional concert settings.",
    ],
    includes: [],
    highlightsLabel: "Two terms",
    highlights: [
      "Individualised Learning & AMEB Preparation",
      "From Lessons to the Stage",
    ],
    teachers: [],
    leadsTo: { label: "Exams and achievements", href: "/stage#achievements" },
    hero: {
      src: "/assets/courses/instrument-recital.jpg",
      alt: "A pianist alone at a grand piano on a concert-hall stage, the audience silhouetted in the foreground",
      width: 1448,
      height: 1040,
    },
  },

  {
    slug: "mv-production",
    title: "MV (Production)",
    cn: "MV 制作课",
    strapline:
      "A complete music video experience combining professional recording, performance coaching and on-camera filming",
    discipline: "music",
    holiday: {},
    accent: "#4F8A5B",
    body: [
      "Students receive structured training in singing, vocal technique and performance, developing musical expression, confidence and on-camera skills. Through rehearsals and performance coaching, they learn how to bring a song to life both vocally and visually.",
      "Students then enter a professional recording studio to record their vocals, followed by a professional video shoot. With professional recording, filming and post-production, the program takes students through the complete production process and finishes with their own completed music video (MV).",
    ],
    includes: [],
    highlightsLabel: "Two terms",
    highlights: [
      "Professional Studio Recording & Filming",
      "From Training to a Finished MV",
    ],
    teachers: [],
    leadsTo: { label: "Born to Fly", href: "/stage/born-to-fly" },
    hero: {
      src: "/assets/courses/mv-recording.jpg",
      alt: "Eight children in Mirror T-shirts singing together in the recording studio, a large microphone in the foreground and acoustic panelling behind them",
      width: 1448,
      height: 813,
    },
  },

  {
    slug: "choir",
    title: "Choir",
    cn: "合唱团",
    strapline:
      "Ensemble vocal training focusing on harmony, part singing, musicality and stage performance",
    discipline: "music",
    minutes: 120,
    sessionsPerTerm: 10,
    minAge: 6,
    accent: "#4F8A5B",
    body: [
      "The class runs two hours: vocal technique, breath and resonance training, multi-part harmony, and pitch and rhythm work, built around a repertoire of Chinese and English pieces chosen for children's voices.",
      "The course also trains aesthetic sense, rhythm and physical coordination, and builds the group into an ensemble that creates and performs together — holding one line while three others sound around it.",
      "The Mirror choir is the school's official performing group. Members represent Mirror at cultural exchange events and large public performances, and record on the studio's original music videos, each one a record of the choir's own progress.",
    ],
    includes: [
      "Part-singing & section training",
      "Harmony and ensemble singing",
      "Pitch, rhythm and sight-singing",
      "Breath control and vocal blending",
      "Choral repertoire",
      "Stage performance and concert preparation",
    ],
    highlights: [
      "Part-singing, and what it does to stage presence",
      "Representing Mirror at large performances and arts events",
    ],
    teachers: ["joyce-wu"],
    leadsTo: { label: "Born to Fly", href: "/stage/born-to-fly" },
    poster: {
      src: "/assets/courses/posters/choir.jpg",
      alt: "The original Chinese course poster for the choir",
      width: 860,
      height: 1217,
    },
    hero: {
      /* Replaces /assets/stage/choir-performance.jpg, which is the same choir
         at a different event. The client picked this frame (item 32). Its
         bottom edge carries the photographer's credit, burned in at the
         source — see scripts/import-course-photos.mjs. */
      src: "/assets/courses/choir-gala.jpg",
      alt: "The Mirror choir in yellow polo shirts singing on the gala stage, their conductor's raised hand at the edge of the frame",
      width: 1448,
      height: 966,
    },
  },

  {
    slug: "music-composition",
    title: "Music Composition",
    cn: "音乐创作课",
    strapline:
      "Creative composition training in melody, harmony, structure and original music development",
    discipline: "music",
    minutes: 60,
    sessionsPerTerm: 10,
    entry: "AMEB Grade 5 or above in at least one instrument, or equivalent",
    accent: "#4F8A5B",
    body: [
      "Music composition combines imagination, musical thinking and sound expression. Students develop theory, rhythm, melody and harmony while learning to turn ideas into structured, original compositions.",
      "The course takes students from an initial musical idea to a completed original piece, building creativity, aural skills and musical literacy along the way. Selected works can also be professionally recorded and produced into a finished music video (MV).",
    ],
    includes: [
      "Music theory, rhythm and pitch",
      "Melody writing",
      "Harmony and structure",
      "Improvised idea to finished piece",
      "Collaborative writing",
      "An original piece presented at the end of term",
    ],
    highlights: [
      "From Music Theory to an Original Composition",
      "From an Original Piece to a Finished Music Video",
    ],
    teachers: ["joshua-dai"],
    leadsTo: { label: "Born to Fly", href: "/stage/born-to-fly" },
    poster: {
      src: "/assets/courses/posters/music-composition.jpg",
      alt: "The original Chinese course poster for music composition",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/composition-class.jpg",
      alt: "A songwriting class: two students at a stage piano and keyboard at the front of the room, the rest watching from tables, with melody, lyrics, chords, structure and expression listed on the whiteboard",
      width: 1448,
      height: 965,
    },
  },

  /* -------------------------------------------------- dance & posture ---- */

  {
    slug: "dance",
    title: "Dance",
    cn: "舞蹈课",
    strapline: "Technique, rhythm, movement and performance",
    discipline: "posture",
    minutes: 90,
    accent: "#7A5A9E",
    body: [
      "Dance runs in three styles, each ninety minutes and each built on the same foundation: technique, rhythm, movement and performance. Students train for the stage from the first class, and the styles share a term so a dancer can move between them.",
    ],
    strands: [
      {
        name: "Hip Hop",
        minutes: 90,
        blurb:
          "High-energy training in rhythm, grooves and dynamic choreography, building confidence and stage presence.",
      },
      {
        name: "K-pop",
        minutes: 90,
        blurb:
          "Learn popular K-pop choreography with a focus on coordination, musicality and performance skills.",
      },
      {
        name: "Chinese Dance",
        minutes: 90,
        blurb:
          "Develop flexibility, posture and graceful movement through structured Chinese dance training.",
      },
    ],
    includes: [],
    teachers: ["rachel-cai"],
    hero: {
      src: "/assets/courses/dance-hip-hop.jpg",
      alt: "Five children in red and black streetwear mid-pose on a smoke-lit stage under the Mirror backdrop",
      width: 1448,
      height: 815,
    },
  },

  {
    slug: "posture-training",
    title: "Posture Training",
    cn: "形体课",
    strapline:
      "Body alignment, balance, walking, standing and confident presentation",
    discipline: "posture",
    minutes: 90,
    sessionsPerTerm: 10,
    minAge: 6,
    accent: "#7A5A9E",
    body: [
      "Adolescence is a critical stage of physical development, when rapid growth and everyday habits can contribute to concerns such as forward head posture, rounded shoulders and poor body alignment. Our Posture Training program combines professional alignment exercises, core strengthening, flexibility and body-awareness training to help children develop healthy posture, balanced movement and confident physical presence throughout their growing years.",
    ],
    strands: [
      {
        name: "Posture & Alignment",
        blurb:
          "Targeted training to improve everyday posture, shoulder and spinal alignment, core stability and body control.",
      },
      {
        name: "Confidence & Presence",
        blurb:
          "Develop graceful movement, stronger body awareness and confident presentation for everyday life and the stage.",
      },
    ],
    includes: [
      "Alignment and core strengthening",
      "Flexibility and body awareness",
      "Standing, sitting and walking",
      "Stage bearing and presentation",
    ],
    teachers: ["rachel-cai"],
    poster: {
      src: "/assets/courses/posters/posture.jpg",
      alt: "The original Chinese course poster for posture and etiquette",
      width: 860,
      height: 1217,
    },
    hero: {
      src: "/assets/courses/posture-class.jpg",
      alt: "A posture class working with weighted bars across the shoulders, facing the mirrored wall of the Surrey Hills studio",
      width: 1295,
      height: 1214,
    },
  },
];

/* The facts strip under a course heading, and the same facts one line long in
   the course lists. One function so the hero and the list cannot disagree
   about how long a class is — which they did, on the homepage, for a month. */
export function courseFacts(c: Course): Meta[] {
  const facts: Meta[] = [];

  if (c.holiday) {
    facts.push({ label: "Runs", value: "Holiday program" });
    if (c.holiday.days) {
      facts.push({ label: "Length", value: `${c.holiday.days}-day camp` });
    }
  }

  if (c.minutes !== undefined) {
    facts.push({
      label: "Each class",
      value: Array.isArray(c.minutes)
        ? `${c.minutes[0]} or ${c.minutes[1]} minutes`
        : `${c.minutes} minutes`,
    });
  }

  if (c.sessionsPerTerm !== undefined) {
    facts.push({ label: "Term", value: `${c.sessionsPerTerm} sessions` });
  }

  if (c.minAge !== undefined) {
    facts.push({ label: "Ages", value: `${c.minAge} and up` });
  }

  if (c.maxStudents !== undefined) {
    facts.push({ label: "Class size", value: `${c.maxStudents} maximum` });
  }

  if (c.entry) {
    facts.push({ label: "Entry", value: c.entry });
  }

  return facts;
}

/* Deliberately not courseFacts().map(f => f.value).join(" · ") — the entry
   requirement is a clause, not a chip, and it makes the row two lines long
   in a list of one-line rows. It belongs on the page, not in the index. */
export function courseFactLine(c: Course): string {
  return courseFacts(c)
    .filter((f) => f.label !== "Entry")
    .map((f) => f.value)
    .join(" · ");
}

/* The youngest age any course admits. Derived, because the number moved on
   8 September 2026 — Musical Theatre and Vocal take four-year-olds now, and
   the site had "children aged 6+" written into its own meta description and
   into its organisation record. Two places nobody re-reads, both wrong the
   moment the client changed one course. */
export const YOUNGEST_AGE = Math.min(
  ...COURSES.flatMap((c) => (c.minAge === undefined ? [] : [c.minAge])),
);

export function getCourse(slug: string): Course {
  const found = COURSES.find((c) => c.slug === slug);
  if (!found) throw new Error(`unknown course: ${slug}`);
  return found;
}

export function coursesByDiscipline(id: DisciplineId): Course[] {
  return COURSES.filter((c) => c.discipline === id);
}

export function courseSlugs(): string[] {
  return COURSES.map((c) => c.slug);
}
