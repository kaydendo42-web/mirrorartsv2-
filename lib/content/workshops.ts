import type { Asset } from "./types.ts";

/** Daisy's workshop1.pdf (12 September 2026) supersedes the old catalogue.
 * Delivery formats and activities are separate. Older age limits and inferred
 * equipment claims are not evidence for the revised offers.
 * Source: ../../../Revision/workshop1.pdf, overview p1, features pp2–6. */
export type WorkshopActivity = { title: string; popular?: boolean };

export const INCURSION_PERFORMANCE: WorkshopActivity[] = [
  { title: "Traditional Chinese Music" },
  { title: "Chinese Martial Arts" },
  { title: "Dragon and Lion Dance" },
  { title: "Traditional Chinese Dance" },
  { title: "Drama", popular: true },
  { title: "Puppet Show" },
  { title: "Storytelling & Picture Book Reading" },
];
export const INCURSION_CRAFT: WorkshopActivity[] = [
  { title: "Lacquer Fan Making", popular: true },
  { title: "Tie-dye", popular: true },
  { title: "Chinese Lacquer Beads" },
  { title: "Sachet Making" },
  { title: "Eco-friendly Paper" },
  { title: "Chinese Incense" },
  { title: "Traditional Soap", popular: true },
  { title: "Perfume Making" },
];
export const EXCURSION_EXPERIENCES = [
  { title: "Performance experiences", detail: "Music, dance, martial arts and drama." },
  { title: "Craft workshops", detail: "Tie-dye, lacquer fans, soap making and more." },
  { title: "Interactive hands-on activities", detail: "An immersive cultural experience at our venue." },
  { title: "A program shaped around your group", detail: "Flexible program length and activity combinations." },
];
export const PARTY_OPTIONS: {
  id: string; title: string; description: string;
  activities: WorkshopActivity[]; notes: string[];
}[] = [
  {
    id: "adult-parties", title: "Adult parties",
    description: "Create, connect and relax with friends, colleagues and private groups.",
    activities: [
      { title: "Aromatic Candle Making" },
      { title: "Natural Soap Making", popular: true },
      { title: "Baking Workshop", popular: true },
      { title: "Perfume Making" },
    ],
    notes: ["No alcohol", "Events finish by 8:30 pm"],
  },
  {
    id: "birthday-parties", title: "Birthday parties",
    description: "Fun, creative cultural experiences customised for children’s birthday parties.",
    activities: [
      { title: "Aromatic Candle Making" },
      { title: "Natural Soap Making", popular: true },
      { title: "Baking Workshop", popular: true },
    ],
    notes: ["Suitable for all ages"],
  },
];
export const WORKSHOP_FEATURES: {
  id: string; title: string; description: string; highlights: string[]; image: Asset;
}[] = [
  {
    id: "drama", title: "Drama incursion",
    description: "Interactive drama experiences that inspire creativity, build confidence and bring stories to life at your school. Students find their voice, create characters and discover a role for everyone.",
    highlights: ["Confidence", "Communication", "Creativity", "Inclusion"],
    image: { src: "/assets/workshops/drama-incursion.jpg", width: 1536, height: 1024, alt: "Drama workshop poster showing students acting, creating characters and performing together." },
  },
  {
    id: "chinese-performing-arts", title: "Chinese performing arts",
    description: "Music, dance and martial arts bring the beauty, discipline and spirit of Chinese arts to your school. Live demonstrations and hands-on opportunities introduce Chinese instruments, traditional dance and martial arts.",
    highlights: ["Chinese instruments", "Chinese dance", "Chinese martial arts"],
    image: { src: "/assets/workshops/chinese-performing-arts.jpg", width: 1536, height: 1024, alt: "Chinese performing arts workshop poster with traditional musicians, a dancer and a martial artist." },
  },
  {
    id: "lacquer-fans", title: "Lacquer fan making",
    description: "Explore traditional Chinese art through flowing colour and hands-on creation. Make a personal fan to take home as a keepsake.",
    highlights: ["Traditional culture", "Hands-on creation", "A beautiful keepsake"],
    image: { src: "/assets/workshops/lacquer-fan-making.jpg", width: 1536, height: 1024, alt: "Lacquer fan workshop poster showing colourful marbled fans and children making their own designs." },
  },
  {
    id: "soap-making", title: "Natural soap making",
    description: "Mix, mould and create with natural ingredients. A hands-on workshop with a handmade keepsake to take home.",
    highlights: ["Natural ingredients", "Hands-on creation", "A beautiful keepsake"],
    image: { src: "/assets/workshops/natural-soap-making.jpg", width: 1536, height: 1024, alt: "Natural soap workshop poster showing children pouring floral soaps into moulds and finished handmade soaps." },
  },
  {
    id: "perfume-making", title: "Perfume making",
    description: "Create your own signature scent with natural essential oils. Explore fragrance, blend your creation and take home a unique keepsake.",
    highlights: ["Natural ingredients", "Your signature scent", "A unique keepsake"],
    image: { src: "/assets/workshops/perfume-making.jpg", width: 1536, height: 1024, alt: "Perfume workshop poster showing participants exploring fragrances and essential oils." },
  },
];
