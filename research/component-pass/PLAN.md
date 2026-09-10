# Component enhancement — second pass

User correction: restore the actual original Mirror Arts logo everywhere. Keep the original source project untouched; continue in the separate preview. Existing copy, grids, section positions and destinations remain binding.

## Reference evidence
Danzia's instructor cards use a clipped image inside a separate transformed container. The observed initial transform was translateX(300px) rotate(10deg); its inner image wrapper remains overflow:hidden. Its instructor-page headline uses masked display text. Stageo's actor section uses bordered portrait frames, slightly rotated as separate layers, with large rolling text behind; its card markup contains a Thumbnail Wrapper, independently positioned portrait and a small overlay control. Stageo's About page separates the image field and very large title with precise hairlines. Captures are stored beside this plan. Sources: https://danzia.framer.website/instructors and https://stageo-template.framer.website/.

## Implementation thesis
Focal moment: each subpage opens like a stage being revealed. Three vertical colour panels withdraw while the exact title arrives through word masks. The whole sequence finishes in approximately one second; body copy and navigation remain immediately available. Page families use contrasting header grounds, without moving any content.

Portraits: retain the existing left-hand portrait/right-hand credentials layout. Use a framed photographic plane with a small angled backing plane, three independently clearing shutters, a bounded image settle and a restrained pointer/focus response. Add full-size viewing to the existing faculty photographs; no biography or credential changes.

Productions: preserve the existing card grid and caption positions. Give films a dark cinema frame, moving aperture and clear arrow response. Stills use the same image shutter treatment and can open at full size. Venue pictures use this framing without enlargement because those source crops have limited resolution.

Continuity and feedback: image controls use the existing accessible dialog, Escape and focus return. Course teacher links remain links without nested buttons. Films pause when hidden/offscreen and reduced motion leaves still compositions. No animation library or copied reference assets.

Budget: animate only entering media and one opening sequence per navigation. Three transform-only shutters per image; no permanent rendering loop for portraits, no page-wide mouse tracking, no continuous ornamental animation. Main hero and practical content retain their established motion. Verify desktop, phone, keyboard controls, production build, content tests and original hashes; update design handoff with implemented values.
