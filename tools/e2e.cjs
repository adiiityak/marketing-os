// End-to-end test of the built Asset Library with a mocked window.claude.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const DIST = path.join(__dirname, '../dist');
const OUT = path.join(__dirname, 'out');
const repo = fs.readdirSync(path.join(__dirname, '../repo')).find(f => f.endsWith('.json'));
const seed = {
  'repo/index': { assetId: 'repoidx', generated: '2026-10-26', files: 1652, folders: 599 },
  'members/u_test': { name: 'Test User', role: 'owner', joined: '2026-10-01' },
  'roles/u_test': { role: 'owner' },
  'folders/f1': { name: 'Creative', industry: 'healthcare', created: '2026-10-01' },
  'assets/a1': { title: 'Invorto healthcare LinkedIn ad', type: 'Creative', segment: 'healthcare', channel: 'LinkedIn', angle: 'Speed to lead', created: '2026-10-07', rating: 4, note: 'it was more', ratedAt: '2026-10-23', content: 'brief' },
  'assets/a2': { title: 'Education single speaker – 2026-10-20', type: 'Creative', segment: 'education', channel: 'LinkedIn', angle: '', created: '2026-10-20', rating: 3, note: 'Speaker photo too small, make the person bigger and keep the yellow CTA', ratedAt: '2026-10-21', content: 'Use the lsq-template-studio skill.\nTemplate: edu-speaker-square — source frame' },
  'feedback/x1': { asset: 'a2', title: 'Education single speaker – 2026-10-20', type: 'Creative', segment: 'education', tpl: 'edu-speaker-square', rating: 3, note: 'Speaker photo too small, make the person bigger and keep the yellow CTA', at: '2026-10-21T10:00:00Z' },
  'feedback/x2': { asset: 'a2', title: 'Education single speaker – 2026-10-20', type: 'Creative', segment: 'education', tpl: 'edu-speaker-square', rating: 2, note: 'Title too long, keep it under two lines', at: '2026-10-20T10:00:00Z' },
};
const step = (s) => console.log('STEP', s);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  await ctx.route('https://lsq.test/**', async (route) => {
    const u = new URL(route.request().url());
    if (u.pathname === '/' ) {
      const html = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"></head><body>' + fs.readFileSync(path.join(DIST, 'asset-library.html'), 'utf8') + '</body></html>';
      return route.fulfill({ body: html, contentType: 'text/html' });
    }
    if (u.pathname === '/_blob/repoidx') return route.fulfill({ body: fs.readFileSync(path.join(__dirname, '../repo', repo)), contentType: 'application/json' });
    if (u.pathname.startsWith('/mp/')) console.log('mpreq', u.pathname);
    const f = path.join(DIST, u.pathname);
    if (fs.existsSync(f)) return route.fulfill({ body: fs.readFileSync(f), contentType: f.endsWith('.js') ? 'text/javascript' : f.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream' });
    return route.fulfill({ status: 404, body: 'nf' });
  });
  await ctx.route(/cdnjs\.cloudflare\.com\/ajax\/libs\/react(-dom)?\//, (r) => {
    const u = r.request().url();
    const f = /react-dom/.test(u) ? 'node_modules/react-dom/umd/react-dom.production.min.js' : 'node_modules/react/umd/react.production.min.js';
    return r.fulfill({ body: fs.readFileSync(path.join(__dirname, '..', f)), contentType: 'text/javascript' });
  });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ body: '', contentType: 'text/css' }));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => { errs.push(e.message); console.log('pageerror', e.message); });
  p.on('console', m => { if (m.type() === 'error') console.log('console.error', m.text().slice(0, 300)); });
  await p.addInitScript(`window.__SEED__=${JSON.stringify(seed)};` + fs.readFileSync(path.join(__dirname, 'mock.js'), 'utf8'));
  const only = process.argv[2] || 'all';

  step('gallery');
  await p.goto('https://lsq.test/#studio');
  await p.waitForSelector('#tpl-grid', { timeout: 20000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: path.join(OUT, 'e2e-gallery.png') });
  console.log('cards', await p.locator('[data-tpl]').count(), 'industry chips', await p.locator('#tpl-industries .ls-chip').allInnerTexts());

  step('editor');
  await p.click('[data-tpl="edu-speaker-square"] .ls-thumb');
  await p.waitForSelector('#studio-form');
  await p.waitForTimeout(800);
  console.log('feedback panel:', (await p.locator('#studio-feedback').innerText()).replace(/\n/g, ' | ').slice(0, 300));

  if (only === 'all' || only === 'cutout') {
    step('cutout upload');
    await p.setInputFiles('#ss-0-photo', path.join(__dirname, 'test-photo.jpg'));
    await p.waitForFunction(() => /Background removed|Couldn't remove/.test(document.querySelector('#studio-form').innerText), null, { timeout: 60000 });
    console.log('cutout status:', (await p.locator('#studio-form [role=status]').innerText()));
    await p.waitForTimeout(800);
    await p.locator('#studio-preview').screenshot({ path: path.join(OUT, 'e2e-cutout.png') });
  }

  step('download');
  await p.click('#studio-download');
  await p.waitForFunction(() => document.querySelector('#studio-note'), null, { timeout: 30000 });
  console.log('note:', await p.locator('#studio-note').innerText(), JSON.stringify(await p.evaluate(() => window.__saved)));

  step('download fallback');
  await p.evaluate(() => { window.__DOWNLOAD_FAIL__ = true; });
  await p.click('#studio-download');
  await p.waitForSelector('.ls-modal img', { timeout: 30000 });
  console.log('fallback modal shown');
  await p.click('.ls-modal button');
  await p.evaluate(() => { window.__DOWNLOAD_FAIL__ = false; });

  step('push to figma');
  await p.click('#studio-figma-push');
  await p.waitForSelector('#studio-figma-link', { timeout: 60000 }).catch(() => {});
  console.log('note:', await p.locator('#studio-note').innerText());
  const calls = await p.evaluate(() => window.__figmaCalls.map(c => ({ tool: c.tool, key: c.input.fileKey, len: c.input.code.length, desc: c.input.description })));
  console.log('figma calls', calls.length, JSON.stringify(calls.slice(0, 3)), 'max len', Math.max(...calls.map(c => c.len)));
  const build = await p.evaluate(() => window.__figmaCalls.find(c => /const D=/.test(c.input.code)).input.code);
  fs.writeFileSync(path.join(OUT, 'figma-build.js'), build);

  step('v2 brief');
  await p.click('[data-mode="v2"]');
  await p.fill('#sf-direction', 'lighter background');
  console.log('brief tail:', (await p.locator('#studio-brief-text').innerText()).split('\n').slice(-6).join(' / '));

  step('repo');
  await p.goto('https://lsq.test/#repo');
  await p.waitForSelector('#repo-industries', { timeout: 20000 });
  console.log('repo chips:', (await p.locator('#repo-industries button').allInnerTexts()).join(' | '));

  step('rating -> feedback');
  await p.goto('https://lsq.test/#all');
  await p.waitForTimeout(1500);
  const ta = p.locator('textarea[aria-label^="Note for"]').first();
  if (await ta.count()) {
    await ta.fill('Great hook, but logo too small');
    const btn = p.locator('button:has-text("Submit rating"), button:has-text("Update rating")').first();
    await btn.click();
    await p.waitForTimeout(800);
    console.log('feedback docs:', await p.evaluate(() => [...window.__store.keys()].filter(k => k.startsWith('feedback/')).map(k => k + ' ' + JSON.stringify(window.__store.get(k)).slice(0, 160))));
  } else console.log('no rating textarea found');
  await p.screenshot({ path: path.join(OUT, 'e2e-library.png') });
  console.log('page errors:', errs.length);
  await b.close();
})();
