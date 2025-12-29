import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

// Import posts data
const postsData = await readFile('./data/posts.json', 'utf-8');
const posts = JSON.parse(postsData);

// Only the 10 posts with custom intro blurbs
const SELECTED_POSTS = [
  { oldSlug: 'design-of-democracy', newSlug: 'design-democracy' },
  { oldSlug: 'ai-maths-helper', newSlug: 'ai-maths-helper' },
  { oldSlug: 'slug-translate-weekend-hack', newSlug: 'slug-translate' },
  { oldSlug: 'design-manger-resources', newSlug: 'design-resources' },
  { oldSlug: 'design-strategy', newSlug: 'design-strategy' },
  { oldSlug: 'design-moats', newSlug: 'design-moats' },
  { oldSlug: 'the-business-as-a-vessel', newSlug: 'business-vessel' },
  { oldSlug: 'my-design-philosophy-wip-forever', newSlug: 'design-philosophy' },
  { oldSlug: 'value-of-design', newSlug: 'value-of-design' },
  { oldSlug: 'leading-a-design-team-in-the-software-industry', newSlug: 'leading-design-team' }
];

function extractImages(content: string[]): string[] {
  const fullContent = content.join('\n');
  const imgMatches = fullContent.matchAll(/<img.*?src="(.*?)".*?>/g);
  return Array.from(imgMatches, match => match[1]);
}

async function downloadImage(url: string, slug: string, index: number): Promise<string | null> {
  try {
    console.log(`   Downloading: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`   ⚠️  Failed to download (${response.status})`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get file extension from URL
    const ext = url.split('.').pop()?.split('?')[0] || 'jpg';
    const filename = `${slug}-${index}.${ext}`;
    const localPath = join('./src/assets/blog', filename);

    await writeFile(localPath, buffer);
    console.log(`   ✓ Saved to: /src/assets/blog/${filename}`);
    return `/src/assets/blog/${filename}`;
  } catch (error) {
    console.log(`   ⚠️  Error downloading: ${error}`);
    return null;
  }
}

async function analyzeAndDownload() {
  console.log('📸 Analyzing blog post images...\n');

  // Create assets/blog directory if it doesn't exist
  if (!existsSync('./src/assets/blog')) {
    await mkdir('./src/assets/blog', { recursive: true });
    console.log('✓ Created /src/assets/blog/ directory\n');
  }

  // Filter to only selected posts
  const selectedPosts = SELECTED_POSTS.map(config => {
    const post = posts.find((p: any) => p.slug === config.oldSlug);
    if (!post) return null;
    return { ...post, newSlug: config.newSlug };
  }).filter(Boolean);

  const imageMap: Record<string, { wordpress: string[], local: string[] }> = {};

  for (const post of selectedPosts) {
    const images = extractImages(post.content);
    console.log(`📝 ${post.title} (${post.newSlug})`);

    if (images.length === 0) {
      console.log('   ❌ No images found\n');
      imageMap[post.newSlug] = { wordpress: [], local: [] };
      continue;
    }

    console.log(`   Found ${images.length} image(s)`);
    const localPaths: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const localPath = await downloadImage(images[i], post.newSlug, i + 1);
      if (localPath) {
        localPaths.push(localPath);
      }
    }

    imageMap[post.newSlug] = {
      wordpress: images,
      local: localPaths
    };
    console.log('');
  }

  // Save the image mapping
  await writeFile('./data/blog-image-map.json', JSON.stringify(imageMap, null, 2));
  console.log('✓ Saved image mapping to /data/blog-image-map.json\n');

  // Generate summary
  console.log('📊 Summary:');
  const postsWithImages = Object.values(imageMap).filter(m => m.wordpress.length > 0).length;
  const postsWithoutImages = 10 - postsWithImages;
  const totalImages = Object.values(imageMap).reduce((sum, m) => sum + m.local.length, 0);

  console.log(`   - Posts with images: ${postsWithImages}/10`);
  console.log(`   - Posts without images: ${postsWithoutImages}/10`);
  console.log(`   - Total images downloaded: ${totalImages}`);

  console.log('\n📋 Posts without images:');
  for (const [slug, data] of Object.entries(imageMap)) {
    if (data.wordpress.length === 0) {
      const post = selectedPosts.find(p => p.newSlug === slug);
      console.log(`   - ${post?.title} (${slug})`);
    }
  }
}

analyzeAndDownload().catch(console.error);
