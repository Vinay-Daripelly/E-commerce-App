// modern-shop-frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Requests to /api/* will be forwarded to http://localhost:5000/api/*
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});