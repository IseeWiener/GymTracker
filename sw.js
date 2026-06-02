const CACHE = 'gymtracker-v2';
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

// ── Reminder alarm ────────────────────────────────────
let reminderTime = '17:30';
let reminderDays = [1,3,4];
let reminderInterval = null;

self.addEventListener('message', e => {
  if (e.data?.type === 'SET_REMINDER') {
    reminderTime = e.data.time || '17:30';
    reminderDays = e.data.days || [1,3,4];
    clearInterval(reminderInterval);
    // Check every minute if it's time to notify
    reminderInterval = setInterval(checkReminder, 60000);
  }
});

function checkReminder() {
  const now  = new Date();
  const day  = now.getDay() === 0 ? 6 : now.getDay() - 1; // 0=Mon
  const hhmm = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  if (reminderDays.includes(day) && hhmm === reminderTime) {
    self.registration.showNotification('GymTracker 💪', {
      body: 'Zeit für dein Training! Du schaffst das.',
      icon: 'https://via.placeholder.com/192x192/00e87a/000000?text=GT',
      badge: 'https://via.placeholder.com/96x96/00e87a/000000?text=GT',
      tag: 'gym-reminder',
      renotify: false,
    });
  }
}
