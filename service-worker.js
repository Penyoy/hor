/**
 * GameHub - Service Worker
 * Mengelola caching dan offline support.
 */

const CACHE_NAME = 'gamehub-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/detail.html',
  '/search.html',
  '/about.html',
  '/404.html',
  '/css/style.css',
  '/css/navbar.css',
  '/css/home.css',
  '/css/detail.css',
  '/css/search.css',
  '/css/animation.css',
  '/css/responsive.css',
  '/js/config.js',
  '/js/utils.js',
  '/js/storage.js',
  '/js/api.js',
  '/js/app.js',
  '/js/home.js',
  '/js/detail.js',
  '/js/search.js',
  '/components/card.js',
  '/components/slider.js',
  '/components/modal.js',
  '/components/toast.js',
  '/components/loading.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      // Silently fail for individual assets
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  // API requests - network first, then cache
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            // Return offline fallback for API
            return new Response(
              JSON.stringify({ error: 'Offline', message: 'You are currently offline' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Static assets - cache first, then network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        // Return cached and update in background
        fetch(request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response);
            });
          }
        }).catch(() => {});
        return cached;
      }

      // Not in cache, fetch from network
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      }).catch(() => {
        // Return offline page for HTML requests
        if (request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/404.html');
        }
        return new Response('Offline', { status: 503 });
      });
    })
  );
});
