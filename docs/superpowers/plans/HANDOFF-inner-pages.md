# Handoff — what is left on the inner-pages plan

**Rewritten 8 Aug 2026, at the end of the session that completed tasks 15–25.**
Read this, then `docs/STATE.md`.

The previous version covered tasks 15–26 and is in git history at `2897ce4`.

---

## Start here

```
Branch:  feat/inner-pages   (cut from 6d1f00f on main)
Tree:    clean
Checks:  npm test → 50 pass · npm run build → clean, 28 URLs · npm run lint → zero warnings
Links:   npx linkinator http://localhost:3000 --recurse --skip "/zh|facebook.com" → 622 links, 0 broken
```

Work in the repository directory. **Do not use a worktree** — `media/` holds 4.8 GB of video
masters, it is gitignored, and nothing in a worktree would have it.

| File | What it is |
|---|---|
| `docs/STATE.md` | Project state. Rewritten 8 Aug; read it after this |
| `docs/superpowers/plans/2026-08-07-inner-pages.md` | The 26-task plan |
| `.superpowers/sdd/2026-08-07-inner-pages/progress.md` | **The ledger.** Gitignored, on disk. Every finding, deviation and client question, task by task. Long and worth reading in full |
| `content/OPEN-QUESTIONS.md` | Client questions, 34 items |
| `content/MIRROR-ARTS-EDUCATION.md` | Every fact about the business. Source of truth for all copy |

---

## What is done

**Tasks 1–25 are complete.** Tasks 1–6 ran the full subagent loop with independent review.
**Tasks 7–25 were done inline by the controller with no independent review** — subagent
dispatch has been blocked by the account's monthly spend limit since task 7.

Twenty-eight URLs, listed in `docs/STATE.md`. Everything builds, lints and tests clean.

---

## Task 26 is what remains, and most of it needs a human

Steps 3, 4 and 5 are done:

- **Link check** — 622 links crawled, zero broken. It found a real one: the homepage's
  Spring Festival card pointed at `/stage/spring-festival-gala`, which is not a route.
- **stop-slop over `lib/content/`** — clean. Zero slop vocabulary across the content layer and
  every page. Three notes that talked about the site rather than the school were cut.
- **`docs/STATE.md`** — rewritten.

The deferred-minors table from the last handoff is also swept, in `61b5d19`. Three remain and
each is a decision rather than a fix: `--arch` is declared but never consumed, the carousel
double-subscribes to Embla without a correctness bug, and three top-level images are misnamed
for their contents (renaming them touches the homepage sections that use them).

**Steps 1 and 2 — the real-browser and keyboard passes — cannot be done in this sandbox.**
That is proven, not assumed. `docs/STATE.md` lists what the sandbox cannot do and what is
owed because of it. The short version:

1. Real key events never reach the page. A bare `<button>` with its own `keydown` listener
   recorded nothing under Enter or Space, while `.click()` on the same element worked. So
   **no keyboard behaviour on this site has ever been tested**, only its ARIA and its click
   path.
2. The tab reports `visibilityState: "hidden"`, so autoplay is suspended, `animationend` never
   fires, and CSS transitions are throttled. Six autoplaying loops on `/stage` and the
   lightbox's unmount are unverified for that reason.
3. Third-party frames are blocked, so nobody has watched the Google map paint.
4. `img.naturalWidth` lies — it reported 156×132 for an image that decodes at 402×341 from its
   own URL in the same page. Size images against the files on disk.
5. `resize_window` does not shrink the viewport. Every page here was checked at 375px through
   a same-origin iframe, which gives a real 375px CSS viewport but not touch, DPR or `dvh`.

---

## How to run what is left

**Work inline. Do not dispatch subagents.** Each dispatch starts cold and re-derives context;
that is what exhausted the spend limit at task 7.

For the real-browser pass, open a normal Chrome window on `http://localhost:3000` and walk the
28 URLs at 375px, 880px and 1440px. The list in `docs/STATE.md` under "What is still owed" is
the checklist. Then tab through the whole site without touching the mouse.

---

## Conventions that are load-bearing

Break these and things fail silently rather than loudly.

**Imports inside `lib/content/`** use an explicit `.ts` extension. From `app/` or
`components/`, import without an extension via `@/lib/content/...`.

**`--font-sans` and `--font-disp` must stay in `@theme`, never `@theme inline`.** Both
typefaces are injected at runtime by `app/layout.tsx`; `@theme inline` resolves at parse time.

**Never redeclare `--color-muted` in `@theme inline`.** It is one of the nine site colours
(`#4A4A4A`), read via `--muted` in ~30 rules.

**Gold is never a large area.** Type, hairlines and small fills only. The per-course accents
behave identically.

**shadcn supplies behaviour, our CSS supplies the look.** Keep every `data-[state=…]`,
`aria-*` and Radix prop in `components/ui/`. `AccordionTrigger` takes a `heading` prop for the
level, because Radix's own Header is always an `h3`.

**Never name or pick an image from its filename or its page context.** Open it and look. That
rule has been broken four times in this repo's history and caught four times — most recently
on 8 Aug, when the homepage's Born to Fly card turned out to be showing a photograph of the
Belt & Road speech competition.

**Every Chinese string carries `lang="zh-Hans"`.** `components/shared/han.tsx` exports
`withHanSpans()` for content strings that mix both languages in one field. `SectionHead`'s
`eyebrow` takes a ReactNode so a Chinese label can carry the attribute.

**New client-facing data goes in the content layer, not a second literal in a component —
unless the component is a client component.** `app/page.tsx` is `"use client"`, so what the
homepage imports ships to the browser, and properties of one exported object do not
tree-shake. `lib/courses.ts` and `components/sections/stage.tsx` stay literals for that
reason, with tests or comments holding them honest.

**A shared component cannot claim generic element ids.** `EnquiryForm` used `id="wechat"` and
collided with `/contact`'s own WeChat anchor. Field ids are namespaced `enq-*`.

**Australian spelling. No invented facts** — every claim traces to a line in
`content/MIRROR-ARTS-EDUCATION.md`. Nothing under `prototype/` gets edited. Do not
reintroduce framer-motion.

**`next-env.d.ts`** flips between `.next/types/` and `.next/dev/types/` depending on whether
`build` or `dev` ran last. Restore it with `git checkout -- next-env.d.ts` before committing.

---

## Client questions worth chasing first

- **27 — four teachers have a poster card and no entry anywhere.** Lindy Zhang, Joyce Wu, Toni
  Cao and Shanshan appear in no document we hold. No faculty entries were invented for them.
- **2 — the China Daily results are in the client's own footage**, projected on screen at
  1:02–1:19 of `media/2025-belt-and-road-speech-competition.mp4`, with students named. Nothing
  published: it is a final with entrants from many schools, so the video cannot tell us which
  students are Mirror's, and no consent is held either way.
- **Room 1 versus Room 2.** The studio-hire poster heads one section "Room1 32M² & Room2 47M²"
  and prints two uncaptioned photographs. `venue.ts` pairs them by the poster's reading order
  and says so. Do not let a later task "tidy" the filenames.
- **Which gala.** `assets/stage/gala-hosting.jpg` shows a Spring Festival gala but not which
  one, and Mirror has been involved in three. It is assigned to no page.
- **The two email addresses.** The contact poster prints the `mirrorartsedu.com` form, so the
  studio-hire poster's `mirrorartseducation.com` is the outlier. Worth confirming with Rachel.

The pre-launch gates are in `docs/STATE.md`. The one that matters is written parental consent
for the two AMEB reports, which now render on two pages.
