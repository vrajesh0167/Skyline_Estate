import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        // target: "http://localhost:4000",
        target: "https://skyline-estate-nnr8.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
