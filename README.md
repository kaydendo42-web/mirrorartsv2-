# Mirror Arts Education — redesign

The Aspire Studio redesign preview for Mirror Arts Education. This is a separate project from the original website, preserving its wording, page structure, component order, gold colour (`#C9A227`) and original logo.

Repository: https://github.com/kaydendo42-web/mirrorartsv2-

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

## Preview status

This repository contains the redesigned source and assets. It is not linked to a Vercel project by this work, and the original website remains untouched.

The enquiry form validates entries but does not deliver them to an inbox. A delivery integration must be connected before accepting live enquiries. No credentials or environment files are included.

Installed dependencies, generated builds, the local responsive inspection utility and machine-specific original-project checks are excluded from Git. Research reports describe the checks performed at their recorded stage; they are not a live deployment status.
