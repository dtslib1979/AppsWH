const CACHE_NAME = 'claude-terms-v3';
const BASE = self.location.pathname.replace(/\/[^/]*$/, '/');
const urlsToCache = [
  `${BASE}`,
  `${BASE}index.html`,
  `${BASE}claude-code-master-terms.html`,
  `${BASE}manifest.json`,
  `${BASE}favicon.ico`
];

self.addEventListener("install", (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files:', urlsToCache);
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error('Failed to cache files:', error);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Serving from cache:', event.request.url);
        return response;
      }
      console.log('Fetching from network:', event.request.url);
      return fetch(event.request).catch(() => {
        // Fallback for offline
        if (event.request.destination === 'document') {
          return caches.match(`${BASE}claude-code-master-terms.html`);
        }
      });
    })
  );
});