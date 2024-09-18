import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// http://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/', // adjust this to your desired base path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
