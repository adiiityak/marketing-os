// Team feedback memory: every rating comment on a library asset is kept in the
// `feedback` collection (one document per comment). Studio shows the comments that
// apply to a template and writes them into every brief, so the next generation uses them.

let dbp = null;
export function getDb() {
  if (!dbp) {
    dbp = (async () => {
      try { return window.claude && window.claude.use ? await window.claude.use("db") : null; } catch { return null; }
    })();
  }
  return dbp;
}

// Template id is recorded in the brief saved with a Studio asset ("Template: <id> …").
export const tplFromContent = (s) => { const m = String(s || "").match(/Template:\s*([a-z0-9-]+)/i); return m ? m[1] : null; };

const IND_KEYS = {
  Education: /educ/i,
  Healthcare: /health/i,
  "Fintech / BFSI": /fin|bfsi|lend|bank/i,
  Manufacturing: /manuf/i,
  "Events India": /event/i,
  "Events US": /event/i,
};

// Load comments relevant to a template, newest first: exact template matches, then
// same industry, then general creative notes.
export async function loadFeedback(tpl, limit = 8) {
  const db = await getDb();
  if (!db) return { items: [], available: false };
  const out = [];
  const seen = new Set();
  const push = (x) => { const k = (x.note || "") + "|" + (x.asset || ""); if (!x.note || seen.has(k)) return; seen.add(k); out.push(x); };
  try {
    const snap = await db.collection("feedback").orderBy("at", "desc").limit(200).get();
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const re = IND_KEYS[tpl.industry];
    rows.filter((r) => r.tpl === tpl.id).forEach((r) => push({ ...r, scope: "This template" }));
    rows.filter((r) => r.tpl !== tpl.id && re && re.test(String(r.segment || "") + " " + String(r.title || ""))).forEach((r) => push({ ...r, scope: tpl.industry }));
    rows.filter((r) => r.tpl !== tpl.id && /creative|ad|banner|social|webinar/i.test(String(r.type || "") + " " + String(r.title || ""))).forEach((r) => push({ ...r, scope: "Creative" }));
  } catch {}
  // Older ratings stored only on the asset (before the feedback log existed).
  if (out.length < limit) {
    try {
      const snap = await db.collection("assets").orderBy("created", "desc").limit(200).get();
      snap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((a) => (a.note || "").trim()).forEach((a) => {
        const t = tplFromContent(a.content);
        if (t === tpl.id) push({ asset: a.id, title: a.title, rating: a.rating, note: a.note, at: a.ratedAt || a.created, tpl: t, scope: "This template" });
        else if (/creative/i.test(a.type || "")) push({ asset: a.id, title: a.title, rating: a.rating, note: a.note, at: a.ratedAt || a.created, scope: "Creative" });
      });
    } catch {}
  }
  const order = { "This template": 0 };
  out.sort((a, b) => (order[a.scope] ?? 1) - (order[b.scope] ?? 1) || String(b.at || "").localeCompare(String(a.at || "")));
  return { items: out.slice(0, limit), available: true };
}

export function feedbackLines(items) {
  if (!items || !items.length) return [];
  return [
    "",
    "Team feedback to apply (from ratings in the Asset Library, newest first):",
    ...items.map((f) => `- ${f.rating ? f.rating + "/5 " : ""}on "${String(f.title || "an asset").slice(0, 60)}": ${String(f.note).trim().slice(0, 240)}`),
  ];
}
