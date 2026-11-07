import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // em desenvolvimento o Vite repassa /api para o Flask; em produção quem faz isso é o Nginx
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
