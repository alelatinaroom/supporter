const CACHE = 'alelatina-v1';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([
    '/supporter/',
    '/supporter/index.html',
    '/supporter/css/style.css?v=50',
    '/supporter/js/config.js?v=3',
    '/supporter/js/app.js?v=46',
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

self.addEventListener('push', event => {
  if (!event.data) return;
  try {
    const data = event.data.json();
    const title = data.notification?.title || 'AleLatina';
    const body = data.notification?.body || '';
    const icon = data.notification?.icon || '/supporter/images/icon-192.png';
    event.waitUntil(self.registration.showNotification(title, { body, icon, badge: '/supporter/images/icon-192.png', data: { url: data.data?.url || '/supporter/' } }));
  } catch (e) { /* ignore */ }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/supporter/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
    for (const client of clientList) { if (client.url.includes(url) && 'focus' in client) return client.focus(); }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
