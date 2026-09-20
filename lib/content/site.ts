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

export type Campus = {
  id: "surrey-hills" | "glen-waverley";
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
};

export const SITE = {
  name: "Mirror Arts Education",
  cn: "墨尔本魔镜艺术教育",
  formerName: "Mirror Drama Studio",

  phone: "+61 498 183 332",
  whatsapp: "0422 362 426",
  email: "workshop@mirrorartsedu.com",
  wechat: "MirrorArtsEdu",
  xiaohongshu: "789947009",

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

  campuses: [
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
    },
  ] satisfies Campus[],
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
