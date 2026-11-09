/* Optional, opt-in Google Analytics for AgencyStack Guide. */
(function(){
"use strict";
const GA_ID="G-3XXV1QDVFR",KEY="ag_analytics_consent_v1";
let panel,settings,loaded=false;
function choice(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function save(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function load(){
 if(loaded)return;loaded=true;window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
 window.gtag("js",new Date());window.gtag("config",GA_ID);
 const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(GA_ID);document.head.appendChild(s);
 document.addEventListener("click",function(e){const a=e.target.closest("a[href]");if(!a)return;let u;try{u=new URL(a.href,location.href)}catch(err){return}if(u.origin!==location.origin)window.gtag("event","provider_link_click",{link_url:u.href,link_text:(a.innerText||a.getAttribute("aria-label")||"").trim().slice(0,100),page_path:location.pathname})});
}
function show(){panel.hidden=false;settings.hidden=true}
function hide(){panel.hidden=true;settings.hidden=false}
function set(v){save(v);if(v==="yes")load();hide()}
function init(){
 panel=document.createElement("section");panel.className="ag-consent-banner";panel.hidden=true;panel.setAttribute("role","dialog");panel.setAttribute("aria-label","Analytics preferences");
 const isEs=location.pathname.indexOf("/es/")>=0;
 const privacy=isEs?"privacidad.html":(location.pathname.indexOf("/reviews/")>=0||location.pathname.indexOf("/guides/")>=0||location.pathname.indexOf("/comparisons/")>=0?"../privacy.html":"privacy.html");
 panel.innerHTML=isEs
  ? '<div class="ag-consent-copy"><strong>Ayúdanos a mejorar AgencyStack Guide</strong><p>Google Analytics opcional nos ayuda a entender qué guías son útiles. La analítica permanece desactivada salvo que la aceptes. Puedes cambiar tu decisión después.</p><a href="'+privacy+'">Política de privacidad</a></div><div class="ag-consent-actions"><button type="button" class="ag-consent-secondary" data-reject>Rechazar analítica</button><button type="button" class="ag-consent-primary" data-accept>Aceptar analítica</button></div>'
  : '<div class="ag-consent-copy"><strong>Help improve AgencyStack Guide</strong><p>Optional Google Analytics helps us understand which guides are useful. Analytics stays off unless you accept. You can change this choice later.</p><a href="'+privacy+'">Privacy policy</a></div><div class="ag-consent-actions"><button type="button" class="ag-consent-secondary" data-reject>Reject analytics</button><button type="button" class="ag-consent-primary" data-accept>Accept analytics</button></div>';
 document.body.appendChild(panel);
 settings=document.createElement("button");settings.type="button";settings.className="ag-analytics-settings";settings.textContent=isEs?"Preferencias de analítica":"Analytics settings";settings.setAttribute("aria-label",isEs?"Abrir preferencias de analítica":"Open analytics settings");settings.addEventListener("click",show);document.body.appendChild(settings);
 panel.querySelector("[data-accept]").addEventListener("click",()=>set("yes"));panel.querySelector("[data-reject]").addEventListener("click",()=>set("no"));
 const c=choice();if(c==="yes"){load();hide()}else if(c==="no"){hide()}else{show()}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();