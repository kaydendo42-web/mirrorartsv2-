/* Shared shapes for the content layer.

   Cross-links between modules are by slug, never by display name, so a
   rename cannot silently break a relationship. */

export type Slug = string;

/* "posture" is the Dance & Posture section. The id kept its old name through
   the 8 September revision on purpose: it is the anchor four nav items and
   the homepage cards link to (/courses#posture), and renaming an id to match
   a renamed heading buys nothing and breaks every one of them silently. */
export type DisciplineId =
  | "performance"
  | "language"
  | "music"
  | "posture"
  | "adult";

export type Asset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Meta = { label: string; value: string };
