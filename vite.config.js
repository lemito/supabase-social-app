import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const _dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(_dirname, './src'),
      c: resolve(_dirname, './src/components'),
      p: resolve(_dirname, './src/pages'),
      h: resolve(_dirname, './src/hooks'),
      s: resolve(_dirname, './src/supabase'),
      a: resolve(_dirname, './src/api'),
      u: resolve(_dirname, './src/utils')
    }
  }
})
