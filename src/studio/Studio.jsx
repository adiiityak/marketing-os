// Template Studio: pick a LeadSquared template, fill the details, get a PNG, an
// editable Figma frame, or a brief for a V2 / brand-new template.
import { TEMPLATES, GROUPS, INDUSTRIES } from "./templates/index.js";
import { mount, defaultsFor, exportBlob, readImage, hasTransparency, slug, SPEAKER_LABELS } from "./engine.js";
import { removeBackground, preloadCutout } from "./cutout.js";
import { buildPlan, runPlan, parseResult } from "./tofigma.js";
import { loadFeedback, feedbackLines } from "./feedback.js";

const R = window.React;
const { useState, useEffect, useRef, useMemo, useCallback } = R;

const figmaLink = (s) => `https://www.figma.com/design/${s.key}?node-id=${String(s.node).replace(":", "-")}`;

// Output files in the "LSQ OS Generated Output" Figma project (writes go only here).
export const OUTPUT_FILES = {
  "Webinar banners": { name: "Webinar Banners", key: "rrBw0IIMYMrQDMfumBVNm9" },
  "Social posts": { name: "Social Creatives", key: "TfeZrveanv5aZGmqNwJKBt" },
  Carousels: { name: "Carousels", key: "FGXppeXkOd5FRttkwvAc9V" },
  "Event creatives": { name: "Event Creatives", key: "USnxFrEkabzTsxuQ7VQdCC" },
  Covers: { name: "LinkedIn & Profile Covers", key: "6Tsm6wBpbOYu5KSNZTpieK" },
  "One-pagers and ebooks": { name: "One Pagers", key: "Coxg9rKE45fZqUPJ0ilWMz" },
  Ebooks: { name: "Ebooks", key: "Cq6ZAaTbVYhkAo1EA7VnF0" },
};
export const outputFor = (t) =>
  /carousel/.test(t.id) ? OUTPUT_FILES.Carousels
  : /cover/.test(t.id) && /linkedin|youtube|x-/.test(t.id) ? OUTPUT_FILES.Covers
  : /^ebook/.test(t.id) ? OUTPUT_FILES.Ebooks
  : OUTPUT_FILES[t.group] || OUTPUT_FILES["Social posts"];

const MODES = [
  { key: "use", icon: "layers", label: "Use this template", text: "Same layout, your content. Download it or push it to Figma right away." },
  { key: "v2", icon: "wand", label: "Make a V2", text: "Same family, fresh variation: new background, layout shift or accent. Claude builds it." },
  { key: "new", icon: "sparkles", label: "Totally new template", text: "A new design for this format, built from the brand rules. Claude builds it." },
];

const FIGMA_FIX = {
  needs_reauth: "Your Figma connection needs to be renewed. Reconnect Figma in claude.ai Settings, Connectors, then try again.",
  server_not_connected: "Figma isn't connected for you yet. Connect it in claude.ai Settings, Connectors, then try again.",
  server_not_found: "Figma isn't connected for you yet. Connect it in claude.ai Settings, Connectors, then try again.",
  not_granted: "The page needs your OK to use Figma. Click Push to Figma again and allow it.",
  consent_required: "The page needs your OK to use Figma. Click Push to Figma again and allow it.",
  rate_limited: "Figma is busy. Wait a minute and try again.",
  blocked_by_policy: "Your organisation doesn't allow this page to use Figma.",
};

// ---------- styles (scoped, theme tokens from the dashboard) ----------
const CSS = `
.ls-chips{display:flex;flex-wrap:wrap;gap:.5rem}
.ls-chip{border:1px solid hsl(var(--border));border-radius:999px;padding:.25rem .75rem;font-size:.875rem;color:hsl(var(--foreground));background:transparent;cursor:pointer;white-space:nowrap}
.ls-chip:hover{background:hsl(var(--accent))}
.ls-chip[aria-pressed=true]{background:hsl(var(--primary));border-color:hsl(var(--primary));color:hsl(var(--primary-foreground))}
.ls-chip .n{margin-left:.35rem;font-size:.75rem;opacity:.75;font-variant-numeric:tabular-nums}
.ls-chip:disabled{opacity:.45;cursor:default}
.ls-grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))}
.ls-card{border:1px solid hsl(var(--border));border-radius:.75rem;background:hsl(var(--card));overflow:hidden;display:flex;flex-direction:column}
.ls-thumb{display:flex;align-items:center;justify-content:center;height:14rem;background:hsl(var(--muted));padding:.75rem;border:0;width:100%;cursor:pointer}
.ls-meta{padding:1rem;display:flex;flex-direction:column;gap:.4rem;flex:1}
.ls-row{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.ls-badge{border-radius:.3rem;background:hsl(var(--secondary));color:hsl(var(--secondary-foreground));padding:.1rem .4rem;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap}
.ls-fav{background:hsl(var(--star)/.15);color:hsl(var(--star))}
.ls-muted{color:hsl(var(--muted-foreground))}
.ls-small{font-size:.75rem;line-height:1.1rem}
.ls-link{color:hsl(var(--primary));font-size:.75rem}
.ls-link:hover{text-decoration:underline}
.ls-modes{display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.ls-mode{border:1px solid hsl(var(--border));border-radius:.75rem;padding:.75rem;text-align:left;background:transparent;cursor:pointer;color:hsl(var(--foreground))}
.ls-mode[aria-checked=true]{border-color:hsl(var(--primary));background:hsl(var(--primary)/.06)}
.ls-edit{display:grid;gap:1.5rem;grid-template-columns:minmax(0,1fr)}
@media (min-width:1024px){.ls-edit{grid-template-columns:minmax(0,390px) minmax(0,1fr)}.ls-side{position:sticky;top:5rem;align-self:start}}
.ls-panel{border:1px solid hsl(var(--border));border-radius:.75rem;background:hsl(var(--card));padding:1rem;display:flex;flex-direction:column;gap:1rem}
.ls-field{display:grid;gap:.35rem}
.ls-label{font-size:.875rem;font-weight:500;color:hsl(var(--foreground))}
.ls-input,.ls-select,.ls-area{width:100%;border:1px solid hsl(var(--input));border-radius:calc(var(--radius) - 2px);background:hsl(var(--background));color:hsl(var(--foreground));padding:.45rem .7rem;font-size:.875rem}
.ls-area{resize:vertical;min-height:4.5rem}
.ls-input:focus,.ls-select:focus,.ls-area:focus{outline:2px solid hsl(var(--ring));outline-offset:1px}
.ls-item{border:1px solid hsl(var(--border));border-radius:.6rem;padding:.75rem;display:grid;gap:.6rem}
.ls-two{display:grid;gap:.6rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr))}
.ls-img{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap}
.ls-sw{width:2.75rem;height:2.75rem;flex:none;border:1px solid hsl(var(--border));border-radius:.4rem;overflow:hidden;display:flex;align-items:center;justify-content:center;background:repeating-conic-gradient(hsl(var(--muted)) 0 25%,hsl(var(--background)) 0 50%) 0 0/12px 12px}
.ls-sw.round{border-radius:50%}
.ls-sw img{width:100%;height:100%;object-fit:contain}
.ls-preview{border:1px solid hsl(var(--border));border-radius:.75rem;background:hsl(var(--muted)/.5);padding:1rem;display:flex;justify-content:center}
.ls-actions{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center}
.ls-note{font-size:.875rem;color:hsl(var(--muted-foreground))}
.ls-note.err{color:hsl(var(--destructive))}
.ls-note.ok{color:hsl(var(--foreground))}
.ls-progress{height:.375rem;border-radius:999px;background:hsl(var(--muted));overflow:hidden}
.ls-progress i{display:block;height:100%;background:hsl(var(--primary));transition:width .3s}
.ls-fb{border:1px solid hsl(var(--border));border-radius:.75rem;padding:.75rem 1rem;display:grid;gap:.5rem}
.ls-fb ul{display:grid;gap:.45rem;margin:0;padding:0;list-style:none}
.ls-fb li{font-size:.8125rem;line-height:1.35;color:hsl(var(--foreground))}
.ls-pre{max-height:18rem;overflow:auto;white-space:pre-wrap;border-radius:.4rem;background:hsl(var(--muted)/.5);padding:.75rem;font-size:.75rem;color:hsl(var(--foreground));font-family:inherit}
.ls-modal{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:1rem}
.ls-modal>div{background:hsl(var(--background));border-radius:.75rem;max-width:min(92vw,900px);max-height:92vh;overflow:auto;padding:1rem;display:grid;gap:.75rem}
.ls-modal img{max-width:100%;height:auto;border-radius:.4rem}
`;
let cssDone = false;
function ensureCss() {
  if (cssDone) return;
  const s = document.createElement("style");
  s.setAttribute("data-studio-ui", "");
  s.textContent = CSS;
  document.head.appendChild(s);
  cssDone = true;
}

function useWidth(ref) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.floor(e.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return w;
}

// Scaled live preview. onNode receives the mounted canvas node.
function Canvas({ tpl, values, width, onNode, shadow }) {
  const ref = useRef(null);
  const k = width / tpl.w;
  useEffect(() => {
    if (!ref.current) return;
    let alive = true;
    const node = mount(ref.current, tpl, values);
    onNode && onNode(node);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
      if (!alive || !ref.current) return;
      try { const n2 = mount(ref.current, tpl, values); onNode && onNode(n2); } catch {}
    });
    return () => { alive = false; };
  }, [tpl, values]);
  return R.createElement("div", { style: { width, height: tpl.h * k, position: "relative", overflow: "hidden", borderRadius: 6, boxShadow: shadow ? "0 6px 20px rgba(0,0,0,.18)" : "none" } },
    R.createElement("div", { ref, style: { width: tpl.w, height: tpl.h, transform: `scale(${k})`, transformOrigin: "0 0" } }));
}

// ---------- gallery ----------
function TemplateCard({ t, onPick, ui }) {
  const ref = useRef(null);
  const w = useWidth(ref);
  const values = useMemo(() => defaultsFor(t), [t]);
  const Button = ui.Button;
  return (
    <div className="ls-card" data-tpl={t.id}>
      <button type="button" className="ls-thumb" ref={ref} onClick={onPick} aria-label={"Open " + t.name}>
        {w > 0 && <Canvas tpl={t} values={values} width={Math.min(w - 24, 200 * (t.w / t.h))} shadow />}
      </button>
      <div className="ls-meta">
        <div className="ls-row">
          <h3 style={{ flex: 1, minWidth: 0, fontSize: ".875rem", fontWeight: 600, margin: 0 }}>{t.name}</h3>
          {t.favourite && <span className="ls-badge ls-fav">Team favourite</span>}
          <span className="ls-badge">{t.w}×{t.h}</span>
        </div>
        <div className="ls-row ls-small ls-muted">{[t.industry, t.group].filter(Boolean).join(" · ")}</div>
        <p className="ls-small ls-muted" style={{ margin: 0 }}>{t.notes}</p>
        <div className="ls-row" style={{ marginTop: "auto", paddingTop: ".25rem" }}>
          <Button size="sm" onClick={onPick}>Use template</Button>
          <a className="ls-link" href={figmaLink(t.source)} target="_blank" rel="noopener" title={t.source.file}>Source in Figma</a>
        </div>
      </div>
    </div>
  );
}

function Gallery({ onPick, ui }) {
  const [ind, setInd] = useState("all");
  const [grp, setGrp] = useState("all");
  const groups = GROUPS.filter((g) => TEMPLATES.some((t) => t.group === g));
  const list = TEMPLATES.filter((t) => (ind === "all" || t.industry === ind) && (grp === "all" || t.group === grp));
  const count = (f) => TEMPLATES.filter(f).length;
  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <div style={{ display: "grid", gap: ".6rem" }}>
        <div className="ls-chips" role="group" aria-label="Industry" id="tpl-industries">
          {[["all", "All industries", TEMPLATES.length], ...INDUSTRIES.map((i) => [i, i, count((t) => t.industry === i)])].map(([k, label, n]) => (
            <button key={k} type="button" className="ls-chip" aria-pressed={ind === k} data-ind={k} onClick={() => setInd(k)}>
              {label}<span className="n">{n}</span>
            </button>
          ))}
        </div>
        <div className="ls-chips" role="group" aria-label="Asset type" id="tpl-groups">
          {[["all", "All types"], ...groups.map((g) => [g, g])].map(([k, label]) => (
            <button key={k} type="button" className="ls-chip" aria-pressed={grp === k} data-group={k} onClick={() => setGrp(k)}>{label}</button>
          ))}
        </div>
      </div>
      {list.length ? (
        <div className="ls-grid" id="tpl-grid">{list.map((t) => <TemplateCard key={t.id} t={t} ui={ui} onPick={() => onPick(t.id)} />)}</div>
      ) : (
        <p className="ls-note">No {ind === "all" ? "" : ind + " "}templates for this type yet. Pick “Totally new template” on any template to brief Claude for one.</p>
      )}
    </div>
  );
}

// ---------- inputs ----------
function ImageInput({ id, value, onChange, kind, cutout, ui }) {
  const fileRef = useRef(null);
  const original = useRef(null);
  const [state, setState] = useState(null); // {busy, text, error}
  const Button = ui.Button;

  const apply = async (dataUrl, wantCut) => {
    if (!wantCut) { onChange(dataUrl); setState(null); return; }
    if (await hasTransparency(dataUrl)) { onChange(dataUrl); setState({ text: "Already a cut-out, used as is." }); return; }
    setState({ busy: true, text: "Removing the background…" });
    onChange(dataUrl);
    try {
      const cut = await removeBackground(dataUrl);
      onChange(cut);
      setState({ text: "Background removed." });
    } catch (e) {
      setState({ error: true, text: "Couldn't remove the background (" + ((e && e.message) || "error") + "). The original photo is used." });
    }
  };

  const pick = async (ev) => {
    const f = ev.target.files && ev.target.files[0];
    ev.target.value = "";
    if (!f) return;
    if (!/^image\//.test(f.type)) { setState({ error: true, text: "Use a PNG, JPG, SVG or WebP image." }); return; }
    try {
      const data = await readImage(f, kind === "logo" ? 600 : 1400);
      original.current = data;
      await apply(data, cutout && kind === "photo");
    } catch { setState({ error: true, text: "Couldn't read that image." }); }
  };

  return (
    <div className="ls-img">
      <div className={"ls-sw" + (kind === "photo" && !cutout ? " round" : "")}>{value ? <img src={value} alt="" /> : null}</div>
      <input ref={fileRef} id={id} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" hidden onChange={pick} />
      <Button type="button" size="sm" variant="outline" disabled={state && state.busy} onClick={() => fileRef.current && fileRef.current.click()}>{value ? "Replace" : "Upload"}</Button>
      {value && <Button type="button" size="sm" variant="ghost" onClick={() => { onChange(""); original.current = null; setState(null); }}>Remove</Button>}
      {cutout && kind === "photo" && original.current && !(state && state.busy) && (
        value === original.current
          ? <Button type="button" size="sm" variant="ghost" onClick={() => apply(original.current, true)}>Remove background</Button>
          : <Button type="button" size="sm" variant="ghost" onClick={() => { onChange(original.current); setState({ text: "Using the original photo." }); }}>Use original</Button>
      )}
      {state && <span className={"ls-small " + (state.error ? "ls-note err" : "ls-muted")} role="status">{state.text}</span>}
    </div>
  );
}

function FieldInput({ f, value, onChange, idp, ui, cutoutDefault }) {
  const id = idp + f.key;
  if (f.kind === "image" || f.kind === "logo" || f.kind === "photo")
    return <ImageInput id={id} value={value} onChange={onChange} kind={f.kind === "image" ? "image" : f.kind} cutout={f.kind === "photo" && (f.cutout != null ? f.cutout : cutoutDefault)} ui={ui} />;
  if (f.kind === "textarea")
    return <textarea id={id} className="ls-area" rows={3} value={value || ""} maxLength={f.max ? f.max * 3 : 600} onChange={(e) => onChange(e.target.value)} />;
  if (f.kind === "select")
    return <select id={id} className="ls-select" value={value || ""} onChange={(e) => onChange(e.target.value)}>{(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}</select>;
  return <input id={id} className="ls-input" value={value || ""} maxLength={f.max ? Math.round(f.max * 1.6) : 200} onChange={(e) => onChange(e.target.value)} />;
}

function Repeater({ label, items, min, max, itemFields, onChange, idp, addLabel, ui, cutout }) {
  const Button = ui.Button;
  const set = (i, k, v) => onChange(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  return (
    <div style={{ display: "grid", gap: ".5rem" }}>
      <div className="ls-row">
        <span className="ls-label">{label}</span>
        <span className="ls-small ls-muted">{items.length} of {max}</span>
        {items.length < max && <Button type="button" size="sm" variant="outline" style={{ marginLeft: "auto" }} id={idp + "add"} onClick={() => onChange([...items, {}])}>{addLabel}</Button>}
      </div>
      {cutout && <p className="ls-small ls-muted" style={{ margin: 0 }}>Photos are cut out automatically, like the team's favourite designs. Use “Use original” to keep the background.</p>}
      {items.map((it, i) => (
        <div className="ls-item" key={i} data-item={i}>
          <div className="ls-row ls-small ls-muted" style={{ fontWeight: 500 }}>
            {label.replace(/s$/, "")} {i + 1}
            {items.length > min && <button type="button" className="ls-link" style={{ marginLeft: "auto", color: "hsl(var(--destructive))", background: "none", border: 0, cursor: "pointer" }} onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>}
          </div>
          <div className="ls-two">
            {itemFields.map((f) => (
              <div className="ls-field" key={f.key} style={/photo|logo|image|textarea/.test(f.kind) ? { gridColumn: "1 / -1" } : null}>
                <label className="ls-small ls-label" htmlFor={`${idp}${i}-${f.key}`}>{f.label}</label>
                <FieldInput f={f} idp={`${idp}${i}-`} value={it[f.key]} onChange={(v) => set(i, f.key, v)} ui={ui} cutoutDefault={cutout} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- brief ----------
export function briefFor(tpl, values, mode, direction, feedback) {
  const out = [];
  const add = (k, v) => { if (v) out.push(`- ${k}: ${v}`); };
  const head =
    mode === "v2" ? `Make a V2 variant of the "${tpl.name}" template (${tpl.w}x${tpl.h}).`
    : mode === "new" ? `Design a totally new ${tpl.group.replace(/s$/, "").toLowerCase()} template at ${tpl.w}x${tpl.h} for ${tpl.channel}${tpl.industry ? " (" + tpl.industry + ")" : ""}.`
    : `Create this "${tpl.name}" design (${tpl.w}x${tpl.h}) with the content below.`;
  const lines = [`Use the lsq-template-studio skill. ${head}`, ""];
  const of = outputFor(tpl);
  lines.push(`Template: ${tpl.id} — source frame ${figmaLink(tpl.source)} (read only, never edit it).`);
  lines.push(`Figma output: add a new frame to "${of.name}" in the LSQ OS Generated Output project (https://www.figma.com/design/${of.key}).`);
  if (tpl.speakers && tpl.speakers.cutout) lines.push("Speaker photos: cut out (no photo background), as in the source frame.");
  if (direction) lines.push(`Direction: ${direction}`);
  lines.push("", "Content:");
  for (const f of tpl.fields || []) {
    const v = values[f.key];
    if (/image|logo|photo/.test(f.kind || "")) add(f.label, v ? "attached image (see uploads)" : "");
    else add(f.label, v);
    if (f.accent && values[f.key + "Accent"]) add(f.label + " highlight", values[f.key + "Accent"]);
  }
  for (const l of tpl.list || []) (values[l.key] || []).forEach((it, i) => add(`${l.label} ${i + 1}`, l.itemFields.filter((f) => !/image|logo|photo/.test(f.kind || "")).map((f) => it[f.key]).filter(Boolean).join(" | ")));
  if (tpl.speakers) (values.speakers || []).forEach((s, i) => add(`Speaker ${i + 1}`, [s.name, s.title, s.company].filter(Boolean).join(", ") + (s.photo ? " (photo attached)" : "") + (s.logo ? " (logo attached)" : "")));
  lines.push(...out);
  lines.push(...feedbackLines(feedback));
  lines.push("", "I will attach the photos and logos in this chat. Keep the LeadSquared logo, Poppins/Inter type and brand colours. Show me options before finalising.");
  return lines.join("\n");
}

const today = () => new Date().toISOString().slice(0, 10);

// ---------- editor ----------
function Editor({ tpl, onBack, downloads, canSave, onSave, ui }) {
  const { Button, Icon } = ui;
  const [values, setValues] = useState(() => defaultsFor(tpl));
  const [mode, setMode] = useState("use");
  const [direction, setDirection] = useState("");
  const [scale, setScale] = useState(2);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);
  const [hidden, setHidden] = useState({});
  const [fallback, setFallback] = useState(null);
  const [progress, setProgress] = useState(null);
  const [figmaDone, setFigmaDone] = useState(null);
  const [feedback, setFeedback] = useState({ items: [], available: false, loading: true });
  const [mcpOk, setMcpOk] = useState(null);
  const nodeRef = useRef(null);
  const boxRef = useRef(null);
  const w = useWidth(boxRef);

  useEffect(() => { ensureCss(); }, []);
  useEffect(() => {
    let alive = true;
    loadFeedback(tpl).then((r) => alive && setFeedback({ ...r, loading: false }), () => alive && setFeedback({ items: [], available: false, loading: false }));
    return () => { alive = false; };
  }, [tpl]);
  useEffect(() => {
    let alive = true;
    (async () => { try { const m = window.claude && window.claude.use ? await window.claude.use("mcp") : null; alive && setMcpOk(!!m); } catch { alive && setMcpOk(false); } })();
    if (tpl.speakers && tpl.speakers.cutout) setTimeout(() => preloadCutout(), 1500);
    return () => { alive = false; };
  }, [tpl]);

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const shown = useMemo(() => {
    const o = { ...values };
    for (const f of tpl.fields || []) if (f.optional && hidden[f.key]) o[f.key] = "";
    return o;
  }, [values, hidden, tpl]);
  const filename = `${slug(values.title || values.line1 || tpl.name)}-${tpl.w}x${tpl.h}${scale > 1 ? "@" + scale + "x" : ""}.png`;
  const brief = briefFor(tpl, shown, mode, direction, feedback.items);

  const render = async (s = scale) => {
    if (!nodeRef.current) throw new Error("The preview isn't ready yet");
    return exportBlob(nodeRef.current, tpl, s);
  };

  const download = async () => {
    setBusy(true); setNote(null);
    let blob = null;
    try {
      blob = await render();
      if (!downloads) throw Object.assign(new Error("Downloads aren't available here"), { code: "unavailable" });
      await downloads.save({ filename, data: blob });
      setNote({ ok: true, text: "Saved " + filename });
    } catch (e) {
      if (e && e.code === "declined") { setNote(null); return; }
      if (blob) {
        setFallback({ url: URL.createObjectURL(blob), filename });
        setNote({ text: "Your browser blocked the download, so the image is open below: right-click it and choose “Save image as”." });
      } else setNote({ error: true, text: "Couldn't create the PNG (" + ((e && (e.code || e.message)) || "error") + ")." });
    } finally { setBusy(false); }
  };

  const save = async () => {
    setBusy(true); setNote(null);
    try {
      const blob = await render();
      onSave({ tpl, values: shown, file: new File([blob], filename, { type: "image/png" }), brief: briefFor(tpl, shown, "use", "", []) });
    } catch (e) {
      setNote({ error: true, text: "Couldn't create the PNG (" + ((e && e.message) || "error") + ")." });
    } finally { setBusy(false); }
  };

  const copyBrief = () => {
    const done = () => setNote({ ok: true, text: "Brief copied. Paste it into a chat in the LSQ OS project and attach the photos and logos." });
    const fail = () => setNote({ error: true, text: "Copy was blocked. Select the brief below and copy it." });
    try { navigator.clipboard.writeText(brief).then(done, fail); } catch { fail(); }
  };

  const pushToFigma = async () => {
    setBusy(true); setNote(null); setFigmaDone(null); setProgress({ step: 0, total: 1, text: "Connecting to Figma" });
    const target = outputFor(tpl);
    try {
      const mcp = window.claude && window.claude.use ? await window.claude.use("mcp") : null;
      if (!mcp) throw Object.assign(new Error("Figma isn't available on this page"), { code: "server_not_connected" });
      const call = async (code, description) => parseResult(await mcp.callTool("Figma", "use_figma", { fileKey: target.key, code, description }));
      const page = today().slice(0, 7);
      const who = (values.speakers && values.speakers[0] && values.speakers[0].name) || "";
      const name = [today(), (values.title || values.line1 || tpl.name).slice(0, 60), who, tpl.id].filter(Boolean).join(" · ");
      const plan = await buildPlan(nodeRef.current, { name, page });
      const res = await runPlan(plan, call, (step, total, text) => setProgress({ step, total, text }));
      const url = `https://www.figma.com/design/${target.key}?node-id=${String(res.rootId || "").replace(":", "-")}`;
      setFigmaDone({ url, file: target.name });
      setNote({ ok: true, text: `Editable design added to “${target.name}”, page ${page}. Every text, shape and image is a separate layer you can tweak.` });
    } catch (e) {
      const code = e && e.code;
      setNote({ error: true, text: FIGMA_FIX[code] || "Couldn't push to Figma (" + ((e && e.message) || code || "error") + ")." });
    } finally { setBusy(false); setProgress(null); }
  };

  const sp = tpl.speakers;
  const spFields = (sp && sp.fields ? sp.fields : ["photo", "name", "title", "logo"]).map((k) => ({ key: k, label: SPEAKER_LABELS[k] || k, kind: k === "photo" ? "photo" : k === "logo" ? "logo" : "text" }));
  const of = outputFor(tpl);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div className="ls-row">
        <Button variant="ghost" size="sm" onClick={onBack} id="studio-back" style={{ marginLeft: "-.5rem" }}><Icon name="arrowleft" />All templates</Button>
        <span style={{ fontSize: ".875rem", fontWeight: 600 }}>{tpl.name}</span>
        <span className="ls-badge">{tpl.w}×{tpl.h}</span>
        {tpl.industry && <span className="ls-badge">{tpl.industry}</span>}
        <span style={{ marginLeft: "auto" }} />
        <a className="ls-link" href={figmaLink(tpl.source)} target="_blank" rel="noopener">Source frame</a>
        <a className="ls-link" href={`https://www.figma.com/design/${of.key}`} target="_blank" rel="noopener">Output file: {of.name}</a>
      </div>

      <div className="ls-modes" role="radiogroup" aria-label="What do you want to make" id="studio-modes">
        {MODES.map((m) => (
          <button key={m.key} type="button" role="radio" aria-checked={mode === m.key} data-mode={m.key} className="ls-mode" onClick={() => setMode(m.key)}>
            <div className="ls-row" style={{ fontSize: ".875rem", fontWeight: 500 }}><Icon name={m.icon} className="h-4 w-4 text-primary" />{m.label}</div>
            <p className="ls-small ls-muted" style={{ margin: ".25rem 0 0" }}>{m.text}</p>
          </button>
        ))}
      </div>

      <div className="ls-edit">
        <div className="ls-panel" id="studio-form">
          <div style={{ fontSize: ".875rem", fontWeight: 600 }}>Details</div>
          {(tpl.fields || []).map((f) => (
            <div className="ls-field" key={f.key}>
              <div className="ls-row">
                <label className="ls-label" htmlFor={"sf-" + f.key}>{f.label}</label>
                {f.optional && (
                  <label className="ls-small ls-muted" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: ".35rem" }}>
                    <input type="checkbox" id={"sf-on-" + f.key} checked={!hidden[f.key]} onChange={(e) => setHidden((h) => ({ ...h, [f.key]: !e.target.checked }))} />
                    {f.toggleLabel || "Show"}
                  </label>
                )}
              </div>
              {!(f.optional && hidden[f.key]) && <FieldInput f={f} idp="sf-" value={values[f.key]} onChange={(v) => set(f.key, v)} ui={ui} cutoutDefault={false} />}
              {f.accent && !(f.optional && hidden[f.key]) && (
                <input className="ls-input" id={"sf-" + f.key + "-accent"} value={values[f.key + "Accent"] || ""} onChange={(e) => set(f.key + "Accent", e.target.value)} placeholder="Words to highlight, comma separated" aria-label={f.label + " highlight"} style={{ fontSize: ".75rem" }} />
              )}
              {f.max && typeof values[f.key] === "string" && values[f.key].length > f.max && (
                <p className="ls-small" style={{ margin: 0, color: "hsl(var(--warn))" }}>Longer than the design expects ({values[f.key].length}/{f.max}). The text will shrink to fit.</p>
              )}
            </div>
          ))}
          {(tpl.list || []).map((l) => (
            <Repeater key={l.key} label={l.label} items={values[l.key] || []} min={l.min || 0} max={l.max || 6} itemFields={l.itemFields} onChange={(v) => set(l.key, v)} idp={`sl-${l.key}-`} addLabel="Add" ui={ui} />
          ))}
          {sp && <Repeater label={sp.label || "Speakers"} items={values.speakers || []} min={sp.min || 0} max={sp.max || 4} itemFields={spFields} onChange={(v) => set("speakers", v)} idp="ss-" addLabel="Add speaker" ui={ui} cutout={!!sp.cutout} />}
          {mode !== "use" && (
            <div className="ls-field">
              <label className="ls-label" htmlFor="sf-direction">{mode === "v2" ? "What should change in the V2?" : "Describe the new template"}</label>
              <textarea id="sf-direction" className="ls-area" rows={3} value={direction} onChange={(e) => setDirection(e.target.value)} placeholder={mode === "v2" ? "e.g. lighter background, speakers on the left, more space for the title" : "e.g. bold typographic layout for a product launch, no photos"} />
            </div>
          )}
        </div>

        <div className="ls-side" style={{ display: "grid", gap: ".75rem" }}>
          <div className="ls-preview" ref={boxRef} id="studio-preview">
            {w > 0 && <Canvas tpl={tpl} values={shown} width={Math.min(w - 32, tpl.w, tpl.h > tpl.w ? 520 : 9999)} onNode={(n) => { nodeRef.current = n; }} shadow />}
          </div>

          {mode === "use" ? (
            <div className="ls-actions">
              <select className="ls-select" style={{ width: "auto" }} id="studio-scale" value={scale} onChange={(e) => setScale(+e.target.value)} aria-label="PNG size">
                {[1, 2, 3].map((s) => <option key={s} value={s}>{s}x · {tpl.w * s}px wide</option>)}
              </select>
              <Button id="studio-download" disabled={busy} onClick={download}><Icon name="download" />{busy && !progress ? "Rendering…" : "Download PNG"}</Button>
              <Button id="studio-figma-push" variant="outline" disabled={busy || mcpOk === false} onClick={pushToFigma} title={mcpOk === false ? "Figma isn't available on this page" : "Creates the design in Figma as editable layers"}><Icon name="external" />Push to Figma (editable)</Button>
              {canSave && <Button id="studio-save" variant="outline" disabled={busy} onClick={save}><Icon name="plus" />Save to library</Button>}
              <Button id="studio-figma" variant="ghost" onClick={copyBrief}><Icon name="copy" />Copy brief</Button>
            </div>
          ) : (
            <div className="ls-actions">
              <Button id="studio-brief" onClick={copyBrief}><Icon name="copy" />Copy brief for Claude</Button>
              <span className="ls-small ls-muted">Paste it in a chat in the LSQ OS project and attach the photos and logos. The preview shows the current template with your content.</span>
            </div>
          )}

          {progress && (
            <div style={{ display: "grid", gap: ".35rem" }} aria-live="polite">
              <div className="ls-progress"><i style={{ width: Math.round((progress.step / Math.max(1, progress.total)) * 100) + "%" }} /></div>
              <span className="ls-small ls-muted">{progress.text}… ({progress.step}/{progress.total})</span>
            </div>
          )}
          {note && <p id="studio-note" className={"ls-note" + (note.error ? " err" : note.ok ? " ok" : "")} style={{ margin: 0 }}>{note.text}</p>}
          {figmaDone && <a className="ls-link" style={{ fontSize: ".875rem" }} href={figmaDone.url} target="_blank" rel="noopener" id="studio-figma-link">Open it in Figma ({figmaDone.file})</a>}

          <div className="ls-fb" id="studio-feedback">
            <div className="ls-row">
              <span style={{ fontSize: ".875rem", fontWeight: 600 }}>Team feedback Claude applies</span>
              <span className="ls-small ls-muted">{feedback.loading ? "Loading…" : feedback.items.length ? feedback.items.length + " notes" : "None yet"}</span>
            </div>
            {feedback.items.length ? (
              <ul>
                {feedback.items.map((f, i) => (
                  <li key={i}><span className="ls-badge" style={{ marginRight: ".4rem" }}>{f.scope}{f.rating ? " · " + f.rating + "★" : ""}</span>{f.note}<span className="ls-small ls-muted"> — {String(f.title || "").slice(0, 50)}</span></li>
                ))}
              </ul>
            ) : (
              <p className="ls-small ls-muted" style={{ margin: 0 }}>Rate assets in the library and say why. Every comment is kept and added to the next brief for this template, its industry and creatives in general.</p>
            )}
          </div>

          {mode !== "use" && (
            <details className="ls-fb" open>
              <summary style={{ cursor: "pointer", fontWeight: 500, fontSize: ".875rem" }}>Brief</summary>
              <pre id="studio-brief-text" className="ls-pre">{brief}</pre>
            </details>
          )}
        </div>
      </div>

      {fallback && (
        <div className="ls-modal" role="dialog" aria-label="Save image" onClick={() => { URL.revokeObjectURL(fallback.url); setFallback(null); }}>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="ls-row"><strong style={{ fontSize: ".9rem" }}>{fallback.filename}</strong><span style={{ marginLeft: "auto" }} /><Button size="sm" variant="ghost" onClick={() => { URL.revokeObjectURL(fallback.url); setFallback(null); }}>Close</Button></div>
            <p className="ls-small ls-muted" style={{ margin: 0 }}>Right-click the image and choose “Save image as”. On a phone, press and hold it.</p>
            <img src={fallback.url} alt={fallback.filename} />
          </div>
        </div>
      )}
    </div>
  );
}

export function Studio({ tplId, onPick, onBack, downloads, canSave, onSave, ui }) {
  useEffect(() => { ensureCss(); }, []);
  const tpl = TEMPLATES.find((t) => t.id === tplId) || null;
  return tpl
    ? <Editor key={tpl.id} tpl={tpl} onBack={onBack} downloads={downloads} canSave={canSave} onSave={onSave} ui={ui} />
    : <Gallery onPick={onPick} ui={ui} />;
}

window.LSQStudio = { Studio, TEMPLATES, version: "2026-10-29" };
