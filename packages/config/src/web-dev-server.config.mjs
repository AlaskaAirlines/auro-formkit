import { hmrPlugin } from '@web/dev-server-hmr';

export default {
  rootDir: './demo',
  middleware: [
    function rewriteIndex(context, next) {
      if (context.url === '/' || context.url === '/index.html') {
        context.url = '/index.html';
      }
      if (!context.url.endsWith('/') && !context.url.includes('.')) {
        context.url += '.html';
      }
      return next();
    },
  ],
  plugins: [
    hmrPlugin({
      files: [
        "src/**/*",
        "demo/**/*",
        "apiExamples/**/*",
        "docs/**/*"
      ]
    })
  ],
  nodeResolve: true,
  watch: true
};
