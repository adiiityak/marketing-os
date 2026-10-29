// Build the Asset Library page: published v16 bundle (orig/v16.html) + targeted
// patches + the Template Studio module (src/studio). Output: dist/asset-library.html
import fs from "fs";
import path from "path";
import { bundle } from "./esb.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const P = (...a) => path.join(root, ...a);
fs.mkdirSync(P("dist"), { recursive: true });

await bundle(P("src/studio/Studio.jsx"), P("dist/studio.js"), { minify: true });
const studio = fs.readFileSync(P("dist/studio.js"), "utf8");

let html = fs.readFileSync(P("orig/v16.html"), "utf8");
// strip the publish-time skeleton: the Artifact tool adds it again
html = html.replace(/^<!doctype html><html><head>[\s\S]*?<\/head><body>\n?/, "").replace(/\n?<\/body><\/html>\s*$/, "");

const patches = [];
function patch(name, from, to) {
  const n = html.split(from).length - 1;
  if (n !== 1) throw new Error(`patch "${name}": expected 1 match, found ${n}`);
  html = html.replace(from, () => to);
  patches.push(name);
}

// 1. Studio route renders the new module (keeps the old one as a fallback).
patch("studio-module",
  "function Dg({tplId:e,onPick:t,onBack:o,downloads:n,canSave:r,onSave:a}){",
  "function Dg(_p){if(window.LSQStudio)return He.createElement(window.LSQStudio.Studio,Object.assign({},_p,{ui:{Button:Q,Icon:L}}));let{tplId:e,onPick:t,onBack:o,downloads:n,canSave:r,onSave:a}=_p;");

// 2. Content Repository: six industry filters.
patch("repo-industries",
  'A=$e.useMemo(()=>tc(m,"i"),[m])',
  'A=$e.useMemo(()=>{let c=new Map(tc(m,"i"));return["Education","Healthcare","Fintech / BFSI","Manufacturing","Events India","Events US"].map(k=>[k,c.get(k)||0])},[m])');
patch("repo-normalise",
  'let s=await i.json();o({status:"ready",meta:a,data:s}',
  'let s=await i.json();if(s&&Array.isArray(s.items))for(let it of s.items)it.i=window.LSQIndustry(it);o({status:"ready",meta:a,data:s}');

// 3. Every rating comment is also kept in the feedback log (one doc per comment).
patch("feedback-log",
  'await e.doc("assets/"+x.id).update(H),',
  'await e.doc("assets/"+x.id).update(H),(H.note||H.rating)&&e.collection("feedback").add({asset:x.id,title:x.title||"",type:x.type||"",channel:x.channel||"",angle:x.angle||"",segment:x.segment||"",tpl:(String(x.content||"").match(/Template:\\s*([a-z0-9-]+)/i)||[])[1]||null,rating:H.rating||0,note:H.note||"",by:xe&&xe.id||null,at:new Date().toISOString()}).catch(()=>{}),');

// 4. Embedded plugin download (setup step) -> current plugin build.
{
  const m = html.match(/"(UEsDB[A-Za-z0-9+\/=]{100000,})"/);
  const plug = P("dist/leadsquared-marketing-os.plugin");
  if (m && fs.existsSync(plug)) {
    const b64 = fs.readFileSync(plug).toString("base64");
    patch("embedded-plugin", '"' + m[1] + '"', '"' + b64 + '"');
    const ver = JSON.parse(fs.readFileSync(P("plugin/leadsquared-marketing-os/.claude-plugin/plugin.json"), "utf8")).version;
    const skills = fs.readdirSync(P("plugin/leadsquared-marketing-os/skills")).length;
    patch("plugin-version", 'version:"0.2.1",skills:30}', `version:"${ver}",skills:${skills}}`);
  }
}

const industry = `<script>
// Map repository items to the six filters: Education, Healthcare, Fintech / BFSI, Manufacturing, Events India, Events US.
window.LSQIndustry=function(x){var p=String(x.p||""),pl=p.toLowerCase(),i=String(x.i||"");
if(/^events/i.test(i)||/^(usa|us|india)\\/(elevate|events?)(\\/|$)/i.test(p)||/^events?\\//i.test(p))return /^india\\//i.test(p)?"Events India":"Events US";
if(/^educ/i.test(i))return "Education";
if(/health/i.test(i)||/\\/healthcare(\\/|$)/i.test(pl))return "Healthcare";
if(/fintech|bfsi|lend|bank/i.test(i))return "Fintech / BFSI";
if(/manufactur|automotive/i.test(pl)||/manufactur/i.test(i))return "Manufacturing";
return "";};
</script>`;

const anchor = '<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>';
patch("inject-studio", anchor, anchor + "\n" + industry + "\n<script>" + studio.replace(/<\/script/gi, "<\\/script") + "</script>");

fs.writeFileSync(P("dist/asset-library.html"), html);
console.log("patches:", patches.join(", "));
console.log("size:", (html.length / 1024 / 1024).toFixed(2), "MB");
