import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
        
      },
      registerType: "autoUpdate",
      injectRegister: 'script-defer',
      includeAssets: ["logo.ico", "logo.png", "logo.svg"],
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
          }
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["@mui/x-data-grid"],
  },
  build: {
    sourcemap: true,
  },
  server:{
    proxy:{
      '/api':{
        target: 'https://softion-api-v3.vercel.app/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    },
  }
});
