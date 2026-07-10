import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // User site served at the domain root (inveteratecoder.github.io).
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The heavy WebGL stack (three/fiber/drei) is code-split automatically
    // via the React.lazy() import of the project gallery, so it stays off the
    // hero critical path without manual chunking.
    target: 'es2022',
  },
})
