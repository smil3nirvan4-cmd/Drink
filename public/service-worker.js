/// <reference lib="webworker" />

const CACHE_NAME = 'lp-drink-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
];

// Content to cache for offline access (lessons, PDFs, etc.)
const CONTENT_CACHE_NAME = 'lp-drink-content-v1';
const CONTENT_PATTERNS = [
    /\/api\/lessons/,
    /\.pdf$/,
    /\.mp4$/,
    /\/videos\//,
];

// Install Event - Cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching app shell');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== CONTENT_CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Network first with cache fallback for content
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and non-http requests
    if (!request.url.startsWith('http')) return;

    // Check if this is content that should be cached for offline
    const isContentRequest = CONTENT_PATTERNS.some((pattern) => pattern.test(request.url));

    if (isContentRequest) {
        // Cache-first strategy for content (lessons, PDFs, videos)
        event.respondWith(
            caches.open(CONTENT_CACHE_NAME).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        // Return cached version, but update in background
                        fetch(request).then((networkResponse) => {
                            if (networkResponse.ok) {
                                cache.put(request, networkResponse.clone());
                            }
                        }).catch(() => { });
                        return cachedResponse;
                    }

                    // Not in cache, fetch from network
                    return fetch(request).then((networkResponse) => {
                        if (networkResponse.ok) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        // Network-first strategy for other requests
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();

                    if (response.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });
                    }

                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/');
                        }

                        return new Response('Offline - Conteúdo não disponível', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: { 'Content-Type': 'text/plain' },
                        });
                    });
                })
        );
    }
});

// Background sync for offline purchases
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-purchases') {
        event.waitUntil(syncPurchases());
    }
});

async function syncPurchases() {
    // Get pending purchases from IndexedDB
    // Send to server when online
    console.log('[SW] Syncing offline purchases...');
}

// Push notifications for course updates
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || 'Nova aula disponível!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: { url: data.url || '/membros' },
        actions: [
            { action: 'open', title: 'Abrir' },
            { action: 'close', title: 'Fechar' },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'LP Drink', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    const url = event.notification.data?.url || '/membros';
    event.waitUntil(
        self.clients.openWindow(url)
    );
});

// Message handling
self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data?.type === 'CACHE_CONTENT') {
        // Cache specific content for offline viewing
        const { urls } = event.data;
        caches.open(CONTENT_CACHE_NAME).then((cache) => {
            urls.forEach((url) => {
                fetch(url).then((response) => {
                    if (response.ok) {
                        cache.put(url, response);
                        console.log('[SW] Cached for offline:', url);
                    }
                }).catch(() => { });
            });
        });
    }
});
