import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate, NetworkOnly, NetworkFirst, CacheOnly, } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';

// Solo una instancia de self.__WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Limpieza de cachés antiguos
cleanupOutdatedCaches();

// Cachea las rutas de la aplicación utilizando la estrategia CacheFirst
// Nota: La estrategia CacheFirst intenta cargar el recurso desde la caché primero. 
// Si no está disponible, lo obtendrá de la red.
// Esto ayuda a mejorar el rendimiento cargando los recursos más rápido.
// Sin embargo, si se actualiza el recurso, el usuario no lo verá hasta que se actualice la caché.
registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'app-cache',
    plugins: [
      // Plugin de expiración para controlar el número de entradas y su tiempo de vida
      new ExpirationPlugin({
        maxEntries: 50, // Máximo de 50 entradas en la caché
        maxAgeSeconds: 30 * 24 * 60 * 60, // Las entradas expiran en 30 días
      }),
    ],
  })
);

// Nota: Después de actualizar el Service Worker, es posible que necesites refrescar la página
// para que los cambios surtan efecto debido a la naturaleza de cómo funcionan los Service Workers.
// Si deseas que el Service Worker se active inmediatamente sin esperar, puedes manejar el evento 'activate'
// y llamar a self.clients.claim() para tomar el control de las páginas abiertas.
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

// Rutas de caché personalizadas
registerRoute(
  ({ request }) => request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'scripts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

// Rutas e informacion de las Apis
registerRoute(
  ({ request }) => request.url.href.startsWith('https://softion-api-v3.vercel.app/api') && request.mode !== 'same-origin', // same-origin es el valor por defecto de request.mode, significa que la petición se hace desde el mismo origen (misma página, mismo dominio, etc.) Cachea las rutas que tengan /api/ en la url, es decir, las rutas de las Apis
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 24 * 60 * 60 }),
    ],
  })
);

// La ruta de arriba se utiliza para cachear las llamadas a la API
// La condición de arriba verifica si la ruta de la petición coincide
// con la ruta de la API (que es '/api/'). Si coincide, se utiliza la
// estrategia de caché NetworkFirst para cachear la respuesta. Lo
// que hace que si la petición falla, se devuelva la respuesta desde
// la caché, y si la petición tiene éxito, se actualiza la caché con
// la respuesta nueva.
// Rutas e informacion de las Apis 
registerRoute(
  ({ request }) => request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'styles-cache',
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













