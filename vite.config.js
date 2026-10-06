import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/overwebs-background.js',
      formats: ['es'],
      fileName: () => 'overwebs-background.js'
    },
    rollupOptions: {
      // Keep gluonjs as a peer import for consumers
      external: [/^gluonjs(\/.*)?$/]
    }
  }
});
