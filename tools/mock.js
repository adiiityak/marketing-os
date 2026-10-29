// In-browser mock of window.claude for local tests.
(function () {
  const store = new Map(); // path -> data
  const subs = new Set();
  const seed = window.__SEED__ || {};
  for (const [k, v] of Object.entries(seed)) store.set(k, v);
  let auto = 1;
  const snapDoc = (p) => ({ id: p.split("/").pop(), exists: store.has(p), data: () => (store.has(p) ? JSON.parse(JSON.stringify(store.get(p))) : undefined), metadata: { fromCache: false, hasPendingWrites: false } });
  const notify = () => subs.forEach((f) => { try { f(); } catch (e) { console.error(e); } });
  const docRef = (p) => ({
    id: p.split("/").pop(), path: p,
    get: async () => snapDoc(p),
    set: async (d) => { store.set(p, d); notify(); },
    update: async (d) => { store.set(p, { ...(store.get(p) || {}), ...d }); notify(); },
    delete: async () => { store.delete(p); notify(); },
    onSnapshot: (cb) => { const f = () => cb(snapDoc(p)); subs.add(f); f(); return () => subs.delete(f); },
  });
  const query = (col, ord, lim) => ({
    where: () => query(col, ord, lim),
    orderBy: (f, dir = "asc") => query(col, [f, dir], lim),
    limit: (n) => query(col, ord, n),
    get: async () => snap(col, ord, lim),
    onSnapshot: (cb) => { const f = () => cb(snap(col, ord, lim)); subs.add(f); setTimeout(f, 0); return () => subs.delete(f); },
  });
  function snap(col, ord, lim) {
    let docs = [...store.keys()].filter((k) => k.startsWith(col + "/") && k.split("/").length === col.split("/").length + 1).map(snapDoc);
    if (ord) docs.sort((a, b) => String(a.data()[ord[0]] ?? "").localeCompare(String(b.data()[ord[0]] ?? "")) * (ord[1] === "desc" ? -1 : 1));
    if (lim) docs = docs.slice(0, lim);
    return { docs, size: docs.length, empty: !docs.length, docChanges: () => [], metadata: {} };
  }
  const db = {
    doc: docRef,
    collection: (c) => Object.assign(query(c), { path: c, doc: (id) => docRef(c + "/" + (id || "auto" + auto++)), add: async (d) => { const p = c + "/fb" + auto++; store.set(p, d); notify(); return docRef(p); } }),
  };
  window.__store = store;
  window.__saved = [];
  window.__figmaCalls = [];
  const caps = {
    db,
    user: { me: async () => ({ id: "u_test", name: "Test User", isOwner: true, canEdit: true }), id: async () => "u_test", can: async () => true, isOwner: () => true, canEdit: () => true, profiles: async (ids) => Object.fromEntries(ids.map((i) => [i, { name: "Test User" }])), search: async () => [] },
    downloads: window.__NO_DOWNLOADS__ ? null : { save: async (r) => { if (window.__DOWNLOAD_FAIL__) throw Object.assign(new Error("Failed to fetch"), { code: "unavailable" }); window.__saved.push({ filename: r.filename, size: r.data.size || r.data.length, type: r.data.type }); return { status: "saved" }; } },
    assets: { upload: async (b) => ({ id: "a" + auto++, url: "about:blank", sizeBytes: b.size }), list: async () => ({ assets: [] }), delete: async () => {} },
    mcp: {
      callTool: async (server, tool, input) => {
        window.__figmaCalls.push({ server, tool, input });
        const c = input.code;
        let ret;
        if (/createImage/.test(c)) ret = { hash: "hash" + window.__figmaCalls.length, tmp: "9:" + window.__figmaCalls.length };
        else if (/__lsq_buf_/.test(c) && /insertCharacters|characters=/.test(c)) ret = { len: 1 };
        else if (/Math.max\(x,n.x\+n.width\)/.test(c)) ret = { x: 0, page: "5:1" };
        else if (/const D=/.test(c)) {
          const D = JSON.parse(c.slice(c.indexOf("const D=") + 8, c.indexOf(";\n")));
          const ids = {}; for (const k of D.need || []) ids[k] = "7:" + k;
          ret = { ids, root: D.ops.some((o) => o.p === null) ? "7:0" : null, page: "5:1" };
        } else ret = {};
        return { content: [{ type: "text", text: JSON.stringify("LSQ:" + JSON.stringify(ret)) }] };
      },
    },
  };
  window.claude = { use: async (n) => (n in caps ? caps[n] : null) };
})();
