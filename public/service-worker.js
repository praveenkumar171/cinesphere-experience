const CACHE_NAME = 'cinesphere-v1';
const RUNTIME_CACHE = 'cinesphere-runtime';

// Only cache STATIC assets, NOT index.html
// This ensures HTML/JS are always fetched fresh with new API URLs
const ASSETS_TO_CACHE = [
  '/favicon.jpg',
  '/manifest.json',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Caching essential assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
        console.warn('⚠️ Some assets could not be cached:', error);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first for API, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (POST, PUT, DELETE, etc. go directly to network)
  if (request.method !== 'GET') {
    console.log('🔄 Non-GET request, bypassing SW:', request.method, url.pathname);
    return;
  }

  // API calls - network first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(request, responseClone));
          }
          return response;
        })
        .catch((error) => {
          console.error('🚨 API fetch error:', url.pathname, error);
          return caches.match(request).then((cached) => {
            if (cached) {
              console.log('📦 Using cached API response for:', url.pathname);
              return cached;
            }
            return new Response(
              JSON.stringify({ message: 'Offline - API not available' }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // HTML files - ALWAYS fetch fresh from network to get latest code
  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          console.log('🌐 Fresh HTML from network:', url.pathname);
          return response;
        })
        .catch(() => {
          console.warn('❌ Offline - HTML not available:', url.pathname);
          return new Response('Offline - App not available', { status: 503 });
        })
    );
    return;
  }

  // JavaScript bundles - ALWAYS fetch fresh to get latest API URL detection
  if (url.pathname.includes('/assets/') && url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          console.log('🌐 Fresh JS from network:', url.pathname);
          return response;
        })
        .catch(() => {
          console.warn('❌ Offline - JS not available:', url.pathname);
          return caches.match(request).then((cached) => {
            return cached || new Response('Offline - JS not available', { status: 503 });
          });
        })
    );
    return;
  }

  // Assets - cache first, fallback to network
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        console.log('📦 Serving from cache:', url.pathname);
        return response;
      }
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          console.warn('❌ Offline - Resource not available:', url.pathname);
          return new Response('Offline - Resource not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' },
          });
        });
    })
  );
});

console.log('✅ Service Worker loaded and ready');
