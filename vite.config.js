// vite.config.js

import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.hdr'],
  plugins: [splitVendorChunkPlugin()],
  build: {
    // minify: false,
    // assetsInlineLimit: 0,
    target: ['es2022', 'chrome112', 'edge112', 'firefox112', 'safari16.4', 'ios16.4']
  }
});
