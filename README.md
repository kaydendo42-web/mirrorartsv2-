> **Workspace update (13 September 2026):** The active source is the verified live V2 design, with Daisy's workshop revisions. Local preview: http://127.0.0.1:3100. The user reviewed this version and authorised its push and deployment to `kaydendo42-web/mirrorartsv2-`. See `docs/LOCAL-V2-WORKSHOPS.md` (from the application root) for the source and workspace history. Earlier preview addresses below are historical.

# Mirror Arts Education — redesign

The Aspire Studio redesign preview for Mirror Arts Education. This is a separate project from the original website, preserving its wording, page structure, component order, gold colour (`#C9A227`) and original logo.

Repository: https://github.com/kaydendo42-web/mirrorartsv2-

Hosted redesign: https://mirrorartsv2.vercel.app

School domain: https://www.mirrorartsedu.com.au (the bare domain redirects here).

`main` is the default GitHub branch and the production branch for the Vercel project `mirrorartsv2`. Pushing to `main` triggers its production deployment. The school domain is already attached to this project in Vercel. The original local source folder remains separate and unchanged.

## Run locally

Install Node.js 24 LTS, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

For a production build:

```sh
npm run build
npm run start
```

To use the original preview address on this Mac:

```sh
npm run start -- --hostname 127.0.0.1 --port 3101
```

## Checks

```sh
npm run lint
npm test
```

## Project guide

- `app/`: pages, shared layout, styles and enquiry action.
- `components/`: navigation, content components, animation and image treatments.
- `lib/content/`: existing course, faculty, production and school content.
- `public/assets/`: original logo, photography and video.
- `DESIGN.md`: visual system and component design decisions.
- `research/`: reference analysis, design plans and dated verification reports.
- `PREVIEW-README.md`: review notes for the local preview.

## Deployment and enquiry status

This repository contains the redesigned source and assets and is linked to the Vercel project `mirrorartsv2` in `kaydendo42-webs-projects`. The original local source folder remains untouched. Deployment history and build status are available at https://vercel.com/kaydendo42-webs-projects/mirrorartsv2.

The enquiry form validates entries but does not deliver them to an inbox. A delivery integration must be connected before accepting live enquiries. No credentials or environment files are included.

Installed dependencies, generated builds, the local responsive inspection utility and machine-specific original-project checks are excluded from Git. Research reports describe the checks performed at their recorded stage; they are not a live deployment status.
