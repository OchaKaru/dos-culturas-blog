(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[563],{7846:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/library/[id]",function(){return t(2004)}])},4324:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var i=t(5121),r=JSON.parse('{"r":"c0e9aa19dbc9d62163438e3fec10ebbc998b8f42"}');let s="https://dos-culturas-server.uc.r.appspot.com/contentmanager/",a=s+"get_all_recipes/",c=s+"get_recipes_by_group/",l=s+"get_groups_by_type/",o=s+"get_random_recipes/",d=s+"get_recipe_by_id/";class u{set_recipe_data(e){this.recipe=e}set_group_list(e){this.group_list=e}set_recipe_list(e){this.recipe_list=e}async get_recipe_details(e){return await i.Z.get(d+e,{headers:{Authorization:"Token ".concat(r.r)}}).then(e=>{this.set_recipe_data(e.data.data)}),this.recipe}async get_groups(){return await i.Z.get(l,{headers:{Authorization:"Token ".concat(r.r)}}).then(e=>{this.set_group_list(e.data.data)}),this.group_list}async get_recipes(e){if(!e||0===e.length)return await i.Z.get(a,{headers:{Authorization:"Token ".concat(r.r)}}).then(e=>{this.set_recipe_list(e.data.data)}),this.recipe_list;for(let n=0;n<e.length;n++)e[n]=e[n].replace(" ","_");return e=e.join("&"),await i.Z.get(c+e,{headers:{Authorization:"Token ".concat(r.r)}}).then(e=>{this.set_recipe_list(e.data.data)}),this.recipe_list}async get_featured(){return await i.Z.get(o,{headers:{Authorization:"Token ".concat(r.r)}}).then(e=>{this.set_recipe_list(e.data.data)}),this.recipe_list}}var p=new u},2004:function(e,n,t){"use strict";t.r(n),t.d(n,{Head:function(){return h},default:function(){return _}});var i=t(5893),r=t(7294),s=t(1163),a=t(9597),c=t(4324);function l(e){let{ingredients:n,open:t,handleOpen:r}=e;return(0,i.jsxs)(a.Uu,{open:t,children:[(0,i.jsx)(a.pm,{children:"Ingredients"}),(0,i.jsx)(a.kX,{className:"recipe-ingredients-pin",pill:!0,onClick:()=>r(!1),children:"Unpin"}),(0,i.jsx)(a.uT,{children:null==n?void 0:n.map(e=>(0,i.jsx)(a.XZ,{className:"recipe-ingredient",label:e.measure+" "+e.unit+" "+e.name}))})]})}function o(e){let{ingredients:n,open:t,handleOpen:r}=e;return(0,i.jsx)(a.UO,{open:t,direction:"vertical",children:(0,i.jsxs)(a.Tr,{className:"recipe-ingredients",role:"primary",containerType:"container",rounded:!0,children:[(0,i.jsx)(a.pm,{children:"Ingredients"}),(0,i.jsx)(a.IH,{className:"recipe-ingredients-pin",pill:!0,onClick:()=>r(!0),children:"Pin"}),(0,i.jsx)(a.uT,{children:null==n?void 0:n.map(e=>(0,i.jsx)(a.XZ,{className:"recipe-ingredient",label:e.measure+" "+e.unit+" "+e.name}))})]})})}function d(e){let{image:n,name:t,culture:r,description:s}=e;return(0,i.jsxs)(a.Nt,{className:"recipe-metadata",role:"secondary",containerType:"container",rounded:!0,children:[(0,i.jsx)(a.Ee,{className:"recipe-image",source:n,alternate:""}),(0,i.jsxs)("div",{className:"recipe-info",children:[(0,i.jsx)(a.s0,{children:t}),(0,i.jsx)(a.__,{children:r}),(0,i.jsx)(a.pm,{children:"Description"}),(0,i.jsx)(a.uT,{children:s})]})]})}function u(e){let{steps:n}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.pm,{children:"Directions"}),(0,i.jsx)(a.uT,{children:(0,i.jsx)("ol",{children:null==n?void 0:n.map(e=>(0,i.jsx)("li",{children:e},e))})})]})}function p(e){let{tags:n}=e;return(0,i.jsx)("div",{className:"tag-list",children:null==n?void 0:n.map(e=>(0,i.jsx)(a.__,{role:"secondary",pill:!0,children:e.name}))})}function _(){let e=(0,s.useRouter)(),n=e.query.id,[_,h]=r.useState(void 0),[g,m]=r.useState("");r.useEffect(()=>{(async()=>{h(await c.Z.get_recipe_details(n))})()},[n]),r.useEffect(()=>{(async()=>{_&&m((await t(3222)("./".concat(_.image))).default)})()},[_]);let[f,j]=r.useState(!1);return(0,i.jsxs)("main",{className:"recipe-page",children:[(0,i.jsx)(l,{ingredients:null==_?void 0:_.ingredients,open:f,handleOpen:j}),(0,i.jsx)(a.X6,{className:"recipe-pane",rounded:!0,children:(0,i.jsxs)("div",{className:"recipe-content",children:[(0,i.jsx)(d,{image:g.src,name:null==_?void 0:_.name,description:null==_?void 0:_.desc}),(0,i.jsx)(o,{ingredients:null==_?void 0:_.ingredients,open:!f,handleOpen:j}),(0,i.jsx)(u,{steps:null==_?void 0:_.steps}),(0,i.jsx)(p,{tags:null==_?void 0:_.groups})]})})]})}let h=()=>(0,i.jsx)("title",{children:"Recipe Page"})},3222:function(e,n,t){var i={"./alcapurrias.png":[9364,364],"./arroz_con_pollo_puerto_rican.png":[2644,644],"./chiles_rellenos_mexican.png":[312,312],"./dinner.png":[2937,937],"./elotes.png":[4044,44],"./flautas_broll.png":[2383,383],"./flautas_taquitos_dorados.png":[5650,650],"./guacamole.png":[6653,653],"./mofongo.png":[9262,262],"./pernil.png":[297,297],"./pernil_broll.png":[400,400],"./tacos_de_carne_asada.png":[3373,373],"./tamales_broll.png":[149,149],"./tamales_rojos.png":[70,70],"./temp_logo.svg":[2731],"./tostones.png":[2747,747]};function r(e){if(!t.o(i,e))return Promise.resolve().then(function(){var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n});var n=i[e],r=n[0];return Promise.all(n.slice(1).map(t.e)).then(function(){return t(r)})}r.keys=function(){return Object.keys(i)},r.id=3222,e.exports=r}},function(e){e.O(0,[121,774,888,179],function(){return e(e.s=7846)}),_N_E=e.O()}]);