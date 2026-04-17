// Clean Service Worker - Network first for app code, minimal caching
const CACHE_NAME = 'cinesphere-v1';

console.log('✅ Service Worker Loaded');

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map(n => caches.delete(n)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Network first for HTML/JS
  if (url.pathname === '/' || url.pathname.endsWith('.html') || (url.pathname.includes('/assets/') && url.pathname.endsWith('.js'))) {
    event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
    return;
  }

  // API - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // Static assets - cache first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((r) => {
        if (r && r.status === 200) {
          const rc = r.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, rc));
        }
        return r;
      });
    })
  );
});


