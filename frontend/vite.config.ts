import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    checker({ typescript: true })
  ],
  resolve: {
    alias: [
      { find: '@app', replacement: path.resolve(__dirname, 'src/app') },
      { find: '@widgets', replacement: path.resolve(__dirname, 'src/widgets') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/API') }
    ]
  },
  server: {
    open: false,
    port: 3000,
    strictPort: true
  },
  preview: {
    port: 3000 | 8000,
    host: true
  }
})