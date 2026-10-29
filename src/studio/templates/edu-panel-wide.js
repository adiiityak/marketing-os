// Recreated from "2025 Social post" › From Search to First Contact (2008:779).
// Education panel webinar: title and CTA on the left, up to three speaker cards on the right.
import bg from "../bg/edu-blue-wide.jpg";
import a from "../samples/speaker-a.webp";
import c from "../samples/speaker-c.webp";
import { calendar, clock } from "../icons.js";

export default {
  id: "edu-panel-wide",
  name: "Education panel (speaker cards)",
  group: "Webinar banners",
  industry: "Education",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2008:779" },
  notes: "Landscape panel banner for 1 to 3 speakers, each with photo, designation and company logo.",
  fields: [
    { key: "title", label: "Webinar title", default: "From Search to First Contact: How Career Schools Turn Interest Into Enrollment Conversations", max: 100, kind: "textarea" },
    { key: "date", label: "Date", default: "October 14, 2026", max: 22 },
    { key: "time", label: "Time", default: "10 AM PT", max: 16 },
    { key: "cta", label: "Button", default: "Register now!", max: 18 },
  ],
  speakers: {
    label: "Speakers",
    cutout: false,
    min: 1,
    max: 3,
    fields: ["photo", "name", "title", "logo"],
    defaults: [
      { photo: a, name: "Bambi Frazier", title: "Director, Local Visibility & Growth", logo: "" },
      { photo: c, name: "Drew Horne", title: "Partnerships Manager", logo: "" },
    ],
  },
  css: `
.bg{position:absolute;left:0;top:0;width:1280px;height:720px}
.bar{position:absolute;left:0;top:0;width:6px;height:720px;background:#0061ff}
.brand{position:absolute;left:65px;top:46px;width:149px;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.brand img{width:149px;height:27.5px}
.brand span{font:700 10.5px/1 Poppins,sans-serif;color:#fff;letter-spacing:.2px}
.left{position:absolute;left:64px;top:72px;width:570px;height:592px;display:flex;flex-direction:column;justify-content:center;gap:29px}
.title{width:540px;max-height:204px;overflow:hidden;font:600 41px/1.24 Poppins,sans-serif;letter-spacing:-.82px;color:#fff}
.chips{display:flex;align-items:center}
.chip{display:flex;align-items:center;gap:8px;padding:10px 16px;font:500 16px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.chip:first-child{padding-left:0}
.chip svg{width:24px;height:24px}
.cta{align-self:flex-start;background:#ffec00;border-radius:12px;padding:15px 28px;font:700 17px/1.2 Poppins,sans-serif;color:#000;white-space:nowrap}
.col{position:absolute;left:690px;top:56px;width:526px;height:608px;display:flex;flex-direction:column;justify-content:center;gap:16px}
.label{font:600 15px/1 Poppins,sans-serif;letter-spacing:1px;color:#b8b8c7}
.card{height:135px;display:flex;align-items:center;gap:14px;padding:16px;border-radius:16px;background:rgba(10,10,10,.36);border:1px solid rgba(255,255,255,.1);overflow:hidden}
.av{width:101px;height:101px;flex:none;border-radius:50%;background:#e4f0ff;border:1px solid rgba(185,166,255,.55);overflow:hidden}
.av img{width:101px;height:101px;object-fit:cover;object-position:50% 15%}
.ini{width:101px;height:101px;display:flex;align-items:center;justify-content:center;font:600 34px/1 Poppins,sans-serif;color:#1d3c8f}
.txt{width:230px;flex:none;display:flex;flex-direction:column}
.nm{font:600 24px/32px Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:230px}
.rl{font:400 15px/1.3 Poppins,sans-serif;color:#e5e5e9;max-height:40px;overflow:hidden}
.lg{width:122px;height:55px;flex:none;margin-left:auto;background:#fff;border-radius:7.7px;display:flex;align-items:center;justify-content:center;padding:6px 10px}
.lg img{max-width:102px;max-height:40px;object-fit:contain}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="bar"></div>
<div class="brand"><img src="{{logoWhite}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="left">
  <div class="title" data-fit="28">{{title}}</div>
  <div class="chips">
    <div class="chip">${calendar("#ffffff")}<span>{{date}}</span></div>
    {{#time}}<div class="chip">${clock("#ffffff")}<span>{{time}}</span></div>{{/time}}
  </div>
  {{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
</div>
<div class="col">
  <div class="label">Speakers</div>
  {{#speakers}}
  <div class="card">
    <div class="av">{{#photo}}<img src="{{photo}}" alt="Speaker">{{/photo}}{{^photo}}<div class="ini">{{initials}}</div>{{/photo}}</div>
    <div class="txt"><div class="nm" data-fit="17">{{name}}</div><div class="rl" data-fit="12">{{title}}</div></div>
    {{#logo}}<div class="lg"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
  </div>
  {{/speakers}}
</div>
`,
};
