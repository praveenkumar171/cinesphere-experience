// EMERGENCY CLEANUP SERVICE WORKER
// This SW clears all caches and unregisters itself to force fresh code load
console.log('🔄 Emergency cleanup: Clearing all caches and unregistering...');

// Delete ALL caches immediately
caches.keys().then((cacheNames) => {
  console.log('🗑️ Deleting all caches:', cacheNames);
  return Promise.all(
    cacheNames.map((cacheName) => caches.delete(cacheName))
  );
}).then(() => {
  console.log('✅ All caches cleared');
});

// Install event - just skip waiting and let client control
self.addEventListener('install', (event) => {
  console.log('⚡ Install event - skipping wait');
  self.skipWaiting();
});

// Activate event - claim all clients and unregister
self.addEventListener('activate', (event) => {
  console.log('⚡ Activate event - claiming clients and unregistering');
  event.waitUntil(
    self.clients.claim().then(() => {
      return self.registration.unregister().then(() => {
        console.log('✅ Service Worker unregistered successfully');
      });
    })
  );
});

// Fetch event - just pass through everything to network
self.addEventListener('fetch', (event) => {
  // Do nothing - let all requests go to network
  console.log('📤 Passthrough fetch:', event.request.url);
});

