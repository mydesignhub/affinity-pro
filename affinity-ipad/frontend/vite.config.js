import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg'],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: 'Affinity iPad Masterclass',
        short_name: 'Affinity iPad',
        description: 'Master graphic design from basic to advanced professional levels.',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone', // This hides the browser URL bar!
        orientation: 'any', // 🌟 THE FIX: Changed from 'portrait' to allow free rotation on Android
        icons: [
          // 🌟 THE SECRET: Tells Android to use your SVG and allows it to be cut into the system container shape!
          {
            src: '/logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable' 
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore'],
          icons: ['lucide-react']
        }
      }
    }
  }
})