import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Adjust the chunk size warning limit if needed
    chunkSizeWarningLimit: 1000, // Set to a higher value if necessary

    rollupOptions: {
      output: {
        // Customize manual chunks
        manualChunks: {
          vendor: ['@zegocloud/zego-uikit-prebuilt'], // Add other large dependencies if needed
        },
      },
    },
  },
})
