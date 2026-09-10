# What Claude Code can bring to this project

An honest inventory of what's connected in this session, and what's actually useful
for rebuilding mirrorartsedu.com. Written 2026-07-31.

---

## Directly useful for this build

### Design & front-end
| Capability | What it does here |
|---|---|
| **`frontend-design` skill** | Guidance for distinctive, non-templated UI — typography, aesthetic direction, avoiding "AI website" defaults. Use this when we shape the Framer template into Mirror's identity. |
| **`website-cloning` skill** | Recon → spec → section-by-section rebuild. Screenshots + computed-CSS token extraction from a live URL. **This is the exact workflow for lifting the Framer template's design system.** |
| **`vercel:shadcn` skill** | shadcn/ui components, theming, Tailwind integration — if we go the Next.js route rather than static HTML. |
| **`dataviz` skill** | Only if we build a results/outcomes chart. Low priority. |
| **Google Stitch MCP** (`mcp__stitch__*`) | Generate UI screens from text, create/apply a design system, generate variants. Genuinely useful for exploring layouts fast before committing. |

### Content & copy
| Capability | What it does here |
|---|---|
| **`humanizer` / `stop-slop` skills** | Strip AI tells from copy. Important — this site's English needs to read like a Melbourne arts school wrote it, not a translation engine. |
| **Translation** | I can produce the English half of a bilingual site directly from the Chinese source, and clean up the existing broken English (the site's current English has run-together words from bad PDF extraction). |
| **Vision / OCR** | Already used it — recovered all 9 course descriptions and 6 teacher bios that were locked inside PNG posters. Can do the same for the partner logo sheet and any PDFs they send. |

### Images
| Capability | What it does here |
|---|---|
| **nano-banana MCP** (`generate_image`, `edit_image`, `continue_editing`) | Gemini image generation and editing. Practical uses: clean up/upscale hero imagery, generate placeholder art for sections awaiting real photos, remove the Xiaohongshu watermark from posters, produce OG/social share cards. Needs a Gemini token configured. |
| **Canva MCP** | Read/edit/export Canva designs, brand kits, brand templates. **If Rachel and Daisy made those course posters in Canva, we can pull the source files and export clean assets instead of re-cutting web JPGs.** Worth asking them. |

### Build, deploy, hosting
| Capability | What it does here |
|---|---|
| **Vercel MCP + CLI + skills** | Deploy, preview URLs per branch, env vars, domains, analytics, runtime logs, rollbacks. Preview deploys are how Rachel and Daisy review each section without us emailing screenshots. ⚠️ Local Vercel CLI is outdated (51.8.0 → 58.4.4) — worth upgrading. |
| **`vercel:nextjs`, `vercel:deployments-cicd`, `vercel:env-vars`, `vercel:vercel-storage`, `vercel:marketplace`** | Framework and platform guidance, plus provisioning real integrations (forms, email, CMS) rather than mocks. |
| **GitHub CLI** (`gh`, authenticated as `kaydendo42-web`) | Repos, PRs, issues, Actions. Already used to create this repo. |
| **Node 24 / npm 11** | Local tooling, the scrapers in `scripts/`. |

### Browser automation
| Capability | What it does here |
|---|---|
| **Claude in Chrome MCP** | Drive a real Chrome tab: navigate, screenshot, read the DOM/accessibility tree, extract computed CSS, read console + network. **This is how we grab the Framer template's HTML/CSS once you've picked one**, and how we visually diff old vs. new. |
| **`claude-in-chrome` skill** | Wraps the above with the correct workflow. |

### Client comms & ops
| Capability | What it does here |
|---|---|
| **Gmail MCP** | Search threads, read messages, **create drafts** (I draft, you send — I can't send). Useful for the asset-request email to Rachel and Daisy. |
| **Google Drive MCP** | Search and read files they share — brand guidelines, photo folders, timetables. |
| **Google Calendar MCP** | Schedule the review checkpoints in the plan. |
| **Notion MCP** | If Aspire Studio runs projects in Notion — create the project page, track the open questions as a database. |
| **Artifacts** | Publish a private, shareable web page on claude.ai. Good for sending Rachel and Daisy a clickable content-audit or sitemap proposal without a deploy. |

---

## Process skills (how the work gets done)

- **`superpowers:brainstorming`** — structured exploration before building. Worth running properly on the IA and homepage narrative.
- **`superpowers:writing-plans`** / **`executing-plans`** — turn a spec into a plan with review checkpoints.
- **`superpowers:test-driven-development`**, **`systematic-debugging`**, **`verification-before-completion`** — evidence before claiming something works.
- **`superpowers:requesting-code-review`** / **`receiving-code-review`**
- **`superpowers:using-git-worktrees`**, **`dispatching-parallel-agents`**, **`subagent-driven-development`** — parallelise independent sections (e.g. build Courses, Faculty and Workshops pages simultaneously).
- **`/code-review ultra`** — multi-agent cloud review of a branch. You trigger it, not me.
- **`simplify`** — cleanup pass over changed code.
- **Background agents + `Monitor` + `/loop` + `schedule`/cron** — long-running or recurring work (e.g. nightly Lighthouse check on the preview URL).

---

## Also connected, not relevant here

**Shopify MCP** (full store management, GraphQL Admin API) — no e-commerce in scope unless
they want to sell workshop tickets or merch. Flagging it because *if* course payments come up,
this is a real option.

---

## Honest limits

- **I cannot send email, post publicly, or submit forms on your behalf** without you confirming
  each time. I draft; you send.
- **I can't enter passwords or payment details** anywhere, and won't create accounts.
- **Framer**: there's no Framer MCP here. You browse Framer and grab the HTML — I can't log into
  your Framer account. Once you paste/save the export, I take it from there.
- **The Chrome MCP needs per-site permission** granted in the extension before it can touch a page.
- **nano-banana needs a Gemini token** configured before image generation works.
- **83 MB of client images** are now in this repo. If it grows much past this we should move
  binaries to Vercel Blob or Git LFS.
