> ⚠️ **SUPERSEDED — 6 Aug 2026.** This plan targets the Global Explorers blueprint, which
> the client rejected, and a 14 Aug launch date that was released. It is kept for its risk
> register and nothing else. Current state of play: [`docs/STATE.md`](STATE.md).

# Mirror Arts Education — 2 week rebuild plan

**Start:** Fri 31 Jul 2026 · **Target launch:** Fri 14 Aug 2026
**Client:** Rachel & Daisy · **Agency:** Aspire Studio

---

## The goal

Replace a desktop-only, Chinese-only, GBK-encoded site — where every word of course and
teacher copy is trapped inside a 1 MB PNG — with a fast, bilingual, mobile-first site that
actually converts a Melbourne parent into an enrolment enquiry.

**The single measurable win:** a parent on a phone can find a course, understand it, see who
teaches it, and enquire — in under 60 seconds.

---

## Where we are right now (Day 1, done)

- ✅ All 76 pages scraped, GBK → UTF-8, raw HTML preserved
- ✅ 126 images downloaded (83 MB) with a source manifest
- ✅ All 9 course descriptions recovered by OCR from poster images
- ✅ All 6 teacher bios recovered by OCR
- ✅ Brand colour system and logo extracted
- ✅ Full technical audit — including 19 live wig e-commerce pages left over from the template
- ✅ Master content file: `content/MIRROR-ARTS-EDUCATION.md`
- ✅ Open questions for the client: `content/OPEN-QUESTIONS.md`
- ✅ Private GitHub repo created

---

## Critical path

Three things gate everything else. Chase them **today**:

1. **Kayden picks the Framer template** → without it there's no design system to build against.
2. **Rachel & Daisy answer the 🔴 questions** in `OPEN-QUESTIONS.md` → especially who Daisy is,
   the China Daily placeholder text, and domain/DNS control.
3. **EN/CN decision** → bilingual roughly doubles the copy work. Decide before Day 4.

Everything in Week 1 can proceed on assumptions if these slip. Week 2 cannot.

---

## Week 1 — Foundation & structure

### Day 1 · Fri 31 Jul — Extraction ✅ *(done)*
Scrape, OCR, audit, repo. Send the asset-request email to Rachel & Daisy tonight so the
weekend works for us.

### Day 2 · Sat 01 Aug — Framer template + design system
- Kayden browses Framer, picks a template, grabs the HTML export
- Run the `website-cloning` recon on it: screenshots at 3 breakpoints, extract computed CSS
  tokens (type scale, spacing, colour, radii, shadows, motion)
- Write `docs/DESIGN-SYSTEM.md` — the template's tokens **remapped to Mirror's brand**
  (gold `#C9A227`, cream `#F7F4EF`, charcoal, per-course accent colours)
- Decide the stack. Recommendation: **Next.js App Router on Vercel** — gives us i18n routing
  for EN/中文, image optimisation for 83 MB of photography, and preview URLs for client review.
  Static HTML is faster to start but we'll fight it by Day 6.

### Day 3 · Sun 02 Aug — Information architecture
- Sitemap proposal, published as an Artifact for Rachel & Daisy to click through
- Proposed structure:
  ```
  /                     Home
  /about                Story · timeline · leadership
  /courses              9 courses, filterable by the 4 categories
  /courses/[slug]       Real HTML copy (no more PNGs), duration, ages, term, teacher, CTA
  /faculty              6 teachers + leadership
  /workshops            15 workshops in 3 groups — schools & incursions
  /productions          Born to Fly · 笔画春秋 · Jungle Book · the galas
  /results              AMEB · CEFA · China Daily · competition wins
  /partners             AYACA · Venus Dance · 明心舞蹈 · CEFA · Chinese Museum
  /venue-hire           Currently an empty page — needs client input
  /contact              Two campuses, map, enquiry form, WeChat QR
  ```
- URL + redirect map from every old `doc_*/item_*/pro_*` URL → new URL (or 410 for the wig pages)

### Day 4 · Mon 03 Aug — Copy
- Rewrite all Chinese copy into clean HTML text (fix the 展和传播 typo)
- Write the English half — properly, not translated-sounding. Run `humanizer`/`stop-slop` over it
- Fix the broken English already on the site (words run together: "beginners of all ages to
  discover", "a nd" → "and", etc.)
- Course pages get real structure: strapline, ages, duration, term length, what's covered,
  outcomes, who teaches it
- ⛔ Leave the China Daily numbers blank until the client answers

### Day 5 · Tue 04 Aug — Build: shell
- Scaffold the project, wire the design system
- Header, footer, nav, EN/中文 toggle, mobile menu
- Homepage: hero, positioning, course category grid, featured productions, campuses, CTA
- First Vercel preview deploy → send the link to Rachel & Daisy

### Day 6 · Wed 05 Aug — Build: courses & faculty
- `/courses` index with category filter
- `/courses/[slug]` template × 9, driven by content files
- `/faculty` + teacher cards, keeping the gold/charcoal editorial feel from their posters
- Image pipeline: 83 MB of PNGs → optimised WebP/AVIF, responsive sizes

### Day 7 · Thu 06 Aug — Build: workshops, productions, results
- `/workshops` — 15 workshops, 3 groups. This is a genuine B2B offer to schools and should be
  presented as one, not buried
- `/productions` — case studies for Born to Fly, 笔画春秋, Jungle Book, the galas
- `/results` — certificates, competition wins, trust badges (CEFA sole-centre, AMEB, Trinity, ACIC)
- **Checkpoint: full site walkable on preview.** Review call with Rachel & Daisy.

---

## Week 2 — Polish, conversion, launch

### Day 8 · Fri 07 Aug — Partners, venue hire, contact
- `/partners` with individual logos (needs client files)
- `/venue-hire` — from zero; entirely dependent on client input
- `/contact` — both campuses, embedded map, WeChat QR, phone/WhatsApp/email
- **Enquiry form wired to a real service** (Resend or similar via Vercel Marketplace — not a mock)

### Day 9 · Sat 08 Aug — Conversion & SEO
- Real `<title>` and meta description per page (currently every page says `australianmirror`)
- Open Graph / Twitter cards, generated images
- `LocalBusiness` + `Course` + `Person` structured data
- `sitemap.xml`, `robots.txt`, canonical tags, `hreflang` for EN/CN
- Google Business Profile alignment — NAP consistency across both campuses
- **Kill the wig pages**: 410 responses, removal request in Search Console

### Day 10 · Sun 09 Aug — Responsive & accessibility
- Every page at 360 / 768 / 1280 / 1920
- Real text everywhere — no copy left in images
- Keyboard nav, focus states, alt text, colour contrast (the gold-on-cream combination needs checking)
- `prefers-reduced-motion`

### Day 11 · Mon 10 Aug — Performance
- Lighthouse ≥ 95 on mobile
- Image budget — the old site shipped ~1 MB PNGs per page; target under 200 KB
- Font loading, LCP, CLS
- Move the heaviest media to Vercel Blob if the repo gets unwieldy

### Day 12 · Tue 11 Aug — Client review round
- Full walkthrough with Rachel & Daisy on the preview URL
- Collect and triage feedback
- Copy corrections, Chinese proofread by a native speaker (**book this now** — neither of us should
  be the last set of eyes on the Chinese)

### Day 13 · Wed 12 Aug — Feedback + hardening
- Apply review feedback
- `/code-review ultra` on the branch
- Cross-browser: Safari, Chrome, Firefox, iOS Safari, Android Chrome
- 404 page, error states, form validation and spam protection (Vercel BotID)
- Analytics (Vercel Analytics + GA4 if they want it)

### Day 14 · Thu 13 Aug — Pre-launch
- DNS plan confirmed and TTLs lowered
- **Verify email on `mirrorartsedu.com` won't break** when we move the site — this is the classic
  way to ruin a launch day
- Full redirect map tested
- Backup of the old site archived (already have raw HTML + all assets)
- Go/no-go with the client

### Day 15 · Fri 14 Aug — Launch 🚀
- Point DNS, deploy to production
- Submit sitemap, request removal of the wig URLs
- Monitor runtime logs and analytics
- Handover doc: how to edit content, who to call

---

## Risks, and what we do about them

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Client asset delays** (logo vector, photos, video, partner logos) | High | Build with what we scraped as placeholders; swap in later. Never block on assets. |
| **China Daily placeholder text never gets filled in** | Medium | Ship the results page without that specific claim rather than with "XXX". |
| **Bilingual doubles the work** | High | Decide by Day 4. Fallback: ship Chinese complete + English for the top 5 pages, finish EN post-launch. |
| **Chinese copy needs native proofing** | Certain | Book a proofreader in Week 1, not Week 2. |
| **DNS/email breakage at cutover** | Medium | Audit MX records before touching nameservers. |
| **Venue hire page has zero source content** | High | If no client input by Day 8, cut it to a contact CTA. |
| **Photo consent for students** | Medium | Ask on Day 1. If unresolved, use wide/back-of-head shots. |
| **Scope creep — booking system, payments, portal** | High | Out of scope for 2 weeks. Phase 2. Say so early. |

---

## Explicitly out of scope (Phase 2)

Online enrolment with payment · student/parent portal · CMS for self-editing · blog/news ·
ticketing for galas and workshops · WeChat mini-program · email marketing automation

Worth quoting separately once the site is live.

---

## Definition of done

- [ ] Every page real HTML text — zero copy trapped in images
- [ ] EN + 中文 across the agreed page set
- [ ] Lighthouse mobile ≥ 95 across performance, a11y, best practices, SEO
- [ ] Every old URL redirects or 410s; wig pages gone from the index
- [ ] Enquiry form delivers to a real inbox, tested end to end
- [ ] Both campuses correct on the site and on Google Business Profile
- [ ] Client can find their own courses on Google under "Mirror Arts Education"
- [ ] Handover doc delivered
