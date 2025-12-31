import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { glob } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Plugin to prevent Tailwind from processing CSS files in src/assets
const excludeAssetsCSS = (): Plugin => {
  return {
    name: 'exclude-assets-css',
    enforce: 'pre',
    // Intercept CSS file processing before Tailwind sees them
    load(id) {
      if (id.includes('src/assets/') && id.endsWith('.css')) {
        // Return empty string to skip processing
        return '';
      }
      return null;
    },
    transform(code, id) {
      if (id.includes('src/assets/') && id.endsWith('.css')) {
        // Return null to skip transformation
        return null;
      }
      return null;
    },
  };
};

export default defineConfig(async () => {
  // Find all HTML files (excluding templates and dist)
  const htmlFiles = await glob(['**/*.html'], {
    ignore: ['node_modules/**', 'dist/**', 'templates/**'],
  });

  // Create input object from HTML files
  const input: Record<string, string> = {};
  for (const file of htmlFiles) {
    const name = file.replace(/\.html$/, '').replace(/\//g, '-');
    input[name] = resolve(__dirname, file);
  }

  return {
    plugins: [
      excludeAssetsCSS(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: 'templates/*.html',
            dest: 'templates',
          },
          {
            src: 'src/assets/**/*',
            dest: 'assets',
          },
          {
            src: 'node_modules/glightbox/dist/css/glightbox.min.css',
            dest: 'assets',
          },
          {
            src: 'node_modules/glightbox/dist/js/glightbox.min.js',
            dest: 'assets',
          },
        ],
      }),
    ],
    root: '.',
    // Exclude src/assets from file watching and processing
    server: {
      port: 3000,
      open: true,
      watch: {
        ignored: ['**/src/assets/**'],
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input,
      },
    },
  };
});
