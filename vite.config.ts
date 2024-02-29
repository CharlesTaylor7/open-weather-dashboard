import path from 'node:path';
import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactPlugin(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
       theme_color: "#ffffff", 
      },
    }),
  ],
  base: '/open-weather-dashboard/',
  server: {
    open: true,
    port: Number(process.env.PORT),
  },
  esbuild: {
    // Prevents minification of React Component names,
    // for a better experience with the React Dev Tools browser extension
    // Note: esbuild is for the dev build only, the production build still minifies
    keepNames: true,
  },
  define: {
    OPEN_WEATHER_API_KEY: '"' + process.env.OPEN_WEATHER_API_KEY + '"',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
