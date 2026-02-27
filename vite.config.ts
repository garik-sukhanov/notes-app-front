import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-styled-components', { ssr: false, displayName: true, fileName: true }]
        ]
      }
    }), 
    tsconfigPaths(), 
    tailwindcss()
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
});
