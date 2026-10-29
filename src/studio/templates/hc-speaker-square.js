// Recreated from "2025 Social post" › Pannel Member 31 (1715:1221).
// Healthcare portrait/square post: teal-to-mint gradient, cut-out speaker, dark green pill.
import bg from "../bg/hc-teal-square.jpg";
import sample from "../samples/speaker-d.webp";
import { calendar, clock } from "../icons.js";

export default {
  id: "hc-speaker-square",
  name: "Healthcare single speaker (square)",
  group: "Webinar banners",
  industry: "Healthcare",
  channel: "LinkedIn, Instagram",
  w: 1080,
  h: 1080,
  theme: "light",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "1715:1221" },
  notes: "Square single-speaker webinar post in the healthcare teal. The speaker photo is cut out automatically.",
  fields: [
    { key: "title", label: "Webinar title", default: "NABH is more than a certificate. Here is what real commitment looks like.", max: 100, kind: "textarea" },
    { key: "time", label: "Day and time", default: "Friday, 4:00 PM IST", max: 24 },
    { key: "date", label: "Date", default: "29 May 2026", max: 22 },
    { key: "cta", label: "Button", default: "Join Me Live", max: 18 },
  ],
  speakers: {
    label: "Speaker",
    cutout: true,
    min: 1,
    max: 1,
    fields: ["photo", "name", "title", "company", "logo"],
    defaults: [{ photo: sample, name: "Apsa Pujari", title: "Head - Quality, Training and Patient Experience", company: "Saifee Hospital", logo: "" }],
  },
  css: `
.bg{position:absolute;left:0;top:0;width:1080px;height:1080px}
.brand{position:absolute;left:80px;top:80px;width:225px;display:flex;flex-direction:column;align-items:flex-end;gap:3px}
.brand img{width:225px;height:41.5px}
.brand span{font:700 16px/1 Poppins,sans-serif;color:#0c293d;letter-spacing:.2px}
.left{position:absolute;left:80px;top:198px;width:795px;display:flex;flex-direction:column;align-items:flex-start}
.title{width:795px;max-height:134px;overflow:hidden;font:400 39.7px/44.5px Poppins,sans-serif;color:#000}
.meta{margin-top:60px;display:flex;flex-direction:column}
.row{display:flex;align-items:center;gap:11.5px;height:45px;font:500 29.9px/1 Poppins,sans-serif;color:#036041;white-space:nowrap}
.row svg{width:34.7px;height:34.7px;flex:none}
.cta{margin-top:60px;background:#046443;border-radius:152px;padding:0 57px 0 59px;height:63px;display:flex;align-items:center;font:600 19.7px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.pill{position:absolute;left:80px;top:703px;width:1000px;height:297px;background:#193936;border-radius:1000px 0 0 1000px;overflow:hidden}
.glow{position:absolute;left:82px;top:-107px;width:898px;height:898px;border-radius:50%;background:radial-gradient(closest-side,rgba(70,160,130,.18),rgba(70,160,130,0))}
.info{position:absolute;left:110px;top:0;height:297px;width:300px;display:flex;flex-direction:column;justify-content:center;gap:8px}
.nm{font:600 24px/1.08 Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:300px}
.rl{font:400 21px/1.08 Poppins,sans-serif;color:#c2c2c2;max-height:46px;overflow:hidden;width:283px}
.co{font:500 24px/1.08 Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:300px}
.logo{margin-top:4px;width:150px;height:50px;background:#fff;border-radius:7.7px;display:flex;align-items:center;justify-content:center;padding:6px 12px}
.logo img{max-width:126px;max-height:38px;object-fit:contain}
.person{position:absolute;left:470px;top:400px;width:640px;height:680px}
.person img{width:640px;height:680px;object-fit:contain;object-position:50% 100%}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="brand"><img src="{{logoDark}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="left">
  <div class="title" data-fit="28">{{title}}</div>
  <div class="meta">
    <div class="row">${clock("#036041")}<span>{{time}}</span></div>
    <div class="row">${calendar("#036041")}<span>{{date}}</span></div>
  </div>
  {{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
</div>
{{#speakers}}
<div class="pill"><div class="glow"></div>
  <div class="info">
    <div class="nm" data-fit="18">{{name}}</div>
    {{#title}}<div class="rl" data-fit="15">{{title}}</div>{{/title}}
    {{#company}}<div class="co" data-fit="17">{{company}}</div>{{/company}}
    {{#logo}}<div class="logo"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
  </div>
</div>
{{#photo}}<div class="person"><img src="{{photo}}" alt="Speaker"></div>{{/photo}}
{{/speakers}}
`,
};
