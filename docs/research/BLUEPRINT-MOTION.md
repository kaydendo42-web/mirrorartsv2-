# Blueprint motion audit — rushd.sch.id

Measured from the live site and the saved source, 6 Aug 2026. Supersedes the
Global Explorers files in this folder.

---

## The thing to understand first

**There are no CSS transitions on that page.** A sweep of every element returns an
empty set for `transition-duration`; the only non-zero timing values are the browser
defaults sitting unused behind `transition-property: all`.

Every piece of motion is JavaScript, driven by Framer Motion — 27 elements carry
`will-change: transform`. This is why "just use the same code" cannot work: the markup is
generated React with hashed class names and UUID design tokens (`--token-2ef2870a-…`),
and the behaviour lives in their runtime, not in stylesheets we could read and adapt.

What the source *is* good for is exact values. Those are below, with what we did about each.

---

## Measured values

| Property | Blueprint | Ours | Note |
|---|---|---|---|
| **Reveal rest state** | `translateY(30–35px)`, `opacity: 0` | was `18px` → **now `32px`** | The big one. Short travel reads as a twitch; longer travel reads as intent |
| **Reveal trigger** | Enters viewport, once | Same (IntersectionObserver) | Architecture already matched |
| **Box shadow** | Effectively none — 2 elements, `rgba(0,0,0,0.25) 0 1px 2px` | None | Both flat. Depth comes from colour, not elevation |
| **Letter spacing, display** | `-0.5px` (43×), `-1px`, `-1.2px` | `-0.018em` to `-0.022em` | Equivalent; ours scales with size, theirs doesn't |
| **Border radius** | `15px`, `20px`, `100px`, `1000px` pills | Arch + pills only | **Deliberate divergence.** The arch is Mirror's signature; generic rounded cards would bury it |
| **Colour wash over media** | `rgba(255, 85, 0, 0.79)` | `rgba(20, 20, 20, 0.88)` | Same technique, our palette |
| **Opening title card** | `position: fixed`, `z-index: 1`, never dismisses — content rides over it | Real intro overlay that lifts | **Deliberate divergence**, at Kayden's direction. Better behaviour |
| **Line height, display** | `50px` / `60px` / `72px` at their sizes | `1.04`–`1.2` unitless | Ours is responsive; theirs is fixed per breakpoint |

---

## Behaviours worth copying, and their status

| Behaviour | Status |
|---|---|
| Full-height layers scrolled over by the next | ✅ Sticky stack |
| Wash lets the media behind stay faintly legible | ✅ |
| Content behind the wash fades as it arrives | ✅ Hero copy fades on scroll |
| **The bar fades out under the wash too** | ✅ Added 6 Aug — the wash is a held statement and only reads as one if nothing competes |
| Serif italic on one or two emphasis words per headline | ✅ |
| Staggered reveals within a group | ✅ 35–110ms depending on group size |

---

## Where we should not follow them

- **Rounded cards everywhere.** Their 15px radius is generic. Mirror owns an arch — logo,
  existing team cards, proscenium — and it only works as a signature if it isn't competing
  with a second rounding language.
- **A title card that never leaves.** Theirs is a fixed layer you scroll past. Ours holds,
  then lifts, and never blocks: 4s ceiling, 1.4s floor, once per session.
- **Their palette discipline.** They can flood a screen with `#FF5400` because it is a flat
  brand colour. Mirror's gold is a gradient mark and goes cheap at scale, so gold stays as
  type, hairlines and small fills.

---

## Still to check

- Hover states on their cards — not yet sampled under a real pointer
- Whether their nav dropdown has an entrance animation
- Mobile behaviour of the sticky stack on their site
