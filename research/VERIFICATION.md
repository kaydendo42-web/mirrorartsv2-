# Preview verification — 10 September 2026

## Preservation
204 original source, content, document and asset files were compared with the SHA-256 snapshot taken before work. All match. The original repository still has exactly its four pre-existing modified files. See preservation-check.json.

Every page.tsx, every lib module (including navigation), the original global stylesheet, and the original media files remain byte-identical in the preview. Five existing shared files changed: layout, hero-reel, masthead, intro and footer. Their content destinations and sentences remain; the changes add fonts, styling, a new brand treatment and motion wrappers. New CSS and motion components provide the redesign.

## Automated checks
- npm run lint: passes.
- npm test: 63 of 63 pass. Covers curriculum, instructors, contact details, prices, media existence/dimensions, production loops, redirects and sitemap dependencies.
- npm run build: passes with Next 16.3 webpack; all 27 content routes generated, plus metadata and framework output.
- The preview build script uses webpack because this host's Turbopack build worker could not bind its port. The test script enables TypeScript stripping on the installed Node 22 runtime. Neither changes original project configuration.

## Browser checks
All 27 content routes opened in the browser. Titles present, no document-level horizontal overflow, and no failed images among those fully loaded. The complete route results are in browser-checks.json.

Inspected desktop 1280, tablet 834, and phone 390/360 layouts. Phone and tablet rendering used a same-origin iframe with an explicit width, because the browser's viewport override did not change its actual viewport. Screenshots include that inspection frame and are not claimed as native-device testing.

Exercised:
- Mobile navigation opens, Escape closes and restores the trigger.
- Faculty credentials expand.
- Traditional Chinese Music Performance workshop expands with its body present.
- Campus tabs switch to Glen Waverley and the matching address.
- Contact QR dialog opens and closes with Escape.
- Corner studio image dialog opens and closes with its Close button.
- Blank enquiry form triggers required-field validation. No enquiry was sent.

## Limits
The preview deliberately has no copied environment secrets or deployment linkage. Enquiry delivery is therefore not connected; the existing server action remains in place. Actual email delivery was not tested. External hosted full-length films and third-party map availability depend on their services.

Reduced-motion styles and the script's media-query branch were inspected in code; native operating-system preference emulation was unavailable, so this is not a claim of a full accessibility audit or native-device test. The screenshot review evaluates the supplied representative views, not every scroll position of every route.

The internal /__preview/index.html page is a local responsive inspection utility, outside navigation and sitemap. Remove public/__preview before any public deployment.

## Component pass

The actual Mirror Arts logo remains byte-identical and is used by the shared masthead, footer and intro. The new `ImageFrame` is used for subpage hero media, course galleries, faculty portraits, production stills and venue photography. Its content stays immediately available; three shutter layers and a bounded image settle play only as the element enters view. Portraits/stills retain their existing slot and can open in the existing focus-trapped lightbox. The PageHero title uses the same word-mask technique as the homepage and a short three-panel stage cue behind the existing heading.

The Danzia instructor card and Stageo actor card observations, including their overflow-clipped image wrappers, transformed portrait containers and independent overlay controls, are recorded in `research/component-pass/PLAN.md` and the adjacent captures. No reference asset or code was copied into the preview.

## Final review corrections
The independent reviewer scored both listed fixes resolved: fully concealed masthead and hero controls are inert, and unrevealed welcome words use #625071 on #B9ADE8 (3.51:1). Browser DOM confirmed inert when hidden and restored interaction when visible. Lint and production build passed again after the corrections. The ship disposition covers these scored fixes, following the initial representative visual review.
