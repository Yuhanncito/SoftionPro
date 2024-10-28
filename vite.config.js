import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.ico", "logo.png", "logo.svg"],
      manifest: {
        name: "Softion Pro",
        short_name: "Softion Pro",
        description: "Softion Pro",
        theme_color: "#ffffff",
        background_color: "#ffffff",
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
          }
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["@mui/x-data-grid"],
  },
});
