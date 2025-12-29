#!/usr/bin/env node

/**
 * Design System Test Script
 * Tests HTML files against design system rules
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Get all HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  ...readdirSync('case-studies')
    .filter(f => f.endsWith('.html') && !f.includes('.backup'))
    .map(f => join('case-studies', f)),
  ...(existsSync('writing') 
    ? readdirSync('writing')
        .filter(f => f.endsWith('.html'))
        .map(f => join('writing', f))
    : []),
];

// Helper to find line numbers
function findLineNumber(content, match) {
  const beforeMatch = content.substring(0, match.index);
  return (beforeMatch.match(/\n/g) || []).length + 1;
}

// Helper to extract context around a match
function getContext(content, match, linesBefore = 2, linesAfter = 2) {
  const lines = content.split('\n');
  const lineNum = findLineNumber(content, match);
  const start = Math.max(0, lineNum - linesBefore - 1);
  const end = Math.min(lines.length, lineNum + linesAfter);
  return lines.slice(start, end).join('\n');
}

const violations = {
  fontSemibold: [],
  headingSizeOverrides: [],
  textGray600: [],
  roundedLg: [],
  coloredBackgrounds: [],
  shadows: [],
  socialButtonFont: [],
};

console.log('🔍 Testing design system adherence...\n');
console.log(`Found ${htmlFiles.length} HTML files to test\n`);

htmlFiles.forEach(file => {
  const content = readFileSync(file, 'utf-8');
  
  // Test 1: font-semibold
  const semiboldPattern = /class="[^"]*font-semibold/g;
  let match;
  while ((match = semiboldPattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    const context = getContext(content, match);
    violations.fontSemibold.push({
      file,
      line: lineNum,
      match: match[0].substring(0, 100),
      context: context.split('\n').slice(0, 3).join('\n'),
    });
  }
  
  // Test 2: Heading size overrides
  const headingSizePattern = /<(h[1-3])[^>]*class="[^"]*(text-[234]xl)/g;
  while ((match = headingSizePattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    violations.headingSizeOverrides.push({
      file,
      line: lineNum,
      tag: match[1],
      sizeClass: match[2],
    });
  }
  
  // Test 3: text-gray-600 in body text (excluding project cards)
  const gray600Pattern = /<p[^>]*class="[^"]*text-gray-600/g;
  while ((match = gray600Pattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    // Check if it's in a project card (allowed exception)
    const beforeMatch = content.substring(0, match.index);
    const isInProjectCard = beforeMatch.includes('group flex flex-col') && 
                           beforeMatch.lastIndexOf('group flex flex-col') > beforeMatch.lastIndexOf('</a>');
    
    if (!isInProjectCard) {
      violations.textGray600.push({
        file,
        line: lineNum,
        context: getContext(content, match, 1, 1),
      });
    }
  }
  
  // Test 4: rounded-lg (excluding Preline UI)
  const roundedLgPattern = /class="[^"]*rounded-lg/g;
  while ((match = roundedLgPattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    const isPreline = match[0].includes('hs-') || match[0].includes('md:rounded-lg');
    if (!isPreline) {
      violations.roundedLg.push({
        file,
        line: lineNum,
        match: match[0].substring(0, 80),
      });
    }
  }
  
  // Test 5: Colored backgrounds (excluding allowed exceptions)
  const coloredBgPattern = /class="[^"]*bg-(blue|red|green|yellow|purple|primary)-/g;
  while ((match = coloredBgPattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    violations.coloredBackgrounds.push({
      file,
      line: lineNum,
      bgClass: match[0].match(/bg-\w+-\d+/)?.[0] || match[0],
    });
  }
  
  // Test 6: Shadows (excluding Preline UI)
  const shadowPattern = /class="[^"]*shadow-(sm|md|lg|xl|2xl)/g;
  while ((match = shadowPattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    const isPreline = match[0].includes('hs-') || match[0].includes('md:shadow-md');
    if (!isPreline) {
      violations.shadows.push({
        file,
        line: lineNum,
        shadowClass: match[0].match(/shadow-\w+/)?.[0] || match[0],
      });
    }
  }
  
  // Test 7: Social button font weight
  const socialButtonPattern = /<a[^>]*class="[^"]*size-8[^"]*rounded-full[^"]*font-semibold/g;
  while ((match = socialButtonPattern.exec(content)) !== null) {
    const lineNum = findLineNumber(content, match);
    violations.socialButtonFont.push({
      file,
      line: lineNum,
    });
  }
});

// Print report
console.log('='.repeat(80));
console.log('DESIGN SYSTEM TEST REPORT');
console.log('='.repeat(80));
console.log();

let totalViolations = 0;

// Font semibold violations
if (violations.fontSemibold.length > 0) {
  console.log(`❌ FONT-SEMIBOLD VIOLATIONS: ${violations.fontSemibold.length}`);
  console.log('   Rule: Only font-bold, font-medium, or default (400) allowed');
  console.log();
  violations.fontSemibold.slice(0, 10).forEach(v => {
    console.log(`   ${v.file}:${v.line}`);
    console.log(`   ${v.match}`);
    console.log();
  });
  if (violations.fontSemibold.length > 10) {
    console.log(`   ... and ${violations.fontSemibold.length - 10} more`);
  }
  console.log();
  totalViolations += violations.fontSemibold.length;
}

// Heading size overrides
if (violations.headingSizeOverrides.length > 0) {
  console.log(`❌ HEADING SIZE OVERRIDES: ${violations.headingSizeOverrides.length}`);
  console.log('   Rule: Headings should use semantic HTML without size classes');
  console.log();
  violations.headingSizeOverrides.forEach(v => {
    console.log(`   ${v.file}:${v.line} - <${v.tag}> with ${v.sizeClass}`);
  });
  console.log();
  totalViolations += violations.headingSizeOverrides.length;
}

// Text gray-600 violations
if (violations.textGray600.length > 0) {
  console.log(`❌ TEXT-GRAY-600 VIOLATIONS: ${violations.textGray600.length}`);
  console.log('   Rule: Body text should use text-gray-800 (text-gray-600 only allowed in project cards)');
  console.log();
  violations.textGray600.slice(0, 5).forEach(v => {
    console.log(`   ${v.file}:${v.line}`);
  });
  if (violations.textGray600.length > 5) {
    console.log(`   ... and ${violations.textGray600.length - 5} more`);
  }
  console.log();
  totalViolations += violations.textGray600.length;
}

// Rounded-lg violations
if (violations.roundedLg.length > 0) {
  console.log(`❌ ROUNDED-LG VIOLATIONS: ${violations.roundedLg.length}`);
  console.log('   Rule: Only rounded-xl and rounded-full allowed');
  console.log();
  violations.roundedLg.forEach(v => {
    console.log(`   ${v.file}:${v.line}`);
  });
  console.log();
  totalViolations += violations.roundedLg.length;
}

// Colored backgrounds
if (violations.coloredBackgrounds.length > 0) {
  console.log(`❌ COLORED BACKGROUND VIOLATIONS: ${violations.coloredBackgrounds.length}`);
  console.log('   Rule: Only bg-white and bg-gray-50 allowed');
  console.log();
  violations.coloredBackgrounds.slice(0, 5).forEach(v => {
    console.log(`   ${v.file}:${v.line} - ${v.bgClass}`);
  });
  if (violations.coloredBackgrounds.length > 5) {
    console.log(`   ... and ${violations.coloredBackgrounds.length - 5} more`);
  }
  console.log();
  totalViolations += violations.coloredBackgrounds.length;
}

// Shadows
if (violations.shadows.length > 0) {
  console.log(`❌ SHADOW VIOLATIONS: ${violations.shadows.length}`);
  console.log('   Rule: No shadows allowed');
  console.log();
  violations.shadows.forEach(v => {
    console.log(`   ${v.file}:${v.line} - ${v.shadowClass}`);
  });
  console.log();
  totalViolations += violations.shadows.length;
}

// Social button font
if (violations.socialButtonFont.length > 0) {
  console.log(`❌ SOCIAL BUTTON FONT VIOLATIONS: ${violations.socialButtonFont.length}`);
  console.log('   Rule: Social buttons should use font-medium, not font-semibold');
  console.log();
  violations.socialButtonFont.forEach(v => {
    console.log(`   ${v.file}:${v.line}`);
  });
  console.log();
  totalViolations += violations.socialButtonFont.length;
}

// Summary
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Total violations found: ${totalViolations}`);
console.log();

if (totalViolations === 0) {
  console.log('✅ All tests passed! Design system adherence is perfect.');
} else {
  console.log('⚠️  Design system violations detected. Please review and fix.');
  console.log();
  console.log('See DESIGN-SYSTEM-TEST-REPORT.md for detailed recommendations.');
}

process.exit(totalViolations > 0 ? 1 : 0);

