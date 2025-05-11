import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@ctx': path.resolve(__dirname, 'src/ctx'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@svg': path.resolve(__dirname, 'src/svg'),
      '@vlc': path.resolve(__dirname, 'src/VLCApi/VLCApi.ts'),
    },
  },
})
