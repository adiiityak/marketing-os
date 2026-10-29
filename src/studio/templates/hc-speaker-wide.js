// Recreated from "2025 Social post" › Scale Without Chaos (2233:299), same family as
// Srikant Subudhi individual post (2132:10042). Cream background, teal circle, cut-out speaker.
import grid from "../bg/grid-light-1280.png";
import sample from "../samples/speaker-d.webp";

export default {
  id: "hc-speaker-wide",
  name: "Healthcare single speaker (landscape)",
  group: "Webinar banners",
  industry: "Healthcare",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "light",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2233:299" },
  notes: "Landscape single-speaker banner. The speaker photo is cut out automatically and stands in front of the teal circle.",
  fields: [
    { key: "title", label: "Webinar title", default: "Scale Without Chaos: Building the AI-Ready Healthcare Operating Model for 2027", max: 90, kind: "textarea", accent: true, accentDefault: "Scale Without Chaos:" },
    { key: "day", label: "Day of month", default: "26", max: 2 },
    { key: "month", label: "Month (short)", default: "OCT", max: 4 },
    { key: "year", label: "Year", default: "2026", max: 4 },
    { key: "weekday", label: "Weekday", default: "Monday", max: 10 },
    { key: "time", label: "Time", default: "10:00 AM PT", max: 14 },
    { key: "cta", label: "Button", default: "Register Now!", max: 16 },
  ],
  speakers: {
    label: "Speaker",
    cutout: true,
    min: 1,
    max: 1,
    fields: ["photo", "name", "title", "logo"],
    defaults: [{ photo: sample, name: "Wendy Manganaro", title: "Founder & Fractional CMO", logo: "" }],
  },
  css: `
.base{position:absolute;left:0;top:0;width:1280px;height:720px;background:#faf6ec}
.grid{position:absolute;left:0;top:0;width:1280px;height:703px}
.disc{position:absolute;left:735px;top:263px;width:631px;height:631px;border-radius:50%;background:#3d8181}
.ring{position:absolute;left:663px;top:191px;width:774px;height:774px;border-radius:50%;border:1.6px solid #3d8181}
.brand{position:absolute;left:78px;top:58px;width:171px;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.brand img{width:171px;height:31.5px}
.brand span{font:700 12.5px/1 Poppins,sans-serif;color:#0c293d;letter-spacing:.2px}
.title{position:absolute;left:78px;top:143px;width:760px;height:180px;overflow:hidden;font:600 50px/1.15 Poppins,sans-serif;color:#193636}
.title .hl{color:#3d8181;font-weight:700}
.date{position:absolute;left:78px;top:365px;width:171px;height:62px;border-left:4px solid #3d8181;display:flex;align-items:center;gap:7.4px;padding-left:16px}
.day{font:500 49.7px/1 Poppins,sans-serif;color:#3d8181}
.my{display:flex;flex-direction:column}
.mo{font:600 19.1px/19.9px Poppins,sans-serif;color:#3d8181;text-transform:uppercase}
.yr{font:400 17.9px/19.9px Poppins,sans-serif;color:#000}
.wk{position:absolute;left:78px;top:438px;width:200px;height:62px;border-left:4px solid #3d8181;padding:6px 0 0 16px;display:flex;flex-direction:column}
.wd{font:600 19.2px/24.9px Poppins,sans-serif;color:#3d8181;text-transform:uppercase}
.tm{font:400 19.2px/24.9px Poppins,sans-serif;color:#000;white-space:nowrap}
.cta{position:absolute;left:78px;top:542px;background:#0c293d;border-radius:7px;padding:16px 32px;font:500 25.6px/1.2 Inter,sans-serif;color:#fff;white-space:nowrap}
.person{position:absolute;left:690px;top:120px;width:560px;height:600px}
.person img{width:560px;height:600px;object-fit:contain;object-position:50% 100%}
.card{position:absolute;left:771px;top:542px;width:560px;height:142px;background:#f9f5ea;border-radius:2px;box-shadow:0 4px 18px rgba(25,54,54,.08)}
.who{position:absolute;left:39px;top:0;height:142px;width:236px;display:flex;flex-direction:column;justify-content:center}
.nm{font:600 28.4px/40.6px Poppins,sans-serif;color:#193636;white-space:nowrap;overflow:hidden;width:236px}
.rl{font:400 14.7px/18px Poppins,sans-serif;color:#7a8181;max-height:36px;overflow:hidden}
.lg{position:absolute;left:290px;top:28px;width:164px;height:86px;background:#fff;border:2px solid rgba(25,54,54,.6);border-radius:9.25px;display:flex;align-items:center;justify-content:center;padding:6px}
.lg img{max-width:142px;max-height:64px;object-fit:contain}
`,
  html: `
<div class="base"></div>
<img class="grid" src="${grid}" alt="Grid">
<div class="disc"></div>
<div class="ring"></div>
<div class="brand"><img src="{{logoDark}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="title" data-fit="34">{{{titleHtml}}}</div>
<div class="date"><span class="day">{{day}}</span><div class="my"><span class="mo">{{month}}</span><span class="yr">{{year}}</span></div></div>
<div class="wk"><span class="wd">{{weekday}}</span><span class="tm">{{time}}</span></div>
{{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
{{#speakers}}
{{#photo}}<div class="person"><img src="{{photo}}" alt="Speaker"></div>{{/photo}}
<div class="card">
  <div class="who"><div class="nm" data-fit="18">{{name}}</div><div class="rl" data-fit="11">{{title}}</div></div>
  {{#logo}}<div class="lg"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
</div>
{{/speakers}}
`,
};
