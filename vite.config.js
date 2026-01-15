import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb', '**/*.hdr'],
  build: {
    // minify: false,
    // assetsInlineLimit: 0,
    target: ['es2024'],
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
