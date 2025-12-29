import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        rehab: resolve(__dirname, 'case-studies/rehab.html'),
        caseStudyTemplate: resolve(__dirname, 'case-studies/template.html'),
        writingTemplate: resolve(__dirname, 'writing/template.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
