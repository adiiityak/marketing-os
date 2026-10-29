// Template Studio engine: render a template module with values, mount it in a
// shadow root, fit text, export PNG (no network fetches), read uploaded images.
import p400 from "./assets/poppins-400.woff2";
import p400i from "./assets/poppins-400i.woff2";
import p500 from "./assets/poppins-500.woff2";
import p600 from "./assets/poppins-600.woff2";
import p600i from "./assets/poppins-600i.woff2";
import p700 from "./assets/poppins-700.woff2";
import p800 from "./assets/poppins-800.woff2";
import interVar from "./assets/inter-var.woff2";
import logoColorSvg from "./assets/logo-color.svg";
import logoWhiteSvg from "./assets/logo-white.svg";
import logoDarkSvg from "./assets/logo-dark.svg";

const face = (fam, src, w, st = "normal") =>
  `@font-face{font-family:"${fam}";src:url(${src}) format("woff2");font-weight:${w};font-style:${st};font-display:block}`;

export const FONT_CSS = [
  face("Poppins", p400, 400),
  face("Poppins", p400i, 400, "italic"),
  face("Poppins", p500, 500),
  face("Poppins", p600, 600),
  face("Poppins", p600i, 600, "italic"),
  face("Poppins", p700, 700),
  face("Poppins", p800, 800),
  face("Inter", interVar, "100 900"),
].join("\n");

export const LOGO_COLOR = logoColorSvg;
export const LOGO_WHITE = logoWhiteSvg;
export const LOGO_DARK = logoDarkSvg;

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const lookup = (stack, key) => {
  if (key === ".") return stack[stack.length - 1];
  for (let i = stack.length - 1; i >= 0; i--) {
    const o = stack[i];
    if (o && typeof o === "object" && key in o) return o[key];
  }
  return undefined;
};
const truthy = (v) => (Array.isArray(v) ? v.length > 0 : !!v);

// Mustache-lite: {{x}} escaped, {{{x}}} raw, {{#x}}…{{/x}} sections, {{^x}} inverted.
export function render(tpl, ctx) {
  const run = (src, stack) => {
    let out = "", pos = 0, m;
    const tag = /\{\{(\{?)([#^/]?)\s*([\w.]+)\s*\}?\}\}/g;
    while ((m = tag.exec(src))) {
      out += src.slice(pos, m.index);
      const [whole, raw, kind, key] = m;
      if (kind === "#" || kind === "^") {
        const k = key.replace(".", "\\.");
        const open = new RegExp(`\\{\\{[#^]\\s*${k}\\s*\\}\\}`, "g");
        const close = new RegExp(`\\{\\{/\\s*${k}\\s*\\}\\}`, "g");
        let depth = 1, at = tag.lastIndex, end = -1, endLen = 0;
        while (depth > 0) {
          open.lastIndex = at; close.lastIndex = at;
          const o = open.exec(src), c = close.exec(src);
          if (!c) throw new Error("Unclosed section " + key);
          if (o && o.index < c.index) { depth++; at = o.index + o[0].length; }
          else { depth--; at = c.index + c[0].length; if (!depth) { end = c.index; endLen = c[0].length; } }
        }
        const inner = src.slice(tag.lastIndex, end);
        const v = lookup(stack, key);
        if (kind === "#") {
          if (Array.isArray(v)) v.forEach((item, i) => { out += run(inner, [...stack, { _i: i + 1, _first: i === 0, _last: i === v.length - 1 }, item]); });
          else if (truthy(v)) out += run(inner, typeof v === "object" ? [...stack, v] : stack);
        } else if (!truthy(v)) out += run(inner, stack);
        pos = end + endLen; tag.lastIndex = pos;
        continue;
      }
      const v = lookup(stack, key);
      out += raw ? String(v ?? "") : esc(v);
      pos = m.index + whole.length;
    }
    return out + src.slice(pos);
  };
  return run(tpl, [ctx]);
}

export function highlight(text, words) {
  const safe = esc(text || "");
  const list = String(words || "").split(",").map((w) => w.trim()).filter(Boolean);
  if (!list.length) return safe;
  const re = new RegExp("(" + list.map((w) => esc(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
  return safe.replace(re, '<span class="hl">$1</span>');
}

const lines = (s) => String(s || "").split(/\n+/).map((t) => t.trim()).filter(Boolean).map((text) => ({ text }));
const initials = (n) => (n || "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Speaker field kinds; photos are cut out by default when the template asks for it.
export const SPEAKER_LABELS = { photo: "Photo", name: "Name", title: "Designation", company: "Company", logo: "Company logo" };

export function contextFor(tpl, values) {
  const ctx = { ...values };
  for (const f of tpl.fields || []) {
    if (f.accent) ctx[f.key + "Html"] = highlight(ctx[f.key], ctx[f.key + "Accent"]);
    if (f.kind === "textarea" && ctx[f.key]) {
      ctx[f.key + "Html"] = (f.accent ? highlight(ctx[f.key], ctx[f.key + "Accent"]) : esc(ctx[f.key])).replace(/\n/g, "<br>");
      ctx[f.key + "Lines"] = lines(ctx[f.key]);
    }
  }
  for (const f of tpl.fields || []) if (/name$/i.test(f.key) && ctx[f.key]) ctx[f.key + "Initials"] = initials(ctx[f.key]);
  if (tpl.speakers) {
    const list = (ctx.speakers || []).filter((s) => s && (s.name || s.photo));
    ctx.speakers = list.map((s) => ({ photo: "", name: "", title: "", company: "", logo: "", ...s, initials: initials(s.name) }));
    ctx.speakerCount = list.length;
    ctx["speakers" + list.length] = true;
    ctx.manySpeakers = list.length >= 3;
  }
  for (const l of tpl.list || []) {
    const blank = Object.fromEntries((l.itemFields || []).map((f) => [f.key, ""]));
    ctx[l.key] = (ctx[l.key] || []).filter((it) => it && Object.values(it).some(Boolean)).map((it) => {
      const o = { ...blank, ...it };
      for (const f of l.itemFields || []) {
        if (f.kind === "textarea" && o[f.key]) {
          o[f.key + "Html"] = esc(o[f.key]).replace(/\n/g, "<br>");
          o[f.key + "Lines"] = lines(o[f.key]);
        }
        if ((f.kind === "photo" || f.kind === "logo" || f.kind === "image") && o[f.key]) o[f.key + "Set"] = true;
      }
      if (o.name) o.initials = initials(o.name);
      return o;
    });
  }
  ctx.logoColor = LOGO_COLOR;
  ctx.logoWhite = LOGO_WHITE;
  ctx.logoDark = LOGO_DARK;
  return ctx;
}

export function defaultsFor(tpl) {
  const v = {};
  for (const f of tpl.fields || []) {
    v[f.key] = f.default != null ? f.default : "";
    if (f.accent) v[f.key + "Accent"] = f.accentDefault || "";
  }
  if (tpl.speakers) v.speakers = (tpl.speakers.defaults || []).map((s) => ({ ...s }));
  for (const l of tpl.list || []) v[l.key] = (l.defaults || []).map((s) => ({ ...s }));
  return v;
}

// Shrink text inside [data-fit="minPx"] until it fits its box.
export function fitText(root) {
  root.querySelectorAll("[data-fit]").forEach((el) => {
    const min = parseFloat(el.getAttribute("data-fit")) || 12;
    el.style.fontSize = "";
    let size = parseFloat(getComputedStyle(el).fontSize);
    let guard = 80;
    while (guard-- > 0 && size > min && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1)) {
      size -= 1;
      el.style.fontSize = size + "px";
    }
  });
}

let docFonts = false;
export function ensureDocFonts() {
  // Chrome ignores @font-face declared inside a shadow root, so declare it on the document too.
  if (docFonts || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-studio-fonts", "");
  s.textContent = FONT_CSS;
  document.head.appendChild(s);
  docFonts = true;
}

export const BASE_CSS = (tpl) => `*{box-sizing:border-box;margin:0;padding:0}
img{display:block}
.t{position:relative;overflow:hidden;width:${tpl.w}px;height:${tpl.h}px;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.hl{color:var(--hl,inherit)}`;

export function mount(host, tpl, values) {
  ensureDocFonts();
  const root = host.shadowRoot || host.attachShadow({ mode: "open" });
  const html = render(tpl.html, contextFor(tpl, values));
  root.innerHTML = `<style>${FONT_CSS}\n:host{all:initial;display:block}\n${BASE_CSS(tpl)}\n${tpl.css}</style><div class="t" part="canvas">${html}</div>`;
  const node = root.querySelector(".t");
  fitText(node);
  return node;
}

async function fontsReady() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch {}
}

function waitImages(node) {
  const imgs = [...node.querySelectorAll("img")];
  return Promise.all(imgs.map((im) => (im.complete ? (im.decode ? im.decode().catch(() => {}) : null) : new Promise((r) => { im.onload = im.onerror = r; }))));
}

// Rasterise the mounted canvas without any network request: the template CSS and
// fonts are self-contained, so serialise the live DOM into an SVG foreignObject.
export async function exportBlob(node, tpl, scale = 2, type = "image/png", quality = 0.92) {
  await fontsReady();
  await waitImages(node);
  const clone = node.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  const xhtml = new XMLSerializer().serializeToString(clone);
  const css = `${FONT_CSS}\n${BASE_CSS(tpl)}\n${tpl.css}`.replace(/]]>/g, "]] >");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tpl.w}" height="${tpl.h}" viewBox="0 0 ${tpl.w} ${tpl.h}"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${tpl.w}px;height:${tpl.h}px"><style><![CDATA[${css}]]></style>${xhtml}</div></foreignObject></svg>`;
  const img = new Image();
  img.decoding = "sync";
  // A data: URL (not blob:) keeps the canvas untainted in Chrome.
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  try {
    await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("render")); img.src = url; });
    if (img.decode) await img.decode().catch(() => {});
    // Give Chrome a frame to lay out the foreignObject fonts before drawing.
    await new Promise((r) => setTimeout(r, 60));
    const c = document.createElement("canvas");
    c.width = Math.round(tpl.w * scale);
    c.height = Math.round(tpl.h * scale);
    const g = c.getContext("2d");
    g.scale(scale, scale);
    g.drawImage(img, 0, 0, tpl.w, tpl.h);
    return await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), type, quality));
  } finally {
    img.src = "";
  }
}

export const blobToDataURL = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(new Error("read")); r.readAsDataURL(blob); });

// Read an uploaded image, downscale, keep transparency (PNG) unless the file is a JPEG.
export function readImage(file, max = 1000) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error("read"));
    r.onload = () => {
      if (file.type === "image/svg+xml") { resolve(r.result); return; }
      const im = new Image();
      im.onload = () => {
        const k = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement("canvas");
        c.width = Math.round(im.width * k);
        c.height = Math.round(im.height * k);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        resolve(c.toDataURL(file.type === "image/jpeg" ? "image/jpeg" : "image/png", 0.92));
      };
      im.onerror = () => reject(new Error("decode"));
      im.src = r.result;
    };
    r.readAsDataURL(file);
  });
}

// True when a data-URL image already has a transparent background (an existing cut-out).
export function hasTransparency(dataUrl) {
  return new Promise((resolve) => {
    if (!/^data:image\/(png|webp)/.test(dataUrl)) { resolve(false); return; }
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas");
      const k = Math.min(1, 200 / Math.max(im.width, im.height));
      c.width = Math.max(1, Math.round(im.width * k));
      c.height = Math.max(1, Math.round(im.height * k));
      const g = c.getContext("2d");
      g.drawImage(im, 0, 0, c.width, c.height);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 20) clear++;
      resolve(clear / (d.length / 4) > 0.08);
    };
    im.onerror = () => resolve(false);
    im.src = dataUrl;
  });
}

export const slug = (s) => String(s || "design").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "design";
