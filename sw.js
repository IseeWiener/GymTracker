const CACHE = 'gymtracker-v5';
const ASSETS = ['./index.html','./style.css','./app.js','./manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
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

// ── Messages from app ─────────────────────────────────
let reminderTime    = '17:30';
let reminderDays    = [1, 3, 4];
let reminderEnabled = false;
let lastNotifDate   = '';

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data?.type === 'SET_REMINDER') {
    reminderTime    = e.data.time    || '17:30';
    reminderDays    = e.data.days    || [1, 3, 4];
    reminderEnabled = e.data.enabled || false;
  }
});

// ── Periodic Background Sync (Chrome/Android) ─────────
self.addEventListener('periodicsync', e => {
  if (e.tag === 'gym-reminder') {
    e.waitUntil(checkReminder());
  }
});

// ── Fallback: check on fetch while app is open ────────
self.addEventListener('fetch', () => { checkReminder(); }, { passive: true });

function checkReminder() {
  if (!reminderEnabled) return;
  const now   = new Date();
  const day   = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const hhmm  = pad(now.getHours()) + ':' + pad(now.getMinutes());
  const today = now.toISOString().split('T')[0];

  if (!reminderDays.includes(day)) return;
  if (hhmm !== reminderTime) return;
  if (lastNotifDate === today) return;

  lastNotifDate = today;
  return self.registration.showNotification('GymTracker 💪', {
    body: 'Zeit für dein Training! Du schaffst das.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'gym-reminder',
    renotify: false,
    vibrate: [200, 100, 200],
  });
}

function pad(n) { return String(n).padStart(2, '0'); }
