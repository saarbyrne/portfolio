import { test, expect } from "bun:test";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

// Get all HTML files
const htmlFiles = [
  "index.html",
  "about.html",
  ...readdirSync("case-studies")
    .filter(f => f.endsWith(".html"))
    .map(f => join("case-studies", f)),
  ...(existsSync("writing") 
    ? readdirSync("writing")
        .filter(f => f.endsWith(".html"))
        .map(f => join("writing", f))
    : []),
];

// Helper to find line numbers for better error reporting
function findLineNumber(content: string, match: RegExpMatchArray): number {
  const beforeMatch = content.substring(0, match.index);
  return (beforeMatch.match(/\n/g) || []).length + 1;
}

// ============================================
// TYPOGRAPHY TESTS
// ============================================

test("Typography - No prohibited font sizes on headings", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for prohibited font sizes on headings
    const prohibitedSizes = [
      /<h[1-3][^>]*class="[^"]*text-5xl/,
      /<h[1-3][^>]*class="[^"]*text-6xl/,
      /<h[1-3][^>]*class="[^"]*text-3xl/,
    ];

    prohibitedSizes.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        errors.push(`${file}: Found prohibited font size on heading (${matches.length} instances) - headings should use semantic HTML without size overrides`);
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Font size violations found:\n${errors.join('\n')}`);
  }
});

test("Typography - No prohibited font weights", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Only font-bold, font-medium, or default (400) are allowed
    const prohibitedWeights = [
      /class="[^"]*font-semibold/,
      /class="[^"]*font-light/,
      /class="[^"]*font-thin/,
      /class="[^"]*font-black/,
    ];

    prohibitedWeights.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        errors.push(`${file}: Found prohibited font weight (${matches.length} instances) - only font-bold, font-medium, or default allowed`);
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Font weight violations found:\n${errors.join('\n')}`);
  }
});

test("Typography - No responsive font sizes on headings", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    const responsiveSizes = [
      /<h[1-3][^>]*class="[^"]*md:text-[0-9]xl/,
      /<h[1-3][^>]*class="[^"]*lg:text-[0-9]xl/,
      /<h[1-3][^>]*class="[^"]*sm:text-[0-9]xl/,
    ];

    responsiveSizes.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        errors.push(`${file}: Found responsive font sizes on headings (${matches.length} instances) - headings should have one size only`);
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Responsive font size violations found:\n${errors.join('\n')}`);
  }
});

test("Typography - Body text should use gray-800, not gray-600", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for text-gray-600, text-gray-700, text-gray-900 on paragraphs and body text
    // Allow text-gray-500 for muted text
    const prohibitedColors = [
      /<p[^>]*class="[^"]*text-gray-600/,
      /<p[^>]*class="[^"]*text-gray-700/,
      /<p[^>]*class="[^"]*text-gray-900/,
      /class="[^"]*text-gray-600[^"]*"[^>]*>/g, // General usage
    ];

    prohibitedColors.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        // Filter out legitimate uses (like in comments or code examples)
        const realMatches = matches.filter(m => !m.includes('<!--') && !m.includes('//'));
        if (realMatches.length > 0) {
          errors.push(`${file}: Found text-gray-600/700/900 (${realMatches.length} instances) - use text-gray-800 for body text, text-gray-500 for muted`);
        }
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Body text color violations found:\n${errors.join('\n')}`);
  }
});

test("Typography - Headings should not override default color", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for h1, h2, h3 with explicit color classes (should use default gray-800)
    const headingColorPattern = /<h[1-3][^>]*class="[^"]*text-(gray|black|blue)-[0-9]{3}/g;
    const matches = content.match(headingColorPattern);

    if (matches) {
      errors.push(`${file}: Found ${matches.length} heading(s) with color override - should use default gray-800`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Heading color violations found:\n${errors.join('\n')}`);
  }
});

test("Typography - Check semantic HTML usage", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check that headings exist
    const h1Count = (content.match(/<h1/g) || []).length;
    const h2Count = (content.match(/<h2/g) || []).length;

    if (h1Count === 0) {
      errors.push(`${file}: No H1 found - every page should have one H1`);
    }

    if (h1Count > 1) {
      errors.push(`${file}: Multiple H1 tags found (${h1Count}) - should only have one`);
    }

    if (h2Count === 0 && !file.includes('template')) {
      errors.push(`${file}: No H2 found - consider adding section headings`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Semantic HTML violations found:\n${errors.join('\n')}`);
  }
});

// ============================================
// COLOR TESTS
// ============================================

test("Colors - No colored backgrounds except white and gray-50", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for colored backgrounds (excluding white and gray-50)
    const coloredBackgrounds = [
      /class="[^"]*bg-blue-/,
      /class="[^"]*bg-primary-/,
      /class="[^"]*bg-gray-[^5]/, // gray-100, gray-200, etc. but allow gray-50
      /class="[^"]*bg-red-/,
      /class="[^"]*bg-green-/,
      /class="[^"]*bg-yellow-/,
      /class="[^"]*bg-purple-/,
    ];

    coloredBackgrounds.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        // Filter out Preline UI classes which may use colored backgrounds
        const realMatches = matches.filter(m => !m.includes('hs-') && !m.includes('preline'));
        if (realMatches.length > 0) {
          errors.push(`${file}: Found colored background (${realMatches.length} instances) - only bg-white and bg-gray-50 allowed`);
        }
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Background color violations found:\n${errors.join('\n')}`);
  }
});

// ============================================
// SHADOW TESTS
// ============================================

test("Shadows - No shadows allowed", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for any shadow classes
    const shadowPattern = /class="[^"]*shadow-(sm|md|lg|xl|2xl|none)/g;
    const matches = content.match(shadowPattern);

    if (matches) {
      // Filter out Preline UI classes which may use shadows
      const realMatches = matches.filter(m => !m.includes('hs-') && !m.includes('preline'));
      if (realMatches.length > 0) {
        errors.push(`${file}: Found shadow classes (${realMatches.length} instances) - no shadows allowed in design system`);
      }
    }
  });

  if (errors.length > 0) {
    throw new Error(`Shadow violations found:\n${errors.join('\n')}`);
  }
});

// ============================================
// BORDER RADIUS TESTS
// ============================================

test("Border Radius - Only rounded-xl and rounded-full allowed", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for prohibited border radius values
    const prohibitedRadius = [
      /class="[^"]*rounded-lg/,
      /class="[^"]*rounded-2xl/,
      /class="[^"]*rounded-md/,
      /class="[^"]*rounded-sm/,
      /class="[^"]*rounded-none/,
    ];

    prohibitedRadius.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        // Filter out Preline UI classes
        const realMatches = matches.filter(m => !m.includes('hs-') && !m.includes('preline'));
        if (realMatches.length > 0) {
          errors.push(`${file}: Found prohibited border radius (${realMatches.length} instances) - only rounded-xl and rounded-full allowed`);
        }
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Border radius violations found:\n${errors.join('\n')}`);
  }
});

// ============================================
// BORDER TESTS
// ============================================

test("Borders - Only light borders (border-gray-200) allowed", () => {
  const errors: string[] = [];

  htmlFiles.forEach(file => {
    const content = readFileSync(file, "utf-8");

    // Check for darker borders
    const darkerBorders = [
      /class="[^"]*border-gray-300/,
      /class="[^"]*border-gray-400/,
      /class="[^"]*border-gray-500/,
      /class="[^"]*border-gray-600/,
      /class="[^"]*border-blue-/,
      /class="[^"]*border-primary-/,
    ];

    darkerBorders.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.source, 'g'));
      if (matches) {
        // Filter out Preline UI classes
        const realMatches = matches.filter(m => !m.includes('hs-') && !m.includes('preline'));
        if (realMatches.length > 0) {
          errors.push(`${file}: Found darker borders (${realMatches.length} instances) - only border-gray-200 allowed`);
        }
      }
    });
  });

  if (errors.length > 0) {
    throw new Error(`Border color violations found:\n${errors.join('\n')}`);
  }
});
