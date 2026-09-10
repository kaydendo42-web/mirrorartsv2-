# Art direction pass — 10 September 2026

## Brief and boundary
Keep the original project untouched. Preserve page routes, copy, section order and original gold/logo. The latest user request explicitly opens up image composition inside sections: alternate alignment, tilted prints, layering and animated designs in the About and school-workshop empty areas.

## Reference evidence
Danzia's live Ballet card uses an outer `rotate(8deg)` wrapper and a separate entrance wrapper starting at `translateX(-250px) rotate(-8deg)`. The photograph has its own crop and the white card includes generous paper space. The useful principle is independent layers for resting composition, entrance and hover, rather than rotating every content row.

Reference: https://danzia.framer.website/ (live DOM inspected).

## Direction
Mirror as a performing-arts scrapbook. Existing school photography becomes physical prints; the paper fan refers to the Chinese performance and craft workshops. Body copy stays horizontal and readable.

- Palette: plum ink #211625, lilac #B9ADE8, wine #54283F, original gold #C9A227, pale paper #F0EEF4, print stock #FFFCF7.
- Type: retain Barlow Condensed display and Manrope body/utility.
- About: existing copy left, sticky floating production prints and a gold ribbon right. On phones the decorative composition follows the section heading.
- Schools: existing copy left, a folding paper fan with two existing performance photos right.
- Faculty: larger full-ratio portrait prints alternate sides within the existing teacher sequence.
- Venue: practical room details alternate against angled photographs; paired views overlap on the same visual canvas.
- Galleries: shallow angles, paper mounts, staggered heights; preserve source ordering and lightboxes.
- Partners: transparent wrappers and multiply blending remove white image rectangles without modifying the partner marks.
- Exams: explicit light foregrounds on the dark section.

## Plan critique
Avoid a generic orbit of floating icons. The signature is built from actual performances and a paper fan tied to the school's workshop content. Keep body copy and tables level; restrict conspicuous tilts to photography. Ambient art can be paused, stops outside the viewport and when the tab is hidden, and becomes static for reduced-motion preferences.

## Verification
- Production build and TypeScript checks passed; all 34 static outputs generated.
- Lint passed; 63 existing content tests passed.
- All 27 content URLs returned HTTP 200 with a page heading on the restarted production preview. See `art-direction-routes.json`.
- Original-file preservation: all 204 snapshot files unchanged; all content modules unchanged; existing page wording and original logo unchanged.
- Browser checks at 360px covered faculty, venue, drama, a production detail, the production index and homepage. About and workshops were inspected at 390px. About, faculty, venue and workshops were also checked at 834px. No horizontal page overflow or broken loaded images remained in those checks.
- Desktop visual review covered the About collage, partner logos, fan, faculty, venue single and paired photos, course teacher cards, campus gallery and exam-body foregrounds. This was a direct implementation review, not a new independent-agent review.
- Fixed a 7px phone overflow caused by the decorative arch's transformed SVG bounds. Its phone scale now keeps the element inside the viewport.
- Portrait dialog opens and closes with Escape; faculty credentials expand. Artwork pause changes the control to Play and stops the running state.
- Partner wrappers compute to transparent, with multiply blending on all six institution marks. Exam names compute to `rgb(240, 238, 244)` on the dark section.
- No browser errors reported on the checked final production About page.
- Reduced-motion behaviour is implemented in CSS and the preference listener; no OS preference was changed during verification.

The local production preview runs at http://127.0.0.1:3101/. No Vercel deployment or enquiry-integration change is part of this pass.
