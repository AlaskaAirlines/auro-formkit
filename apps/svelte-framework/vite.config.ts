import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';

/**
 * Watches the local formkit component dist directories and sends a full
 * page reload when any built file changes. A full reload is required because
 * web components cannot be re-registered in the same Custom Elements Registry.
 */
function watchFormkitPlugin(): Plugin {
	return {
		name: 'watch-formkit',
		configureServer(server) {
			const distDir = resolve(__dirname, '../../components');
			server.watcher.add(`${distDir}/*/dist/**`);
			server.watcher.on('change', (file) => {
				if (file.includes('/components/') && file.includes('/dist/')) {
					server.ws.send({ type: 'full-reload' });
				}
			});
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), watchFormkitPlugin()],
	server: { port: 5182 },
	preview: { port: 5182 },
	optimizeDeps: {
		exclude: ['@aurodesignsystem/auro-formkit']
	}
});
