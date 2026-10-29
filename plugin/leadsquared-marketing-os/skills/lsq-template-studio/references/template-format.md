# Template module format

```js
export default {
  id: "kebab-id", name: "Readable name", group: "Webinar banners" | "Social posts" | "Event creatives" | "Carousels" | "One-pagers and ebooks",
  industry: "Education" | "Healthcare" | "Fintech / BFSI" | "Manufacturing" | "Events India" | "Events US" | null,
  channel: "LinkedIn, Email", w: 1280, h: 720, theme: "dark" | "light",
  source: { file: "2025 Social post", key: "<figma file key>", node: "1234:567" },
  notes: "One sentence for the gallery card.",
  fields: [ { key, label, default, max, kind: "text" | "textarea" | "image" | "logo" | "photo" | "select", accent?, accentDefault?, optional?, toggleLabel?, cutout? } ],
  speakers: { label, cutout: true, min, max, fields: ["photo","name","title","company","logo"], defaults: [...] },
  css: `...`,   // absolute positions in px at the frame size; fonts Poppins / Inter
  html: `...`,  // Mustache subset
};
```

- `{{x}}` escaped, `{{{x}}}` raw HTML, `{{#list}}…{{/list}}` loops (adds `_first`, `_last`, `_i`), `{{^x}}…{{/x}}` when empty.
- Generated values: `<field>Html` (accent highlight in `<span class="hl">`, line breaks), `<field>Lines`, `<nameField>Initials`, `speakers[].initials`, `speakerCount`, `speakers<N>`, `logoWhite`, `logoColor`, `logoDark`.
- `data-fit="<minPx>"` on a fixed-size box shrinks its text until it fits.
- Backgrounds: raster files (JPEG/PNG) so the PNG export and the Figma push match. Avoid CSS pseudo-elements; they do not reach Figma.
- Keep each text in its own element; flex children become separate Figma text layers.
