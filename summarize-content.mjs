#!/usr/bin/env node

import { readFile } from 'fs/promises';

const posts = JSON.parse(await readFile('./data/posts.json', 'utf-8'));
const pages = JSON.parse(await readFile('./data/pages.json', 'utf-8'));
const categories = JSON.parse(await readFile('./data/categories.json', 'utf-8'));
const tags = JSON.parse(await readFile('./data/tags.json', 'utf-8'));

console.log('\n📊 WORDPRESS CONTENT SUMMARY\n');
console.log('═'.repeat(80));

console.log('\n📝 BLOG POSTS (' + posts.length + ' total)\n');
posts.forEach((post, i) => {
  console.log(`${i + 1}. "${post.title}"`);
  console.log(`   Slug: ${post.slug}`);
  console.log(`   Published: ${post.publishDate.split(' ')[0]}`);
  console.log(`   Categories: ${post.categories.join(', ') || 'None'}`);
  console.log(`   Tags: ${post.tags.join(', ') || 'None'}`);
  console.log(`   Excerpt: ${(post.excerpt || '').substring(0, 100)}...`);
  console.log('');
});

console.log('═'.repeat(80));
console.log('\n📄 PAGES (' + pages.length + ' total)\n');
pages.forEach((page, i) => {
  console.log(`${i + 1}. "${page.title}"`);
  console.log(`   Slug: ${page.slug}`);
  console.log(`   Published: ${page.publishDate.split(' ')[0]}`);
  const contentPreview = (page.content || '').toString().replace(/<[^>]*>/g, '').substring(0, 150);
  console.log(`   Preview: ${contentPreview}...`);
  console.log('');
});

console.log('═'.repeat(80));
console.log('\n🏷️  CATEGORIES\n');
categories.forEach(cat => {
  console.log(`- ${cat.name} (${cat.slug})`);
  if (cat.description) console.log(`  ${cat.description}`);
});

console.log('\n🔖 TAGS\n');
tags.forEach(tag => {
  console.log(`- ${tag.name} (${tag.slug})`);
});

console.log('\n═'.repeat(80));
console.log('\n💡 RECOMMENDATIONS\n');
console.log('Blog Posts → /writing/ directory');
console.log('Pages → Review individually to determine if case studies or regular pages');
console.log('\n');
