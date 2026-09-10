/* Everything the enquiry form's <select> offers, plus an escape hatch. Shared
   by the form and the server action that validates it, so the options and the
   allow-list can never drift apart.

   This is a literal, not a derivation from lib/content/courses.ts. It looks
   tempting to write `CATALOGUE.map((c) => c.title)` instead — do not. The
   catalogue is a "use client" component's import
   (components/sections/find-us.tsx), and object properties do not tree-shake:
   deriving from it would pull the whole catalogue — every course body, alt
   string and poster path — into the client bundle just to fill a <select>
   that only ever reads a title.

   content.test.ts asserts this array equals the thirteen course titles, then
   the five adult programs, then "Not sure yet", so the three cannot drift
   apart silently even though they are no longer the same objects.

   The adult programs are here without having pages of their own. An adult
   asking about mat pilates needs a way to say what they are asking about, and
   "Not sure yet" is not it.

   "Not sure yet" is the escape hatch and is deliberately last. */
export const COURSES = [
  "Drama (Production)",
  "Musical Theatre (Production)",
  "English Speech (AMEB)",
  "Debating",
  "Bilingual Hosting",
  "Dubbing",
  "Vocal (AMEB)",
  "Instrument (AMEB)",
  "MV (Production)",
  "Choir",
  "Music Composition",
  "Dance",
  "Posture Training",
  "Adult Hosting",
  "Adult Public Speaking",
  "Adult Jazz Dance",
  "Adult Vocal",
  "Adult Mat Pilates",
  "Not sure yet",
] as const;
