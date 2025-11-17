import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    // Важно для доступа из сети
    allowedHosts: ['.localhost', '.local']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  base: '/ab-test-chart/', // for GitHub Pages
  resolve: {
    alias: {
      // Автоматическое разрешение импортов antd
      antd: 'antd/es',
      '@src': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['antd', '@ant-design/icons'],
  },
});
