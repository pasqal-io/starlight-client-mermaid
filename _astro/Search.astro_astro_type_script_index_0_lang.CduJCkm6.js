const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/ui-core.CqghPmtH.js","_astro/preload-helper.bs8D9AN2.js"])))=>i.map(i=>d[i]);
import{_ as g}from"./preload-helper.bs8D9AN2.js";const h={ranking:{pageLength:.1,termFrequency:.1,termSaturation:2,termSimilarity:9}};class p extends HTMLElement{constructor(){super();const i=this.querySelector("button[data-open-modal]"),u=this.querySelector("button[data-close-modal]"),n=this.querySelector("dialog"),m=this.querySelector(".dialog-frame"),r=e=>{("href"in(e.target||{})||document.body.contains(e.target)&&!m.contains(e.target))&&o()},l=e=>{n.showModal(),document.body.toggleAttribute("data-search-modal-open",!0),this.querySelector("input")?.focus(),e?.stopPropagation(),window.addEventListener("click",r)},o=()=>n.close();i.addEventListener("click",l),i.disabled=!1,u.addEventListener("click",o),n.addEventListener("close",()=>{document.body.toggleAttribute("data-search-modal-open",!1),window.removeEventListener("click",r)}),window.addEventListener("keydown",e=>{(e.metaKey===!0||e.ctrlKey===!0)&&e.key==="k"&&(n.open?o():l(),e.preventDefault())});let d={};try{d=JSON.parse(this.dataset.translations||"{}")}catch{}const c=this.dataset.stripTrailingSlash!==void 0?e=>e.replace(/(.)\/(#.*)?$/,"$1$2"):e=>e;window.addEventListener("DOMContentLoaded",()=>{(window.requestIdleCallback||(a=>setTimeout(a,1)))(async()=>{const{PagefindUI:a}=await g(async()=>{const{PagefindUI:t}=await import("./ui-core.CqghPmtH.js");return{PagefindUI:t}},__vite__mapDeps([0,1]));new a({...h,element:"#starlight__search",baseUrl:"/starlight-client-mermaid",bundlePath:"/starlight-client-mermaid".replace(/\/$/,"")+"/pagefind/",showImages:!1,translations:d,showSubResults:!0,processResult:t=>{t.url=c(t.url),t.sub_results=t.sub_results.map(s=>(s.url=c(s.url),s))}})})})}}customElements.define("site-search",p);
