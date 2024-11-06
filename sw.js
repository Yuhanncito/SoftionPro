import { precacheAndRoute, cleanupOutdatedCaches, registerRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate, ExpirationPlugin } from 'workbox-strategies';

// Precache archivos estáticos
precacheAndRoute(self.__WB_MANIFEST);

// Limpiar caché obsoleta
cleanupOutdatedCaches();

// Rutas de caché dinámicas
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





if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );

  // Manejo de activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
  
    event.waitUntil(
      self.clients.claim().then(() => {
        return self.clients.matchAll({ type: 'window' }).then(clients => {
          for (const client of clients) {
            client.postMessage({ type: 'SW_ACTIVATED' });
          }
        });
      })
    );
  });
  self.define = (n, r) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let a = {};
    const c = (e) => i(e, t),
      d = { module: { uri: t }, exports: a, require: c };
    s[t] = Promise.all(n.map((e) => d[e] || c(e))).then((e) => (r(...e), a));
  };
}
define(["./workbox-24713d30"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "assets/index-BVnd5nOE.js", revision: null },
        { url: "assets/index-CR4B3lXP.css", revision: null },
        {
          url: "ganttStyles/frappe-gantt.css",
          revision: "bc99845dcf6fa810d2c544ee22dbe25b",
        },
        {
          url: "ganttStyles/frappe-gantt.js",
          revision: "3dea4cdeb1649a13ad7b13df9ee8929b",
        },
        {
          url: "ganttStyles/frappe-gantt.min.css",
          revision: "fef88de645caec679ec2c8602388edcd",
        },
        {
          url: "ganttStyles/frappe-gantt.min.js",
          revision: "927e1926c2c08a5c5eb6fbddd5a25eef",
        },
        { url: "index.html", revision: "f41119dd11d94a67f9ea0107d252dee8" },
        { url: "registerSW.js", revision: "38029a23452a6e3583df51cae68cc40b" },
        {
          url: "service-worker.js",
          revision: "e9104e72783ba8667fa411ad5ac165b8",
        },
        { url: "sw.js", revision: "d1281a262b415e742b9f65b5f8bb2da6" },
        {
          url: "images/logo.png",
          revision: "4f5f6a22be3fa16afeec064ee57adcb5",
        },
        {
          url: "images/logo_192x192.png",
          revision: "2aab3b1fff6535f6faf6c91ac83bfedd",
        },
        {
          url: "images/logo_512x512.png",
          revision: "4c3776fe8d98bf6479315bf68e661ad5",
        },
        {
          url: "manifest.webmanifest",
          revision: "3b27294350b8769528dbef960e524f68",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    ),
    e.registerRoute(
      ({ request: e }) => "image" === e.destination,
      new e.CacheFirst({
        cacheName: "images-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) =>
        "script" === e.destination || "style" === e.destination,
      new e.StaleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    );
});
//# sourceMappingURL=sw.js.map
