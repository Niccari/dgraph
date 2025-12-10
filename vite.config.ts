import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

const pwaBaseUrl = process.env.SW_DEV === 'true' ? '.' : './';
const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'production',
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  base: pwaBaseUrl,
  includeAssets: ['favicon.ico'],
  manifest: {
    'short_name': 'dgraph',
    'name': '任意図形描画ツール',
    'icons': [
      {
        'src': 'logo192.png',
        'type': 'image/png',
        'sizes': '192x192'
      },
      {
        'src': 'logo512.png',
        'type': 'image/png',
        'sizes': '512x512'
      }
    ],
    'start_url': pwaBaseUrl,
    'display': 'standalone',
    'theme_color': '#212121',
    'background_color': '#212121'
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    type: 'module',
    navigateFallback: 'index.html',
  },
};

export default defineConfig({
  base: './',
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'status': ['formik', 'jotai'],
          'math': ['math-expression-evaluator'],
          'ui': ['react', 'react-dom/client'],
        },
      },
    },
  },
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-react-compiler'],
    },
  }), VitePWA(pwaOptions)],
});
