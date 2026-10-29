// Speaker photo background removal, fully in the browser.
// Uses MediaPipe Selfie Segmentation (files published next to the page under mp/).
let loading = null;
let seg = null;
let queue = Promise.resolve();

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = res;
    s.onerror = () => rej(new Error("Could not load the background remover"));
    document.head.appendChild(s);
  });
}

async function ensureModel() {
  if (seg) return seg;
  if (!loading) {
    loading = (async () => {
      if (!window.SelfieSegmentation) await loadScript("mp/selfie_segmentation.js");
      const s = new window.SelfieSegmentation({ locateFile: (f) => "mp/" + f });
      s.setOptions({ modelSelection: 0, selfieMode: false });
      await s.initialize();
      seg = s;
      return s;
    })().catch((e) => { loading = null; throw e; });
  }
  return loading;
}

const loadImage = (src) => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error("decode")); im.src = src; });

function runOnce(s, image) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), 30000);
    s.onResults((r) => { clearTimeout(t); resolve(r); });
    s.send({ image }).catch((e) => { clearTimeout(t); reject(e); });
  });
}

// Returns a PNG data URL of the person on a transparent background, trimmed to the
// person (bottom edge kept when the photo is cropped at the shoulders).
export function removeBackground(dataUrl, { maxSide = 1200 } = {}) {
  const job = queue.then(async () => {
    const s = await ensureModel();
    const src = await loadImage(dataUrl);
    const k = Math.min(1, maxSide / Math.max(src.width, src.height));
    const W = Math.round(src.width * k), H = Math.round(src.height * k);
    const base = document.createElement("canvas");
    base.width = W; base.height = H;
    base.getContext("2d").drawImage(src, 0, 0, W, H);
    const res = await runOnce(s, base);

    // Mask: upscale, feather lightly, then tighten the soft edge.
    const m = document.createElement("canvas");
    m.width = W; m.height = H;
    const mg = m.getContext("2d");
    mg.filter = "blur(1.5px)";
    mg.drawImage(res.segmentationMask, 0, 0, W, H);
    mg.filter = "none";
    const md = mg.getImageData(0, 0, W, H);
    const d = md.data;
    for (let i = 0; i < d.length; i += 4) {
      // MediaPipe writes confidence into the red channel (and alpha on some builds).
      const v = Math.max(d[i], d[i + 3] < 255 ? d[i + 3] : 0) / 255;
      const t = Math.min(1, Math.max(0, (v - 0.45) / 0.33));
      const a = t * t * (3 - 2 * t);
      d[i] = d[i + 1] = d[i + 2] = 255;
      d[i + 3] = Math.round(a * 255);
    }
    // Erode the alpha a few pixels: the low-resolution mask overshoots the person,
    // which leaves a rim of the old background.
    {
      const r = Math.max(2, Math.round(Math.max(W, H) / 260));
      const A = new Uint8ClampedArray(W * H);
      for (let i = 0; i < W * H; i++) A[i] = d[i * 4 + 3];
      const T = new Uint8ClampedArray(W * H);
      for (let y = 0; y < H; y++) {
        const row = y * W;
        for (let x = 0; x < W; x++) {
          let mn = 255;
          for (let k = Math.max(0, x - r), e = Math.min(W - 1, x + r); k <= e; k++) { const v = A[row + k]; if (v < mn) mn = v; }
          T[row + x] = mn;
        }
      }
      for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
          let mn = 255;
          // keep the bottom edge (shoulders cut by the photo frame) intact
          for (let k = Math.max(0, y - r), e = Math.min(H - 1, y + r); k <= e; k++) { const v = T[k * W + x]; if (v < mn) mn = v; }
          d[(y * W + x) * 4 + 3] = y > H - r - 1 ? T[y * W + x] : mn;
        }
      }
    }
    mg.putImageData(md, 0, 0);
    // soften the eroded edge
    const m2 = document.createElement("canvas");
    m2.width = W; m2.height = H;
    const m2g = m2.getContext("2d");
    m2g.filter = "blur(1px)";
    m2g.drawImage(m, 0, 0);
    mg.clearRect(0, 0, W, H);
    mg.drawImage(m2, 0, 0);

    const out = document.createElement("canvas");
    out.width = W; out.height = H;
    const og = out.getContext("2d");
    og.drawImage(m, 0, 0);
    og.globalCompositeOperation = "source-in";
    og.drawImage(base, 0, 0);
    og.globalCompositeOperation = "source-over";

    // De-fringe: edge pixels still carry some of the old background colour. Spread the
    // colour of the solid interior outwards and use it on semi-transparent edge pixels.
    {
      const img = og.getImageData(0, 0, W, H);
      const px = img.data;
      const core = document.createElement("canvas");
      core.width = W; core.height = H;
      const cg = core.getContext("2d");
      const cd = cg.createImageData(W, H);
      for (let i = 0; i < px.length; i += 4) {
        if (px[i + 3] > 242) { cd.data[i] = px[i]; cd.data[i + 1] = px[i + 1]; cd.data[i + 2] = px[i + 2]; cd.data[i + 3] = 255; }
      }
      cg.putImageData(cd, 0, 0);
      const spread = document.createElement("canvas");
      spread.width = W; spread.height = H;
      const sg = spread.getContext("2d");
      const r = Math.max(2, Math.round(Math.max(W, H) / 220));
      sg.filter = `blur(${r}px)`;
      sg.drawImage(core, 0, 0);
      sg.drawImage(core, 0, 0);
      sg.filter = "none";
      const sp = sg.getImageData(0, 0, W, H).data;
      for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3];
        if (a > 0 && a <= 242 && sp[i + 3] > 8) { px[i] = sp[i]; px[i + 1] = sp[i + 1]; px[i + 2] = sp[i + 2]; }
      }
      og.putImageData(img, 0, 0);
    }

    // Trim to the person.
    const od = og.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (od[(y * W + x) * 4 + 3] > 24) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 < 0) throw new Error("No person found in the photo");
    const pad = Math.round(Math.max(W, H) * 0.01);
    x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad);
    if (y1 > H - pad * 4) y1 = H - 1; else y1 = Math.min(H - 1, y1 + pad);
    const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
    const crop = document.createElement("canvas");
    crop.width = cw; crop.height = ch;
    crop.getContext("2d").drawImage(out, x0, y0, cw, ch, 0, 0, cw, ch);
    return crop.toDataURL("image/png");
  });
  queue = job.catch(() => {});
  return job;
}

export function preloadCutout() {
  return ensureModel().then(() => true, () => false);
}
