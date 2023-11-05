// vite.config.js

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr'],
  build: {
    // minify: false,
    // assetsInlineLimit: 0,
    target: ['es2022', 'chrome112', 'edge112', 'firefox112', 'safari16.4', 'ios16.4'],
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // dependency size observability
        manualChunks: (id) => {
          // create chunk for three example deps.
          if (id.includes('node_modules/three/examples')) {
            return 'three-examples';
          }
          // create chunk for three core deps.
          if (id.includes('node_modules/three') || id.includes('@three')) {
            return 'three';
          }
        }
      }
    }
  }
});
