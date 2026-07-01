const CACHE = 'gymtracker-v6';
const ASSETS = ['./index.html','./style.css','./app.js','./manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// ── Handle incoming push from server ──────────────────
self.addEventListener('push', e => {
  let data = { title: 'GymTracker 💪', body: 'Zeit für dein Training!' };
  try { if (e.data) data = e.data.json(); } catch(err) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    './icon-192.png',
      badge:   './icon-192.png',
      tag:     'gym-reminder',
      renotify: false,
      vibrate: [200, 100, 200],
    })
  );
});

// ── Notification click → open app ─────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if (client.url.includes('GymTracker') && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

// ── SKIP_WAITING for updates ──────────────────────────
self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
