// Renders template backgrounds (gradients, glows, grids) to raster files so the
// Studio preview, PNG export and Figma push all use the same pixels.
const { chromium } = require('playwright');
const path = require('path');
const OUT = path.join(__dirname, '../src/studio/bg');
const plus = (c) => `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='154' height='154'><path d='M77 67v20M67 77h20' stroke='${c}' stroke-width='1.4'/></svg>")`;
const grid = (c, s) => `linear-gradient(${c} 1px, transparent 1px) 0 0/${s}px ${s}px, linear-gradient(90deg, ${c} 1px, transparent 1px) 0 0/${s}px ${s}px`;
const jobs = [
  { file: 'event-blue-wide.jpg', w: 1280, h: 720, css: `background:
      ${plus('rgba(255,255,255,0.35)')} -1px -1px/154px 154px,
      ${grid('rgba(140,180,255,0.10)', 77)},
      radial-gradient(1100px 620px at 78% 112%, rgba(20,110,255,0.95), rgba(20,110,255,0) 70%),
      radial-gradient(900px 600px at 10% 120%, rgba(16,92,240,0.85), rgba(16,92,240,0) 70%),
      linear-gradient(180deg, #030c22 0%, #06184a 45%, #0b47c6 100%);` },
  { file: 'event-blue-square.jpg', w: 1200, h: 1200, css: `background:
      ${plus('rgba(255,255,255,0.35)')} -1px -1px/208px 208px,
      ${grid('rgba(140,180,255,0.12)', 104)},
      radial-gradient(1200px 900px at 85% 40%, rgba(25,105,255,0.95), rgba(25,105,255,0) 70%),
      radial-gradient(1000px 800px at 0% 110%, rgba(30,95,235,0.9), rgba(30,95,235,0) 70%),
      linear-gradient(160deg, #04155a 0%, #0a3fc0 55%, #1253e6 100%);` },
  { file: 'hc-dark-wide.jpg', w: 1280, h: 720, css: `background:
      ${plus('rgba(255,255,255,0.22)')} 0 0/180px 180px,
      ${grid('rgba(255,255,255,0.045)', 90)},
      radial-gradient(700px 520px at 67% 35%, rgba(11,11,11,0.0), rgba(11,11,11,0.55) 100%),
      linear-gradient(230.49deg, #000000 38.654%, #3d8181 77.253%);` },
  { file: 'hc-teal-square.jpg', w: 1080, h: 1080, css: `background:
      linear-gradient(105deg, rgba(255,255,255,0) 0 18%, rgba(255,255,255,0.16) 18% 33%, rgba(255,255,255,0) 33% 100%),
      linear-gradient(105deg, rgba(255,255,255,0) 0 74%, rgba(25,120,140,0.16) 74% 100%),
      radial-gradient(900px 700px at 100% 0%, rgba(40,150,185,0.55), rgba(40,150,185,0) 70%),
      linear-gradient(181.3deg, #5cc1bc 0%, #8fd6d3 32%, #cdeeee 62%, #eef9f8 85%);` },
  { file: 'hc-cream-wide.jpg', w: 1280, h: 720, css: `background:#faf6ec;` },
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const j of jobs) {
    await p.setViewportSize({ width: j.w, height: j.h });
    await p.setContent(`<html><head><style>body{margin:0}#b{width:${j.w}px;height:${j.h}px;${j.css}}</style></head><body><div id="b"></div></body></html>`);
    await p.screenshot({ path: path.join(OUT, j.file), type: 'jpeg', quality: 88 });
    console.log('wrote', j.file);
  }
  await b.close();
})();
