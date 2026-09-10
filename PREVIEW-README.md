# Mirror Arts — Aspire Studio design preview

Open **http://127.0.0.1:3101/** on this Mac. This is the production build of a separate copy; the original project has not been modified or linked to any new deployment.

The hosted redesign is **https://mirrorartsv2.vercel.app**, also served on the project's already configured school domain **https://www.mirrorartsedu.com.au**. Its production source is the repository's `main` branch.

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
- AMEB at `/stage#ameb` now pairs speech and vocal photographs with a pulsing waveform; CEFA at `/stage#cefa` uses a folded-paper theatre and an existing production photograph. Both artworks pause offscreen, respect reduced motion and provide a pause control.
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
The designated GitHub repository is https://github.com/kaydendo42-web/mirrorartsv2-. This copy has its own Git history and excludes the original Git repository, deployment linkage and environment secrets. The separate Vercel project is `mirrorartsv2`, tracking `main` for production. Enquiry delivery still requires an integration before accepting live enquiries; no test enquiry was sent. The original local source folder remains unchanged. Vercel's existing domain configuration publishes this redesign on the school domain as well.

Publishing was configured using Vercel CLI 59.15.1 through `npx`; the global installation was not changed. Upgrading that global installation is recommended: `npm i -g vercel@latest` (or `pnpm add -g vercel@latest`).
