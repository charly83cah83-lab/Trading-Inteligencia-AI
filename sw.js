const CACHE='trading-ai-shell-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL);try{const q=new Request('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',{mode:'no-cors'});const r=await fetch(q);await c.put(q,r);}catch(_){}self.skipWaiting();})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin===self.location.origin){
  if(req.mode==='navigate'){event.respondWith((async()=>{try{const r=await fetch(req);const c=await caches.open(CACHE);c.put('./index.html',r.clone());return r;}catch(_){return (await caches.match('./index.html'))||Response.error();}})());return;}
  event.respondWith((async()=>{const cached=await caches.match(req);if(cached)return cached;try{const r=await fetch(req);if(r.ok){const c=await caches.open(CACHE);c.put(req,r.clone());}return r;}catch(_){return cached||Response.error();}})());return;
 }
 if(url.hostname==='cdn.jsdelivr.net'&&url.pathname.includes('supabase-js')){
  event.respondWith((async()=>{const cached=await caches.match(req);if(cached)return cached;try{const r=await fetch(req);const c=await caches.open(CACHE);c.put(req,r.clone());return r;}catch(_){return cached||Response.error();}})());
 }
});
