# Independent finish review

Reviewed 10 September 2026 by a scoped independent subagent substituting for the unavailable named reviewer interface. Read-only design and source review, followed by a bounded verdict on two fixes. No browser was operated by the reviewer.

## Evidence and limits

Read PRODUCT.md, research/REDESIGN-PLAN.md, the direction comment in app/layout.tsx, the supplied craft floor and finish-review contract, the existing detector result, and relevant motion, masthead and stylesheet source. Reviewed all nine supplied screenshots: final-home.png, final-mobile.png, final-tablet.png, desktop-courses.png, courses-header.png, about-header.png, faculty.png, mobile-drama.png and mobile-360-production.png. All were valid for their declared views. Older secondary captures show the previous header logo; the final primary captures show the current brand.

No QUALITY BAR card, decision comp or separate raw roll record was supplied. The direction plan records candidate 6 and seed b71ea108, consistent with the implementation contract. The user explicitly approved a code-led preview, so there is no approved-comp reproduction obligation. Screenshot evidence cannot certify motion timing or keyboard behavior; source inspection and the builder's reported browser checks support those findings.

## Original review

disposition: fix

### persistence

Pass. PRODUCT.md and the direction contract exist. Desktop, phone and tablet captures were supplied and valid. DESIGN.md may follow this review for the new visual world.

### fidelity

| Element | Assessment |
|---|---|
| TYPE | Match: condensed Barlow display, uppercase composition and Manrope reading text implement the stated world. |
| MATERIAL | Match: actual performance photographs and film support the school; no imitation physical surfaces. |
| GROUND | Match: lilac, cool paper, plum ink and burgundy follow the named palette. |
| First viewport | Match: centered performance headline, location, two actions and film retain the promised arrangement. |
| Responsive composition | Adaptation: narrower heading wraps and collapsed navigation serve the required phone layouts. |
| Existing labels above headings | Adaptation: the user's exact wording and placement instruction overrides the generic floor prohibition. |
| FORM | Match: candidate 6 and seed b71ea108 appear consistently in the plan and implementation contract. |
| Content and truth | Match within supplied evidence: original wording and actual school assets are retained; the builder reports byte-identical page and content files. |

### ceiling

The opening frame has a clear visual memory: condensed white lettering, gold “stage,” actual performers and a dark masthead. Sampled inner pages carry the same typography and colour system. A separate QUALITY BAR comparison cannot be certified without its card. No additional embellishment is required from the reviewed evidence.

### material_fixes

1. Keyboard states: the welcome transition fades masthead and hero actions to zero opacity while retaining keyboard-focusable links. Restore visibility on focus or remove concealed controls from interaction until visible again.
2. Contrast: unrevealed welcome words used #746185 on #B9ADE8, approximately 2.69:1. Darken the initial state to meet the 3:1 large-text floor while preserving the reveal.

### keep

Preserve actual performance imagery, monumental condensed headings, exact content arrangement, gold action hierarchy and restrained rectangular framing.

## Bounded verdict after fixes

Re-read final-home.png, final-mobile.png and final-tablet.png at their original paths, plus the added final-welcome.png. All recaptures are valid. Inspected only the two changed behaviors; this was not a new surface audit.

### verdict

1. Resolved — the welcome capture shows the masthead and hero controls concealed while the opening captures show them visible again. Source now applies inert to the masthead and hero-copy containers above the concealment threshold, removes it on return, and clears it during cleanup and nonhero navigation. The builder reports browser confirmation of inert=true at opacity 0 and inert=false at opacity 1.
2. Resolved — the source now uses #625071 on #B9ADE8 for unrevealed welcome words, computed at 3.5128:1, exceeding the 3:1 large-text requirement. The welcome recapture preserves the intended lilac ground and readable resolved statement. No regressions from this fix batch were observed in the supplied recaptures.

### remaining

Clear. This ship disposition covers the scored fixes, not a new review of the whole surface.

disposition: ship
