// vite.config.js
import { defineConfig } from "file:///D:/projects/SoftionPro%20V3/SoftionProV3/node_modules/vite/dist/node/index.js";
import react from "file:///D:/projects/SoftionPro%20V3/SoftionProV3/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { VitePWA } from "file:///D:/projects/SoftionPro%20V3/SoftionProV3/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      registerType: "autoUpdate",
      injectRegister: "script-defer",
      includeAssets: ["logo.ico", "logo.png", "logo.svg"],
      workbox: {
        swDest: "sw.js"
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
            type: "image/png"
          },
          {
            src: "images/logo_512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "images/logo.png",
            sizes: "256x248",
            type: "image/png"
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ["@mui/x-data-grid"]
  },
  build: {
    sourcemap: true
  },
  server: {
    proxy: {
      "/api": {
        target: "https://softion-api-v3.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxTb2Z0aW9uUHJvIFYzXFxcXFNvZnRpb25Qcm9WM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcU29mdGlvblBybyBWM1xcXFxTb2Z0aW9uUHJvVjNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3RzL1NvZnRpb25Qcm8lMjBWMy9Tb2Z0aW9uUHJvVjMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxyXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ3NjcmlwdC1kZWZlcicsXHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcImxvZ28uaWNvXCIsIFwibG9nby5wbmdcIiwgXCJsb2dvLnN2Z1wiXSxcclxuICAgICAgd29ya2JveDp7XHJcbiAgICAgICAgc3dEZXN0OiAnc3cuanMnLFxyXG4gICAgICB9LFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6IFwiU29mdGlvbiBQcm9cIixcclxuICAgICAgICBzaG9ydF9uYW1lOiBcIlNvZnRpb24gUHJvXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiU29mdGlvbiBQcm9cIixcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjMDM0NTk1XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDM0NTk1XCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcImltYWdlcy9sb2dvXzE5MngxOTIucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJpbWFnZXMvbG9nb181MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiaW1hZ2VzL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjI1NngyNDhcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGV4Y2x1ZGU6IFtcIkBtdWkveC1kYXRhLWdyaWRcIl0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgc291cmNlbWFwOiB0cnVlLFxyXG4gIH0sXHJcbiAgc2VydmVyOntcclxuICAgIHByb3h5OntcclxuICAgICAgJy9hcGknOntcclxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL3NvZnRpb24tYXBpLXYzLnZlcmNlbC5hcHAvJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcvYXBpJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThTLFNBQVMsb0JBQW9CO0FBQzNVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BRVg7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWUsQ0FBQyxZQUFZLFlBQVksVUFBVTtBQUFBLE1BQ2xELFNBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsa0JBQWtCO0FBQUEsRUFDOUI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSixRQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxNQUFNO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
