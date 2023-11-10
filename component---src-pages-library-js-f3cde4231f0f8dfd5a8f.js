"use strict";(self.webpackChunkdos_culturas=self.webpackChunkdos_culturas||[]).push([[255],{3059:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(4578),l=a(7294),r=a(4160);const i=(0,a(684).ZP)((()=>Promise.resolve().then(a.bind(a,7497))));let c=function(e){function t(t){var a,n,l,r,i;return(i=e.call(this,t)||this).state={id:null===(a=t.data)||void 0===a?void 0:a.pk,image_url:null===(n=t.data)||void 0===n?void 0:n.image,image:"",name:null===(l=t.data)||void 0===l?void 0:l.name,culture:null===(r=t.data)||void 0===r?void 0:r.culture},i}(0,n.Z)(t,e);var c=t.prototype;return c.componentDidMount=function(){(async()=>{this.setState({image:(await a(3222)("./"+this.state.image_url)).default})})()},c.componentDidUpdate=function(e){e.data!==this.props.data&&(async()=>{this.setState({id:this.props.data.pk,image_url:this.props.data.image,image:(await a(3222)("./"+this.props.data.image)).default,name:this.props.data.name,culture:this.props.data.culture})})()},c.render=function(){return l.createElement(r.rU,{to:"/recipe/",state:{recipe_clicked:this.state.id}},l.createElement(i.FilledCard,{className:"recipe-card",role:"secondary",containerType:"container",rounded:!0,interactable:!0},l.createElement("figure",{className:"recipe-image"},l.createElement(i.Image,{source:this.state.image,alternate:this.state.description})),l.createElement("div",{className:"recipe-meta"},l.createElement(i.Label,{className:"recipe-culture",role:"primary",pill:!0},this.state.culture),l.createElement(i.Subheading,{className:"recipe-name"},this.state.name))))},t}(l.Component)},6159:function(e,t,a){a.r(t),a.d(t,{Head:function(){return m},default:function(){return d}});var n=a(7294),l=a(4464),r=a(684),i=a(3059);const c=(0,r.ZP)((()=>Promise.resolve().then(a.bind(a,7497))));function s(e){let{data:t}=e;const[a,l]=n.useState();return n.useEffect((()=>{l(function(e){let t=[];function a(e){let t=[];if(e)for(let a=0;a<e.length;a++)t.push(n.createElement(i.Z,{key:a,index:a,data:e[a]}));return t}if(e)for(let l=0;l<e.length;l+=6){const r=e.slice(l,l+6);t.push(n.createElement("div",{className:"recipe-slide"},a(r)))}return t}(t))}),[t]),n.createElement(c.Pane,{className:"recipe-carousel",containerType:"container",rounded:!0},n.createElement(c.Slideshow,{enterStyle:"fade-in-up",exitStyle:"fade-out-against"},a))}const o=(0,r.ZP)((()=>Promise.resolve().then(a.bind(a,7497))));function u(e){let{data:t,onFilter:a,onReset:l}=e;const[r,i]=n.useState(),c=n.useMemo((()=>new Set),[]),[s,u]=n.useState(!1),d=n.useCallback((e=>{c.has(e)?c.delete(e):c.add(e)}),[c]),m=n.useCallback((e=>{let t=[];return["Main Ingredient","Dietary Restriction","Culture","Cooking Method"].forEach((a=>{t.push(n.createElement(o.Submenu,{key:a,name:a,pill:!0},(e=>{let t=[];if(e)for(let a=0;a<e.length;a++)t.push(n.createElement(o.Checkbox,{key:a,label:e[a].name,defaultChecked:c.has(e[a].name),onToggle:d}));return t})(e[a])))})),t}),[c,d]);return n.useEffect((()=>{i(m(t))}),[t,c,m]),n.createElement(n.Fragment,null,n.createElement(o.FilledButton,{className:"collapse-button "+(s?"open":""),pill:!0,onClick:()=>u(!s)},n.createElement(o.Icon,{scale:2},n.createElement("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},n.createElement("rect",{class:"fltr-line1",x:"7",y:"10",width:"18",height:"2"}),n.createElement("rect",{class:"fltr-line2",x:"7",y:"20",width:"18",height:"2"}),n.createElement("circle",{class:"fltr-crcl1",cx:"13",cy:"21",r:"3"}),n.createElement("circle",{class:"fltr-crcl2",cx:"19",cy:"11",r:"3"}))),n.createElement("span",null,"Filters")),n.createElement(o.SideSheet,{open:s},n.createElement("div",{className:"filter-accordion"},r),n.createElement("div",{className:"filter-button-container"},n.createElement(o.FilledButton,{pill:!0,onClick:function(){a(Array.from(c))}},"Filter Recipes"),n.createElement(o.TonalButton,{pill:!0,onClick:function(){c.clear(),l()}},"Reset Filters"))))}function d(){let[e,t]=n.useState([]),[a,r]=n.useState({"Main Ingredient":[],"Dietary Restriction":[],Culture:[],"Cooking Method":[]}),[i,c]=n.useState(!0);return n.useEffect((()=>{i&&(async()=>{r(await l.Z.get_groups()),t(await l.Z.get_recipes())})(),c(!1)}),[i]),n.createElement("main",{className:"recipe-library"},n.createElement(u,{data:a,onFilter:function(e){(async()=>{t(await l.Z.get_recipes(e))})()},onReset:function(){c(!0)}}),n.createElement(s,{data:e}))}const m=()=>n.createElement("title",null,"All Recipes Page")}}]);
//# sourceMappingURL=component---src-pages-library-js-f3cde4231f0f8dfd5a8f.js.map