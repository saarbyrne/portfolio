import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Import posts data
const postsData = await readFile('./data/posts.json', 'utf-8');
const posts = JSON.parse(postsData);

// Import image mapping
let imageMap: Record<string, { wordpress: string[], local: string[] }> = {};
try {
  const imageMapData = await readFile('./data/blog-image-map.json', 'utf-8');
  imageMap = JSON.parse(imageMapData);
} catch (error) {
  console.log('⚠️  No image map found, using WordPress CDN images');
}

// Only the 10 posts with custom intro blurbs
const SELECTED_POSTS = [
  {
    oldSlug: 'design-of-democracy',
    newSlug: 'design-democracy',
    introBlurb: 'As part of the Critical Design Philosophies course I recently did at the end of 2024, I spent some time looking at Democracy. I have wanted to give more time and space to things bigger than just software and design, to go back to what I have always loved, politics, justice, philosophy and democracy. To…'
  },
  {
    oldSlug: 'ai-maths-helper',
    newSlug: 'ai-maths-helper',
    introBlurb: 'GitHub: [coming soon]AI Co‑pilot: ChatGPT Why We Built It A friend of mine teaches maths for the Leaving Cert in Ireland. We were chatting about how students often revise on their own, stuck on a topic, without a way to get help beyond the textbook or YouTube. I had some time and curiosity, and he…'
  },
  {
    oldSlug: 'slug-translate-weekend-hack',
    newSlug: 'slug-translate',
    introBlurb: 'GitHub: https://github.com/saarbyrne/slugtranslateAI Co‑pilot: Guided by ChatGPT Why I Built It Late one Friday I was hopping between English and Spanish tabs—copy‑pasting to Google Translate felt tedious. I sketched a quick idea: highlight text, click a "T," see a translation right there. With almost zero prior extension experience, I teamed up with ChatGPT to fill in…'
  },
  {
    oldSlug: 'design-manger-resources',
    newSlug: 'design-resources',
    introBlurb: 'This is a mishmash of stuff I have used and actually found useful. Hopefully it helps. Team and Staff I look to hire product designers. These designers have a strong knowledge of user research techniques, interaction design and visual design. Due to the approach being collaborative I see facilitation techniques as also being an ideal…'
  },
  {
    oldSlug: 'design-strategy',
    newSlug: 'design-strategy',
    introBlurb: "This is the design strategy I use for Kitman Labs after we downsized the team based on a need for the company to mature and to start turning a net profit. It's based on Roger L Martins book Playing to Win. The framework is summarised here: Playing to Win: How Strategy Really Works. I use…"
  },
  {
    oldSlug: 'design-moats',
    newSlug: 'design-moats',
    introBlurb: 'What are they? Design moats are things that reinforce the design teams position and competitive advantage. They are things that create value for the business and drive its competitive advantage. These may be larger or smaller in size and impact, they may be internal production processes or external value adds for customers and users. Inevitably…'
  },
  {
    oldSlug: 'the-business-as-a-vessel',
    newSlug: 'business-vessel',
    introBlurb: 'The aim of this is piece is for me to describe my thinking on business as an entity in the world, why I see it as a vessel, and the implications of that. Concept I see the concept of a business as a vessel for an aim. I see a service or product as a…'
  },
  {
    oldSlug: 'my-design-philosophy-wip-forever',
    newSlug: 'design-philosophy',
    introBlurb: 'The aim of this document is to capture my thoughts on design.  I want to understand:  To do this I am going to: Crude philosophical foundation To ground my thinking, I want to quickly outline, very crudely, my philosophical foundation. There are multiple accounts of differing definitions of Philosophy from all types of philosophers. The 2…'
  },
  {
    oldSlug: 'value-of-design',
    newSlug: 'value-of-design',
    introBlurb: "Design needs to advocate. I make the assumption, based on experience, that people still dont understand product / UX design. In making this assumption I need to then set an expectation on myself, to justify design. This feels horrible. But it is necessary for job security, not just my job, but my teams. Below is…"
  },
  {
    oldSlug: 'leading-a-design-team-in-the-software-industry',
    newSlug: 'leading-design-team',
    introBlurb: "My journey as a designer has been shaped by a variety of experiences, from working with top sports teams at Kitman Labs to developing healthcare products at IBM. Over the years, I've come to understand that leading a design team in the software industry is not just about managing work—it's about cultivating a culture of…"
  }
];

// Utility Functions

function convertWordPressContent(wpContent: string[], slug: string): string {
  let html = wpContent.join('\n');

  // Remove WP block comments
  html = html.replace(/<!-- \/wp:.*?-->\n?/g, '');
  html = html.replace(/<!-- wp:.*?-->\n?/g, '');

  // Replace WordPress CDN images with local images if available
  if (imageMap[slug] && imageMap[slug].wordpress.length > 0) {
    for (let i = 0; i < imageMap[slug].wordpress.length; i++) {
      const wpUrl = imageMap[slug].wordpress[i];
      const localUrl = imageMap[slug].local[i];
      if (localUrl) {
        html = html.replace(wpUrl, localUrl);
      }
    }
  }

  // Apply Tailwind classes to paragraphs
  html = html.replace(/<p>/g, '<p class="text-body-lg text-gray-800">');

  // Style lists
  html = html.replace(/<ul class="wp-block-list">/g,
    '<ul class="list-disc list-outside space-y-3 ps-5 text-body-lg text-gray-800">');
  html = html.replace(/<ul>/g,
    '<ul class="list-disc list-outside space-y-3 ps-5 text-body-lg text-gray-800">');
  html = html.replace(/<ol.*?>/g,
    '<ol class="list-decimal list-outside space-y-3 ps-5 text-body-lg text-gray-800">');

  // Style blockquotes
  html = html.replace(/<blockquote.*?>/g,
    '<blockquote class="text-center p-4 sm:px-7"><p class="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal">');
  html = html.replace(/<\/blockquote>/g, '</p></blockquote>');

  // Clean up images - add proper classes and wrap in figure
  html = html.replace(/<figure class="wp-block-image.*?">/g, '<figure>');
  html = html.replace(/<figure class="">/g, '<figure>');
  html = html.replace(/<img /g, '<img class="w-full object-cover rounded-xl" ');

  // Add figcaption styling if present
  html = html.replace(/<figcaption>/g, '<figcaption class="mt-4 text-sm text-center text-gray-500">');

  // Clean up any remaining wp-block classes
  html = html.replace(/class="wp-block-heading"/g, '');

  // Add styling to h4 elements if they don't have classes
  html = html.replace(/<h4 class="">/g, '<h4>');

  return html;
}

function extractFirstImage(content: string[], slug: string): string | null {
  // Check if we have local images for this post
  if (imageMap[slug] && imageMap[slug].local.length > 0) {
    return imageMap[slug].local[0];
  }

  // Fallback to extracting from content (WordPress CDN)
  const fullContent = content.join('\n');
  const imgMatch = fullContent.match(/<img.*?src="(.*?)".*?>/);
  return imgMatch ? imgMatch[1] : null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatDatetime(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function generatePostPage(post: any, template: string): string {
  const convertedContent = convertWordPressContent(post.content, post.newSlug);
  const formattedDate = formatDate(post.publishDate);
  const datetimeAttr = formatDatetime(post.publishDate);

  // Combine categories and tags
  const allTags = [...new Set([...post.categories, ...post.tags])];

  // Generate tag HTML (non-clickable, white background with border - matching case study style)
  const tagsHtml = allTags.map(tag =>
    `<span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">
              ${tag}
            </span>`
  ).join('\n            ');

  let html = template;

  // Replace placeholders
  html = html.replace(/\[Article Title\]/g, post.title);
  html = html.replace(/<title>.*?<\/title>/, `<title>${post.title} – Saar Byrne</title>`);
  html = html.replace(/\[Article description for SEO\]/g, post.title);

  // Remove subtitle/lead paragraph section entirely if not needed
  html = html.replace(/<p class="text-body-lg text-gray-800">\s*\[Article subtitle.*?\]\s*<\/p>/s, '');

  // Add tags to the top (after the title, in the header section)
  html = html.replace(/(<\/h1>\s*)/s,
    `$1\n            <div class="mt-4 flex flex-wrap gap-2">
            ${tagsHtml}
          </div>\n`);

  // Replace date
  html = html.replace(/\[Date Published\]/g, formattedDate);
  html = html.replace(/<time datetime=".*?">/g, `<time datetime="${datetimeAttr}">`);

  // Replace featured image section with nothing (most posts don't have featured images)
  html = html.replace(/<!-- Featured Image -->.*?<!-- End Featured Image -->/s, '');

  // Fix CSS path for subdirectory (change from relative to root-relative)
  html = html.replace('href="../src/style.css"', 'href="/src/style.css"');

  // Replace article content
  html = html.replace(/<!-- Article Content -->.*?<!-- End Article Content -->/s,
    `<!-- Article Content -->
        <div class="space-y-6 md:space-y-8 mt-8">
          ${convertedContent}
        </div>
        <!-- End Article Content -->`);

  // Remove tags section at the bottom (we moved them to the top)
  html = html.replace(/<!-- Tags -->.*?<!-- End Tags -->\s*/s, '');

  // Remove share section
  html = html.replace(/<!-- Share -->.*?<!-- End Share -->\s*/s, '');

  // Update navigation - remove "Next article" for now (can add later)
  html = html.replace(/<a class="group inline-flex items-center gap-x-2 text-sm font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600" href="\/writing\/\[next-article\]\.html">.*?Next: \[Next Article Title\].*?<\/a>/s,
    '<span class="text-sm text-gray-500">More articles coming soon</span>');

  return html;
}

function generateBlogIndex(selectedPosts: any[]): string {
  const cardsHtml = selectedPosts.map(post => {
    const firstImage = extractFirstImage(post.content, post.newSlug);
    const formattedDate = formatDate(post.publishDate);
    const datetimeAttr = formatDatetime(post.publishDate);
    const primaryCategory = post.categories[0] || 'Article';

    // Image section - use first image from content or fallback to icon
    const imageHtml = firstImage
      ? `<img class="w-full h-full absolute top-0 start-0 object-cover rounded-2xl" src="${firstImage}" alt="${post.title}">`
      : `<div class="w-full h-full absolute top-0 start-0 flex items-center justify-center bg-gray-100 rounded-2xl">
          <i class="ph ph-article text-4xl text-gray-400"></i>
        </div>`;

    return `        <!-- Card: ${post.title} -->
        <a class="group sm:flex focus:outline-none" href="/writing/${post.newSlug}.html">
          <div class="shrink-0 relative rounded-2xl overflow-hidden w-full sm:w-56 h-44">
            ${imageHtml}
          </div>

          <div class="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
              ${post.title}
            </h3>
            <p class="mt-4 text-gray-600">
              ${post.introBlurb}
            </p>
            <p class="mt-4 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium">
              Read more
              <i class="ph ph-arrow-right shrink-0 size-4"></i>
            </p>
          </div>
        </a>
        <!-- End Card -->
`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Writing – Saar Byrne</title>
  <meta name="description" content="Thoughts on design management, product development, and building software for sports teams.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <!-- Styles -->
  <link rel="stylesheet" href="/src/style.css">
  <!-- Layout loader -->
  <script type="module" src="/src/layout.js"></script>
</head>
<body class="bg-white">

  <!-- ========== HEADER ========== -->
  <div id="site-header"></div>
  <!-- ========== END HEADER ========== -->

  <main id="content">
    <!-- ========== HERO SECTION ========== -->
    <div class="bg-gray-50">
      <div class="max-w-2xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
        <h1>
          <span class="text-blue-600">Writing</span>
        </h1>
        <div class="max-w-2xl mx-auto">
          <p class="text-body-lg mt-6 mb-6">
            Thoughts on design management, product development, and building software for sports teams. A mix of opinion pieces, experiments, and lessons learned.
          </p>
        </div>
      </div>
    </div>
    <!-- ========== END HERO SECTION ========== -->

    <!-- ========== ARTICLES GRID ========== -->
    <div class="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto">
      <!-- Grid -->
      <div class="py-12 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
${cardsHtml}
      </div>
    </div>
    <!-- ========== END ARTICLES GRID ========== -->
  </main>

  <!-- ========== FOOTER ========== -->
  <div id="site-footer"></div>
  <!-- ========== END FOOTER ========== -->

  <!-- Preline JS -->
  <script src="https://cdn.jsdelivr.net/npm/preline@2.7.0/dist/preline.min.js"></script>
</body>
</html>
`;
}

// Main generation function
async function generateBlog() {
  console.log('📝 Starting blog generation...\n');

  // Load template
  const template = await readFile('./writing/template.html', 'utf-8');

  // Filter to only selected posts and map to new slugs
  const selectedPosts = SELECTED_POSTS.map(config => {
    const post = posts.find((p: any) => p.slug === config.oldSlug);
    if (!post) {
      console.warn(`⚠️  Warning: Could not find post with slug "${config.oldSlug}"`);
      return null;
    }
    return { ...post, newSlug: config.newSlug, introBlurb: config.introBlurb };
  }).filter(Boolean);

  console.log(`✅ Found ${selectedPosts.length} posts to generate\n`);

  // Sort by date (newest first)
  selectedPosts.sort((a: any, b: any) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  // Generate individual post pages with new slugs
  console.log('📄 Generating individual blog posts...');
  for (const post of selectedPosts) {
    const html = generatePostPage(post, template);
    await writeFile(`./writing/${post.newSlug}.html`, html);
    console.log(`   ✓ Created /writing/${post.newSlug}.html`);
  }

  // Generate blog homepage
  console.log('\n🏠 Generating blog homepage...');
  const indexHtml = generateBlogIndex(selectedPosts);
  await writeFile('./writing/index.html', indexHtml);
  console.log('   ✓ Created /writing/index.html');

  console.log(`\n✨ Blog generation complete!`);
  console.log(`\n📊 Summary:`);
  console.log(`   - ${selectedPosts.length} blog posts created`);
  console.log(`   - 1 blog homepage created`);
  console.log(`\n🌐 Visit http://localhost:3000/writing/ to view your blog!`);
}

// Run the generator
generateBlog().catch(console.error);
