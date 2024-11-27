import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies:'injectManifest',
      srcDir:'src',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
        type: "module",
      },
      registerType: "autoUpdate",
      injectRegister: "script-defer",
      includeAssets: ["logo.ico", "logo.png", "logo.svg"],
      workbox: {
        swSrc: 'src/sw.js',
        runtimeCaching: [
          {
            // Maneja las rutas de tu aplicación
            urlPattern: /\/.*/,
            handler: 'CacheFirst', // Este patrón captura todas las rutas
            options: {
              cacheName: 'app-cache',
              expiration: {
                maxEntries: 50, // Número máximo de entradas en la caché
                maxAgeSeconds: 30 * 24 * 60 * 60, // Tiempo máximo de almacenamiento (30 días)
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "NetworkFirst",
            options: {
              cacheName: "script-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "style-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
          {
            urlPattern: /\/api\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
        ],
      },
      manifest: {
        name: "Softion Pro",
        short_name: "Softion Pro",
        description: "Softion Pro",
        theme_color: "#034595",
        background_color: "#034595",
        display: "standalone",
        
        icons: [
          {
            src: "images/logo_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/logo_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/logo.png",
            sizes: "256x248",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["@mui/x-data-grid"],
  },
  build: { sourcemap: true },
  server: {
    proxy: {
      "/api": {
        target: "https://softion-api-v3.vercel.app/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
