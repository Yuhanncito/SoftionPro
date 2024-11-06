/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    console.log('ruta del no se que', uri);
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      new Promise((resolve, reject) => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          script.onerror = () => reject(new Error(`Failed to load script ${uri}`));
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          try {
            importScripts(uri);
            resolve();
          } catch (e) {
            reject(new Error(`Failed to import script ${uri}: ${e.message}`));
          }
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };
  

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-b5f7729d'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "3ca0b8505b4bec776b69afdba2768812"
  }, {
    "url": "index.html",
    "revision": "0.bdkekqvi2b8"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    allowlist: [/^\/$/]
  }));

}));

self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
  });
});

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


