import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';

// Solo una instancia de self.__WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Limpieza de cachés antiguos
cleanupOutdatedCaches();

// Rutas de caché personalizadas
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

// Manejo de activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(
    self.clients.claim().then(() => {
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        for (const client of clients) {
          client.postMessage({ type: 'SW_ACTIVATED', message: 'El Service Worker ha sido activado. Por favor, recarga la página para habilitar las notificaciones push.' });
        }
      });
    })
  );
});

// Manejo de push notifications
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});
