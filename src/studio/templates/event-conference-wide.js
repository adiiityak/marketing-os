// Recreated from "2025 Social post" › CCST 2026 v2 (2069:166).
// "We'll be at the …" conference announcement with host logo, booth and dates.
import bg from "../bg/event-blue-wide.jpg";
import { booth, calPin } from "../icons.js";
import partner from "../assets/partner-placeholder.svg";

export default {
  id: "event-conference-wide",
  name: "Conference announcement (we'll be there)",
  group: "Event creatives",
  industry: "Events US",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2069:166" },
  notes: "Landscape event post: host or partner logo, event name, booth number, dates and city.",
  fields: [
    { key: "partnerLogo", label: "Host / partner logo (white works best)", kind: "logo", default: partner },
    { key: "intro", label: "Intro line", default: "We'll be at the", max: 30 },
    { key: "line1", label: "Event name (big)", default: "CCST", max: 14 },
    { key: "line2", label: "Event name (second line)", default: "Annual Conference", max: 22 },
    { key: "hostedBy", label: "Hosted by text", default: "hosted by", max: 14, optional: true, toggleLabel: "Show" },
    { key: "booth", label: "Booth", default: "Booth No. 16", max: 20 },
    { key: "when", label: "Dates and city", default: "September 28-29 | San Antonio, TX", max: 40 },
  ],
  css: `
.bg{position:absolute;left:0;top:0;width:1280px;height:720px}
.logos{position:absolute;left:76px;top:52px;height:52px;display:flex;align-items:center;gap:24px}
.logos .lsq{width:205px;height:37.8px}
.logos i{width:1px;height:50px;background:rgba(255,255,255,.55);display:block}
.logos .pl{max-width:160px;max-height:52px;object-fit:contain}
.intro{position:absolute;left:76px;top:184px;font:400 32px/1.2 Inter,sans-serif;letter-spacing:-1px;color:#ddd;white-space:nowrap}
.name{position:absolute;left:76px;top:232px;width:1150px;font-family:Inter,sans-serif;font-weight:700;line-height:1;background:linear-gradient(109.7deg,#ffffff 77%,rgba(255,255,255,0) 186%);-webkit-background-clip:text;background-clip:text;color:transparent}
.l1{font-size:103.7px;white-space:nowrap;overflow:hidden;width:1150px}
.l2{font-size:84px;white-space:nowrap;overflow:hidden;width:1150px}
.host{position:absolute;left:76px;top:445px;height:52px;display:flex;align-items:center;gap:11px;font:400 32px/1 Inter,sans-serif;letter-spacing:-1px;color:#fff;white-space:nowrap}
.host img{max-width:160px;max-height:52px;object-fit:contain}
.row{position:absolute;left:78px;display:flex;align-items:center;gap:16.4px;font:600 28px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.row svg{width:35.4px;height:35.4px}
.b1{top:571px}.b2{top:619px}
.row.b2{font-size:30px}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="logos"><img class="lsq" src="{{logoWhite}}" alt="LeadSquared">{{#partnerLogo}}<i></i><img class="pl" src="{{partnerLogo}}" alt="Partner logo">{{/partnerLogo}}</div>
<div class="intro">{{intro}}</div>
<div class="name"><div class="l1" data-fit="60">{{line1}}</div><div class="l2" data-fit="48">{{line2}}</div></div>
{{#hostedBy}}{{#partnerLogo}}<div class="host"><span>{{hostedBy}}</span><img src="{{partnerLogo}}" alt="Host logo"></div>{{/partnerLogo}}{{/hostedBy}}
<div class="row b1">${booth("#ffffff")}<span>{{booth}}</span></div>
<div class="row b2">${calPin("#ffffff")}<span>{{when}}</span></div>
`,
};
