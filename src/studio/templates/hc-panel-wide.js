// Recreated from "2025 Social post" › The Funnel Inside the Hospital v2 (1924:169).
// Healthcare panel: dark teal grid, orange CTA, up to four speakers with cut-out photos on cream circles.
import bg from "../bg/hc-dark-wide.jpg";
import b from "../samples/speaker-b.webp";
import c from "../samples/speaker-c.webp";
import d from "../samples/speaker-d.webp";
import { calendar } from "../icons.js";

export default {
  id: "hc-panel-wide",
  name: "Healthcare panel (dark teal)",
  group: "Webinar banners",
  industry: "Healthcare",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "1924:169" },
  notes: "Landscape panel banner for 1 to 4 speakers. Photos are cut out automatically and placed on cream circles.",
  fields: [
    { key: "title", label: "Webinar title", default: "The Funnel Inside the Hospital: What OPD-to-IPD Conversion Looks Like in FY'27", max: 90, kind: "textarea" },
    { key: "when", label: "Date and time", default: "October 15, 2026 | 4:00 PM IST", max: 34 },
    { key: "cta", label: "Button", default: "Save My Seat", max: 16 },
  ],
  speakers: {
    label: "Speakers",
    cutout: true,
    min: 1,
    max: 4,
    fields: ["photo", "name", "title", "logo"],
    defaults: [
      { photo: c, name: "Srikant Subudhi", title: "COO Aster Whitefield Hospital", logo: "" },
      { photo: d, name: "Hazel Louis", title: "Head of Operations", logo: "" },
      { photo: b, name: "Pritam Kumar", title: "Business Head, Emerging Verticals", logo: "" },
    ],
  },
  css: `
.bg{position:absolute;left:0;top:0;width:1280px;height:720px}
.brand{position:absolute;left:57px;top:72px;width:208px;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.brand img{width:208px;height:38.3px}
.brand span{font:700 15px/1 Poppins,sans-serif;color:#fff;letter-spacing:.2px}
.left{position:absolute;left:57px;top:150px;width:585px;height:500px;display:flex;flex-direction:column;justify-content:center}
.title{width:585px;max-height:240px;overflow:hidden;font:600 49.5px/1.21 Poppins,sans-serif;color:#fff}
.when{margin-top:49px;display:flex;align-items:center;gap:7px;font:700 18px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.when svg{width:26px;height:26px}
.cta{margin-top:60px;width:284px;height:70px;border-radius:10.5px;background:#fd703d;box-shadow:6.6px 4.4px 14.4px rgba(0,0,0,.47);display:flex;align-items:center;justify-content:center;font:700 23.7px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.col{position:absolute;left:676px;top:24px;width:576px;height:672px;display:flex;flex-direction:column;justify-content:center;gap:18.3px}
.label{font:600 17.2px/1 Poppins,sans-serif;letter-spacing:1.15px;color:#b8b8c7}
.card{width:495px;height:133px;display:flex;align-items:center;gap:15.8px;padding:15.8px;border-radius:15.8px;background:rgba(10,10,10,.36);border:1px solid rgba(255,255,255,.1);overflow:hidden}
.col.n4 .card{height:120px}
.col.n4 .av,.col.n4 .av img{width:90px;height:90px}
.av{width:99.5px;height:99.5px;flex:none;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 35%,#fbf3e2,#ead8b4)}
.av img{width:99.5px;height:99.5px;object-fit:cover;object-position:50% 0%}
.ini{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font:600 32px/1 Poppins,sans-serif;color:#3d8181}
.txt{width:199px;flex:none;display:flex;flex-direction:column}
.nm{font:600 23.6px/31.5px Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:199px}
.rl{font:400 14.8px/1.3 Poppins,sans-serif;color:#b8b8c7;max-height:39px;overflow:hidden}
.lg{width:112px;height:54px;flex:none;margin-left:auto;background:#fff;border-radius:7.7px;display:flex;align-items:center;justify-content:center;padding:5px 8px}
.lg img{max-width:96px;max-height:44px;object-fit:contain}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="brand"><img src="{{logoWhite}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="left">
  <div class="title" data-fit="32">{{title}}</div>
  <div class="when">${calendar("#ffffff")}<span>{{when}}</span></div>
  {{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
</div>
<div class="col{{#speakers4}} n4{{/speakers4}}">
  <div class="label">Speakers</div>
  {{#speakers}}
  <div class="card">
    <div class="av">{{#photo}}<img src="{{photo}}" alt="Speaker">{{/photo}}{{^photo}}<div class="ini">{{initials}}</div>{{/photo}}</div>
    <div class="txt"><div class="nm" data-fit="16">{{name}}</div><div class="rl" data-fit="11">{{title}}</div></div>
    {{#logo}}<div class="lg"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
  </div>
  {{/speakers}}
</div>
`,
};
