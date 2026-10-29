// Convert a mounted Template Studio canvas (a DOM tree) into editable Figma layers.
// Produces a list of use_figma Plugin API programs: image uploads first, then the
// layer tree as data interpreted by a small runtime inside Figma.

const MAX_CODE = 46000;

// ---------- colour / paint parsing ----------
function parseColor(s) {
  if (!s) return null;
  s = s.trim();
  let m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p.length > 3 ? p[3] : 1 };
  }
  m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = h.split("").map((c) => c + c).join("");
    const n = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  return null;
}
const r4 = (n) => Math.round(n * 10000) / 10000;
const r2 = (n) => Math.round(n * 100) / 100;
const solid = (c, extra = 1) => (c && c.a * extra > 0.001 ? { t: "s", c: [r4(c.r), r4(c.g), r4(c.b)], a: r4(c.a * extra) } : null);

// split on top-level commas
function splitTop(s) {
  const out = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function parseStops(parts) {
  const stops = [];
  parts.forEach((p, i) => {
    const m = p.match(/^(rgba?\([^)]*\)|#[0-9a-f]+|transparent)\s*([-\d.]+%)?/i);
    if (!m) return;
    const c = parseColor(m[1]);
    if (!c) return;
    stops.push({ c, pos: m[2] != null ? parseFloat(m[2]) / 100 : null });
  });
  if (!stops.length) return [];
  if (stops[0].pos == null) stops[0].pos = 0;
  if (stops[stops.length - 1].pos == null) stops[stops.length - 1].pos = 1;
  for (let i = 1; i < stops.length - 1; i++) {
    if (stops[i].pos == null) {
      let j = i; while (stops[j].pos == null) j++;
      const a = stops[i - 1].pos, b = stops[j].pos;
      for (let k = i; k < j; k++) stops[k].pos = a + ((b - a) * (k - i + 1)) / (j - i + 1);
    }
  }
  return stops.map((s) => [r4(Math.min(1, Math.max(0, s.pos))), r4(s.c.r), r4(s.c.g), r4(s.c.b), r4(s.c.a)]);
}

function linearPaint(arg, w, h) {
  const parts = splitTop(arg);
  let angle = 180;
  const first = parts[0];
  if (/deg$/.test(first)) { angle = parseFloat(first); parts.shift(); }
  else if (/^to /.test(first)) {
    const map = { "to top": 0, "to right": 90, "to bottom": 180, "to left": 270, "to top right": 45, "to right top": 45, "to bottom right": 135, "to right bottom": 135, "to bottom left": 225, "to left bottom": 225, "to top left": 315, "to left top": 315 };
    angle = map[first] ?? 180; parts.shift();
  }
  const stops = parseStops(parts);
  if (stops.length < 2) return null;
  const a = (angle * Math.PI) / 180;
  const dx = Math.sin(a), dy = -Math.cos(a);
  const L = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a));
  const sx = 0.5 - (dx * L) / 2 / w, sy = 0.5 - (dy * L) / 2 / h;
  const ex = 0.5 + (dx * L) / 2 / w, ey = 0.5 + (dy * L) / 2 / h;
  const vx = ex - sx, vy = ey - sy, n2 = vx * vx + vy * vy || 1;
  const m = [
    [r4(vx / n2), r4(vy / n2), r4(-(sx * vx + sy * vy) / n2)],
    [r4(vy / n2), r4(-vx / n2), r4(0.5 - (sx * vy - sy * vx) / n2)],
  ];
  return { t: "l", m, s: stops };
}

function radialPaint(arg) {
  const parts = splitTop(arg);
  let cx = 0.5, cy = 0.5;
  if (!/^(rgba?|#|transparent)/i.test(parts[0])) {
    const at = parts[0].match(/at\s+([-\d.]+)%\s+([-\d.]+)%/);
    if (at) { cx = parseFloat(at[1]) / 100; cy = parseFloat(at[2]) / 100; }
    parts.shift();
  }
  const stops = parseStops(parts);
  if (stops.length < 2) return null;
  // Figma radial: centre at (0.5,0.5) in gradient space, radius 0.5.
  const m = [[1, 0, r4(0.5 - cx)], [0, 1, r4(0.5 - cy)]];
  return { t: "r", m, s: stops };
}

// ---------- image registry ----------
function makeRegistry() {
  const map = new Map();
  return {
    id(url) { if (!map.has(url)) map.set(url, "img" + map.size); return map.get(url); },
    entries() { return [...map.entries()]; },
  };
}

function bgPaints(cs, w, h, reg) {
  const out = [];
  const bi = cs.backgroundImage;
  if (bi && bi !== "none") {
    const layers = splitTop(bi);
    const sizes = splitTop(cs.backgroundSize || "auto");
    layers.forEach((layer, i) => {
      let m;
      if ((m = layer.match(/^linear-gradient\((.*)\)$/s))) { const p = linearPaint(m[1], w, h); if (p) out.push(p); }
      else if ((m = layer.match(/^radial-gradient\((.*)\)$/s))) { const p = radialPaint(m[1]); if (p) out.push(p); }
      else if ((m = layer.match(/^url\("?(data:image\/(?:png|jpe?g|gif|webp)[^")]*)"?\)$/))) {
        const size = sizes[i] || sizes[0] || "";
        out.push({ t: "i", img: reg.id(m[1]), m: /contain/.test(size) ? "FIT" : "FILL" });
      }
    });
  }
  out.reverse(); // CSS paints the first layer on top; Figma paints the last fill on top
  const bc = solid(parseColor(cs.backgroundColor));
  if (bc) out.unshift(bc);
  return out;
}

function radii(cs, w, h) {
  const v = (s) => {
    const first = String(s || "0").split(" ")[0];
    const n = /%$/.test(first) ? (parseFloat(first) / 100) * Math.min(w, h) : parseFloat(first) || 0;
    return Math.min(n, Math.min(w, h) / 2);
  };
  const tl = v(cs.borderTopLeftRadius), tr = v(cs.borderTopRightRadius), br = v(cs.borderBottomRightRadius), bl = v(cs.borderBottomLeftRadius);
  if (!tl && !tr && !br && !bl) return null;
  return tl === tr && tr === br && br === bl ? r2(tl) : [r2(tl), r2(tr), r2(br), r2(bl)];
}

function strokes(cs) {
  const sides = ["Top", "Right", "Bottom", "Left"].map((s) => ({
    w: cs["border" + s + "Style"] === "none" ? 0 : parseFloat(cs["border" + s + "Width"]) || 0,
    c: parseColor(cs["border" + s + "Color"]),
  }));
  const any = sides.find((s) => s.w > 0 && s.c && s.c.a > 0);
  if (!any) return null;
  return { p: solid(any.c), w: sides.map((s) => r2(s.w)) };
}

function shadow(cs) {
  const s = cs.boxShadow;
  if (!s || s === "none") return null;
  const first = splitTop(s)[0];
  const cm = first.match(/rgba?\([^)]*\)/);
  const nums = first.replace(/rgba?\([^)]*\)/, "").trim().split(/\s+/).map(parseFloat);
  if (/inset/.test(first) || !cm) return null;
  const c = parseColor(cm[0]);
  return { c: [r4(c.r), r4(c.g), r4(c.b), r4(c.a)], x: nums[0] || 0, y: nums[1] || 0, b: nums[2] || 0, sp: nums[3] || 0 };
}

function blurOf(cs) {
  const m = (cs.filter || "").match(/blur\(([\d.]+)px\)/);
  return m ? parseFloat(m[1]) : 0;
}

function rotationOf(cs) {
  const t = cs.transform;
  if (!t || t === "none") return 0;
  const m = t.match(/matrix\(([^)]+)\)/);
  if (!m) return 0;
  const [a, b] = m[1].split(",").map(parseFloat);
  const deg = (Math.atan2(b, a) * 180) / Math.PI;
  return Math.abs(deg) < 0.05 ? 0 : deg;
}

// ---------- fonts ----------
const POPPINS = { 100: "Thin", 200: "ExtraLight", 300: "Light", 400: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black" };
const INTER = { 100: "Thin", 200: "Extra Light", 300: "Light", 400: "Regular", 500: "Medium", 600: "Semi Bold", 700: "Bold", 800: "Extra Bold", 900: "Black" };
function fontFor(cs) {
  const fam = /poppins/i.test(cs.fontFamily) ? "Poppins" : "Inter";
  const w = Math.min(900, Math.max(100, Math.round((parseInt(cs.fontWeight) || 400) / 100) * 100));
  const italic = cs.fontStyle === "italic";
  const table = fam === "Poppins" ? POPPINS : INTER;
  let style = table[w];
  if (italic) style = style === "Regular" ? "Italic" : style + " Italic";
  return [fam, style];
}

// ---------- DOM walk ----------
const INLINE = new Set(["SPAN", "B", "STRONG", "EM", "I", "BR", "SMALL", "SUP", "SUB", "U", "A"]);
// Inline-only = text plus inline children. Flex/grid items are blockified, so a span
// inside a flex column counts as a block and becomes its own text layer.
const isInlineOnly = (el) => [...el.childNodes].every((n) => n.nodeType === 3 || (n.nodeType === 1 && INLINE.has(n.tagName) && (n.tagName === "BR" || /^inline/.test(getComputedStyle(n).display)) && isInlineOnly(n)));
const hasText = (el) => (el.textContent || "").trim().length > 0;

function textRuns(el, rootCS) {
  const runs = [];
  const walk = (node, inheritedUpper) => {
    for (const n of node.childNodes) {
      if (n.nodeType === 3) {
        const pcs = getComputedStyle(n.parentElement);
        let txt = n.textContent.replace(/\s+/g, " ");
        const tt = pcs.textTransform;
        if (tt === "uppercase") txt = txt.toUpperCase();
        else if (tt === "lowercase") txt = txt.toLowerCase();
        if (txt) runs.push({ txt, cs: pcs });
      } else if (n.nodeType === 1) {
        if (n.tagName === "BR") runs.push({ txt: "\n", cs: getComputedStyle(el) });
        else if (getComputedStyle(n).display !== "none") walk(n);
      }
    }
  };
  walk(el);
  // trim leading/trailing whitespace and collapse spaces around newlines
  let all = runs.map((r) => r.txt).join("");
  const lead = all.length - all.replace(/^[ ]+/, "").length;
  if (lead) runs[0].txt = runs[0].txt.slice(lead);
  for (let i = runs.length - 1; i >= 0; i--) {
    const before = runs[i].txt;
    runs[i].txt = before.replace(/[ ]+$/, "");
    if (runs[i].txt.length) break;
  }
  return runs.filter((r) => r.txt.length).map((r, i, arr) => {
    if (r.txt === "\n") return r;
    if (i > 0 && arr[i - 1].txt.endsWith("\n")) r.txt = r.txt.replace(/^ /, "");
    if (i < arr.length - 1 && arr[i + 1].txt.startsWith("\n")) r.txt = r.txt.replace(/ $/, "");
    return r;
  });
}

function textOp(el, box, cs, reg) {
  const runs = textRuns(el, cs);
  if (!runs.length) return null;
  const chars = runs.map((r) => r.txt).join("");
  // text rect = content box of the element
  const pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0, pt = parseFloat(cs.paddingTop) || 0, pb = parseFloat(cs.paddingBottom) || 0;
  const bl = parseFloat(cs.borderLeftWidth) || 0, bt = parseFloat(cs.borderTopWidth) || 0, br = parseFloat(cs.borderRightWidth) || 0, bb = parseFloat(cs.borderBottomWidth) || 0;
  let x = box.x + pl + bl, y = box.y + pt + bt, w = box.w - pl - pr - bl - br, h = box.h - pt - pb - bt - bb;
  // Use the real rendered text extent vertically (flex centring etc.).
  try {
    const rg = document.createRange();
    rg.selectNodeContents(el);
    const rr = rg.getBoundingClientRect();
    const root = box.rootRect, k = box.k;
    if (rr.height > 0) { y = (rr.top - root.top) / k; h = rr.height / k; }
    if (rr.width > 0 && cs.whiteSpace === "nowrap") { x = (rr.left - root.left) / k; w = rr.width / k; }
  } catch {}
  const lh = cs.lineHeight === "normal" ? null : r2(parseFloat(cs.lineHeight));
  const ls = cs.letterSpacing === "normal" ? 0 : r2(parseFloat(cs.letterSpacing) || 0);
  // gradient text may be declared on this element or an ancestor (background-clip:text)
  let gradEl = null;
  for (let a = el; a && a.classList && !a.classList.contains("t"); a = a.parentElement) {
    const acs = getComputedStyle(a);
    if (/text/.test(acs.webkitBackgroundClip || acs.backgroundClip || "") && acs.backgroundImage !== "none") { gradEl = a; break; }
  }
  const gradText = !!gradEl;
  let pos = 0;
  const ranges = runs.map((r) => {
    const f = fontFor(r.cs);
    let fill;
    if (gradText) { const gcs = getComputedStyle(gradEl); const gb = gradEl.getBoundingClientRect(); fill = bgPaints(gcs, gb.width / box.k, gb.height / box.k, reg).filter((p) => p.t !== "s")[0] || { t: "s", c: [1, 1, 1], a: 1 }; }
    else fill = solid(parseColor(r.cs.color)) || { t: "s", c: [0, 0, 0], a: 0 };
    const rgn = { s: pos, e: pos + r.txt.length, f, z: r2(parseFloat(r.cs.fontSize)), fill };
    pos += r.txt.length;
    return rgn;
  });
  const nowrap = cs.whiteSpace === "nowrap" || cs.whiteSpace === "pre";
  return {
    k: "t", n: chars.slice(0, 40), x: r2(x), y: r2(y), w: r2(Math.max(1, w + (nowrap ? 4 : 2))), h: r2(Math.max(1, h)),
    ch: chars, rg: ranges, lh, ls, al: { left: "LEFT", start: "LEFT", center: "CENTER", right: "RIGHT", end: "RIGHT", justify: "JUSTIFIED" }[cs.textAlign] || "LEFT",
    ar: nowrap ? "WIDTH_AND_HEIGHT" : "HEIGHT", o: r4(parseFloat(cs.opacity)),
  };
}

function imgDrawRect(img, box, cs) {
  const nw = img.naturalWidth || box.w, nh = img.naturalHeight || box.h;
  const fit = cs.objectFit || "fill";
  let dw = box.w, dh = box.h;
  if (fit === "cover" || fit === "contain" || fit === "scale-down") {
    let k = fit === "cover" ? Math.max(box.w / nw, box.h / nh) : Math.min(box.w / nw, box.h / nh);
    if (fit === "scale-down") k = Math.min(1, k);
    dw = nw * k; dh = nh * k;
  } else if (fit === "none") { dw = nw; dh = nh; }
  const [px, py] = (cs.objectPosition || "50% 50%").split(/\s+/);
  const frac = (v, free) => (/%$/.test(v) ? (parseFloat(v) / 100) * free : parseFloat(v) || 0);
  return { x: frac(px, box.w - dw), y: frac(py || "50%", box.h - dh), w: dw, h: dh };
}

function svgString(svg) {
  const clone = svg.cloneNode(true);
  const src = [svg, ...svg.querySelectorAll("*")];
  const dst = [clone, ...clone.querySelectorAll("*")];
  src.forEach((s, i) => {
    const cs = getComputedStyle(s);
    const d = dst[i];
    if (s !== svg) {
      if (cs.fill && cs.fill !== "none") d.setAttribute("fill", cs.fill); else if (cs.fill === "none") d.setAttribute("fill", "none");
      if (cs.stroke && cs.stroke !== "none") { d.setAttribute("stroke", cs.stroke); d.setAttribute("stroke-width", cs.strokeWidth); }
    } else {
      if (cs.fill === "none") d.setAttribute("fill", "none");
      if (cs.stroke && cs.stroke !== "none") { d.setAttribute("stroke", cs.stroke); d.setAttribute("stroke-width", cs.strokeWidth); d.setAttribute("stroke-linecap", cs.strokeLinecap); d.setAttribute("stroke-linejoin", cs.strokeLinejoin); }
      d.removeAttribute("class"); d.removeAttribute("style");
    }
  });
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return new XMLSerializer().serializeToString(clone).replace(/currentColor/g, getComputedStyle(svg).color);
}

// Build the flat op list. k = render scale of the mounted node (1 when mounted off-screen).
export function collectOps(root, tplName) {
  const reg = makeRegistry();
  const rootRect = root.getBoundingClientRect();
  const k = rootRect.width / (root.offsetWidth || rootRect.width) || 1;
  const ops = [];
  const abs = new Map();
  const rootCS = getComputedStyle(root);
  const W = root.offsetWidth, H = root.offsetHeight;
  ops.push({ k: "f", i: 0, p: null, n: tplName, x: 0, y: 0, w: W, h: H, fl: bgPaints(rootCS, W, H, reg), c: 1 });
  abs.set(root, { x: 0, y: 0, i: 0 });
  let next = 1;

  const boxOf = (el) => {
    const r = el.getBoundingClientRect();
    return { x: (r.left - rootRect.left) / k, y: (r.top - rootRect.top) / k, w: r.width / k, h: r.height / k, rootRect, k };
  };

  const visit = (el, parentIdx, parentAbs) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return;
    let box = boxOf(el);
    const rot = rotationOf(cs);
    if (rot) {
      const ow = el.offsetWidth, oh = el.offsetHeight, cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      box = { ...box, x: cx - ow / 2, y: cy - oh / 2, w: ow, h: oh };
    }
    if (box.w < 0.5 || box.h < 0.5) {
      // zero-size wrappers can still hold positioned children
      [...el.children].forEach((c) => visit(c, parentIdx, parentAbs));
      return;
    }
    const rel = (b) => ({ x: r2(b.x - parentAbs.x), y: r2(b.y - parentAbs.y) });
    const tag = el.tagName;

    if (tag === "IMG") {
      const src = el.currentSrc || el.src;
      if (!src || !/^data:image\/(png|jpe?g|gif|svg|webp)/.test(src)) return;
      const d = imgDrawRect(el, box, cs);
      const rad = radii(cs, box.w, box.h);
      const clip = d.x < -0.5 || d.y < -0.5 || d.x + d.w > box.w + 0.5 || d.y + d.h > box.h + 0.5 || rad;
      const idx = next++;
      const isSvg = /^data:image\/svg/.test(src);
      if (clip) {
        ops.push({ k: "f", i: idx, p: parentIdx, n: el.alt || "Image", ...rel(box), w: r2(box.w), h: r2(box.h), fl: [], c: 1, r: rad, o: r4(parseFloat(cs.opacity)), rot });
        const idx2 = next++;
        ops.push(isSvg ? { k: "u", i: idx2, p: idx, n: "Image", x: r2(d.x), y: r2(d.y), w: r2(d.w), h: r2(d.h), url: src } : { k: "f", i: idx2, p: idx, n: "Image", x: r2(d.x), y: r2(d.y), w: r2(d.w), h: r2(d.h), fl: [{ t: "i", img: reg.id(src), m: "FILL" }] });
      } else {
        const b = { x: box.x + d.x, y: box.y + d.y };
        ops.push(isSvg ? { k: "u", i: idx, p: parentIdx, n: el.alt || "Logo", ...rel(b), w: r2(d.w), h: r2(d.h), url: src, o: r4(parseFloat(cs.opacity)), rot } : { k: "f", i: idx, p: parentIdx, n: el.alt || "Image", ...rel(b), w: r2(d.w), h: r2(d.h), fl: [{ t: "i", img: reg.id(src), m: "FILL" }], o: r4(parseFloat(cs.opacity)), rot });
      }
      return;
    }
    if (tag === "svg" || tag === "SVG") {
      ops.push({ k: "v", i: next++, p: parentIdx, n: "Icon", ...rel(box), w: r2(box.w), h: r2(box.h), svg: svgString(el), o: r4(parseFloat(cs.opacity)) });
      return;
    }

    const fills = bgPaints(cs, box.w, box.h, reg);
    const gradText = /text/.test(cs.webkitBackgroundClip || cs.backgroundClip || "");
    const st = strokes(cs);
    const sh = shadow(cs);
    const bl = blurOf(cs);
    const clip = cs.overflow === "hidden" || cs.overflow === "clip";
    const textLeaf = hasText(el) && isInlineOnly(el);
    const visual = (!gradText && fills.length) || st || sh || bl;
    const kids = [...el.children].filter((c) => !INLINE.has(c.tagName) || c.tagName === "SPAN");

    let myIdx = parentIdx, myAbs = parentAbs;
    if (visual || (clip && kids.length) || rot) {
      myIdx = next++;
      ops.push({
        k: "f", i: myIdx, p: parentIdx, n: el.getAttribute("data-name") || el.className || tag.toLowerCase(), ...rel(box), w: r2(box.w), h: r2(box.h),
        fl: gradText ? [] : fills, c: clip ? 1 : 0, r: radii(cs, box.w, box.h), st, sh, bl, o: r4(parseFloat(cs.opacity)), rot,
      });
      myAbs = { x: box.x, y: box.y };
    }
    if (textLeaf) {
      const t = textOp(el, box, cs, reg);
      if (t) {
        t.i = next++; t.p = myIdx; t.x = r2(t.x - myAbs.x); t.y = r2(t.y - myAbs.y);
        if (myIdx !== parentIdx) t.o = 1;
        ops.push(t);
      }
      return;
    }
    // loose text nodes next to block children
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.textContent.trim()) {
        const rg = document.createRange();
        rg.selectNodeContents(n);
        const rr = rg.getBoundingClientRect();
        const f = fontFor(cs);
        const txt = cs.textTransform === "uppercase" ? n.textContent.trim().toUpperCase() : n.textContent.trim();
        ops.push({ k: "t", i: next++, p: myIdx, n: txt.slice(0, 40), x: r2((rr.left - rootRect.left) / k - myAbs.x), y: r2((rr.top - rootRect.top) / k - myAbs.y), w: r2(rr.width / k + 4), h: r2(rr.height / k), ch: txt, rg: [{ s: 0, e: txt.length, f, z: r2(parseFloat(cs.fontSize)), fill: solid(parseColor(cs.color)) }], lh: cs.lineHeight === "normal" ? null : r2(parseFloat(cs.lineHeight)), ls: 0, al: "LEFT", ar: "WIDTH_AND_HEIGHT", o: 1 });
      } else if (n.nodeType === 1) visit(n, myIdx, myAbs);
    }
  };
  [...root.children].forEach((c) => visit(c, 0, { x: 0, y: 0 }));
  return { ops, images: reg.entries() };
}

// ---------- Figma-side runtime (stringified into every build call) ----------
const RUNTIME = `
const nodes = {};
for (const [k, id] of Object.entries(D.known || {})) nodes[k] = await figma.getNodeByIdAsync(id);
const fontOk = {};
async function font(f) {
  const key = f[0] + "|" + f[1];
  if (fontOk[key] !== undefined) return fontOk[key];
  const tries = [{ family: f[0], style: f[1] }, { family: "Inter", style: f[1].replace("SemiBold", "Semi Bold").replace("ExtraBold", "Extra Bold") }, { family: "Inter", style: "Regular" }];
  for (const t of tries) { try { await figma.loadFontAsync(t); fontOk[key] = t; return t; } catch (e) {} }
  fontOk[key] = null; return null;
}
function paint(p) {
  if (!p) return null;
  if (p.t === "s") return { type: "SOLID", color: { r: p.c[0], g: p.c[1], b: p.c[2] }, opacity: p.a };
  if (p.t === "l" || p.t === "r") return { type: p.t === "l" ? "GRADIENT_LINEAR" : "GRADIENT_RADIAL", gradientTransform: p.m, gradientStops: p.s.map((s) => ({ position: s[0], color: { r: s[1], g: s[2], b: s[3], a: s[4] } })) };
  if (p.t === "i") { const h = D.hashes[p.img]; return h ? { type: "IMAGE", imageHash: h, scaleMode: p.m || "FILL" } : null; }
  return null;
}
let page = figma.currentPage;
if (D.page) {
  let pg = figma.root.children.find((p) => p.name === D.page);
  if (!pg) { pg = figma.createPage(); pg.name = D.page; }
  await figma.setCurrentPageAsync(pg);
  page = pg;
}
for (const o of D.ops) {
  let n;
  if (o.k === "f") {
    n = figma.createFrame();
    n.fills = (o.fl || []).map(paint).filter(Boolean);
    n.clipsContent = !!o.c;
  } else if (o.k === "t") {
    n = figma.createText();
    const first = await font(o.rg[0].f);
    if (first) n.fontName = first;
    n.characters = o.ch;
    for (const r of o.rg) {
      const f = await font(r.f);
      if (f) n.setRangeFontName(r.s, r.e, f);
      n.setRangeFontSize(r.s, r.e, r.z);
      const fp = paint(r.fill);
      if (fp) n.setRangeFills(r.s, r.e, [fp]);
    }
    if (o.lh) n.lineHeight = { value: o.lh, unit: "PIXELS" };
    if (o.ls) n.letterSpacing = { value: o.ls, unit: "PIXELS" };
    n.textAlignHorizontal = o.al;
  } else if (o.k === "v") {
    try { n = figma.createNodeFromSvg(o.svg); } catch (e) { n = figma.createFrame(); n.fills = []; }
  } else if (o.k === "u") {
    try { n = figma.createNodeFromSvg(decodeURIComponent(o.url.replace(/^data:image\\/svg\\+xml(;charset=[^,;]*)?(;utf8)?,/, ""))); } catch (e) { n = figma.createFrame(); n.fills = []; }
  }
  const parent = o.p === null ? page : nodes[o.p];
  parent.appendChild(n);
  n.name = String(o.n || "Layer").slice(0, 80);
  if (o.k === "t") {
    n.textAutoResize = "NONE";
    n.resize(Math.max(1, o.w), Math.max(1, o.h));
    n.textAutoResize = o.ar;
  } else n.resize(Math.max(0.01, o.w), Math.max(0.01, o.h));
  if (o.rot) {
    const a = (o.rot * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
    const cx = o.x + o.w / 2, cy = o.y + o.h / 2;
    const tx = cx - (c * o.w) / 2 + (s * o.h) / 2, ty = cy - (s * o.w) / 2 - (c * o.h) / 2;
    n.relativeTransform = [[c, -s, tx], [s, c, ty]];
  } else { n.x = o.x; n.y = o.y; }
  if (o.p === null) { n.x = D.rootX; n.y = D.rootY; }
  if (o.r != null && "cornerRadius" in n) {
    if (Array.isArray(o.r)) { n.topLeftRadius = o.r[0]; n.topRightRadius = o.r[1]; n.bottomRightRadius = o.r[2]; n.bottomLeftRadius = o.r[3]; }
    else n.cornerRadius = o.r;
  }
  if (o.st) {
    n.strokes = [paint(o.st.p)];
    n.strokeAlign = "INSIDE";
    const [t, r, b, l] = o.st.w;
    if (t === r && r === b && b === l) n.strokeWeight = t;
    else { n.strokeTopWeight = t; n.strokeRightWeight = r; n.strokeBottomWeight = b; n.strokeLeftWeight = l; }
  }
  const fx = [];
  if (o.sh) fx.push({ type: "DROP_SHADOW", color: { r: o.sh.c[0], g: o.sh.c[1], b: o.sh.c[2], a: o.sh.c[3] }, offset: { x: o.sh.x, y: o.sh.y }, radius: o.sh.b, spread: o.sh.sp, visible: true, blendMode: "NORMAL" });
  if (o.bl) fx.push({ type: "LAYER_BLUR", radius: o.bl, visible: true });
  if (fx.length) n.effects = fx;
  if (o.o != null && o.o < 1) n.opacity = o.o;
  if (o.mask) n.isMask = true;
  nodes[o.i] = n;
}
const ids = {};
for (const k of D.need || []) if (nodes[k]) ids[k] = nodes[k].id;
return "LSQ:" + JSON.stringify({ ids, root: nodes[0] ? nodes[0].id : null, page: page.id });
`;

// Image upload: one call per image when it fits, otherwise chunks stored in a temp text layer.
function uploadCalls(id, dataUrl) {
  const b64 = dataUrl.split(",")[1];
  const CH = MAX_CODE - 2500;
  if (b64.length <= CH) {
    return [{ kind: "img", id, code: `const b=${JSON.stringify(b64)};const im=figma.createImage(figma.base64Decode(b));const r=figma.createRectangle();r.name="__lsq_tmp_${id}";r.fills=[{type:"IMAGE",imageHash:im.hash,scaleMode:"FILL"}];r.visible=false;figma.currentPage.appendChild(r);return "LSQ:"+JSON.stringify({hash:im.hash,tmp:r.id});` }];
  }
  const parts = [];
  for (let i = 0; i < b64.length; i += CH) parts.push(b64.slice(i, i + CH));
  const calls = parts.map((p, i) => ({
    kind: "chunk", id, part: i, of: parts.length,
    code: `const P=${JSON.stringify(p)};await figma.loadFontAsync({family:"Inter",style:"Regular"});const nm="__lsq_buf_${id}";let t=figma.currentPage.findOne(n=>n.type==="TEXT"&&n.name===nm);if(!t||${i === 0}){if(t)t.remove();t=figma.createText();t.name=nm;t.visible=false;figma.currentPage.appendChild(t);t.characters=P;}else{t.insertCharacters(t.characters.length,P);}return "LSQ:"+JSON.stringify({len:t.characters.length});`,
  }));
  calls.push({ kind: "img", id, code: `const nm="__lsq_buf_${id}";const t=figma.currentPage.findOne(n=>n.type==="TEXT"&&n.name===nm);const im=figma.createImage(figma.base64Decode(t.characters));t.remove();const r=figma.createRectangle();r.name="__lsq_tmp_${id}";r.fills=[{type:"IMAGE",imageHash:im.hash,scaleMode:"FILL"}];r.visible=false;figma.currentPage.appendChild(r);return "LSQ:"+JSON.stringify({hash:im.hash,tmp:r.id});` });
  return calls;
}

// Shrink raster images so uploads stay small (about 1.25x their largest on-canvas
// size). Opaque images become JPEG. Large transparent images (speaker cut-outs) are
// split into a JPEG colour layer plus a tiny alpha-only PNG used as a Figma mask,
// which is several times smaller than one RGBA PNG.
export async function shrinkImage(dataUrl, maxSide = 1400, allowSplit = false) {
  if (/^data:image\/svg/.test(dataUrl)) return { data: dataUrl };
  const im = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = dataUrl; });
  const k = Math.min(1, maxSide / Math.max(im.width, im.height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k));
  const g = c.getContext("2d");
  g.drawImage(im, 0, 0, c.width, c.height);
  let alpha = false;
  if (/^data:image\/(png|gif|webp)/.test(dataUrl)) {
    const d = g.getImageData(0, 0, c.width, c.height).data;
    for (let i = 3; i < d.length; i += 16) if (d[i] < 250) { alpha = true; break; }
  }
  if (!alpha) {
    const out = c.toDataURL("image/jpeg", 0.88);
    return { data: out.length < dataUrl.length || !/^data:image\/(png|jpe?g|gif)/.test(dataUrl) ? out : dataUrl };
  }
  const png = c.toDataURL("image/png");
  if (!allowSplit || png.length < 90000) return { data: png };
  // colour on a neutral fill (edges blend cleanly) + alpha mask
  const col = document.createElement("canvas");
  col.width = c.width; col.height = c.height;
  const cg = col.getContext("2d");
  cg.fillStyle = "#808080"; cg.fillRect(0, 0, c.width, c.height);
  cg.drawImage(c, 0, 0);
  const id = g.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) { d[i] = d[i + 1] = d[i + 2] = 0; }
  const m = document.createElement("canvas");
  m.width = c.width; m.height = c.height;
  m.getContext("2d").putImageData(id, 0, 0);
  return { data: col.toDataURL("image/jpeg", 0.88), mask: m.toDataURL("image/png") };
}

// Turn ops + images into the ordered list of use_figma programs.
export async function buildPlan(root, { name, page, onProgress } = {}) {
  let { ops, images } = collectOps(root, name);
  const sizes = {};
  for (const o of ops) for (const f of o.fl || []) if (f.t === "i") sizes[f.img] = Math.max(sizes[f.img] || 0, o.w, o.h);
  const uploads = [];
  const split = new Set();
  for (const [url, id] of images) {
    const r = await shrinkImage(url, Math.max(400, Math.round((sizes[id] || 1000) * 1.25)), true);
    uploads.push(...uploadCalls(id, r.data));
    if (r.mask) { split.add(id); uploads.push(...uploadCalls(id + "m", r.mask)); }
  }
  if (split.size) {
    let next = Math.max(...ops.map((o) => o.i)) + 1;
    const out = [];
    for (const o of ops) {
      const f = (o.fl || []).find((p) => p.t === "i" && split.has(p.img));
      if (!f) { out.push(o); continue; }
      out.push({ ...o, fl: (o.fl || []).filter((p) => p !== f), c: 1 });
      out.push({ k: "f", i: next++, p: o.i, n: "Cut-out mask", x: 0, y: 0, w: o.w, h: o.h, fl: [{ t: "i", img: f.img + "m", m: f.m }], mask: 1 });
      out.push({ k: "f", i: next++, p: o.i, n: "Photo", x: 0, y: 0, w: o.w, h: o.h, fl: [{ t: "i", img: f.img, m: f.m }] });
    }
    ops = out;
  }
  // split ops into chunks under the code limit
  const chunks = [];
  let cur = [];
  let curSz = 0;
  const base = RUNTIME.length + 800;
  for (const o of ops) {
    const sz = JSON.stringify(o).length;
    if (cur.length && base + curSz + sz > MAX_CODE) { chunks.push(cur); cur = []; curSz = 0; }
    cur.push(o); curSz += sz;
  }
  if (cur.length) chunks.push(cur);
  return { uploads, chunks, page, opCount: ops.length, imageCount: images.length };
}

// Run a plan through a callTool(code) function. Returns { rootId }.
export async function runPlan(plan, call, onProgress = () => {}) {
  const hashes = {};
  const tmp = [];
  const total = plan.uploads.length + plan.chunks.length + 1;
  let step = 0;
  for (const u of plan.uploads) {
    onProgress(++step, total, u.kind === "chunk" ? `Uploading image (${u.part + 1}/${u.of})` : "Uploading image");
    const r = await call(u.code, "LSQ Template Studio: upload image");
    if (u.kind === "img") { hashes[u.id] = r.hash; tmp.push(r.tmp); }
  }
  // decide placement: right of everything on the target page
  onProgress(++step, total, "Finding a free spot");
  const place = await call(`let pg=figma.root.children.find(p=>p.name===${JSON.stringify(plan.page)});if(!pg){pg=figma.createPage();pg.name=${JSON.stringify(plan.page)};}await figma.setCurrentPageAsync(pg);let x=0;for(const n of pg.children){if(n.name.startsWith("__lsq_"))continue;x=Math.max(x,n.x+n.width);}return "LSQ:"+JSON.stringify({x:pg.children.length?Math.round(x+200):0,page:pg.id});`, "LSQ Template Studio: find space");
  // move temp image rects to the target page so hashes stay alive, delete later
  const known = {};
  let rootId = null;
  for (let ci = 0; ci < plan.chunks.length; ci++) {
    const ops = plan.chunks[ci];
    const later = plan.chunks.slice(ci + 1).flat();
    const need = [...new Set(later.map((o) => o.p).filter((p) => p !== null))];
    const D = { ops, known, hashes, page: plan.page, rootX: place.x, rootY: 0, need: [...need, 0] };
    onProgress(++step, total, `Building layers (${ci + 1}/${plan.chunks.length})`);
    const r = await call(`const D=${JSON.stringify(D)};\n${RUNTIME}`, "LSQ Template Studio: build editable design");
    Object.assign(known, r.ids || {});
    if (r.root) rootId = r.root;
    else if (known[0]) rootId = known[0];
  }
  if (tmp.length) {
    try { await call(`for(const id of ${JSON.stringify(tmp)}){const n=await figma.getNodeByIdAsync(id);if(n)n.remove();}return "LSQ:{}";`, "LSQ Template Studio: clean up"); } catch {}
  }
  return { rootId: rootId || known[0], pageId: place.page };
}

// Parse a use_figma tool result into the object our programs return.
export function parseResult(res) {
  const texts = [];
  const scan = (v) => {
    if (v == null) return;
    if (typeof v === "string") {
      texts.push(v);
      if (/^\s*"/.test(v)) { try { const u = JSON.parse(v); if (typeof u === "string") texts.unshift(u); } catch {} }
    }
    else if (Array.isArray(v)) v.forEach(scan);
    else if (typeof v === "object") Object.values(v).forEach(scan);
  };
  scan(res && (res.content || res.structuredContent || res.payload || res));
  for (const t of texts) {
    const i = t.indexOf("LSQ:");
    if (i >= 0) {
      let s = t.slice(i + 4);
      // the value may be JSON-quoted inside another string
      for (let end = s.length; end > 0; end--) {
        try { return JSON.parse(s.slice(0, end)); } catch {}
        if (end < s.length - 4000) break;
      }
    }
  }
  const err = texts.find((t) => /error/i.test(t));
  throw Object.assign(new Error(err ? err.slice(0, 300) : "Figma returned no result"), { code: "figma_result" });
}
