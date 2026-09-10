# Mirror Arts — Aspire Studio design preview

Open **http://127.0.0.1:3101/** on this Mac. This is the production build of a separate copy; the original project has not been modified or linked to any new deployment.

## Start again later
From this preview directory:

```sh
npm run start -- --hostname 127.0.0.1 --port 3101
```

After changing source, run `npm run build` before starting it. For development, use `npm run dev -- --hostname 127.0.0.1 --port 3100`.

## Review
- Begin at the homepage: opening film, welcome transition, four discipline panels, campus gallery and enquiry area.
- Compare the Courses, Faculty, Stage, Workshops, Venue hire and Contact pages using the main navigation.
- The original gold is #C9A227. The new identity uses condensed display typography, ink, lilac and burgundy, the original Mirror Arts logo and restrained motion.
- The header, footer and intro now use the original `/public/assets/logo.png` artwork. Subpage openings use a short three-panel stage reveal; portraits, course galleries, production stills and room photography share a shuttered image frame, and portrait/still frames open through the existing accessible lightbox.
- The latest pass adds a floating photo collage at `/about#school`, an animated paper fan at `/workshops#schools`, alternating faculty and room layouts, and angled photo mounts across galleries. Artwork includes a pause control. Partner logo rectangles and the dark exam text are corrected.
- Phone and tablet layouts are available in the local inspection tool at `/__preview/index.html`; this utility is excluded from Git and is not part of the published source.

## Documentation
- `research/REDESIGN-PLAN.md`: reference analysis, direction and full component plan.
- `DESIGN.md`: the implemented visual system.
- `research/VERIFICATION.md`: checks and limitations.
- `research/FINISH-REVIEW.md`: independent review and correction verdict.
- `research/preservation-check.json`: original files unchanged; all page files and content modules preserved in the preview.
- `research/component-pass/PLAN.md`: deeper template research and the implemented component motion thesis.
- `research/ART-DIRECTION-PASS.md`: the latest image-composition changes and their verification.

## Publishing
The designated GitHub repository is https://github.com/kaydendo42-web/mirrorartsv2-. This copy has its own Git history and excludes the original Git repository, deployment linkage and environment secrets. No Vercel deployment has been made. Enquiry delivery requires an integration before launch; no test enquiry was sent. Keep the existing production site unchanged during review.

Before Vercel publishing, upgrading the installed CLI is recommended for compatibility: `npm i -g vercel@latest` (or `pnpm add -g vercel@latest`). No CLI upgrade has been made during this preview task.
