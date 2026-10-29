const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1300 } });
  p.on('console', m => console.log('console:', m.text()));
  p.on('pageerror', e => console.log('pageerror:', e.message));
  await p.setContent('<html><body style="margin:0"><div id="h"></div></body></html>');
  await p.addScriptTag({ path: path.join(__dirname, 'out/render.js') });
  const only = process.argv[2];
  const ids = await p.evaluate(() => LSQ.TEMPLATES.map(t => t.id));
  for (const id of ids) {
    if (only && !id.includes(only)) continue;
    const data = await p.evaluate(async (id) => {
      const t = LSQ.TEMPLATES.find(x => x.id === id);
      const h = document.getElementById('h'); h.innerHTML = ''; const host = document.createElement('div'); h.appendChild(host);
      const node = LSQ.engine.mount(host, t, LSQ.engine.defaultsFor(t));
      await document.fonts.ready; LSQ.engine.fitText(node);
      const blob = await LSQ.engine.exportBlob(node, t, 1);
      return await LSQ.engine.blobToDataURL(blob);
    }, id);
    fs.writeFileSync(path.join(__dirname, 'out', id + '.png'), Buffer.from(data.split(',')[1], 'base64'));
    console.log('ok', id);
  }
  await b.close();
})();
