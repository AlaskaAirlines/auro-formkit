import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

/**
 * Watches the local formkit component dist directories and sends a full
 * page reload when any built file changes. A full reload is required because
 * web components cannot be re-registered in the same Custom Elements Registry.
 */
function watchFormkitPlugin(): Plugin {
  return {
    name: 'watch-formkit',
    configureServer(server) {
      const distDir = resolve(__dirname, '../../components')
      server.watcher.add(`${distDir}/*/dist/**`)
      server.watcher.on('change', (file) => {
        if (file.includes('/components/') && file.includes('/dist/')) {
          server.ws.send({ type: 'full-reload' })
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), watchFormkitPlugin()],
  server: { port: 5181 },
  preview: { port: 5181 },
  optimizeDeps: {
    exclude: ['@aurodesignsystem/auro-formkit']
  }
})
