#!/usr/bin/env bun

import { parseStringPromise } from 'xml2js';

interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishDate: string;
  modifiedDate: string;
  author: string;
  categories: string[];
  tags: string[];
  type: 'post' | 'page' | 'attachment' | 'nav_menu_item';
  status: string;
  featuredImage?: string;
  customFields?: Record<string, any>;
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

interface WordPressMedia {
  id: number;
  title: string;
  url: string;
  filename: string;
  uploadDate: string;
  type: string;
  folder?: string;
}

interface ParsedData {
  siteInfo: {
    title: string;
    url: string;
    description: string;
    language: string;
  };
  categories: WordPressCategory[];
  tags: WordPressTag[];
  posts: WordPressPost[];
  pages: WordPressPost[];
  media: WordPressMedia[];
}

async function parseWordPressXML(filePath: string): Promise<ParsedData> {
  const file = Bun.file(filePath);
  const xmlContent = await file.text();

  const result = await parseStringPromise(xmlContent, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [(name) => name.replace('wp:', '').replace('content:', '').replace('excerpt:', '')],
  });

  const channel = result.rss.channel;

  // Extract site info
  const siteInfo = {
    title: channel.title || '',
    url: channel.link || '',
    description: channel.description || '',
    language: channel.language || 'en-US',
  };

  // Extract categories
  const categoriesRaw = Array.isArray(channel.category) ? channel.category : [channel.category].filter(Boolean);
  const categories: WordPressCategory[] = categoriesRaw.map((cat: any) => ({
    id: parseInt(cat.term_id) || 0,
    name: cat.cat_name || '',
    slug: cat.category_nicename || '',
    description: cat.category_description || '',
  }));

  // Extract tags
  const tagsRaw = Array.isArray(channel.tag) ? channel.tag : [channel.tag].filter(Boolean);
  const tags: WordPressTag[] = tagsRaw.map((tag: any) => ({
    id: parseInt(tag.term_id) || 0,
    name: tag.tag_name || '',
    slug: tag.tag_slug || '',
  }));

  // Extract items (posts, pages, media)
  const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean);

  const posts: WordPressPost[] = [];
  const pages: WordPressPost[] = [];
  const media: WordPressMedia[] = [];

  for (const item of items) {
    const postType = item.post_type || 'post';
    const status = item.status || 'publish';

    // Handle media/attachments
    if (postType === 'attachment') {
      const mediaItem: WordPressMedia = {
        id: parseInt(item.post_id) || 0,
        title: item.title || '',
        url: item.attachment_url || '',
        filename: item.post_name || '',
        uploadDate: item.post_date || '',
        type: 'image', // Could be determined from file extension
        folder: Array.isArray(item.category)
          ? item.category[0]?._ || item.category[0]
          : item.category?._ || item.category || '',
      };
      media.push(mediaItem);
      continue;
    }

    // Skip nav menu items
    if (postType === 'nav_menu_item') {
      continue;
    }

    // Extract categories and tags
    const categoriesArr: string[] = [];
    const tagsArr: string[] = [];

    if (item.category) {
      const cats = Array.isArray(item.category) ? item.category : [item.category];
      cats.forEach((cat: any) => {
        if (cat.domain === 'category') {
          categoriesArr.push(cat._ || cat);
        } else if (cat.domain === 'post_tag') {
          tagsArr.push(cat._ || cat);
        }
      });
    }

    // Extract custom fields
    const customFields: Record<string, any> = {};
    if (item.postmeta) {
      const metas = Array.isArray(item.postmeta) ? item.postmeta : [item.postmeta];
      metas.forEach((meta: any) => {
        const key = meta.meta_key;
        const value = meta.meta_value;
        if (key && !key.startsWith('_')) { // Skip internal WordPress fields
          customFields[key] = value;
        }
      });
    }

    const postData: WordPressPost = {
      id: parseInt(item.post_id) || 0,
      title: item.title || '',
      slug: item.post_name || '',
      content: item.encoded || '',
      excerpt: item.excerpt?.encoded || '',
      publishDate: item.post_date || '',
      modifiedDate: item.post_modified || '',
      author: item['dc:creator'] || item.creator || '',
      categories: categoriesArr,
      tags: tagsArr,
      type: postType as any,
      status: status,
      customFields: Object.keys(customFields).length > 0 ? customFields : undefined,
    };

    if (postType === 'page') {
      pages.push(postData);
    } else if (postType === 'post') {
      posts.push(postData);
    }
  }

  return {
    siteInfo,
    categories,
    tags,
    posts: posts.filter(p => p.status === 'publish'),
    pages: pages.filter(p => p.status === 'publish'),
    media,
  };
}

// Main execution
const inputFile = process.argv[2] || './saarbyrne.WordPress.2025-12-21.xml';
const outputDir = './data';

console.log('Parsing WordPress XML export...');

const data = await parseWordPressXML(inputFile);

// Create output directory
await Bun.$`mkdir -p ${outputDir}`;

// Write separate JSON files
await Bun.write(`${outputDir}/site-info.json`, JSON.stringify(data.siteInfo, null, 2));
await Bun.write(`${outputDir}/categories.json`, JSON.stringify(data.categories, null, 2));
await Bun.write(`${outputDir}/tags.json`, JSON.stringify(data.tags, null, 2));
await Bun.write(`${outputDir}/posts.json`, JSON.stringify(data.posts, null, 2));
await Bun.write(`${outputDir}/pages.json`, JSON.stringify(data.pages, null, 2));
await Bun.write(`${outputDir}/media.json`, JSON.stringify(data.media, null, 2));

// Write combined file
await Bun.write(`${outputDir}/portfolio-data.json`, JSON.stringify(data, null, 2));

console.log('\n✅ WordPress data parsed successfully!');
console.log(`\nGenerated files in ${outputDir}/:`);
console.log(`  - site-info.json (site metadata)`);
console.log(`  - categories.json (${data.categories.length} categories)`);
console.log(`  - tags.json (${data.tags.length} tags)`);
console.log(`  - posts.json (${data.posts.length} published posts)`);
console.log(`  - pages.json (${data.pages.length} published pages)`);
console.log(`  - media.json (${data.media.length} media files)`);
console.log(`  - portfolio-data.json (complete dataset)`);
