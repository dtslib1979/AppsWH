const CACHE_NAME = 'claude-terms-v3';
const BASE = self.location.pathname.replace(/\/[^/]*$/, '/');
const urlsToCache = [
  `${BASE}claude-code-master-terms.html`,
  `${BASE}manifest.json`,
  `${BASE}index.html`
];

self.addEventListener("install", (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('All files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Cache installation failed:', error);
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) {
          console.log('Serving from cache:', event.request.url);
          return cached;
        }
        
        console.log('Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            // Return a basic offline page if available
            if (event.request.mode === 'navigate') {
              return caches.match(`${BASE}claude-code-master-terms.html`);
            }
            throw error;
          });
      })
  );
});