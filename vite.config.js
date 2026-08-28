import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

const SINGLE = { single: 'index.html', 'single-docs': 'docs.html' }

export default defineConfig(({ mode }) => {
  const page = SINGLE[mode]
  return {
    plugins: page ? [react(), viteSingleFile()] : [react()],
    build: {
      outDir: page ? `dist-${mode}` : 'dist',
      rollupOptions: { input: page ? { app: page } : { index: 'index.html', docs: 'docs.html' } },
    },
  }
})
