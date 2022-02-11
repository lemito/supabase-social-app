import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      c: path.resolve(__dirname, './src/components'),
      p: path.resolve(__dirname, './src/pages'),
      h: path.resolve(__dirname, './src/hooks'),
      s: path.resolve(__dirname, './src/supabase'),
      a: path.resolve(__dirname, './src/api'),
      u: path.resolve(__dirname, './src/utils')
    }
  }
})
