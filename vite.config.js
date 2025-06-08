import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5174,
    strictPort: false,
    open: true
  },
  preview: {
    port: 5174,
    strictPort: false,
    open: true
  },
  base: '/'
})
