# Design tokens — blueprint measured, Mirror remapped

Source: `https://globalexplorersearlylearning.com.au/` (Framer, published 31 Jul 2026),
measured 2026-08-04 via `getComputedStyle` on the live page at 1440px, plus the CSS parts
of `Blueprint template.mhtml`.

**Mode: re-skin.** We keep the blueprint's *structural* tokens — spacing scale, type ramp
ratios, container widths, radii, breakpoints, motion easings. We replace palette, fonts,
copy and imagery with Mirror's own. No blueprint CSS, fonts, images or copy ship in our build.

---

## 1. Breakpoints

The blueprint's own three-tier system, taken from its media queries:

| Tier | Range | Our name |
|---|---|---|
| Desktop | `≥ 1200px` | `desktop` |
| Tablet | `810px – 1199px` | `tablet` |
| Phone | `≤ 809px` | `phone` |

Design and QA at **1440 / 834 / 390**. Keep the 810 and 1200 boundaries exactly — every
layout switch in the blueprint hangs off them.

---

## 2. Colour

### Blueprint (measured, by frequency)

| Role | Value | Uses |
|---|---|---|
| Primary red | `rgb(217, 56, 50)` `#D93832` | 45 |
| Primary navy | `rgb(52, 62, 147)` `#343E93` | 41+25 |
| Page cream | `rgb(248, 246, 240)` `#F8F6F0` | 17 |
| Card cream | `rgb(253, 253, 251)` `#FDFDFB` | 28 |
| Body grey | `rgb(64, 64, 64)` `#404040` | 4 |
| Coral (blob) | `rgb(255, 102, 94)` `#FF665E` | 13 |
| Link blue | `rgb(0, 19, 189)` `#0013BD` | 8 |

Blob fills sampled: `#FAC7D8` pink, `#BFEAD6` mint, `#BEC3EF` periwinkle, `#FFB511` yellow,
`#80AF37` olive, `#806F8F` mauve, `#00918E` teal, `#FFEDC4` sand.

### Mirror remap

| Token | Value | Replaces | Notes |
|---|---|---|---|
| `--cream` | `#F7F4EF` | `#F8F6F0` | Mirror's own poster background |
| `--cream-card` | `#FDFCFA` | `#FDFDFB` | raised cards on cream |
| `--ink` | `#232323` | `#343E93` | dark band + heading colour |
| `--ink-soft` | `#4A4A4A` | `#404040` | body copy on cream |
| `--gold` | `#C9A227` | `#D93832` | primary CTA, eyebrow text, accents |
| `--gold-light` | `#E8D07A` | — | gradient stop, hover |
| `--gold-deep` | `#B8860B` | — | gradient stop, pressed |
| `--bronze` | `#A98A5F` | — | from teacher cards; name plates, dividers |
| `--mist` | `#DDE1EA` | — | from teacher cards; quiet panels |

**Contrast warning.** `--gold` on `--cream` is roughly 2.6:1 — it fails WCAG AA for body
text. Gold is for **large display type (≥ 24px bold), rules, icons and filled-pill
backgrounds with `--ink` text on top**. Never gold body copy on cream. Small text on cream
uses `--ink-soft`; small text on the charcoal band uses `--cream`.

### Course accent colours

From the nine course posters — these fill the orbital blobs, tint course-page headers and
colour-code the course cards. Values below are the poster hues normalised; confirm against
the originals in `extraction/assets/` before the build.

| Course | Token | Hex |
|---|---|---|
| English Drama | `--c-drama` | `#5BA7D9` sky blue |
| English Speech (AMEB) | `--c-speech` | `#E8862B` orange |
| Bilingual Hosting | `--c-hosting` | `#E2574C` coral red |
| Voice-over / Dubbing | `--c-voice` | `#E48AAE` pink |
| Vocal & AMEB | `--c-vocal` | `#4E9C6B` green |
| Choir | `--c-choir` | `#EFC03C` yellow |
| Musical Theatre | `--c-musical` | `#3B57A8` royal blue |
| Music Composition | `--c-composition` | `#6FA96B` green (lighter than vocal, so the two read apart) |
| Posture & Etiquette | `--c-posture` | `#7E6A9E` purple |

Each accent must pass 4.5:1 against whatever text sits on it. On the charcoal band the blobs
carry `--cream` text; check each one and darken the fill where it fails.

---

## 3. Type

### Blueprint ramp (measured)

| Role | Family | Size / line-height | Weight | Tracking | Case |
|---|---|---|---|---|---|
| Hero H1 | Playwrite AU NSW | `60.8px / 72.96px` | 400 | normal | — |
| Section H2 | Playwrite AU NSW Variable | `38.4px / 53.76px` | 400 | normal | — |
| Eyebrow (on light) | PP Pangram Sans Rounded Condensed Bold | `16px / 16px` | 700 | `1.6px` | UPPERCASE |
| Eyebrow pill | PP Pangram Sans Rounded Condensed Bold Italic | `14.4px / 14.4px` | 700 | `0.576px` | UPPERCASE italic |
| Nav / button | PP Pangram Sans Rounded Condensed Bold Italic | `19.2px / 19.2px` | 700 | `0.768px` | UPPERCASE italic |
| Body | PP Pangram Sans Rounded Semibold | `16px / 22.4px` | 400 | `-0.16px` | — |
| Script accent | Playwrite AU NSW | `17.6px / 31.68px` | 400 | `-0.528px` | — |
| Blob label | PP Pangram Sans Rounded Compact Bold Italic | `14.25 – 25.27px`, lh = size | 700 | — | UPPERCASE italic |

Two things to copy exactly: **line-height equal to font-size on every uppercase label**
(that's what makes the badges read as stamps, not sentences), and **1.4 line-height on body**.

### Mirror ramp

Same roles, same sizes, same tracking. Families change:

| Role | Family | Why |
|---|---|---|
| Display (H1, H2) | Script/serif display, weight 400 | Blueprint's Playwrite is an Australian school-handwriting face — charming for a nursery, wrong for a 6+ arts school selling exam credentials. Needs a script with more poise, or an elegant serif. **Font not yet chosen — first build task.** |
| Eyebrow / nav / button / blob label | Rounded geometric sans, condensed bold, italic | Direct match for PP Pangram Sans Rounded's role. Any humanist rounded condensed will do. |
| Body | Rounded geometric sans, 400 | Same family as above, regular weight. |
| Chinese (all roles) | Noto Sans SC / Source Han Sans SC | The Latin display face will not have CJK coverage. Chinese headings need a paired weight that holds up at 38px+. Test the pairing before committing. |

**Bilingual constraint the blueprint never had to solve:** every heading has to work in both
scripts. A script/cursive Latin face beside a Chinese sans looks broken unless the Chinese is
given its own treatment — heavier weight, slightly smaller optical size. Budget a real pass
on this; it is the single most likely place the restage falls apart.

`extraction/assets/` shows Mirror's own posters use a bold condensed Chinese headline face
and a serif for English bios. Prefer sourcing those actual fonts from the client
(`OPEN-QUESTIONS.md` #14) over guessing a substitute.

---

## 4. Space, radius, shadow

### Measured

| Token | Values (by frequency) |
|---|---|
| Container max-width | `1200px` (primary, 6 uses) · `1040px` (text column, 3) · `800px` · `600px` |
| Gap scale | `4 · 8 · 10 · 16 · 20 · 24 · 32 · 40 · 48 · 80` px |
| Radius | `999px` pills (42 uses) · `40px` large cards (22) · `64px` (5) · `24px` images (4) · `24px 24px 0 0` (4) · `12px 12px 20px 20px` (4) |
| Shadow | Barely used. One inset glow `rgba(217,119,87,0.7) 0 0 15px inset`. Depth comes from colour bands and radius, not shadow. |

### Rules carried over

- **Two containers only:** `1200px` for sections, `1040px` for prose. Do not invent a third.
- **Gap scale is a 4px base with jumps at 10 and 80.** The `10px` gap (44 uses) is the
  default inside components; `32px` between components; `80px` between a section's header
  block and its content.
- **Radius is bimodal:** interactive things are full pills (`999px`); containers are `40px`.
  Images are `24px`. Nothing in between.
- **Almost no shadow.** Resist adding any. Separation is done with the cream↔charcoal band
  alternation and generous radius.

---

## 5. What we do not take

Per the re-skin boundary: no blueprint CSS or JS, no Framer runtime, no PP Pangram Sans or
Playwrite font files lifted from their CDN (license them properly or substitute), no
photography, no logo, no copy. We take proportions, rhythm and interaction patterns —
which are not protectable and are exactly what the client asked us to reproduce.
