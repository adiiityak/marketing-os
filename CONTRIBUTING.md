# Contributing to the LeadSquared Marketing OS

This repo is the source of truth for the Asset Library dashboard, Template Studio and the `leadsquared-marketing-os` plugin. Anything that is live was built from `main`. Keep it that way, and two people can work on it without undoing each other's work.

Full background: the **LeadSquared Marketing OS Handbook** (Asset Library dashboard owner can share it) and `docs/marketing-os-handbook.html`.

## Access you need

| What | Why | Who grants it |
|---|---|---|
| GitHub collaborator with **Write** on `adiiityak/marketing-os` | Pull and push code | Repo owner (Settings › Collaborators) |
| **Edit** access to the Asset Library artifact | Publish new dashboard versions to the same link | Dashboard owner (Share menu) |
| **Can edit** on the LSQ OS Claude project | Same context and docs as everyone else | Project owner (Share) |
| GitHub linked to Claude (Settings › Connectors) | Let a Claude session clone, build and push | You |
| Figma connector, and **can edit** on "LSQ OS Generated Output" | Test Push to Figma, add output files | You, and the Figma project owner |
| Claude workspace **Owner or Admin** (optional) | Upload a new plugin version for everyone | Workspace Owner |

## The workflow, every time

Start each Claude session with the repo attached and say:

> Pull the latest from main, then …

and finish with:

> Build, run the tests, publish the dashboard to the same link, then commit and push.

In steps:

1. **Pull.** `git pull origin main`. Never start from an old copy or from the live page's HTML.
2. **Change.** Make the feature on a short-lived branch if it will take more than one session (`feat/carousel-templates`), otherwise on `main`.
3. **Build.** `node tools/build.mjs` writes `dist/asset-library.html`. The build fails loudly if a patch no longer matches; fix the patch rather than deleting it.
4. **Test.** `node tools/e2e.cjs` must end with `page errors: 0` and every step must print its result. For template work also run `node tools/render-test.cjs <template-id>` and compare the PNG in `tools/out/` with the Figma source frame.
5. **Publish.** Publish `dist/asset-library.html` to the existing dashboard URL (https://claude.ai/artifact/VjBC3ApxjuPr8V8vKYSaAx). Do not create a new artifact. See "Publishing" below.
6. **Commit and push** straight after publishing, with a message that says what changed for users. Merge your branch into `main` first if you used one.
7. **Tell the team** in one line what changed, and update the handbook if behaviour changed.

If you published but could not push, push before anyone else publishes. If two people are working at once, agree who publishes next.

## Setup

```bash
git clone https://github.com/adiiityak/marketing-os.git
cd marketing-os
npm install
node tools/bg-gen.cjs      # only needed after changing tools/bg-gen.cjs
node tools/build.mjs
node tools/e2e.cjs
```

Node 20+ and Playwright's Chromium are required. The cloud Claude environment already has both.

`tools/e2e.cjs` needs `repo/<index>.json` (the Content Repository index) for the repository checks. It is not in git because it lists internal file paths. Download the current one with the Artifact tool: read `repo/index` from the dashboard database to get `assetId`, then `Artifact action=read path=<assetId> out_dir=repo`.

## Where things live

| Path | What |
|---|---|
| `orig/v16.html` | The original dashboard bundle. The build starts from it and applies patches. |
| `tools/build.mjs` | Named text patches plus injection of the Studio module and the embedded plugin. |
| `src/studio/` | Template Studio: `Studio.jsx` (UI), `engine.js` (render, fit, PNG), `cutout.js` (background removal), `tofigma.js` (editable Figma push), `feedback.js` (feedback memory). |
| `src/studio/templates/` | One module per template, registered in `index.js`. Backgrounds in `../bg`, sample speakers in `../samples`. |
| `plugin/leadsquared-marketing-os/` | Plugin source. Version in `.claude-plugin/plugin.json`. |
| `tools/` | Build, test, background generator, mocked runtime (`mock.js`). |
| `docs/` | Handbook. |

### Changing the dashboard itself (library, team, repository views)

Those parts are still the minified v16 bundle. Change them with a new `patch("name", from, to)` in `tools/build.mjs`: `from` must match exactly once. Keep patches small and named. If a change grows large, move that view into its own module under `src/` the way Template Studio was moved.

## Publishing

- Publish only `dist/asset-library.html` from a clean build of `main`.
- Leave `capabilities` out of the publish call so the stored declaration carries forward. If you must restate it, restate all of it:
  `assets`, `db` (rules: `members` read interact/write admin, `members/{self}` write interact, `roles` read interact/write admin, `repo` write admin), `downloads`, `user` (`scopes: ["profile"]`), `mcp` (`Figma` › `use_figma`). Leaving one out removes it for everyone.
- The background-removal files are published next to the page under `mp/` (`selfie_segmentation.js`, `selfie_segmentation_solution_simd_wasm_bin.js`, `selfie_segmentation_solution_simd_wasm_bin.wasm`, and the `.tflite` and `.binarypb` model files renamed with a `.wasm` suffix). Re-send them only if they change; files left out of a publish are kept.
- After publishing, open the Create page once and check that the gallery loads.

## Adding a Template Studio template

1. Get the Figma frame link. Source files are **read-only**: look with screenshots and design context, never edit them.
2. Write `src/studio/templates/<id>.js` following `plugin/.../lsq-template-studio/references/template-format.md`: exact frame size, absolute positions, Poppins/Inter, `data-fit` on text boxes, backgrounds as image files.
3. Speaker photos: set `speakers.cutout: true` when the source shows people without a photo background.
4. Register it in `templates/index.js` with the right `group` and `industry` (one of Education, Healthcare, Fintech / BFSI, Manufacturing, Events India, Events US).
5. Render, compare with the Figma screenshot, fix, then build, test and publish.
6. Add it to `lsq-template-studio/references/templates.md` in the plugin.

## Changing the plugin

1. Edit skills under `plugin/leadsquared-marketing-os/skills/`. Skill descriptions must not contain `<` or `>`, and plain YAML descriptions must not contain `: ` (the uploader rejects both).
2. Bump the version in `.claude-plugin/plugin.json`.
3. Package: `cd plugin/leadsquared-marketing-os && zip -qr ../../dist/leadsquared-marketing-os.plugin . -x "*.DS_Store"`.
4. Rebuild the dashboard so its setup step offers the new file, publish, commit, push.
5. A Claude workspace Owner or Admin uploads the `.plugin` in Admin settings. Until then, teammates keep the old version.

## Rules that never change

- Team Figma files are read-only. Claude and the Studio write only into the "LSQ OS Generated Output" project.
- Never commit secrets, tokens, the Content Repository index, or anyone's photos other than the bundled samples.
- Do not delete or rewrite other people's `feedback` documents or assets from code.
- Keep claims rules: only `[V]` numbers from the claims ledger in templates or defaults.
