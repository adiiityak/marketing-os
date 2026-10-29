// Recreated from "2025 Social post" › Vijaya Kumar Individual post (2016:118).
// BFSI single speaker: black grid, lime circle and rings, cut-out speaker, name card.
import grid from "../bg/grid-diamond-1280.png";
import sample from "../samples/speaker-b.webp";

export default {
  id: "bfsi-speaker-wide",
  name: "BFSI single speaker (lime on black)",
  group: "Webinar banners",
  industry: "Fintech / BFSI",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2016:118" },
  notes: "Landscape single-speaker banner for lending and BFSI webinars. The speaker photo is cut out automatically.",
  fields: [
    { key: "title", label: "Webinar title", default: "Beyond the Metros: What It Takes to Win India's Next Credit Markets", max: 80, kind: "textarea" },
    { key: "day", label: "Day of month", default: "07", max: 2 },
    { key: "month", label: "Month (short)", default: "OCT", max: 4 },
    { key: "year", label: "Year", default: "2026", max: 4 },
    { key: "weekday", label: "Weekday", default: "Wednesday", max: 10 },
    { key: "time", label: "Time", default: "04:00 PM IST", max: 14 },
    { key: "cta", label: "Button", default: "Register Now!", max: 16 },
  ],
  speakers: {
    label: "Speaker",
    cutout: true,
    min: 1,
    max: 1,
    fields: ["photo", "name", "title", "logo"],
    defaults: [{ photo: sample, name: "Vijaya Kumar", title: "SVP and Head, Special Assets Unit", logo: "" }],
  },
  css: `
.base{position:absolute;left:0;top:0;width:1280px;height:720px;background:#000}
.grid{position:absolute;left:0;top:0;width:1280px;height:720px}
.disc{position:absolute;left:735px;top:263px;width:631px;height:631px;border-radius:50%;background:#9fe870}
.r1{position:absolute;left:711px;top:239px;width:699px;height:699px;border-radius:50%;border:1.5px solid rgba(159,232,112,.55)}
.r2{position:absolute;left:663px;top:191px;width:774px;height:774px;border-radius:50%;border:1.5px solid rgba(159,232,112,.35)}
.dot{position:absolute;left:-54px;top:-36px;width:107px;height:107px;border-radius:50%;border:14px solid #9fe870}
.brand{position:absolute;left:78px;top:71px;width:124px;display:flex;flex-direction:column;align-items:flex-end;gap:1.5px}
.brand img{width:124px;height:22.8px}
.brand span{font:700 9px/1 Poppins,sans-serif;color:#fff;letter-spacing:.2px}
.title{position:absolute;left:78px;top:133px;width:700px;height:186px;overflow:hidden;font:600 53.6px/1.15 Poppins,sans-serif;background:linear-gradient(0deg,#9fe870 32%,#ffffff 117%);-webkit-background-clip:text;background-clip:text;color:transparent}
.date{position:absolute;left:78px;top:365px;width:171px;height:62px;background:rgba(255,255,255,.1);border-left:4px solid #87ea5c;display:flex;align-items:center;gap:7.4px;padding-left:16px}
.day{font:500 49.7px/1 Poppins,sans-serif;color:#87ea5c}
.my{display:flex;flex-direction:column}
.mo{font:600 19.1px/19.9px Poppins,sans-serif;color:#c9ffb2;text-transform:uppercase}
.yr{font:400 17.9px/19.9px Poppins,sans-serif;color:#fff}
.wk{position:absolute;left:78px;top:438px;width:171px;height:62px;background:rgba(255,255,255,.1);border-left:4px solid #87ea5c;padding:6px 0 0 16px;display:flex;flex-direction:column}
.wd{font:600 19.2px/24.9px Poppins,sans-serif;color:#c9ffb2;text-transform:uppercase}
.tm{font:400 19.2px/24.9px Poppins,sans-serif;color:#fff;white-space:nowrap}
.cta{position:absolute;left:78px;top:542px;background:#9fe870;border:1.34px solid #277627;border-radius:7px;padding:16px 32px;font:500 25.6px/1.2 Inter,sans-serif;color:#000;white-space:nowrap}
.person{position:absolute;left:730px;top:104px;width:600px;height:616px}
.person img{width:600px;height:616px;object-fit:contain;object-position:50% 100%}
.card{position:absolute;left:811px;top:542px;width:550px;height:142px;background:#000;border:2.3px solid #277627;border-radius:20px}
.who{position:absolute;left:48.7px;top:0;height:138px;width:400px;display:flex;flex-direction:column;justify-content:center;gap:4px}
.nm{font:600 28.4px/40.6px Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:400px}
.rl{font:400 17.7px/26.5px Poppins,sans-serif;color:#b2b2b2;white-space:nowrap;overflow:hidden;width:400px}
.lg{position:absolute;left:1060px;top:514px;height:56.5px;min-width:120px;padding:0 23px;background:#fff;border:2px solid rgba(69,142,69,.61);border-radius:9.25px;display:flex;align-items:center;justify-content:center}
.lg img{max-width:148px;max-height:38px;object-fit:contain}
`,
  html: `
<div class="base"></div>
<img class="grid" src="${grid}" alt="Grid">
<div class="disc"></div><div class="r1"></div><div class="r2"></div><div class="dot"></div>
<div class="brand"><img src="{{logoWhite}}" alt="LeadSquared"><span>WEBINAR</span></div>
<div class="title" data-fit="36">{{title}}</div>
<div class="date"><span class="day">{{day}}</span><div class="my"><span class="mo">{{month}}</span><span class="yr">{{year}}</span></div></div>
<div class="wk"><span class="wd">{{weekday}}</span><span class="tm">{{time}}</span></div>
{{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
{{#speakers}}
{{#photo}}<div class="person"><img src="{{photo}}" alt="Speaker"></div>{{/photo}}
<div class="card"><div class="who"><div class="nm" data-fit="20">{{name}}</div><div class="rl" data-fit="13">{{title}}</div></div></div>
{{#logo}}<div class="lg"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}
{{/speakers}}
`,
};
