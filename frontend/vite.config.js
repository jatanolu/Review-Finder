import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
	base: '/static/',
	build: {
		outDir: '../static',
		emptyOutDir:true,
		sourcemap:true,
		chunkSizeWarningLimit: 1600,
	},
})
