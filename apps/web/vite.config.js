import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Inside Docker the API is reachable at http://api:4000 (the compose service name).
// Outside Docker it falls back to localhost.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: { usePolling: true }, // needed for live reload through Docker bind mounts on macOS
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
