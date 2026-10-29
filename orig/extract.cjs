const fs=require('fs'),acorn=require('acorn');
const s=fs.readFileSync(__dirname+'/bundle.js','utf8');
const pos={Si:183002,ki:190389,mg:955853,gg:966398,hg:977991,Ag:988356,xg:999057,bg:1010722,vg:1021179,wg:1031644,Gm:913856,Qm:919571,Km:928626,Xm:935892};
const out={};
for(const [k,p] of Object.entries(pos)){
  const start=s.indexOf('=',p)+1;
  const node=acorn.parseExpressionAt(s,start,{ecmaVersion:2022});
  out[k]=s.slice(node.start,node.end);
}
// fonts
const fonts={'poppins-400':'mg','poppins-400i':'gg','poppins-500':'hg','poppins-600':'Ag','poppins-600i':'xg','poppins-700':'bg','poppins-800':'vg','inter-var':'wg'};
for(const [f,k] of Object.entries(fonts)){const v=eval(out[k]);fs.writeFileSync(`${__dirname}/../src/studio/assets/${f}.woff2`,Buffer.from(v.split(',')[1],'base64'));}
fs.writeFileSync(__dirname+'/../src/studio/assets/logo-color.svg',decodeURIComponent(eval(out.Si).replace(/^data:image\/svg\+xml,/,'')));
fs.writeFileSync(__dirname+'/../src/studio/assets/logo-white.svg',decodeURIComponent(eval(out.ki).replace(/^data:image\/svg\+xml,/,'')));
// templates: refs to Si/ki inside? check
for(const k of ['Gm','Qm','Km','Xm']){
  const code=out[k];
  const ids=[...new Set((code.match(/\b(Si|ki|[A-Z][a-z]|[a-z][A-Z])\b(?=[,})\]])/g)||[]))];
  const obj=eval('('+code+')');
  fs.writeFileSync(`${__dirname}/../src/studio/templates/${obj.id}.json`,JSON.stringify(obj,null,1));
  console.log(k,obj.id,obj.w,obj.h,Object.keys(obj).join(','),'refs?',ids.join(' '));
}
