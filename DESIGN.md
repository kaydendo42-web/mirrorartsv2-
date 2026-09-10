---
name: Mirror Arts Education
description: Real performance in a contemporary season programme.
colors:
  gold: "#C9A227"
  gold-light: "#E3C766"
  lilac: "#B9ADE8"
  wine: "#54283F"
  ink: "#18131E"
  band: "#211625"
  paper: "#F0EEF4"
  base-secondary: "#E5DEEF"
  muted: "#53465C"
  grey: "#65576E"
  line: "#CDC4D5"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.25rem, 7.8vw, 7.5rem)"
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.8rem, 5.3vw, 5.6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.015em"
rounded:
  frame: "0px"
  action: "2px"
spacing:
  gutter: "clamp(1.25rem, 3.5vw, 4rem)"
  section: "clamp(5rem, 9.5vw, 9rem)"
  panel-gap: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    typography: "{typography.action}"
    padding: "0.82rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.ink}"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
  button-submit-hover:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.paper}"
  campus-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.frame}"
    padding: "0.85rem 1.25rem"
  form:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.frame}"
    padding: "clamp(1.5rem, 3vw, 2.75rem)"
---

# Design System: Mirror Arts Education

## Overview

**Creative North Star: "Performance in colour"**

Real school film and photography carry a contemporary season programme. Condensed uppercase headings provide scale; square frames, fine rules and saturated colour changes establish the theatrical setting. Manrope keeps practical information calm and readable.

This documents the independent preview. The colour and motion language is shared across its existing pages; the homepage's particular scene sequence belongs in its surface brief. Source authority is the cascade of `app/globals.css`, `app/studio.css`, `app/component-motion.css` and `app/art-direction.css`, the font setup in `app/layout.tsx`, and the motion and site components. The initial bounded review is recorded in `research/FINISH-REVIEW.md`; subsequent art-direction decisions and verification are recorded in `research/ART-DIRECTION-PASS.md`.

The second component pass keeps the original `/public/assets/logo.png` artwork in the shared masthead, footer and intro. PageHero openings add a three-panel stage cue behind the existing copy. `ImageFrame` supplies the common image language for page media, course galleries, faculty portraits, production stills and venue photographs: one real asset, a bounded crop, three clearing shutters and a full-size dialog where the source quality supports it. Existing film cards retain their grid and now use a cinema aperture and visibility-aware playback.

**Key Characteristics:**
- Monumental condensed headings with ordinary reading text.
- Original gold, dark plum ink, lilac and wine scene fields.
- Actual school imagery in precise rectangular frames.
- Progressive motion with an immediate static reading state.

## Colors

Gold gives the school a constant identity while lilac and wine supply the scene changes.

### Primary
- **Original gold** is the binding brand colour: mark, primary actions, highlighted hero word and interactive accents.
- **Light gold** provides secondary emphasis on dark grounds and the incoming navigation label.

### Secondary
- **Lilac** is an immersive ground for the welcome and inner-page headers, and the primary action's hover state.
- **Wine** gives headings and practical details emphasis on pale grounds and closes the enquiry passage.

### Neutral
- **Plum ink** anchors navigation, the footer, text and selected tabs.
- **Deep band** supports dark informational passages.
- **Cool paper** serves reading surfaces, partner marks and text on dark grounds; **secondary base** separates adjacent pale passages.
- **Muted**, **grey** and **line** distinguish reading text, supporting information and fine divisions.

**The Original Gold Rule.** Preserve the original gold primitive; do not reinterpret it as a brighter yellow or a gradient.

## Typography

**Display Font:** Barlow Condensed, with sans-serif fallback. **Body Font:** Manrope, with sans-serif fallback.

The display scale is intentionally much larger than the reading scale. The general display and headline roles above are uppercase, balanced and closely tracked. Card and teacher titles use the same family; body text stays in Manrope. Prose is capped at 70ch, section notes at 65ch, with line heights around 1.8–1.85 in longer passages. Font weights 500, 600 and 700 are loaded for Barlow Condensed; primary headings use 600.

Below 700px, general display headings use `clamp(3.05rem,12vw,4.5rem)` and section headings use `clamp(2.6rem,10vw,3.6rem)`. The hero has its own narrower responsive scale rather than inheriting every general heading value.

**The Reading Voice Rule.** Chinese-language spans use the reading stack, normal case and restrained tracking; never apply condensed English display treatment to them.

## Layout

Main containers cap at 1440px and narrow containers at 1060px, both with the fluid gutter above. Section spacing expands from 5rem to 9rem and becomes 4.5rem below 700px. The fixed masthead is 82px tall, reducing to 72px on phones. Navigation collapses at 1040px; its mobile links become large condensed text. The header action disappears below 371px while the main trial action remains in the hero.

Existing grids adapt independently: discipline panels become a single column below 700px, production grids use two columns from 640px and three from 1060px, and forms use paired fields from 480px. Preserve each existing grid's content order when extending it. Wide data tables retain their scrollable wrapper.

## Elevation & Depth

Most surfaces are flat. Colour fields, image crops, fine borders and the moving film/welcome layers provide depth. The masthead uses translucent ink and a 16px blur. Dropdowns carry a soft shadow (`0 20px 50px #08060d3d`); do not describe this system as entirely shadow-free. Media enlargement remains slight, generally around 1.025–1.035 on hover.

## Shapes

Photography, discipline panels, form surfaces, campus controls and lightboxes use square corners. Primary actions have a nearly square functional radius. The brand mark is the unchanged original `/assets/logo.png`. Photographs sit in angled paper mounts, with smaller tilts in dense grids. Small radii remain in underlying utility controls; the new artwork pause controls are circular.

## Components

### Actions

Primary actions combine gold, dark text and a small right arrow. They have a minimum height of 48px, increasing to 56px for the large variant. Hover changes the field to lilac and shifts the arrow slightly without lifting the button. Secondary text actions use a fine underline and moving arrow. Form submission uses ink, changing to wine on hover; the disabled state has 0.6 opacity.

### Navigation

The fixed dark bar keeps the brand and primary action compact. Each main label has two visually stacked copies in a clipped window; hover and keyboard focus roll between them in 550ms. The duplicate is excluded from accessible naming. Dropdown links use light text, a gold highlight and a small horizontal shift. When the homepage transition conceals the bar and hero copy, those containers become inert; return and cleanup restore interaction.

### Panels and media

Discipline panels have distinct lilac, rose, gold and wine fields with inherited text contrast, internal dividing rules and 4:3 image windows. Teacher portraits preserve the source image ratio in square-cornered photographic mounts. Production films use shallow tilted paper borders. These are content-bearing panels, not raised dashboard tiles.

The current portrait treatment uses a full image in a paper mount with a small tape tab. Faculty rows alternate image and biography placement within the existing teacher sequence, as authorised in the latest request. Room-hire photos alternate against the practical details, with paired photos overlapping. Portrait and production still triggers retain the existing dialog focus trap and return focus to the trigger. Page media, class stills, productions and the campus gallery share this photographic language with varied angles, sizes and paper colours.

### Forms and campus tabs

Forms are pale bordered reading surfaces. Fields use a pale inset background, a bottom rule, square corners and a 48px minimum height. Focus changes the field to white with a wine outline; invalid fields and their error text use the existing error red. Selected campus tabs invert to ink with pale text. Preserve the actual selected, disabled, invalid and expanded states when reusing controls.

### Motion and accessibility

The optional intro holds for 850ms once per session and lifts in 850ms; it does not wait for video readiness. Hero words settle through clipped masks; later imagery uncovers over 1100ms and selected headings settle over 850ms. The welcome statement resolves toward ink from a readable initial colour (`#625071` on lilac, approximately 3.51:1 for the large text).

**The Available Content Rule.** Reveal targets are visible before enhancement. Animation cannot be the only route to reading content or using a control. Reduced motion removes the intro, decorative autoplay, sticky dwell and staged transitions, showing the poster and static composition. General keyboard focus uses a 3px gold outline with 5px offset; individual controls retain their more specific focus treatment.

The component pass uses one short opening cue per page, a 780ms masked title entrance, an 820ms shutter clear and a 1050ms image settle. Production loops play only while visible and pause when the document is hidden; selecting a full film retains native playback controls. Reduced motion hides the decorative shutters and cue, pauses loops and leaves the underlying image immediately readable.

The art-direction pass adds a sticky photographic collage beside the About prose and a folding paper fan beside the school-workshop prose. The same existing school photos are reused decoratively, without new claims or captions. Paper prints drift over 9 seconds, the fan opens and closes over 12 seconds, and both compositions have a 44px pause/play control. Motion stops outside the viewport and when the document is hidden. Reduced motion disables the art animations and hides the unnecessary pause control, leaving a complete static composition. On screens below 1000px, the artwork follows the heading in the normal document flow.

Partner mark wrappers are transparent and the supplied images use multiply blending, eliminating their white rectangles on the pale section backgrounds without editing the marks. Exam-body names explicitly use #F0EEF4 on #211625; their heading uses #E3C766.

## Do's and Don'ts

### Do:
- **Do** keep original gold as the persistent identity across changing scene colours.
- **Do** pair condensed display scale with readable Manrope information.
- **Do** use actual school film and photographs in square frames.
- **Do** preserve static content availability and visible keyboard states.

### Don't:
- **Don't** replace the original gold with a reference website's yellow.
- **Don't** force Chinese text into the condensed display voice.
- **Don't** turn editorial image frames into decorative arches.
- **Don't** make concealed controls focusable during scene transitions.
