// Recreated from "2025 Social post" › CAPPS 2026 v2 (2190:357).
// Square conference post with a promo panel (giveaway, demo offer) and an optional product image.
import bg from "../bg/event-blue-square.jpg";
import { booth, calPin } from "../icons.js";
import partner from "../assets/partner-placeholder.svg";

export default {
  id: "event-conference-square",
  name: "Conference post with promo (square)",
  group: "Event creatives",
  industry: "Events US",
  channel: "LinkedIn, Instagram",
  w: 1200,
  h: 1200,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "2190:357" },
  notes: "Square event post with year, event name, booth, dates and a promo panel. Add a cut-out product or giveaway image for the bottom right.",
  fields: [
    { key: "partnerLogo", label: "Host / partner logo (white works best)", kind: "logo", default: partner },
    { key: "intro", label: "Intro line", default: "We'll be at the", max: 30 },
    { key: "year", label: "Year", default: "2026", max: 6 },
    { key: "line1", label: "Event name (big)", default: "CAPPS", max: 12 },
    { key: "line2", label: "Event name (second line)", default: "Annual Conference", max: 20 },
    { key: "booth", label: "Booth", default: "Booth 24", max: 20 },
    { key: "when", label: "Dates", default: "October 7-9", max: 30 },
    { key: "promo", label: "Promo headline", kind: "textarea", default: "Chat with us. Cash in.\nWalk away with a $100 Gift Card.", max: 70, optional: true, toggleLabel: "Show promo" },
    { key: "promoBody", label: "Promo details", default: "A $100 Amazon gift card is on the table. Say hi and start earning your CAPPS Cash.", max: 120 },
    { key: "object", label: "Promo image (cut-out PNG)", kind: "image", default: "" },
  ],
  css: `
.bg{position:absolute;left:0;top:0;width:1200px;height:1200px}
.logos{position:absolute;left:37px;top:52px;height:52px;display:flex;align-items:center;gap:24px}
.logos .lsq{width:205px;height:37.8px}
.logos i{width:1px;height:50px;background:rgba(255,255,255,.55);display:block}
.logos .pl{max-width:150px;max-height:52px;object-fit:contain}
.intro{position:absolute;left:37px;top:184px;font:400 32px/1.2 Inter,sans-serif;letter-spacing:-1px;color:#ddd;white-space:nowrap}
.year{position:absolute;left:37px;top:226px;font:600 76.4px/1.1 Inter,sans-serif;letter-spacing:.76px;color:rgba(227,227,227,.89)}
.name{position:absolute;left:37px;top:322px;width:1130px;font:700 110.6px/1 Inter,sans-serif;background:linear-gradient(107.8deg,#ffffff 77%,rgba(255,255,255,0) 186%);-webkit-background-clip:text;background-clip:text;color:transparent}
.name div{white-space:nowrap;overflow:hidden;width:1130px}
.host{position:absolute;left:48px;top:573px;height:55px;display:flex;align-items:center;gap:13px;font:400 38.2px/1 Inter,sans-serif;letter-spacing:-1.2px;color:#fff;white-space:nowrap}
.host img{max-width:150px;max-height:55px;object-fit:contain}
.row{position:absolute;left:48px;display:flex;align-items:center;gap:16.4px;font:600 28px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.row svg{width:35.4px;height:35.4px}
.b1{top:680px}.b2{top:728px}
.promo{position:absolute;left:25px;top:923px;width:1014px;height:244px;border-radius:20px;background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.12)}
.ph{position:absolute;left:42px;top:42px;width:720px;max-height:92px;overflow:hidden;font:600 41.4px/1.07 Inter,sans-serif;letter-spacing:-.41px;color:#fff}
.pb{position:absolute;left:42px;top:158px;width:690px;max-height:62px;overflow:hidden;font:400 20px/1.5 Inter,sans-serif;color:#cbd8ee}
.obj{position:absolute;left:784px;top:704px;width:416px;height:521px}
.obj img{width:416px;height:521px;object-fit:contain;object-position:50% 100%}
`,
  html: `
<img class="bg" src="${bg}" alt="Background">
<div class="logos"><img class="lsq" src="{{logoWhite}}" alt="LeadSquared">{{#partnerLogo}}<i></i><img class="pl" src="{{partnerLogo}}" alt="Partner logo">{{/partnerLogo}}</div>
<div class="intro">{{intro}}</div>
<div class="year">{{year}}</div>
<div class="name"><div data-fit="64">{{line1}}</div><div data-fit="56">{{line2}}</div></div>
{{#partnerLogo}}<div class="host"><span>hosted by</span><img src="{{partnerLogo}}" alt="Host logo"></div>{{/partnerLogo}}
<div class="row b1">${booth("#ffffff")}<span>{{booth}}</span></div>
<div class="row b2">${calPin("#ffffff")}<span>{{when}}</span></div>
{{#promo}}<div class="promo"><div class="ph" data-fit="28">{{{promoHtml}}}</div><div class="pb" data-fit="15">{{promoBody}}</div></div>{{/promo}}
{{#object}}<div class="obj"><img src="{{object}}" alt="Promo image"></div>{{/object}}
`,
};
