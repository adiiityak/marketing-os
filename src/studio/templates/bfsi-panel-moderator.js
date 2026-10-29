// Recreated from "2025 Social post" › Beyond the Metros v2 (1949:655).
// BFSI panel with a moderator: black left half with green 3D blob, mint speakers panel on the right.
import grid from "../bg/grid-diamond-1280.png";
import blob from "../bg/green-blob.png";
import blobSmall from "../bg/green-blob-small.png";
import b from "../samples/speaker-b.webp";
import c from "../samples/speaker-c.webp";
import { calendar, clock } from "../icons.js";

export default {
  id: "bfsi-panel-moderator",
  name: "BFSI panel with moderator",
  group: "Webinar banners",
  industry: "Fintech / BFSI",
  channel: "LinkedIn, Email, Website",
  w: 1280,
  h: 720,
  theme: "dark",
  source: { file: "2025 Social post", key: "RFtOtPboauiMDwWaFgaNTV", node: "1949:655" },
  notes: "Landscape banner for two speakers and a moderator. Speaker photos are cut out and placed on mint circles.",
  fields: [
    { key: "kicker", label: "Label", default: "LIVE WEBINAR", max: 18 },
    { key: "title", label: "Webinar title", default: "Beyond the Metros: What It Takes to Win India's Next Credit Markets", max: 80, kind: "textarea" },
    { key: "date", label: "Date", default: "07 October 2026", max: 22 },
    { key: "time", label: "Time", default: "04:00 PM IST", max: 16 },
    { key: "cta", label: "Button", default: "Register Now!", max: 16 },
    { key: "modName", label: "Moderator name", default: "Shailesh Maurya", max: 22, optional: true, toggleLabel: "Show moderator" },
    { key: "modPhoto", label: "Moderator photo", kind: "photo", cutout: true, default: "" },
    { key: "modTitle", label: "Moderator designation", default: "Associate Director, Professional Services", max: 44 },
  ],
  speakers: {
    label: "Speakers",
    cutout: true,
    min: 1,
    max: 2,
    fields: ["photo", "name", "title", "logo"],
    defaults: [
      { photo: c, name: "Kunal Tela", title: "Vice President", logo: "" },
      { photo: b, name: "Vijaya Kumar", title: "SVP and Head, Special Assets Unit", logo: "" },
    ],
  },
  css: `
.base{position:absolute;left:0;top:0;width:1280px;height:720px;background:#000}
.grid{position:absolute;left:0;top:0;width:1280px;height:720px}
.blob{position:absolute;left:300px;top:388px;width:457px;height:332px}
.blob2{position:absolute;left:0;top:0;width:80px;height:74px}
.kick{position:absolute;left:80px;top:80px;display:flex;align-items:center;gap:10px;font:500 16px/1.4 Poppins,sans-serif;color:#eaffe9;white-space:nowrap}
.kick i{width:8px;height:8px;border-radius:50%;background:#eaffe9;display:block}
.title{position:absolute;left:80px;top:142px;width:470px;height:198px;overflow:hidden;font:600 42.8px/1.15 Poppins,sans-serif;background:linear-gradient(0deg,#9fe870 32%,#ffffff 117%);-webkit-background-clip:text;background-clip:text;color:transparent}
.row{position:absolute;left:80px;display:flex;align-items:center;gap:20.2px;font:600 17.7px/1 Poppins,sans-serif;color:#fff;white-space:nowrap}
.row b{width:45.4px;height:45.4px;border:1.26px solid rgba(159,232,112,.5);border-radius:7.6px;display:flex;align-items:center;justify-content:center}
.row svg{width:24.6px;height:24.6px}
.r1{top:374px}.r2{top:435px}
.cta{position:absolute;left:80px;top:553px;background:#9fe870;border:1.2px solid #277627;border-radius:38.5px;padding:14.4px 28.9px;font:500 23px/1.2 Inter,sans-serif;color:#000;white-space:nowrap}
.panel{position:absolute;left:600px;top:0;width:680px;height:720px;background:#f0ffee;overflow:hidden}
.plabel{position:absolute;left:68.8px;top:64px;font:500 20.6px/1.4 Poppins,sans-serif;color:#277627}
.brand{position:absolute;left:447px;top:56px;width:172px;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.brand img{width:172px;height:31.7px}
.brand span{font:700 12.5px/1 Poppins,sans-serif;color:#0c293d;letter-spacing:.2px}
.list{position:absolute;left:68.8px;top:150px;width:550px;height:330px;display:flex;flex-direction:column;justify-content:center;gap:17px}
.sp{display:flex;align-items:center;gap:28px}
.sep{height:1px;width:550px;background:rgba(39,118,39,.25)}
.av{width:113px;height:113px;flex:none;border-radius:50%;background:#c9ffc9;border:3px solid #277627;overflow:hidden}
.av img{width:107px;height:107px;object-fit:cover;object-position:50% 0%}
.ini{width:107px;height:107px;display:flex;align-items:center;justify-content:center;font:600 34px/1 Poppins,sans-serif;color:#277627}
.txt{width:380px;display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.nm{font:600 25.4px/1.08 Poppins,sans-serif;color:#000;white-space:nowrap;overflow:hidden;width:380px}
.rl{font:400 19.8px/1.15 Poppins,sans-serif;color:#222;white-space:nowrap;overflow:hidden;width:380px}
.lg{height:35px;min-width:100px;padding:0 14px;background:#fff;border:1.2px solid rgba(69,142,69,.61);border-radius:5.65px;display:flex;align-items:center;justify-content:center}
.lg img{max-width:112px;max-height:28px;object-fit:contain}
.mod{position:absolute;left:59px;top:504px;width:550px;height:113.5px;background:#000;border:2.3px solid #277627;border-radius:114.65px;overflow:hidden}
.mav{position:absolute;left:12px;top:8.5px;width:91.75px;height:91.75px;border-radius:50%;background:#c9ffc9;overflow:hidden}
.mav img{width:91.75px;height:91.75px;object-fit:cover;object-position:50% 0%}
.mini{width:91.75px;height:91.75px;display:flex;align-items:center;justify-content:center;font:600 30px/1 Poppins,sans-serif;color:#277627}
.mwho{position:absolute;left:124.7px;top:0;height:109px;display:flex;flex-direction:column;justify-content:center;width:215px}
.mby{font:400 15.7px/26.2px Poppins,sans-serif;color:#b2b2b2}
.mnm{font:600 18.4px/26.2px Poppins,sans-serif;color:#fff;white-space:nowrap;overflow:hidden;width:215px}
.mrl{position:absolute;left:353.7px;top:0;height:109px;width:171.5px;display:flex;align-items:center;font:400 15.7px/23.6px Poppins,sans-serif;color:#b2b2b2}
`,
  html: `
<div class="base"></div>
<img class="grid" src="${grid}" alt="Grid">
<img class="blob" src="${blob}" alt="Shape">
<img class="blob2" src="${blobSmall}" alt="Shape">
<div class="kick"><i></i><span>{{kicker}}</span></div>
<div class="title" data-fit="30">{{title}}</div>
<div class="row r1"><b>${calendar("#9fe870")}</b><span>{{date}}</span></div>
<div class="row r2"><b>${clock("#9fe870")}</b><span>{{time}}</span></div>
{{#cta}}<div class="cta">{{cta}}</div>{{/cta}}
<div class="panel">
  <div class="plabel">SPEAKERS</div>
  <div class="brand"><img src="{{logoDark}}" alt="LeadSquared"><span>WEBINAR</span></div>
  <div class="list">
  {{#speakers}}
    {{^_first}}<div class="sep"></div>{{/_first}}
    <div class="sp">
      <div class="av">{{#photo}}<img src="{{photo}}" alt="Speaker">{{/photo}}{{^photo}}<div class="ini">{{initials}}</div>{{/photo}}</div>
      <div class="txt"><div class="nm" data-fit="18">{{name}}</div><div class="rl" data-fit="13">{{title}}</div>{{#logo}}<div class="lg"><img src="{{logo}}" alt="Company logo"></div>{{/logo}}</div>
    </div>
  {{/speakers}}
  </div>
  {{#modName}}
  <div class="mod">
    <div class="mav">{{#modPhoto}}<img src="{{modPhoto}}" alt="Moderator">{{/modPhoto}}{{^modPhoto}}<div class="mini">{{modNameInitials}}</div>{{/modPhoto}}</div>
    <div class="mwho"><span class="mby">MODERATED BY</span><span class="mnm" data-fit="13">{{modName}}</span></div>
    <div class="mrl" data-fit="11">{{modTitle}}</div>
  </div>
  {{/modName}}
</div>
`,
};
