import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/agenda-frontend/',
  server: {
    port: 5173
  }
});
