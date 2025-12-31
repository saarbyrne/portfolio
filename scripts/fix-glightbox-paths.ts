import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { resolve } from 'path';

async function fixGlightboxPaths() {
  console.log('🔧 Fixing GLightbox paths in built files...\n');

  // Find all HTML files in dist
  const htmlFiles = await glob('dist/**/*.html');

  let fixedCount = 0;

  for (const file of htmlFiles) {
    let content = readFileSync(file, 'utf-8');
    let modified = false;

    // Fix GLightbox CSS reference
    if (content.includes('../node_modules/glightbox/dist/css/glightbox.min.css')) {
      content = content.replace(
        /<link[^>]*href=["']\.\.\/node_modules\/glightbox\/dist\/css\/glightbox\.min\.css["'][^>]*>/g,
        '<link rel="stylesheet" href="/assets/glightbox.min.css">'
      );
      modified = true;
    } else if (content.includes('<!-- GLightbox CSS -->') && !content.includes('/assets/glightbox.min.css')) {
      // Add GLightbox CSS if comment exists but link is missing
      content = content.replace(
        /(<!-- GLightbox CSS -->)/,
        '$1\n  <link rel="stylesheet" href="/assets/glightbox.min.css">'
      );
      modified = true;
    }

    // Fix GLightbox JS reference
    if (content.includes('../node_modules/glightbox/dist/js/glightbox.min.js')) {
      content = content.replace(
        /<script[^>]*src=["']\.\.\/node_modules\/glightbox\/dist\/js\/glightbox\.min\.js["'][^>]*><\/script>/g,
        '<script src="/assets/glightbox.min.js"></script>'
      );
      modified = true;
    }

    // Fix GLightbox href attributes to match img src
    // Find <a> tags with glightbox class that have href pointing to ../src/assets
    // and an <img> tag inside with src pointing to /assets/
    const lines = content.split('\n');
    const fixedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Check if this line has a glightbox link with ../src/assets href
      if (line.includes('class="glightbox') && line.includes('href="../src/assets/')) {
        // Look ahead for the img tag (might be on same line or next few lines)
        let imgSrc = '';
        for (let j = i; j < Math.min(i + 5, lines.length); j++) {
          const imgMatch = lines[j].match(/src=["'](\/assets\/[^"']+)["']/);
          if (imgMatch) {
            imgSrc = imgMatch[1];
            break;
          }
        }
        
        // Replace the href if we found a matching img src
        if (imgSrc) {
          line = line.replace(/href=["']\.\.\/src\/assets\/[^"']+["']/, `href="${imgSrc}"`);
          modified = true;
        }
      }
      
      fixedLines.push(line);
    }
    
    if (modified) {
      content = fixedLines.join('\n');
    }

    if (modified) {
      writeFileSync(file, content, 'utf-8');
      fixedCount++;
      console.log(`  ✓ Fixed ${file}`);
    }
  }

  console.log(`\n✅ Fixed GLightbox paths in ${fixedCount} files`);
}

fixGlightboxPaths().catch(console.error);
