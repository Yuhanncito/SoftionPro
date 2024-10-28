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
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0c1xcXFxTb2Z0aW9uUHJvIFYzXFxcXFNvZnRpb25Qcm9WM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcU29mdGlvblBybyBWM1xcXFxTb2Z0aW9uUHJvVjNcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3RzL1NvZnRpb25Qcm8lMjBWMy9Tb2Z0aW9uUHJvVjMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICByZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6ICdzY3JpcHQtZGVmZXInLFxuICAgICAgaW5jbHVkZUFzc2V0czogW1wibG9nby5pY29cIiwgXCJsb2dvLnBuZ1wiLCBcImxvZ28uc3ZnXCJdLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogXCJTb2Z0aW9uIFByb1wiLFxuICAgICAgICBzaG9ydF9uYW1lOiBcIlNvZnRpb24gUHJvXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvZnRpb24gUHJvXCIsXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiMwMzQ1OTVcIixcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDM0NTk1XCIsXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJpbWFnZXMvbG9nb18xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJpbWFnZXMvbG9nb181MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJpbWFnZXMvbG9nby5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjI1NngyNDhcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1wiQG11aS94LWRhdGEtZ3JpZFwiXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UyxTQUFTLG9CQUFvQjtBQUMzVSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlLENBQUMsWUFBWSxZQUFZLFVBQVU7QUFBQSxNQUNsRCxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsa0JBQWtCO0FBQUEsRUFDOUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
