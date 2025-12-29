#!/usr/bin/env node

import { readFile, mkdir, writeFile } from 'fs/promises';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseStringPromise = promisify(parseString);

async function parseWordPressXML(filePath) {
  const xmlContent = await readFile(filePath, 'utf-8');

  const result = await parseStringPromise(xmlContent, {
    explicitArray: false,
    mergeAttrs: true,
    tagNameProcessors: [(name) => name.replace('wp:', '').replace('content:', '').replace('excerpt:', '').replace('dc:', '')],
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
  const categories = categoriesRaw.map((cat) => ({
    id: parseInt(cat.term_id) || 0,
    name: cat.cat_name || '',
    slug: cat.category_nicename || '',
    description: cat.category_description || '',
  }));

  // Extract tags
  const tagsRaw = Array.isArray(channel.tag) ? channel.tag : [channel.tag].filter(Boolean);
  const tags = tagsRaw.map((tag) => ({
    id: parseInt(tag.term_id) || 0,
    name: tag.tag_name || '',
    slug: tag.tag_slug || '',
  }));

  // Extract items (posts, pages, media)
  const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean);

  const posts = [];
  const pages = [];
  const media = [];

  for (const item of items) {
    const postType = item.post_type || 'post';
    const status = item.status || 'publish';

    // Handle media/attachments
    if (postType === 'attachment') {
      let folder = '';
      if (item.category) {
        const cats = Array.isArray(item.category) ? item.category : [item.category];
        const mediaFolder = cats.find(c => c.domain === 'media_folder');
        if (mediaFolder) {
          folder = mediaFolder._ || mediaFolder;
        }
      }

      const mediaItem = {
        id: parseInt(item.post_id) || 0,
        title: item.title || '',
        url: item.attachment_url || '',
        filename: item.post_name || '',
        uploadDate: item.post_date || '',
        type: 'image',
        folder: folder,
      };
      media.push(mediaItem);
      continue;
    }

    // Skip nav menu items
    if (postType === 'nav_menu_item') {
      continue;
    }

    // Extract categories and tags
    const categoriesArr = [];
    const tagsArr = [];

    if (item.category) {
      const cats = Array.isArray(item.category) ? item.category : [item.category];
      cats.forEach((cat) => {
        if (cat.domain === 'category') {
          categoriesArr.push(cat._ || cat);
        } else if (cat.domain === 'post_tag') {
          tagsArr.push(cat._ || cat);
        }
      });
    }

    // Extract custom fields
    const customFields = {};
    if (item.postmeta) {
      const metas = Array.isArray(item.postmeta) ? item.postmeta : [item.postmeta];
      metas.forEach((meta) => {
        const key = meta.meta_key;
        const value = meta.meta_value;
        if (key && !key.startsWith('_')) {
          customFields[key] = value;
        }
      });
    }

    const postData = {
      id: parseInt(item.post_id) || 0,
      title: item.title || '',
      slug: item.post_name || '',
      content: item.encoded || '',
      excerpt: item.excerpt?.encoded || item.excerpt || '',
      publishDate: item.post_date || '',
      modifiedDate: item.post_modified || '',
      author: item.creator || '',
      categories: categoriesArr,
      tags: tagsArr,
      type: postType,
      status: status,
      ...(Object.keys(customFields).length > 0 && { customFields }),
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

try {
  const data = await parseWordPressXML(inputFile);

  // Create output directory
  await mkdir(outputDir, { recursive: true });

  // Write separate JSON files
  await writeFile(`${outputDir}/site-info.json`, JSON.stringify(data.siteInfo, null, 2));
  await writeFile(`${outputDir}/categories.json`, JSON.stringify(data.categories, null, 2));
  await writeFile(`${outputDir}/tags.json`, JSON.stringify(data.tags, null, 2));
  await writeFile(`${outputDir}/posts.json`, JSON.stringify(data.posts, null, 2));
  await writeFile(`${outputDir}/pages.json`, JSON.stringify(data.pages, null, 2));
  await writeFile(`${outputDir}/media.json`, JSON.stringify(data.media, null, 2));

  // Write combined file
  await writeFile(`${outputDir}/portfolio-data.json`, JSON.stringify(data, null, 2));

  console.log('\n✅ WordPress data parsed successfully!');
  console.log(`\nGenerated files in ${outputDir}/:`);
  console.log(`  - site-info.json (site metadata)`);
  console.log(`  - categories.json (${data.categories.length} categories)`);
  console.log(`  - tags.json (${data.tags.length} tags)`);
  console.log(`  - posts.json (${data.posts.length} published posts)`);
  console.log(`  - pages.json (${data.pages.length} published pages)`);
  console.log(`  - media.json (${data.media.length} media files)`);
  console.log(`  - portfolio-data.json (complete dataset)`);
} catch (error) {
  console.error('Error parsing WordPress XML:', error);
  process.exit(1);
}
