!function(){"use strict";var e,t,r,n,o,u,i,c={},a={};function f(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={id:e,loaded:!1,exports:{}},n=!0;try{c[e](r,r.exports,f),n=!1}finally{n&&delete a[e]}return r.loaded=!0,r.exports}f.m=c,e=[],f.O=function(t,r,n,o){if(r){o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,n,o];return}for(var i=1/0,u=0;u<e.length;u++){for(var r=e[u][0],n=e[u][1],o=e[u][2],c=!0,a=0;a<r.length;a++)i>=o&&Object.keys(f.O).every(function(e){return f.O[e](r[a])})?r.splice(a--,1):(c=!1,o<i&&(i=o));if(c){e.splice(u--,1);var d=n();void 0!==d&&(t=d)}}return t},f.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(t,{a:t}),t},f.d=function(e,t){for(var r in t)f.o(t,r)&&!f.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},f.f={},f.e=function(e){return Promise.all(Object.keys(f.f).reduce(function(t,r){return f.f[r](e,t),t},[]))},f.u=function(e){return"static/chunks/"+e+"."+({44:"9dba8f9b8417e4b8",70:"55401a22943e9697",149:"894210ef2bfeed4b",262:"d9b914401b285377",297:"b1dfeda0036c8d43",312:"b625d4925496abff",364:"17031c4f9d03afb2",373:"b4c6795816e1a396",383:"c844cbb778fea2af",400:"235fad860ae71aca",644:"c37c7e996e200ab0",650:"a631db2116b11a97",653:"8eb893aefac67cd5",747:"b810fc2c49e4e9eb",937:"8b44bbe8ecfd7ff1"})[e]+".js"},f.miniCssF=function(e){return"static/css/d266dfe38c3fae3d.css"},f.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),f.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t={},r="_N_E:",f.l=function(e,n,o,u){if(t[e]){t[e].push(n);return}if(void 0!==o)for(var i,c,a=document.getElementsByTagName("script"),d=0;d<a.length;d++){var s=a[d];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==r+o){i=s;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,f.nc&&i.setAttribute("nonce",f.nc),i.setAttribute("data-webpack",r+o),i.src=f.tu(e)),t[e]=[n];var l=function(r,n){i.onerror=i.onload=null,clearTimeout(b);var o=t[e];if(delete t[e],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach(function(e){return e(n)}),r)return r(n)},b=setTimeout(l.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=l.bind(null,i.onerror),i.onload=l.bind(null,i.onload),c&&document.head.appendChild(i)},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.tt=function(){return void 0===n&&(n={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(n=trustedTypes.createPolicy("nextjs#bundler",n))),n},f.tu=function(e){return f.tt().createScriptURL(e)},f.p="/dos-culturas-blog/_next/",o={272:0},f.f.j=function(e,t){var r=f.o(o,e)?o[e]:void 0;if(0!==r){if(r)t.push(r[2]);else if(272!=e){var n=new Promise(function(t,n){r=o[e]=[t,n]});t.push(r[2]=n);var u=f.p+f.u(e),i=Error();f.l(u,function(t){if(f.o(o,e)&&(0!==(r=o[e])&&(o[e]=void 0),r)){var n=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+n+": "+u+")",i.name="ChunkLoadError",i.type=n,i.request=u,r[1](i)}},"chunk-"+e,e)}else o[e]=0}},f.O.j=function(e){return 0===o[e]},u=function(e,t){var r,n,u=t[0],i=t[1],c=t[2],a=0;if(u.some(function(e){return 0!==o[e]})){for(r in i)f.o(i,r)&&(f.m[r]=i[r]);if(c)var d=c(f)}for(e&&e(t);a<u.length;a++)n=u[a],f.o(o,n)&&o[n]&&o[n][0](),o[n]=0;return f.O(d)},(i=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).forEach(u.bind(null,0)),i.push=u.bind(null,i.push.bind(i))}();