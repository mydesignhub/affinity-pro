import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the app when you push new code
      includeAssets: ['logo.svg'], // Include your logo
      manifest: {
        name: 'My Affinity Masterclass',
        short_name: 'MyAffinity',
        description: 'Master graphic design from basic to advanced professional levels.',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone', // This hides the browser URL bar!
        orientation: 'portrait',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // Makes it look good on Android
          }
        ]
      }
    })
  ],
})