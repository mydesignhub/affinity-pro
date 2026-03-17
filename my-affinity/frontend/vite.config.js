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
})