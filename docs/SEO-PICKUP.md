# SEO / AEO one-time audit — pickup

**Executed 22 Sep 2026.** Kayden approved the design below ("Do all as you can"); the plan is
`docs/superpowers/plans/2026-09-22-seo-audit-and-fixes.md`, the record is
`docs/seo-audit-2026-09-22.md`, and `docs/STATE.md` has the summary. Still open after the
release: Search Console / Bing verification tokens (→ `app/layout.tsx` `verification`), the
apex → www 308 (Vercel domain, blocked by the session's permission policy — one-liner in the
audit doc), the old `mirrorartsedu.com` redirect and the Google Business Profile (client).

**Written 21 Sep 2026 by Claude with Kayden.** What follows is the state at the end of the
planning conversation, kept as the record of what was decided and why.

## What was decided

- **Scope:** one-time audit + quick-win fixes. Not a monthly thing. Not doing: keyword tooling,
  backlinks, content rewrites, `/zh`, homepage layout.
- **`open-seo-mcp-skills` (github.com/Ryze-AI-Adgent) — rejected.** It is eight short prompt
  files that only call the Ryze MCP connector (GSC / GA4 / DataForSEO via a third-party
  workspace). No on-page, technical or schema knowledge. Its own `seo-audit` skill refuses to
  run without Search Console. Wrong tool for a fresh site with no GSC. Clone sits in the
  session scratchpad only; nothing installed.
- **Skeleton to use instead:** the installed `marketing:seo-audit` skill (full on-page /
  technical / schema checklist, tools optional) plus a manual crawl of code and live site.
- **Canonical host = `www`.** Vercel already serves `https://www.mirrorartsedu.com.au` and
  307s the apex to it. Code will change to match; no DNS / Vercel domain change.
- **No Search Console** exists or access is unknown. Audit is crawl + code based. GSC
  verification goes on the off-site checklist for the client.
- Brainstorming was at the approval gate (bounded path). Kayden had not yet said yes to the
  design below — confirm before touching code.

## Findings so far (5-minute pass, all confirmed on live www)

| # | Issue | Severity |
|---|---|---|
| 1 | `SITE_URL` in `lib/schema.ts` is the apex `https://mirrorartsedu.com.au`. Live serves on `www`; apex 307s to it. So all 28 sitemap URLs, the `Sitemap:` line in robots.txt, and every JSON-LD `url` / `@id` point at a redirecting host. Redirect is also 307 (temporary) — should be 308. | Critical |
| 2 | No `<link rel="canonical">` on any page | High |
| 3 | No `og:image` / Twitter card on any page — WeChat / Facebook / Instagram shares get no card | High |
| 4 | No `BreadcrumbList` schema although `PageHero` renders a breadcrumb `trail` on every page | Medium |
| 5 | No `FAQPage` — the main AEO lever is missing | Medium |
| 6 | Homepage default title is ~85 chars, truncates in SERP | Medium |
| 7 | `app/sitemap.ts` sets `lastModified: new Date()` on every build — noise | Low |
| 8 | Google Business Profile for the two campuses: unknown. GSC: none. | Off-site |

What is already good: title template, per-page descriptions, `EducationalOrganization` +
`Course` + `Person` + `CreativeWork` JSON-LD built from `lib/content`, robots, sitemap,
one H1 on the homepage, favicon set.

## Design awaiting approval

Order: audit → fixes → verify → ship.

**1. Audit.** `next build` + `next start`, crawl all 28 routes locally and on live www. Per page:
title length, description, single H1, heading order, image alt, internal links / 404s, JSON-LD
validity, OG / canonical presence. Lighthouse CWV on four template pages (home, a course, a
stage case study, contact). Write `docs/seo-audit-2026-09-21.md` — findings table, what was
fixed, off-site checklist (GSC verify + sitemap submit, GBP for both campuses, Bing
Webmaster). Optional client-facing artifact page.

**2. Fixes.**

| Change | Where |
|---|---|
| `SITE_URL` → `https://www.mirrorartsedu.com.au` | `lib/schema.ts` — fixes sitemap, robots and all JSON-LD at once |
| Canonical per page | `alternates.canonical` in each of the 13 page `metadata` / `generateMetadata` exports. Add a test in `lib/content/content.test.ts` that walks `app/` and asserts canonical = route (same pattern as the existing sitemap test) |
| OG image | Root: static `app/opengraph-image.png`, 1200×630 crop of an existing hero still. Course and stage pages: `openGraph.images` pointing at their existing poster / hero asset. No `ImageResponse` |
| `BreadcrumbList` | Emit from inside `PageHero` using its `trail` prop — one place, every page |
| `FAQPage` + visible FAQ block | New `lib/content/faq.ts`. Answers derived only from existing site copy (age, trial class, languages, campuses, exam prep, class length). Render on contact and course pages. Flag for client review in the audit doc |
| Homepage title ≤ 60 chars | `app/layout.tsx`; suburbs move to the description |
| Sitemap `lastModified` | Remove `new Date()` |
| Redirect 307 → 308 | Vercel domain setting on the `mirrorartsv2` project — via Vercel MCP if it exposes it, else a one-line instruction in the audit doc |

**3. Verify.** `npm run build`, test suite, curl live head tags + JSON-LD after deploy, Rich
Results test URLs listed in the doc.

**4. Ship.** V2 release procedure (scratch clone of `mirrorartsv2-` + rsync — see
`docs/LOCAL-V2-WORKSHOPS.md` and the memory note). Ask before pushing; the earlier
authorisation covered the workshop release only.

## Next session, in order

1. Read this file and `docs/STATE.md`.
2. Confirm the design above with Kayden (or take a changed version).
3. Read `node_modules/next/dist/docs/` on `metadata` / `generateMetadata` / `opengraph-image`
   before writing any of it — Next 16.3 conventions differ from training data.
4. Run the audit, then the fixes, then verify, then ask to ship.

## Useful commands

```bash
cd "Updated Website"
npm run build && npm run start          # local crawl target
npm test                                # content.test.ts and friends
curl -sS -D - -o /dev/null https://mirrorartsedu.com.au/       # 307 → www today
curl -sS https://www.mirrorartsedu.com.au/sitemap.xml | grep -o '<loc>[^<]*'
```
