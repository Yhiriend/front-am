import './polyfills.server.mjs';
import{b as l}from"./chunk-NJYFXIAT.mjs";import{o as t,p as c}from"./chunk-TNSAREYT.mjs";import{A as o,G as a}from"./chunk-OUEVK6MT.mjs";var s=c("user"),x=t(s,e=>e.updated),u=t(s,e=>e.progress),U=t(s,e=>e.hasAccess),g=t(s,e=>e.hasProgressBeenUpdated),h=t(s,e=>e.activities);var r=!1,C=(e,p,i,n=!0,d)=>{if(r)return;r=!0,e.open(l,{minWidth:"300px",maxWidth:"50vw",disableClose:!0,data:{title:p,message:i,secondaryButtonEnabled:n}}).afterClosed().pipe(a(1),o(()=>r)).subscribe(()=>{d(),r=!1})};export{x as a,u as b,U as c,g as d,h as e,C as f};