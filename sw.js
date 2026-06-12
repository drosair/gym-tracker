const CACHE_NAME = "gym-tracker-v18";
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./css/theme.css",
  "./css/components.css",
  "./js/storage.js",
  "./js/app.js",
  "./data/sample-workouts.json",
  "./assets/images/tiger-gym-buddy.png",
  "./assets/images/tiger-action.png",
  "./assets/images/gym-equipment.png",
  "./assets/images/dumbbells-closeup.png",
  "./assets/icons/dumbbell.svg",
  "./assets/icons/timer.svg",
  "./assets/icons/history.svg",
  "./assets/icons/bodyweight.svg",
  "./assets/icons/target.svg",
  "./assets/icons/trophy.svg",
  "./assets/icons/paw.svg",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (!isSameOrigin) return;

  event.respondWith(networkFirst(event.request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    if (request.mode === "navigate") {
      return cache.match("./index.html");
    }

    throw error;
  }
}
