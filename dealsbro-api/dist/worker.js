!function(e){var t={};function s(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t){e.exports={Router:({base:e="",routes:t=[]}={})=>({__proto__:new Proxy({},{get:(s,a,n)=>(s,...o)=>t.push([a.toUpperCase(),RegExp(`^${(e+s).replace(/(\/?)\*/g,"($1.*)?").replace(/\/$/,"").replace(/:(\w+)(\?)?(\.)?/g,"$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/,"\\.")}/*$`),o])&&n}),routes:t,async handle(e,...s){let a,n,o=new URL(e.url);for(var[r,i,d]of(e.query=Object.fromEntries(o.searchParams),t))if((r===e.method||"ALL"===r)&&(n=o.pathname.match(i)))for(var l of(e.params=n.groups,d))if(void 0!==(a=await l(e.proxy||e,...s)))return a}})}},function(e,t,s){"use strict";s.r(t);var a=s(0);const n=async e=>await fetch(`https://geocode.xyz/${e}?region=SG&json=1`).then(e=>e.json()),o="https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/",r={"Access-Control-Allow-Origin":"*","Content-type":"application/json"},i=async()=>fetch(o+"organisations.json").then(e=>e.json()),d="https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/",l={"Content-type":"application/json","Access-Control-Allow-Origin":"*"},u=async()=>fetch(d+"outlets.json").then(e=>e.json()),c="https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/",p={"Access-Control-Allow-Origin":"*","Content-type":"application/json"},f={"Access-Control-Allow-Origin":"*","Content-type":"application/json"},h=Object(a.Router)(),b={"Access-Control-Allow-Headers":"*","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,PUT,DELETE,OPTIONS"};h.get("/",()=>new Response("Hello, world! This is the root page of your Worker template.")),h.get("/deals",async()=>{const e=await(async()=>fetch(c+"deals.json").then(e=>e.json()))(),t=await u(),s=await i();return Object.keys(e).forEach(a=>{e[a]={...e[a],company:s[e[a].companyId],outlets:Object.values(t).filter(t=>t.companyId===e[a].companyId)}}),new Response(JSON.stringify(e,null,2),{headers:p})}),h.post("/deals",async e=>{const t=await e.json(),s=await fetch(c+"deals.json",{method:"POST",body:JSON.stringify(t)}).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{status:201,headers:p})}),h.get("/deals/:dealId",async e=>{const t=e.params.dealId,s=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/deals/${t}.json`).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{headers:p})}),h.put("/deals/:dealId",async e=>{const t=e.params.dealId,s=await e.json(),a=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/deals/${t}.json`,{method:"PUT",body:JSON.stringify(s)}).then(e=>e.json());return new Response(JSON.stringify(a,null,2),{headers:p})}),h.delete("/deals/:dealId",async e=>{const t=e.params.dealId;return await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/deals/${t}.json`,{method:"DELETE"}).then(e=>e.json()),new Response(null,{status_code:204,headers:p})}),h.get("/organisations",async()=>{let e=await i();const t=await u();return Object.keys(e).forEach(s=>{e[s]={...e[s],outlets:Object.values(t).filter(e=>e.companyId===s)}}),new Response(JSON.stringify(e,null,2),{headers:r})}),h.post("/organisations",async e=>{const t=await e.json(),s=await fetch(o+"organisations.json",{method:"POST",body:JSON.stringify(t)}).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{status:201,headers:r})}),h.get("/organisations/:orgId",async e=>{const t=e.params.orgId,s=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/organisations/${t}.json`).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{headers:r})}),h.put("/organisations/:orgId",async e=>{const t=e.params.orgId,s=await e.json(),a=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/organisations/${t}.json`,{method:"PUT",body:JSON.stringify(s)}).then(e=>e.json());return new Response(JSON.stringify(a,null,2),{headers:r})}),h.delete("/organisations/:orgId",async e=>{const t=e.params.orgId;return await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/organisations/${t}.json`,{method:"DELETE"}).then(e=>e.json()),new Response(null,{status_code:204,headers:r})}),h.get("/outlets",async()=>{const e=await u(),t=await i();return Object.keys(e).forEach(s=>{e[s]={...e[s],company:t[e[s].companyId]}}),new Response(JSON.stringify(e,null,2),{headers:l})}),h.post("/outlets",async e=>{const t=await e.json();if(!("longitude"in t)||!("latitude"in t)){const e=await n(t.postalCode);if(!("longt"in e)||!("latt"in e))return new Response(JSON.stringify({error:"Error getting geocode data"},null,2),{status:500,headers:l});t.longitude=e.longt,t.latitude=e.latt}const s=await fetch(d+"outlets.json",{method:"POST",body:JSON.stringify(t)}).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{status:201,headers:l})}),h.get("/outlets/:outletId",async e=>{const t=e.params.outletId,s=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/outlets/${t}.json`).then(e=>e.json());return new Response(JSON.stringify(s,null,2),{headers:l})}),h.put("/outlets/:outletId",async e=>{const t=e.params.outletId,s=await e.json();if(!("longitude"in s)||!("latitude"in s)){const e=await n(s.postalCode);if(!("longt"in e)||!("latt"in e))return new Response(JSON.stringify({error:"Error getting geocode data"},null,2),{status:500,headers:l});s.longitude=e.longt,s.latitude=e.latt}const a=await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/outlets/${t}.json`,{method:"PUT",body:JSON.stringify(s)}).then(e=>e.json());return new Response(JSON.stringify(a,null,2),{headers:l})}),h.delete("/outlets/:outletId",async e=>{const t=e.params.outletId;return await fetch(`https://dealsbro-f1db3-default-rtdb.asia-southeast1.firebasedatabase.app/outlets/${t}.json`,{method:"DELETE"}).then(e=>e.json()),new Response(null,{status_code:204,headers:l})}),h.get("/geocode/:postalCode",async e=>{const t=e.params.postalCode,s=await n(t);return new Response(JSON.stringify(s,null,2),{headers:f})}),h.all("*",()=>new Response("404, not found!",{status:404})),addEventListener("fetch",e=>{e.respondWith(async function(e){if("OPTIONS"===e.method)return new Response("OK",{headers:b});return h.handle(e)}(e.request))})}]);