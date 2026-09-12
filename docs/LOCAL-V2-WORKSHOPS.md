# Local V2 workshop revision — 13 September 2026

## Correct source

The live domain redirects to `https://www.mirrorartsedu.com.au`, served by Vercel project `mirrorartsv2` (deployment `dpl_EjoXUUd3hxAk9v39XAwyW2H2iBVQ`). Its source is `https://github.com/kaydendo42-web/mirrorartsv2-`, commit `a0479bc153dac6af6c0b135a52c178e55df25501`. Deployment metadata and GitHub records were read without modifying them.

The former Updated Website folder was the cream design from the older repository. Its complete contents, including uncommitted work, are preserved in `../../Original Website/Previous local build - cream design/`. The active folder is now the verified V2 source export. Root Git history and remote remain unchanged; there is no nested repository or deployment linkage in this active source.

## Local work

- Local preview: `http://127.0.0.1:3100/workshops`, started by the root `Start Website.command` launcher.
- Daisy's `../../Revision/workshop1.pdf` supplies incursions, excursions, customised adult and birthday parties, plus five featured activities.
- The workshop revision uses V2's existing PageHero, condensed headings, plum/lilac/gold colours, animated fan composition and ImageFrame effects. Shared V2 styles and the other page sources remain intact.
- Adult party restrictions remain specific to that audience. The updated offers supersede the old workshop catalogue and its age bands.
- All five supplied JPEG posters retain their extracted bytes. They can be enlarged with the existing image dialog; editable headings and summaries provide readable supporting content. Hashes are in `workshop-image-sources.json`.
- Workshop navigation now links to incursions, excursions and customised parties. Existing schools and workshop anchors are retained.
- Workshop enquiries open an email to the school's existing address.

## Publication

After reviewing the correct V2 preview, the user explicitly authorised pushing the updated website to `kaydendo42-web/mirrorartsv2-` and deploying it on 13 September 2026. This supersedes the earlier instruction to keep the draft local for this release.

Release from a clean checkout of that V2 repository, preserving the application at the repository root. Its `main` branch triggers production deployment to the existing Vercel project `mirrorartsv2`. The workspace root still belongs to the earlier cream-site repository and must not be pushed as part of this release. No domain or project-root changes are needed.

## Verification

- All 64 content tests pass; ESLint passes.
- Local production build succeeds, including TypeScript and all 34 generated pages.
- Before edits, local and live Courses pages reported the same Barlow Condensed heading font and exact lilac background (`rgb(185, 173, 232)`). Shared V2 CSS, layout, motion and other page files remain byte-identical to the deployed source.
- Desktop and 390px phone reviews show no horizontal overflow. Excursion and party jump links reach the correct sections below the fixed header. The supplied poster opens and closes in the existing image dialog; no broken loaded images were observed.
- Original poster hashes verified against the previously extracted client artwork. The original PDF remains in Revision.
