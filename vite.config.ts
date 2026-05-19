import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only: forward D-ID API to avoid browser CORS while using VITE_DID_API_KEY from the client bundle.
      '/did-api': {
        target: 'https://api.d-id.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/did-api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
