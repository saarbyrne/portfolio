import { readFile, writeFile } from 'node:fs/promises';

// Load existing image map
const imageMapData = await readFile('./data/blog-image-map.json', 'utf-8');
const imageMap = JSON.parse(imageMapData);

// Posts without images that need them
const postsNeedingImages = [
  'ai-maths-helper',
  'design-strategy',
  'design-moats',
  'business-vessel',
  'design-philosophy',
  'leading-design-team'
];

// Available images in /src/assets/2024/08
const availableImages = [
  '/src/assets/2024/08/Frame-1@2x.png',
  '/src/assets/2024/08/Frame-2@2x.png',
  '/src/assets/2024/08/Frame-3@2x.png',
  '/src/assets/2024/08/Frame-4@2x.png',
  '/src/assets/2024/08/Frame-5@2x.png',
  '/src/assets/2024/08/DALL·E-2024-08-11-08.00.56-Create-a-minimalistic-abstract-image-in-the-Bauhaus-style-with-the-theme-of-social-environment.-Use-a-simple-palette-of-primary-colors-red-blue-yel.webp'
];

console.log('🖼️  Assigning existing images to posts without images...\n');

// Assign images to posts
for (let i = 0; i < postsNeedingImages.length; i++) {
  const slug = postsNeedingImages[i];
  const imagePath = availableImages[i];

  if (!imageMap[slug]) {
    imageMap[slug] = { wordpress: [], local: [] };
  }

  // Add the image to the local array
  imageMap[slug].local.push(imagePath);

  console.log(`✓ Assigned ${imagePath.split('/').pop()} to ${slug}`);
}

// Save updated image map
await writeFile('./data/blog-image-map.json', JSON.stringify(imageMap, null, 2));

console.log('\n✅ Updated image map saved!');
console.log('\n📊 Summary:');
console.log(`   - Total posts with images: ${Object.values(imageMap).filter((m: any) => m.local.length > 0).length}/10`);
console.log('\nRun `bun run scripts/generate-blog.ts` to regenerate the blog with these images.');
