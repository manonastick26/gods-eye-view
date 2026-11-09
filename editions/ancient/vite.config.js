import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import {
  hostCheckPlugin,
  loopbackBindPlugin,
} from '../../build/allowedHosts.js';

const root = fileURLToPath(new URL('.', import.meta.url));

// Cesium's widgets use Knockout's eval, its decoders compile WASM, and the
// production build boots workers with importScripts(blob:). Those three
// exceptions stay on script-src. Imagery is limited to the Esri host.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.arcgisonline.com",
  "connect-src 'self' blob: data: https://*.arcgisonline.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join('; ');

const headers = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
};

export default defineConfig({
  root,
  plugins: [hostCheckPlugin(), loopbackBindPlugin(), cesium()],
  server: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: true,
    headers,
    allowedHosts: ['localhost', '127.0.0.1'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: true,
    headers,
    allowedHosts: ['localhost', '127.0.0.1'],
  },
});
