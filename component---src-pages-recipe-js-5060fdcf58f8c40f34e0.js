"use strict";(self.webpackChunkdos_culturas=self.webpackChunkdos_culturas||[]).push([[238],{566:function(e,n,t){t.r(n),t.d(n,{Head:function(){return m},default:function(){return o}});var l=t(7294),a=(t(4160),t(7166)),i=t(4464);function r(e){let{ingredients:n,open:t,handleOpen:i}=e;return l.createElement(a.SideSheet,{open:t},l.createElement(a.Subheading,null,"Ingredients"),l.createElement(a.TonalButton,{className:"recipe-ingredients-pin",pill:!0,onClick:()=>i(!1)},"Unpin"),l.createElement(a.Body,null,null==n?void 0:n.map((e=>l.createElement(a.Checkbox,{className:"recipe-ingredient",label:e.measure+" "+e.unit+" "+e.name})))))}function c(e){let{ingredients:n,open:t,handleOpen:i}=e;return l.createElement(a.Collapse,{open:t,direction:"vertical"},l.createElement(a.OutlinedCard,{className:"recipe-ingredients",role:"primary",containerType:"container",rounded:!0},l.createElement(a.Subheading,null,"Ingredients"),l.createElement(a.FilledButton,{className:"recipe-ingredients-pin",pill:!0,onClick:()=>i(!0)},"Pin"),l.createElement(a.Body,null,null==n?void 0:n.map((e=>l.createElement(a.Checkbox,{className:"recipe-ingredient",label:e.measure+" "+e.unit+" "+e.name}))))))}function s(e){let{image:n,name:t,culture:i,description:r}=e;return l.createElement(a.FilledCard,{className:"recipe-metadata",role:"secondary",containerType:"container",rounded:!0},l.createElement(a.Image,{className:"recipe-image",source:n,alternate:""}),l.createElement("div",{className:"recipe-info"},l.createElement(a.Headline,null,t),l.createElement(a.Label,null,i),l.createElement(a.Subheading,null,"Description"),l.createElement(a.Body,null,r)))}function u(e){let{steps:n}=e;return l.createElement(a.Body,null,l.createElement(a.Subheading,null,"Directions"),l.createElement("ol",null,null==n?void 0:n.map((e=>l.createElement("li",{key:e},e)))))}function d(e){let{tags:n}=e;return null==n?void 0:n.map((e=>l.createElement(a.Label,{role:"secondary",pill:!0},e.name+": "+e.desc)))}var o=e=>{let n,{location:{state:o}}=e;n=void 0!==o?o.recipe_clicked:"404";const[m,p]=l.useState(void 0);l.useEffect((()=>{(async()=>{p(await i.Z.get_recipe_details(n))})()}),[n]);const[E,g]=l.useState("");l.useEffect((()=>{(async()=>{g((await t(3222)("./"+(null==m?void 0:m.image))).default)})()}),[m]);const[v,f]=l.useState(!1);return l.createElement("main",{className:"recipe-page"},l.createElement(r,{ingredients:null==m?void 0:m.ingredients,open:v,handleOpen:f}),l.createElement(a.Pane,{className:"recipe-pane",rounded:!0},l.createElement("div",{className:"recipe-content"},l.createElement(s,{image:E,name:null==m?void 0:m.name,description:null==m?void 0:m.desc}),l.createElement(c,{ingredients:null==m?void 0:m.ingredients,open:!v,handleOpen:f}),l.createElement(u,{steps:null==m?void 0:m.steps}),l.createElement(d,{tags:null==m?void 0:m.groups}))))};const m=()=>l.createElement("title",null,"Recipe Page")}}]);
//# sourceMappingURL=component---src-pages-recipe-js-5060fdcf58f8c40f34e0.js.map