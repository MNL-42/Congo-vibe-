self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",()=>{});
self.addEventListener("push",e=>{let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil((async()=>{
    const cs=await clients.matchAll({type:"window",includeUncontrolled:true});
    if(cs.some(c=>c.visibilityState==="visible"&&c.focused))return;
    await self.registration.showNotification(d.title||"Congo Vibe",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",tag:d.tag,renotify:true,data:{url:d.url||"./"},vibrate:[80,40,80]});
  })())});
self.addEventListener("notificationclick",e=>{e.notification.close();const url=e.notification.data?.url||"./";
  e.waitUntil((async()=>{
    const cs=await clients.matchAll({type:"window",includeUncontrolled:true});const chat=url.split("#chat=")[1]||"";
    for(const c of cs){if("focus"in c){await c.focus();if(chat)c.postMessage({chat});return}}
    await clients.openWindow(new URL(url,self.registration.scope).href);
  })())});
