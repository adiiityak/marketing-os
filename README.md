# LeadSquared AI OS

Source for the LeadSquared marketing AI OS:

- **Asset Library dashboard** (claude.ai artifact): library, ratings, Content Repository, Template Studio.
- **Template Studio** (`src/studio`): fill a LeadSquared template, remove speaker photo backgrounds in the browser, download a PNG or push an editable design into Figma.
- **Feedback memory**: every rating comment is stored in the `feedback` collection; Studio briefs and the plugin skills apply it to the next generation.
- **Plugin** (`plugin/`): the LeadSquared Marketing OS Cowork plugin (skills and agents).

## Build

```bash
npm install
node tools/bg-gen.cjs        # render template backgrounds
node tools/build.mjs         # dist/asset-library.html = published v16 + patches + studio module
node tools/e2e.cjs           # end-to-end test with a mocked window.claude
```

`orig/v16.html` is the published dashboard the build patches. Patches are text replacements that fail loudly when they stop matching.

## Templates

Each template in `src/studio/templates` is a module: `{id, name, group, industry, w, h, source{file,key,node}, fields, speakers, css, html}`. HTML uses a small Mustache subset (`{{x}}`, `{{{x}}}`, `{{#list}}…{{/list}}`, `{{^x}}…{{/x}}`). Elements with `data-fit="minPx"` shrink their text to fit.

Source Figma files are read-only. Studio writes only into the "LSQ OS Generated Output" Figma project.
