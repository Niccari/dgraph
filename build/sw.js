if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bt_y670q.css",revision:null},{url:"assets/index-DMLsId19.js",revision:null},{url:"index.html",revision:"904a8ded25dbc1f126e616c8ba61d514"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"f346e8411624c9ebea988bbffad0fd9c"},{url:"logo192.png",revision:"e6030b99daf6dff98bdc06635c44626c"},{url:"logo512.png",revision:"ab910756da9c325b35122a1f97a965dc"},{url:"manifest.webmanifest",revision:"a8cfeb06cb9bca60c9dd9e313d46c584"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
