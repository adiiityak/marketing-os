// Build a Figma plan for one template (images replaced by a tiny PNG) and write the codes.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const id = process.argv[2] || 'hc-speaker-wide';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1300 } });
  await p.setContent('<html><body style="margin:0"><div id="h"></div></body></html>');
  await p.addScriptTag({ path: path.join(__dirname, 'out/render.js') });
  const plan = await p.evaluate(async (id) => {
    const t = LSQ.TEMPLATES.find(x => x.id === id);
    const host = document.getElementById('h');
    const node = LSQ.engine.mount(host, t, LSQ.engine.defaultsFor(t));
    await document.fonts.ready; LSQ.engine.fitText(node);
    const { ops, images } = LSQ.tofigma.collectOps(node, 'TEST · ' + t.name);
    return { ops, images: images.map(([u, i]) => i) };
  }, id);
  fs.writeFileSync(path.join(__dirname, 'out/plan-' + id + '.json'), JSON.stringify(plan));
  console.log('ops', plan.ops.length, 'images', plan.images, 'json', JSON.stringify(plan.ops).length);
  await b.close();
})();
