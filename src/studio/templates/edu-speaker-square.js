// Recreated from "2025 Social post" › Bambi Frazier (2121:8163). The team's favourite:
// cut-out speaker (no photo background) over the deep-blue LeadSquared gradient.
import bg from "../bg/edu-blue-square.jpg";
import sample from "../samples/speaker-a.webp";
import { calendar, clock } from "../icons.js";

export default {
  id: "edu-speaker-square",
  name: "Education single speaker (cut-out)",
  group: "Webinar banners",
  industry: "Education",
  channel: "LinkedIn, Instagram",
  w: 1080,
  h: 1080,
  theme: "dark",
  favourite: true,
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2121:8163" },
  notes: "Square single-speaker webinar post. Upload any photo: the background is removed automatically and the speaker stands on the blue gradient.",
  fields: [
    { key: "title", label: "Webinar title", default: "From Search to First Contact: How Career Schools Turn Interest Into Enrollment Conversations", max: 110, kind: "textarea" },
    { key: "date", label: "Date", default: "October 14, 2026", max: 24 },
    { key: "time", label: "Day and time", default: "Wednesday, 10 AM PT", max: 26 },
    { key: "cta", label: "Button", default: "Join Me Live", max: 18 },
  ],
  speakers: {
    label: "Speaker",
    cutout: true,
    min: 1,
    max: 1,
    fields: ["photo", "name", "title", "logo"],
    defaults: [{ photo: sample, name: "Bambi Frazier", title: "Director, Local Visibility & Growth", logo: "" }],
  },
  css: `
.bg{position:absolute;left:0;top:0;width:1080px;height:1080px}
.brand{position:absolute;left:80px;top:80px;width:225px;display:flex;flex-direction:column;align-items:flex-end;gap:3px}
.brand img{width:225px;height:41.5px}
.brand span{font:700 16px/1 Poppins,sans-serif;color:#fff;letter-spacing:.2px}
.left{position:absolute;left:80px;top:198px;width:795px;display:flex;flex-direction:column;align-items:flex-start}
.title{width:795px;max-height:134px;overflow:hidden;font:400 39.7px/44.5px Poppins,sans-serif;color:#fff}
.meta{margin-top:61px;display:flex;flex-direction:column}
.row{display:flex;align-items:center;gap:11.5px;height:45px;font:500 29.9px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.row svg{width:34.7px;height:34.7px;flex:none}
.cta{margin-top:60px;background:#ffec00;border-radius:152px;padding:0 57px 0 59px;height:69.4px;display:flex;align-items:center;font:600 19.7px/1 Poppins,sans-serif;color:#000;white-space:nowrap}
.pill{position:absolute;left:80px;top:703px;width:1000px;height:297px;background:rgba(8,8,8,.36);border-radius:1000px 0 0 1000px;overflow:hidden}
.ring{position:absolute;left:82px;top:-107px;width:898px;height:898px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,0) 86%,rgba(255,255,255,.035) 100%)}
.info{position:absolute;left:110px;top:0;height:297px;width:330px;display:flex;flex-direction:column;justify-content:center;gap:12px}
.who{display:flex;flex-direction:column;gap:8px}
.name{font:600 40.2px/1.08 Poppins,sans-serif;color:#fff;white-space:nowrap;width:330px;overflow:hidden}
.role{font:400 28px/1.08 Poppins,sans-serif;color:#c2c2c2;width:283px;max-height:62px;overflow:hidden}
.logo{width:172px;height:55px;background:#fff;border-radius:7.7px;display:flex;align-items:center;justify-content:center;padding:6px 14px}
.logo img{max-width:144px;max-height:40px;object-fit:contain}
.person{position:absolute;left:470px;top:322px;width:640px;height:758px}
.person img{width:640px;height:758px;object-fit:contain;object-position:50% 100%}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="brand"><img src="{{logoWhite}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="left">
  <div class="title" data-fit="28">{{title}}</div>
  <div class="meta">
    <div class="row">${calendar("#ffffff")}<span>{{date}}</span></div>
    <div class="row">${clock("#ffffff")}<span>{{time}}</span></div>
  </div>
  {{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
</div>
{{#speakers}}
<div class="pill"><div class="ring"></div>
  <div class="info">
    <div class="who"><div class="name" data-fit="24">{{name}}</div>{{#title}}<div class="role" data-fit="18">{{title}}</div>{{/title}}</div>
    {{#logo}}<div class="logo"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
  </div>
</div>
{{#photo}}<div class="person"><img src="{{photo}}" alt="Speaker"></div>{{/photo}}
{{/speakers}}
`,
};
