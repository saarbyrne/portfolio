# Component Library

This document catalogs all components and patterns used in this portfolio. Use these exact patterns - do not create variations.

## Preline UI Components

These are Preline UI components as used in this project. Follow these patterns exactly.

### Header with Mobile Collapse

**Purpose:** Sticky header with mobile navigation menu that collapses/expands.

**Required Classes & Attributes:**
- Button: `hs-collapse-toggle` class, `data-hs-collapse` attribute
- Collapse container: `hs-collapse` class
- Icons: `hs-collapse-open:hidden` and `hs-collapse-open:block` for toggle states

**Exact Pattern:**

```html
<header class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
  <nav class="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
    <!-- Logo -->
    <div class="flex justify-between items-center gap-x-1">
      <a class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" href="/" aria-label="Saar Byrne">
        Saar Byrne
      </a>

      <!-- Collapse Button -->
      <button type="button" class="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-sm rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" id="hs-header-classic-collapse" aria-expanded="false" aria-controls="hs-header-classic" aria-label="Toggle navigation" data-hs-collapse="#hs-header-classic">
        <i class="ph ph-list hs-collapse-open:hidden size-4"></i>
        <i class="ph ph-x hidden hs-collapse-open:block size-4"></i>
        <span class="sr-only">Toggle navigation</span>
      </button>
    </div>

    <!-- Collapse -->
    <div id="hs-header-classic" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-header-classic-collapse">
      <div class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <div class="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
          <!-- Navigation links here -->
        </div>
      </div>
    </div>
  </nav>
</header>
```

**Notes:**
- The `data-hs-collapse` attribute must match the ID of the collapse container (with `#`)
- Icons toggle visibility using `hs-collapse-open:hidden` and `hs-collapse-open:block`
- Mobile-only button uses `md:hidden`

---

### Dropdown Menu

**Purpose:** Dropdown menu for navigation items with sub-items.

**Required Classes & Attributes:**
- Container: `hs-dropdown` class with strategy attributes
- Toggle button: `hs-dropdown-toggle` class
- Menu: `hs-dropdown-menu` class
- State classes: `hs-dropdown-open:opacity-100` for visibility

**Exact Pattern:**

```html
<div class="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false]">
  <button id="hs-header-classic-dropdown" type="button" class="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-haspopup="menu" aria-expanded="false" aria-label="Case Studies">
    <i class="ph ph-folder-simple shrink-0 size-4 me-3 md:me-2"></i>
    Case Studies
    <i class="ph ph-caret-down shrink-0 size-4 ms-auto md:ms-1"></i>
  </button>

  <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-52 hidden z-10 top-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 md:after:hidden after:absolute after:top-1 after:-start-4 after:w-4 after:h-[calc(100%-0.5rem)] after:bg-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="hs-header-classic-dropdown">
    <div class="py-1 md:px-1 space-y-0.5">
      <a class="p-2 md:px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500" href="/case-studies/rehab.html">
        Rehab
      </a>
      <!-- More menu items -->
    </div>
  </div>
</div>
```

**Notes:**
- Strategy attributes control positioning behavior (static on mobile, fixed on desktop)
- Menu has complex positioning classes - copy exactly
- Shadow on menu is from Preline (allowed exception to no-shadow rule)

---

## Standard Patterns

These are standard HTML patterns using Tailwind classes. Use these exact class strings.

### Tag

**Purpose:** Label/tag for metadata (roles, companies, categories).

**Exact Pattern:**

```html
<span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">
  Label
</span>
```

**When to use:**
- Case study metadata (role, company)
- Article tags
- Category labels

**Notes:**
- Always use `text-gray-800` (not `text-gray-600`)
- Always use `text-sm` (not responsive sizing)
- Always use `rounded-xl` (not `rounded-full`)

---

### Project Card

**Purpose:** Card displaying a project/case study with image, title, description, and tags.

**Exact Pattern:**

```html
<a class="group flex flex-col focus:outline-hidden" href="/case-studies/rehab.html">
  <div class="aspect-[4/3] overflow-hidden bg-gray-100 rounded-2xl flex items-center justify-center p-4">
    <img class="max-w-full max-h-full group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out object-contain rounded-2xl" src="./src/assets/image.png" alt="Project name">
  </div>
  <div class="pt-4">
    <h3 class="relative inline-block">
      Project Title
    </h3>
    <p class="mt-1 text-gray-600">
      Project description text.
    </p>
    <div class="mt-3 flex flex-wrap gap-2">
      <!-- Tags here -->
    </div>
  </div>
</a>
```

**When to use:**
- Case study grid on homepage
- Project listings

**Notes:**
- Uses `group` for hover effects on image
- Image container uses `bg-gray-100` (allowed for image placeholder)
- Image uses `rounded-2xl` (allowed for images)
- Description uses `text-gray-600` (this is an exception - body text in cards can be gray-600)

---

### Social Icon Button

**Purpose:** Circular icon button for social media links.

**Exact Pattern:**

```html
<a class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="https://linkedin.com/in/saarbyrne" target="_blank" rel="noopener noreferrer">
  <i class="ph ph-linkedin-logo size-4"></i>
</a>
```

**When to use:**
- Footer social links
- Profile page social links

**Notes:**
- Always `size-8` for consistent sizing
- Always `rounded-full` for circular shape
- Always `text-gray-500` with `hover:bg-gray-50`
- Always include `target="_blank" rel="noopener noreferrer"` for external links

---

### Link with Arrow

**Purpose:** Navigation link with arrow icon that animates on hover.

**Exact Pattern:**

```html
<a class="group inline-flex items-center gap-x-2 text-sm font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600" href="/">
  <i class="ph ph-arrow-left size-4 group-hover:-translate-x-1 transition"></i>
  Back to all case studies
</a>
```

**Variations:**
- Left arrow: `ph-arrow-left` with `group-hover:-translate-x-1`
- Right arrow: `ph-arrow-right` with `group-hover:translate-x-1`

**When to use:**
- Navigation between pages (prev/next)
- Back links
- Call-to-action links

**Notes:**
- Always use `group` for hover effects
- Arrow icon uses `size-4`
- Text uses `text-gray-800` with `hover:text-blue-600`

---

### Section Container

**Purpose:** Standard container for page sections.

**Exact Pattern:**

```html
<!-- Standard section (white background) -->
<div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
  <!-- content -->
</div>

<!-- Alternating background section (gray-50 background) -->
<!-- CRITICAL: Must use split div pattern - outer div for background, inner div for content -->
<div class="bg-gray-50">
  <div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
    <!-- content -->
  </div>
</div>

<!-- Narrow width alternating section (for text-heavy content) -->
<div class="bg-gray-50">
  <div class="max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
    <!-- content -->
  </div>
</div>
```

**When to use:**
- All page sections
- Content blocks
- Use alternating background (`bg-gray-50`) to create visual rhythm between sections

**Critical Rules:**
- **Sections with `bg-gray-50` MUST use the split div pattern** (outer div for background, inner div for content container)
- **Never combine `bg-gray-50` with `max-w-*` in a single div** - this prevents the background from spanning full viewport width
- The outer div provides full-width background, the inner div constrains content width

**Notes:**
- Standard width: `max-w-[85rem]` (1360px) - use for most sections
- Narrow width: `max-w-5xl` (1024px) - use for text-heavy sections, prose content
- Padding: `py-12 lg:py-16` vertical, `px-4 sm:px-6 lg:px-8` horizontal
- Always include `mx-auto` for centering

---

### Figure with Caption

**Purpose:** Image with caption below.

**Exact Pattern:**

```html
<figure class="my-8">
  <img class="w-full object-cover rounded-xl" src="./src/assets/image.jpg" alt="Image description">
  <figcaption class="mt-4 text-sm text-center text-gray-500">
    Caption text
  </figcaption>
</figure>
```

**When to use:**
- Images in case studies
- Images in blog posts
- Any image needing a caption

**Notes:**
- Image uses `rounded-xl`
- Caption uses `text-gray-500` for muted appearance
- Caption is centered with `text-center`

---

### Image Lightbox (GLightbox)

**Purpose:** Lightbox gallery for images in case studies, allowing users to view images in full size with navigation between images.

**Required Setup:**
- GLightbox CSS and JS must be included in the HTML
- Images must be wrapped in `<a>` tags with `class="glightbox"` and `data-glightbox` attribute
- All images in a gallery must share the same `data-gallery` value
- GLightbox must be initialized with Phosphor Icons replacement

**Exact Pattern:**

```html
<!-- Single image with lightbox -->
<a href="../src/assets/image.jpg" class="glightbox" data-glightbox="description: 'Image caption text';" data-gallery="gallery-name">
  <img class="w-full object-cover rounded-xl" src="../src/assets/image.jpg" alt="Image description">
</a>

<!-- Image with figure caption -->
<figure class="my-8">
  <a href="../src/assets/image.jpg" class="glightbox" data-glightbox="description: 'Caption text';" data-gallery="gallery-name">
    <img class="w-full object-cover rounded-xl" src="../src/assets/image.jpg" alt="Image description">
  </a>
  <figcaption class="mt-4 text-sm text-center text-gray-500">
    Caption text
  </figcaption>
</figure>
```

**Required JavaScript Initialization:**

```html
<!-- GLightbox CSS -->
<link rel="stylesheet" href="../node_modules/glightbox/dist/css/glightbox.min.css">

<!-- GLightbox JS -->
<script src="../node_modules/glightbox/dist/js/glightbox.min.js"></script>

<!-- Initialize GLightbox -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      keyboardNavigation: true,
      closeButton: true,
      closeOnOutsideClick: true,
      autoplayVideos: false
    });
    
    // Replace default SVG icons with Phosphor Icons after initialization
    function replaceIconsWithPhosphor() {
      // Replace close button icon
      const closeBtn = document.querySelector('.gclose');
      if (closeBtn) {
        closeBtn.innerHTML = '<i class="ph ph-x size-5"></i>';
      }
      
      // Replace prev button icon
      const prevBtn = document.querySelector('.gprev');
      if (prevBtn) {
        prevBtn.innerHTML = '<i class="ph ph-arrow-left size-5"></i>';
      }
      
      // Replace next button icon
      const nextBtn = document.querySelector('.gnext');
      if (nextBtn) {
        nextBtn.innerHTML = '<i class="ph ph-arrow-right size-5"></i>';
      }
    }
    
    // Replace icons when lightbox opens
    lightbox.on('open', function() {
      setTimeout(replaceIconsWithPhosphor, 10);
    });
    
    // Also replace on slide change
    lightbox.on('slide_changed', function() {
      setTimeout(replaceIconsWithPhosphor, 10);
    });
  });
</script>
```

**When to use:**
- Images in case studies that should be viewable in full size
- Image galleries where users should navigate between multiple images
- Any image that benefits from a focused viewing experience

**Notes:**
- Always use `class="glightbox"` on the anchor tag
- Always include `data-glightbox` attribute with description
- Use the same `data-gallery` value for all images in a gallery
- Icons are automatically replaced with Phosphor Icons (ph-x, ph-arrow-left, ph-arrow-right)
- Lightbox styling matches Preline design system (flat, no shadows, gray-800 text)
- Navigation buttons positioned: close (top-right), prev (left), next (right)

---

### Case Study Page Template (Rehab Structure)

**Purpose:** Standard layout for all case studies, mirroring the Rehab page structure.

**Sections (in order):**
- Hero: centered title, summary paragraph, two tags for role and company
- Overview: `bg-gray-50` split grid with bullet points left, narrative right
- Discovery: key learnings list with numbered pills + two lightbox images
- Design: `bg-gray-50` with three rounds (copy each round pattern), feedback bullets, optional Figma link, lightbox image
- Outcomes: two-column layout with heading and three body paragraphs

**Exact Pattern (trimmed for brevity):**

```html
<!-- Hero -->
<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
  <div class="max-w-3xl text-center mx-auto">
    <h1 class="mb-6">Case Study: [Title]</h1>
    <p class="text-body-lg mt-1 text-gray-800 mb-4">[Summary]</p>
    <div class="mt-3 flex flex-wrap gap-2 justify-center">
      <span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">[Role]</span>
      <span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">[Company]</span>
    </div>
  </div>
</div>

<!-- Overview (bg-gray-50 wrapper required) -->
<div class="bg-gray-50">
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
      <!-- bullets + narrative -->
    </div>
  </div>
</div>

<!-- Discovery -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 class="mb-6">Discovery</h2>
    <p class="text-body-lg mt-1 text-gray-800">[Research summary]</p>
  </div>
  <div class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
    <!-- ordered list + two lightbox images -->
  </div>
</div>

<!-- Design (repeat 3 rounds) -->
<div class="bg-gray-50">
  <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- round sections use md:grid md:grid-cols-2 ... and feedback list -->
  </div>
</div>

<!-- Outcomes -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-start">
    <!-- heading + three body paragraphs -->
  </div>
</div>
```

**Notes:**
- Always alternate `bg-white` and `bg-gray-50` via the split-div pattern.
- Use `.text-body-lg` for long-form paragraphs in hero, discovery, outcomes.
- Bullet dots: `ph-bold ph-dot` with `text-blue-600`; numbered pills use `rounded-full` with `border-gray-200`.
- All images in the template use GLightbox with shared `data-gallery` value.

---

## Pattern Rules

1. **Use exact patterns** - Copy the class strings exactly, don't create variations
2. **Preline components** - Must include all required classes and data attributes
3. **Standard patterns** - Use the documented class strings, don't modify
4. **Consistency** - If a pattern exists, use it. Don't create new ones.

## Testing

All components and patterns are tested in `design-system.test.ts` to ensure:
- Preline components have required attributes
- Standard patterns match documented class strings
- No unauthorized variations are introduced

Refer to `DESIGN-SYSTEM.md` for design tokens, colors, spacing, and typography rules.

