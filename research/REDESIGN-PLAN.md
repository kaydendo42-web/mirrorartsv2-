# Mirror Arts — contemporary performance identity

## Contract
The working copy at the start of 10 September 2026 is the content authority. All 27 content URLs, literal wording, section order, content destinations, and internal placement stay. The homepage remains hero → welcome → four discipline panels in their existing checkerboard → campuses (seven-image grid, then map/form) → partners → enquiry band. The original project is read-only; this independent preview contains no deployment linkage or environment files.

## What the references actually do
Measured in the browser at a 1280 × 720 viewport, with a 1265px content area. These are observed values, not proposed Mirror Arts values.

| Reference | Observed construction | Translation for Mirror Arts |
|---|---|---|
| Danzia | Anton 400, 185px / 185px hero; 120px / 144px section titles; 142px about statement; #F8FE22 over full-viewport video | Condensed display lettering and audacious scale, adjusted to Mirror's much longer exact headings. Existing gold remains gold. |
| Danzia navigation | 10px background blur, translucent white 20%, 32px bottom corners | Compact fixed masthead, legible solid surface when scrolled. Avoid taking the rounded navigation shape as the site's identity. |
| Danzia text | Per-character span wrappers; transforms on individual spans | Use word masks only for the hero and welcome. Preserve readable accessible text rather than exposing separated characters. |
| Danzia sections | Classes/instructors/gallery: 80px vertical and 36px horizontal padding at this viewport | Deliberate full-width passages, generous 80–144px section rhythm. Keep Mirror's section alignment and order. |
| Stageo | Space Grotesk 600 hero at 169.6px with -5.088px tracking; large section titles 72px / 86.4px; black and white; persistent grid lines | A theatrical grid, square image frames, controlled contrast. Long informational sections stay readable. |
| Stageo navigation | Two stacked text copies in a 17px overflow-clipped wrapper, one-pixel hover border | Independently implemented rolling text on navigation. Duplicate visual copy excluded from the accessible name. |
| Stageo content | Three parallax image layers; oversized metrics; sharply framed event listings | Restrained image translation as a view enters; no new metrics, event lists or sections added to Mirror. |
| Aspire Studio | Full-screen authored moving landscape, narrow floating navigation, very large bottom-aligned brand type | A single powerful opening frame and carefully graded real film, with clear readable controls. |
| Peregrine Partners | Open pale composition, restrained controls, staged split text and an interactive worked example | Precision in motion and interaction. Every effect must support the real content rather than become a new product feature. |

Desktop was inspected live including DOM markup, computed typography, section sizing, inline transforms and rolling-label construction. The browser viewport override did not change its actual 1280px viewport; reference mobile values are therefore not claimed as measured. Preview phone layouts will be verified in explicitly sized embedded viewports.

## Direction: performance in colour
A modern season programme projected onto the actual school: monumental condensed type, camera-frame rectangles, clear dividing rules, gold as the unmistakable brand signal. Parents see the school performing, then can read practical information without theatrical delays.

Grounded candidates considered: (1) contemporary theatre season posters, (2) photographic rehearsal contact sheets, (3) bilingual cultural-festival identity, (4) recording-studio session sleeves, (5) performing-arts school wayfinding, (6) stage lighting cue sheets translated into saturated scene changes, (7) youth dance editorial. Direction seed b71ea108 selected the sixth. The user's Danzia/Stageo references and fixed structure constrain it to a contemporary website, rather than a literal technical cue sheet.

Alternative systems from the skill were evaluated against parent identification and product clarity: dance notation is too specialist and reverses reading direction; exploitation posters introduce inappropriate shock rhetoric; teletext weakens the image-led brief; painted multi-plane scenes would replace real school evidence with illustration; tensegrity diagrams imply a system the school does not offer. All declined. Their useful disciplines are retained as ambition: synchronized movement, decisive hierarchy, consistent controls, real foreground/background separation, and motion with clear start/end states. No comparison catalogue image is used as a client asset.

## Visual system
- Display: Barlow Condensed, 600/700, uppercase. Wide enough to remain warm and readable; condensed enough for long exact client titles.
- Reading/UI: Manrope variable. Chinese remains a normal, legible CJK fallback; never force condensed English treatment onto Chinese.
- Brand gold: #C9A227, unchanged. Light gold: #E3C766, existing companion.
- Ink: #18131E. Lilac: #B9ADE8. Cool paper: #F0EEF4. Deep burgundy: #54283F.
- Main navigation and footer: ink; large purple welcome; pale course section with strongly coloured discipline panels; lilac campus passage; neutral partner logos; burgundy enquiry close.
- Corners: predominantly square, small functional radii only. No decorative arches.
- Composition: preserve all existing grids and side-to-side ordering. Scale, rhythm, framing, contrast and motion supply the redesign.

## Motion grammar
1. Intro: one short, session-only gold-on-ink curtain lift, never a long preload gate.
2. Hero: word masks settle from below in a tight sequence; video is immediately represented by its poster. The existing central title and action arrangement stays central.
3. Welcome: the next existing sticky layer crosses over the film; words resolve from lilac to ink as the statement enters. Keep the body and discipline list legible.
4. Media: broad shutter reveals, slight image scale on intentional hover. No permanent will-change across a whole page.
5. Navigation: single masked rolling-label action; keyboard focus receives the same visual feedback. Submenus remain accessible.
6. Content: headings settle upward, images uncover, dense lists stay visible. Animations never own content availability.
7. Reduced motion: static composition, no autoplay decorative video, no sticky dwell, no stagger or parallax.

## Component rollout
| Surface | Visual treatment | Preservation check |
|---|---|---|
| Shared masthead, intro, footer | Compact mark, dark navigation, rolling labels, short curtain, strong footer type | All nav/footer links and labels |
| Homepage hero/welcome | Oversized condensed hero over existing film; saturated welcome transition | Every sentence, nine disciplines, both CTAs, film credit |
| Homepage courses | Four coloured panels; sharp image windows; large title; existing text/image checkerboard | Four panels, all paragraphs, durations, CTAs, ordering |
| Campuses | Lilac field, current seven-photo geometry, sharp captions and controls | Room placement, labels, lightboxes, maps, form |
| Partners | Calm logo grounds, fine rules, legible affiliation text | Every partner and link |
| Courses hub | Monumental headline, contact sheet untouched, bold course row labels | All 13 courses, five adult programs, all anchors |
| Course detail ×13 | Same title/meta/media sequence; strong hero; clear strands and teacher cards | Exact prose, tables, cards, previous/next |
| About | Strong opening typography and photo; readable prose, large creed, dramatic timeline dates | Latest removed campus section stays removed |
| Faculty | Portrait frames and large condensed names; functional accordions | All ten teachers, discipline grouping and credentials |
| Stage hub/detail ×6 | Cinema framing, production metadata, elegant credits and related links | Existing media and production content; removed form stays removed |
| Workshops | Clear accordion programme, saturated school-information band | Existing family groups, rates, labels and controls |
| Venue | Large room labels, precise photo grid and rates table | All measurements, prices, terms and contacts |
| Contact | Practical readable maps and form, clear error/focus states | Addresses, social IDs, QR lightbox and existing form behavior |
| 404 | Same visual world | Existing recovery links |

## Verification and handoff
- Run the catalogue/content tests and production build; inspect lint and types.
- Compare copied content modules byte-for-byte and compare all JSX text/attributes for changed components.
- Verify original source hashes at the end, including the client's pre-existing uncommitted changes.
- Browser pass: homepage and representative pages at desktop, 834px, 390px and 360px; every route smoke checked.
- Exercise menu, internal links, course navigation, campus tabs, image lightbox, workshop/faculty accordion, and form validation without sending an enquiry.
- Verify reduced motion and keyboard focus. Check for horizontal overflow and clipped headings.
- Independent finish review, one batch of material fixes, and written system documentation.
- Deliver the local preview, source copy, this plan, reference evidence, test results and limitations. GitHub/Vercel publishing can then target a separate preview project.

## Reference links
The measured live-site observations above refer to [Danzia](https://danzia.framer.website/), [Stageo](https://stageo-template.framer.website/), [Aspire Studio](https://www.aspirestudio.agency/) and [Peregrine Partners](https://www.peregrinepartners.space/). Reference assets and source code are not shipped in this preview; the techniques were independently implemented with Mirror's existing content and media.
