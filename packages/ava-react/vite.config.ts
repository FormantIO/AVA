import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/demo',
  build: {
    outDir: '../../dist/demo',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@formant/ava-react': path.resolve(__dirname, './src'),
    },
  },
}); 