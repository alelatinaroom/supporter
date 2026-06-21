const CACHE = 'alelatina-v2';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([
    '/supporter/',
    '/supporter/index.html',
    '/supporter/css/style.css?v=58',
    '/supporter/js/config.js?v=2',
    '/supporter/js/app.js?v=51',
    '/supporter/images/logo_white.png',
    '/supporter/images/icon-192.png',
    '/supporter/images/icon-512.png',
  ])));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.open(CACHE).then(cache =>
      fetch(req).then(res => { cache.put(req, res.clone()); return res; }).catch(() => cache.match(req))
    )
  );
});
