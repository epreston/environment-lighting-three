// vite.config.js

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /** @type {import('vite').UserConfig} */
  return {
    // config options
    assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.m4a', '**/*.hdr'],
    plugins: [glsl({ compress: mode === 'production' ? true : false }), splitVendorChunkPlugin()],
    build: {
      // minify: false,
      // assetsInlineLimit: 0,
      target: ['es2022', 'chrome112', 'edge112', 'firefox112', 'safari16.4', 'ios16.4']
    }
  };
});
