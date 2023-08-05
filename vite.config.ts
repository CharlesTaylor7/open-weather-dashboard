import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/open-weather-dashboard/',
  server: {
    port: process.env.PORT,
  },
  esbuild: {
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
