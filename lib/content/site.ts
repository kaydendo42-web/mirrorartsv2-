/* Contact details, campuses and social accounts.

   Every one of these appears in the footer, on /contact, and inside JSON-LD.
   They are declared once here.

   The public address changed to workshop@mirrorartsedu.com on 20 September
   2026 at Kayden's instruction, the day the enquiry form started sending
   there (lib/enquiry-mail.ts). One inbox for everything the site produces,
   rather than a printed address and a form address that differ. It was
   info@mirrorartsedu.com from the first build until then.

   The studio-hire poster prints a third address, under a domain the
   business doesn't own. That's treated as an error on the poster, not a
   valid address. See docs/superpowers/specs/2026-08-07-inner-pages-design.md,
   "Decisions taken" → Contact address, for the wrong string and the
   reasoning; it's deliberately not repeated here. */

export type CampusId = "surrey-hills" | "glen-waverley";

export type Weekday =
  | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

/* One row of a timetable-style hours list: the days it covers and a
   24-hour open/close pair, "HH:MM". This is the shape schema.org's
   OpeningHoursSpecification takes, so lib/schema.ts emits it without
   translation, and formatHours() below turns it into the sentence the
   page prints. */
export type OpeningHours = { days: Weekday[]; opens: string; closes: string };

export type Campus = {
  id: CampusId;
  name: string;
  cn: string;
  address: string;
  suburb: string;
  state: "VIC";
  postcode: string;
  /* Must be the www.google.com/maps/embed?pb=… form. The
     maps.google.com/maps?q=…&output=embed form 301s, and that redirect
     carries X-Frame-Options: SAMEORIGIN, which kills the frame silently.

     Derived with the exact formula already live in
     components/sections/find-us.tsx (embedUrl()): pb is Google's packed
     parameter format, `!1m3!2m1!1s<address, space→+, url-encoded>!6i15`, run
     against this campus's own verbatim address. Not a hand-typed blob. */
  mapEmbed: string;
  /* The pin Google's own embed drops for the address above, read off the
     mapEmbed response on 22 September 2026 and cross-checked against
     Nominatim (OpenStreetMap), which put both within about twelve metres.
     Six decimal places is roughly a tenth of a metre; more would be
     pretending. These go into GeoCoordinates in the JSON-LD and nowhere
     visible. */
  geo: { lat: number; lng: number };
  /* The three fields below are the client's to fill (docs/SEO-ROUND-2-PICKUP.md,
     "Ask Daisy now"). Each is optional and the campus page renders nothing
     for an absent one — no "hours to be confirmed" placeholder, because a
     placeholder is a claim that the site knows something it does not.
       hours     — reception / when someone is there.
       transport — parking and public transport, in her words, one string
                   per paragraph.
       nearby    — suburbs the families actually come from. Named in copy
                   only once she confirms them; the SEO temptation to list
                   every suburb within ten minutes is exactly what makes a
                   doorway page. */
  hours?: OpeningHours[];
  transport?: string[];
  nearby?: string[];
};

/* Typed as Campus[] rather than left to `as const` below: the optional
   fields (hours, transport, nearby) are absent from the literals, and a
   literal type has no `hours` to read — every consumer would have to cast.
   The cost is that `.id` is CampusId rather than the exact string, which
   nothing needed. */
const CAMPUSES: readonly Campus[] = [
  {
    id: "surrey-hills",
    name: "Main campus",
    cn: "总校区",
    address: "1F/244 Canterbury Rd",
    suburb: "Surrey Hills",
    state: "VIC",
    postcode: "3127",
    mapEmbed:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s1F%2F244+Canterbury+Rd%2C+Surrey+Hills+VIC+3127!6i15",
    geo: { lat: -37.824955, lng: 145.086874 },
  },
  {
    id: "glen-waverley",
    name: "Glen campus",
    cn: "Glen 校区",
    address: "36 Kincumber Dr",
    suburb: "Glen Waverley",
    state: "VIC",
    postcode: "3150",
    mapEmbed:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s36+Kincumber+Dr%2C+Glen+Waverley+VIC+3150!6i15",
    geo: { lat: -37.8766, lng: 145.177326 },
  },
];

export const SITE = {
  name: "Mirror Arts Education",
  cn: "墨尔本魔镜艺术教育",
  formerName: "Mirror Drama Studio",

  phone: "+61 498 183 332",
  whatsapp: "0422 362 426",
  email: "workshop@mirrorartsedu.com",
  wechat: "MirrorArtsEdu",
  xiaohongshu: "789947009",

  /* The registered business behind the trading name, from ABN Lookup on 20
     September 2026. The privacy policy has to say who actually holds the
     data, and "Mirror Arts Education" is a trading name, not a legal person.
     The footer prints the ABN because the IA doc planned it there from the
     start and it never landed. content.test.ts runs the ATO checksum on it.

     policyUpdated is the date printed at the top of /privacy. Bump it when
     the policy's substance changes — a new provider, a new field on the
     form, analytics arriving — not for typo fixes. */
  legal: {
    entity: "The Trustee for Mirror Arts Unit Trust",
    abn: "46 672 926 216",
    policyUpdated: "2026-09-20",
  },

  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/p/Mirror-Arts-Education-61575724035583/",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mirrorartseducation/",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@mirrordramastudio2722",
    },
  ],

  campuses: CAMPUSES,
} as const;

/* One-line postal form: "1F/244 Canterbury Rd, Surrey Hills VIC 3127".
 *
 * This exists because the address was typed out by hand in three places —
 * find-us.tsx, enquiry.tsx and here — and two of the three had drifted to a
 * lowercase "1f/244". Nothing catches that: it is not a broken link, it does
 * not fail a build, and it still finds the right building on Google. It just
 * reads as carelessness on the one line a parent is most likely to copy. */
export function campusAddress(c: Campus): string {
  return `${c.address}, ${c.suburb} ${c.state} ${c.postcode}`;
}

/* The campus pages live at the top level — /surrey-hills, not
   /campuses/surrey-hills — because a suburb is the one word a parent
   searching for a class already has, and the shortest URL that carries it
   wins. Two static route folders wrap one component; see
   components/sections/campus.tsx. */
export function campusPath(c: Campus): string {
  return `/${c.id}`;
}

/* The "open in Google Maps" link the address block prints and the hasMap
   the JSON-LD carries. One formula, so the two cannot point at different
   pins. */
export function campusMapUrl(c: Campus): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campusAddress(c))}`;
}

export function getCampus(id: CampusId): Campus {
  const found = SITE.campuses.find((c) => c.id === id);
  if (!found) throw new Error(`unknown campus: ${id}`);
  return found;
}

/* There are two. A campus page closes with a link to the other one, and
   the campus FAQ names it; both read it from here rather than assuming
   an index. */
export function otherCampus(c: Campus): Campus {
  const found = SITE.campuses.find((x) => x.id !== c.id);
  if (!found) throw new Error("there is only one campus");
  return found;
}

const WEEKDAYS: Weekday[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

/* "09:00" → "9:00am". Australian usage; a parent reads 5:30pm, not 17:30. */
function clockTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}${suffix}`;
}

/* Joins a list with commas and a final "and": ["A","B","C"] → "A, B and C". */
function listed(xs: string[]): string {
  if (xs.length <= 1) return xs.join("");
  return `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

/* One sentence per hours entry: "Monday to Friday, 9:00am–5:30pm". A run of
   three or more consecutive days collapses to "X to Y"; anything else is
   listed. Used by the campus hero, the campus FAQ and nothing else — the
   JSON-LD takes the raw shape. */
export function formatHours(hours: readonly OpeningHours[]): string[] {
  return hours.map((h) => {
    const idx = h.days.map((d) => WEEKDAYS.indexOf(d));
    const consecutive =
      idx.length >= 3 && idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
    const days = consecutive
      ? `${h.days[0]} to ${h.days[h.days.length - 1]}`
      : listed(h.days);
    return `${days}, ${clockTime(h.opens)}–${clockTime(h.closes)}`;
  });
}
