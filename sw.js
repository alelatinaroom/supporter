const CACHE = 'alelatina-v4';
const DYNAMIC_CACHE = 'alelatina-dyn';

const PRECACHE_URLS = [
  './',
  './index.html',
  './css/style.css?v=86',
  './js/config.js?v=2',
  './js/app.js?v=31',
  './images/logo_white.png',
  './images/icon-192.png',
  './images/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE_URLS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== DYNAMIC_CACHE).map(k => caches.delete(k)))),
    self.clients.claim(),
  ]));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Data JSON must ALWAYS come from the network (never stale cache)
  if (/\.json$/.test(url.pathname)) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
