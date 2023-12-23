import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const root = resolve(__dirname, 'src')

export default defineConfig({
  plugins: [react(), crx({ manifest, contentScripts: { injectCss: true } }), nodePolyfills()],
  resolve: {
    alias: {
      '@': root
    }
  },
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
})
