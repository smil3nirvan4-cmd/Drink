import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy para InfinitePay API - contorna CORS em desenvolvimento
      '/api/infinitepay': {
        target: 'https://api.infinitepay.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/infinitepay/, ''),
        secure: true,
      }
    }
  }
})
