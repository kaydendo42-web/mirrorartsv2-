# Interaction patterns — the blueprint's "feel"

Observed on the live site 2026-08-04, plus easing values pulled from its CSS.
This file is the **audit baseline**: every section we build gets checked against it.

The blueprint is a Framer site, so its motion is JS-driven (framer-motion + Lenis) and only
partly visible in CSS. Where a value could not be measured it is marked *(estimated —
verify against the live site during QA)*.

---

## 1. Smooth scroll

Lenis is active on `<html class="lenis">`. Every scroll — wheel, trackpad, anchor jump — is
eased rather than native. This is doing more work than it looks: it is what makes the
scroll-driven hero read as a scene rather than a jump-cut.

Reproduce with Lenis (or an equivalent). Settle time ~`1.0–1.2s`, no overscroll bounce.

**Must be disabled under `prefers-reduced-motion`.** The blueprint does not do this. We will.

---

## 2. Scroll-driven hero

The hero is pinned while roughly `1900px` of scroll passes. Three things animate against
scroll progress:

| Element | Behaviour |
|---|---|
| Logo blob | Starts centred and large; scales down and fades as progress → 1 |
| H1 | Holds, then drifts up and out |
| Value badges (×4) | Enter from beyond the viewport edges — top-right, left, bottom-centre, bottom-right — each scaling from ~`0.6` to `1.0` and translating inward. Measured label sizes range `14.25px → 25.27px`, i.e. they are genuinely being scaled by scroll position, not just faded in |

Each badge has its own progress window, so they arrive in sequence rather than together.
Framer names them `Trigger #1` … `Trigger #5`.

**Rebuild:** one scroll-progress value for the pinned section, four `useTransform`-style
mappings off it (or CSS `animation-timeline: view()` where support allows). The badges keep
drifting into the section *below* the hero — see §4.

---

## 3. Rotating curved text

A circular photo carries text set on a circular path around its edge, rotating continuously.
Slow — roughly one revolution per `20–30s` *(estimated)*. Direction: clockwise.

Rebuild with SVG `<textPath>` on a circle plus a linear infinite `rotate` animation. Cheap,
and it is one of the most recognisable details on the page.

---

## 4. Blobs that cross section boundaries

The hero's badges do not stop at the hero. They continue drifting down through the Welcome
and Explorers' Way sections at a different rate from the page scroll — a parallax that
stitches three sections into one scene.

This is the single most important motion behaviour to get right. Without it the top of the
page reads as three stacked blocks; with it, it reads as one continuous space. Budget time
for it.

---

## 5. Orbiting program blobs

In the Programs section, blobs sit on two concentric hairline circles. They rotate about
their own centres and shift position slightly with scroll, so the orbit appears to turn.
Labels are pre-rotated `30–90°` so they read along the orbit path.

Rebuild: position each blob with `rotate(θ) translate(r) rotate(-θ)` about the section
centre, then drive `θ` off scroll progress. Individual blob spin is a separate slow infinite
rotation.

---

## 6. Section entrances

Content blocks fade and rise into place on first view — `opacity 0→1` with `translateY`
of roughly `24–40px` *(estimated)*. Staggered within a section: eyebrow, then heading, then
body, then CTAs, ~`80–120ms` apart *(estimated)*.

Measured easings available in the page CSS, in order of use:

| Easing | Use |
|---|---|
| `cubic-bezier(0.5, 1, 0.89, 1)` | most-used — ease-out-quad-ish, entrances |
| `cubic-bezier(0.22, 1, 0.36, 1)` | ease-out-quint, larger movements |
| `cubic-bezier(0.32, 0.72, 0, 1)` | overlays, menu panels |
| `cubic-bezier(0.21, 1.02, 0.73, 1)` | slight overshoot, playful elements |

Durations found in CSS: `0.2s` for colour/opacity, `0.4–0.5s` for transform.

Entrances fire **once**. Nothing re-animates on scroll-up.

---

## 7. Hover

- **Pills:** background and colour cross-fade over `0.2s`. Filled pill darkens; ghost pill
  fills. Slight lift *(estimated ~2px)*.
- **Nav items:** chevron rotates 180° as the dropdown opens; dropdown panel slides down with
  the overlay easing.
- **Photo cards:** subtle scale on the image inside a fixed-radius frame *(estimated ~1.03)*.
- All hover states are wrapped in `@media (hover: hover)` — 22 occurrences in the CSS. Copy
  that discipline so touch devices never get stuck in a hover state.

---

## 8. Photo rail

Horizontal, drag-to-scroll, cards running off the right edge. Momentum on release.
No arrows, no dots. Snapping not observed *(verify during QA)*.

---

## What we add that the blueprint lacks

1. **`prefers-reduced-motion`.** Under it: kill Lenis, kill the orbit and curved-text
   rotations, kill parallax, replace entrances with a plain `opacity` fade at `0.15s`. The
   pinned hero becomes a static hero with the badges laid out in their final positions.
2. **Focus-visible states** on every pill, nav item and form field — the blueprint's are
   browser default at best.
3. **Motion budget.** The pinned hero plus two rotating systems plus parallax is a lot of
   continuous compositing. Everything animated must be `transform`/`opacity` only, on its
   own layer, and the orbit rotations must pause when the section is out of view. Target: no
   dropped frames at 60fps on a mid-range Android, and Lighthouse mobile ≥ 95 as the plan
   already requires.

---

## Audit checklist

Run this against every built section before it is called done.

- [ ] Lenis active, settles in ~1s, disabled under reduced motion
- [ ] Hero pins, badges enter in sequence scaling from ~0.6 → 1.0
- [ ] Badges continue drifting past the hero into the next two sections
- [ ] Curved text rotates continuously, ~20–30s per revolution
- [ ] Course blobs orbit on scroll and spin on their own axis
- [ ] Blob spin pauses when the section leaves the viewport
- [ ] Entrances use `cubic-bezier(0.5, 1, 0.89, 1)`, ~24–40px rise, staggered ~100ms
- [ ] Entrances fire once, do not replay on scroll-up
- [ ] Every hover rule inside `@media (hover: hover)`
- [ ] Pill hover cross-fades over 0.2s
- [ ] Photo rail drags with momentum
- [ ] `focus-visible` ring on every interactive element
- [ ] Only `transform` and `opacity` animate — no layout-triggering properties
- [ ] Reduced-motion pass: nothing moves, nothing is lost
