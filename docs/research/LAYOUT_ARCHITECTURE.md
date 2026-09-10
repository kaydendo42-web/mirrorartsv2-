# Layout architecture — blueprint homepage, top to bottom

Measured at 1440px on 2026-08-04. Total document height **8132px**. Twelve slots.
Column notes are for desktop; tablet (810–1199) and phone (≤809) behaviour noted per slot.

The whole page is one alternating rhythm: **cream → cream → cream → charcoal → cream →
charcoal → cream → cream → photo**. The dark bands are what give it pace. Keep the
alternation even if a section's content changes.

---

## 1. Utility bar — cream, ~82px tall, sticky

`logo (left) · email · phone · social icons · [filled pill CTA] · [ghost pill CTA] (right)`

Single row, `1200px` container. Logo is a lockup: wordmark + rule + sub-wordmark.
Contact items are icon + uppercase condensed label, `10px` gap icon-to-text, `32px` between
items. Filled pill is `999px` radius, ~`14px 28px` padding.

**Tablet:** social icons drop. **Phone:** collapses into logo + hamburger; the two pills move
into the opened menu panel.

## 2. Nav row — cream, ~56px tall, sticky beneath the utility bar

Five items, evenly distributed across the `1200px` container, each uppercase condensed bold
italic with a chevron. Each opens a dropdown (the Framer tree carries a `Closed` variant per
item). Bottom hairline separates it from the page.

Both bars are sticky together and stay visible the entire scroll — no shrink, no hide-on-
scroll-down. Simple and it works; keep it.

**Phone:** replaced by the hamburger panel.

## 3. Hero — cream, sticky, ~1900px of scroll

Tall scroll-driven stage rather than a fixed-height banner. Contents pinned while the page
scrolls past:

- Centred logo inside a scalloped/starburst blob, ~200px, sits above the headline
- Cursive H1, two lines, centred, `60.8px`, max ~`1040px` wide
- Red down-arrow ~`40px` below, gently bobbing
- **On scroll:** four value badges enter from the outer edges — top-right yellow starburst,
  left teal blob, bottom-centre pink blob, bottom-right sand blob — scaling up and drifting
  inward as scroll progresses. The Framer tree names these `Trigger #1` … `Trigger #5`.
- A circular photo (~180px) sits upper-left with **curved text rotating around its
  circumference** ("Book a Playgroup Today!")

**Phone:** badges reduce to two, positioned top and bottom; the circular photo drops.

## 4. Welcome — cream, centred, ~700px

Cursive H2 centred → two body paragraphs, centre-aligned, ~`600px` measure → single filled
pill CTA. The hero's blobs continue drifting through this section, which is what stitches
slots 3 and 4 into one continuous scene. Do not put a hard band edge between them.

## 5. The Explorers' Way — cream, two columns

`[ text 55% | image 45% ]`, `80px` gap.

Left: uppercase eyebrow → cursive H2 → two paragraphs → **dual CTA** (filled pill + ghost
pill, `16px` apart). Right: photo, `24px` radius, portrait-ish crop.

Five value blobs are scattered in the margins and between the columns, each a different
organic shape with a rotated uppercase label inside.

**Tablet/phone:** stacks, image below text, blobs reduce to three and move to the edges.

## 6. Programs — **charcoal band**, centred, ~1100px tall

The signature section. A centred text stack sits inside two concentric hairline circles
(~`900px` and ~`1300px` diameter), and seven blobs are positioned *on* those circle paths
like beads on an orbit.

Centre stack: white eyebrow **pill** (not plain text — this is the one section where the
eyebrow gets a pill) → cursive H2 in cream → two paragraphs → dual CTA.

Blobs: each a distinct organic shape, distinct fill, uppercase label inside, several rotated
30–90° so the text runs around the orbit. Sizes vary `~110px – 170px`.

**Tablet:** rings shrink, outer ring clips off-canvas. **Phone:** rings drop entirely; blobs
become a scrolling row beneath the text.

## 7. Our Team — cream, two columns

`[ text 45% | image(s) 55% ]`. Mirror image of slot 5. Eyebrow pill → cursive H2 (two lines)
→ body, ~`430px` measure → dual CTA. Right side carries a rounded team photo, `40px` radius.

## 8. Excursions — **charcoal band**, two columns, image left

`[ image 50% | text 50% ]` — the flip of slot 5, which is what stops the alternation feeling
mechanical. Eyebrow pill → cursive H2 in cream → **three** short paragraphs (this is the
longest prose block on the page) → single CTA.

## 9. The Centre — cream, split header + horizontal rail

Header is a two-column split, which appears nowhere else:
`[ eyebrow pill + cursive H2, 2 lines (left ~50%) | body 3 lines + dual CTA (right ~50%) ]`

Below it, a full-bleed horizontal photo rail: cards ~`430px × 380px`, `24px` radius, `24px`
gap, running past the right edge of the viewport to signal more content. Drag/scroll to
advance.

## 10. Instagram feed — cream, four cards

Row of four white cards, `~250px` wide, `40px` radius, `24px` gap. Each: square image top
(`24px 24px 0 0` radius), caption below clamped to 3 lines, `16px` padding. Header above the
row carries the `@handle` and a Follow button.

**Phone:** two-up grid, or horizontal scroll.

## 11. Booking — cream, centred

Eyebrow pill → cursive H2, centred → embedded booking widget (cal.com) in a rounded card.
Generous `80px` padding above and below.

## 12. Contact + footer — **full-bleed photograph**

A photo of the building fills the band. Floating on top, a cream card, `40px` radius,
`1200px` wide, inset ~`80px` from the band's top and bottom:

- **Left column:** four label pills (`PHONE`, `ADDRESS`, `EMAIL`, `OPENING HOURS`) — small
  uppercase text in a pale pill — each followed by its value set in the **cursive display
  face, underlined**, ~`24px`. This is the only place body-position content uses the display
  font, and it is a lovely detail. Keep it.
- **Right column:** white enquiry form card, `40px` radius. Fields: Email\*, Phone, First
  Name, Last Name, Child's Name, Child's Age, Message. Names sit two-up; everything else full
  width. Inputs are `12px` radius with placeholder examples ("Jane", "e.g. 3"). Filled
  submit button, full width of the card.
- Beneath, small copyright line and an agency credit.

An `H1` also lives down here carrying the location keyword string — a deliberate SEO move,
since the visible hero H1 is a slogan with no keywords in it.

**Phone:** columns stack, contact block above the form.

---

## Structural rules to hold in the rebuild

1. **Two containers.** `1200px` sections, `1040px`/`600px` prose. No third width.
2. **Every content section is the same shape:** eyebrow → display heading → body → CTA pair.
   Nine of the twelve slots use it. That repetition is the whole reason the site feels
   simple to navigate — the client's stated requirement. Do not "improve" it with variety.
3. **Alternate the bands** cream/charcoal, and **alternate which side the image sits on**.
4. **One idea per section.** No section carries two competing messages.
5. **Dual CTA everywhere:** one filled (book/enquire), one ghost (learn more). The filled one
   is always the same action across the whole page.
