# Design System

A minimal design system for the Saar Byrne portfolio. Less is more.

## Core Principles

1. **Less is more** — Fewer variations, more consistency
2. **Flat and white** — Simple backgrounds, no shadows
3. **Dark text** — gray-800 as default for better contrast
4. **Ample spacing** — Generous gaps, especially around text
5. **Light borders** — Subtle definition, not heavy lines
6. **Consistent radius** — One size fits most

---

## Typography

### Font Weights (3 only)

| Weight | Class | Usage |
|--------|-------|-------|
| **Bold** | `font-bold` (700) | Headings, emphasis, strong contrast |
| **Medium** | `font-medium` (500) | UI labels, navigation, subtle emphasis |
| **Regular** | (default 400) | Body text, paragraphs |

### Text Colors

| Color | Class | Usage |
|-------|-------|-------|
| Dark | `text-gray-800` | Default for all text — headings AND body |
| Muted | `text-gray-500` | Captions, dates, footnotes, secondary info |
| Link | `text-blue-600` | Links and interactive elements only |

### Sizes

| Element | Size | Line Height | Class | Usage |
|---------|------|-------------|-------|-------|
| H1 | 36px | 40px | `text-4xl` (applied via CSS) | Page titles |
| H2 | 24px | 32px | `text-2xl` (applied via CSS) | Section headings |
| H3 | 20px | 28px | `text-xl` (applied via CSS) | Subsection headings |
| Body (default) | 16px | 24px | `text-base` (default) | General body text, multi-column layouts, cards, UI elements |
| Body (large) | 18px | 28px | `.text-body-lg` | Single full-width columns, article/blog content, long-form reading, case study content |
| Small | 14px | 20px | `text-sm` | UI elements, captions |

**Body Text Sizes:**

- **16px (default):** Use for general body text, multi-column layouts, cards, metadata, and UI elements
- **18px (`.text-body-lg`):** Use for single, full-width columns, article/blog content, long-form reading, and case study content sections

**Rule:** Use semantic HTML (`h1`, `h2`, `h3`, `p`). The CSS handles sizing and weight automatically. For larger body text in single-column layouts, add `.text-body-lg` class to paragraphs or their container.

---

## Spacing

Ample gaps, especially for text readability.

| Context | Value | Notes |
|---------|-------|-------|
| Section padding | `py-12 lg:py-16` | Generous vertical breathing room |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` | Standard responsive pattern |
| Heading to content | `mb-6` | Clear separation |
| Paragraph spacing | `space-y-6` or `mt-6` | Comfortable reading |
| Grid gaps | `gap-8 lg:gap-12` | Spacious card layouts |
| Tag groups | `gap-2` | Tight but readable |

---

## Colors

Minimal palette. Avoid gratuitous color.

| Purpose | Class | Hex |
|---------|-------|-----|
| Background | `bg-white` | #ffffff |
| Alternate section | `bg-gray-50` | #f9fafb |
| Text (default) | `text-gray-800` | #1f2937 |
| Text (muted) | `text-gray-500` | #6b7280 |
| Borders | `border-gray-200` | #e5e7eb |
| Links/accent | `text-blue-600` | #2563eb |

**Rule:** Color is for links and critical interactive states only. No blue backgrounds, no colored badges.

---

## Borders and Radius

### Borders

- Always use `border-gray-200` — light and subtle
- Default 1px width
- No heavy or dark borders

### Radius

- `rounded-xl` (12px) — cards, images, containers
- `rounded-full` — pills, avatars, icon buttons
- No other variations needed

---

## Backgrounds

Two options only:

- `bg-white` — Default
- `bg-gray-50` — Alternating sections for visual rhythm

**Rules:**
- No shadows
- No gradients  
- No colored backgrounds

---

## Components

All components share the same visual DNA.

### Section Container

```html
<!-- Standard section -->
<div class="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
  <!-- content -->
</div>

<!-- Alternating background section -->
<div class="bg-gray-50">
  <div class="max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mx-auto">
    <!-- content -->
  </div>
</div>
```

### Card

```html
<div class="bg-white rounded-xl">
  <!-- content -->
</div>
```

### Tag

One style only:

```html
<span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">
  Label
</span>
```

### Link

```html
<a class="text-blue-600 hover:text-blue-800 font-medium" href="...">
  Link text
</a>
```

### Link with Arrow

```html
<a class="group inline-flex items-center gap-x-2 text-gray-800 hover:text-blue-600 font-medium" href="...">
  <i class="ph ph-arrow-left size-4 group-hover:-translate-x-1 transition"></i>
  Back
</a>
```

### Image

```html
<img class="w-full rounded-xl" src="..." alt="...">
```

### Figure with Caption

```html
<figure class="my-8">
  <img class="w-full rounded-xl" src="..." alt="...">
  <figcaption class="mt-4 text-sm text-center text-gray-500">
    Caption text
  </figcaption>
</figure>
```

### Social Icon Button

```html
<a class="size-8 inline-flex justify-center items-center rounded-full text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50" href="...">
  <i class="ph ph-linkedin-logo size-4"></i>
</a>
```

---

## Icons

Use **Phosphor Icons** with consistent sizing:

| Context | Size | Example |
|---------|------|---------|
| Navigation | `size-4` | `<i class="ph ph-house size-4"></i>` |
| Social buttons | `size-4` | `<i class="ph ph-linkedin-logo size-4"></i>` |
| Inline with text | `size-4` + `shrink-0` | `<i class="ph ph-arrow-left shrink-0 size-4"></i>` |

---

## Container Widths

| Width | Class | Usage |
|-------|-------|-------|
| 1360px | `max-w-[85rem]` | Header, footer, full-width sections |
| 1280px | `max-w-7xl` | Project grids |
| 1024px | `max-w-5xl` | Two-column layouts |
| 768px | `max-w-3xl` | Article content |
| 672px | `max-w-2xl` | Text blocks, prose |

---

## Layouts

### Case Study (Rehab Structure)
- Section order: Hero → Overview → Discovery → Design (3 rounds) → Outcomes.
- Background rhythm: alternate `bg-white` and `bg-gray-50` using the split-div pattern.
- Typography: `.text-body-lg` for long-form paragraphs; bullets stay `text-gray-800`.
- Metadata: two tags in the hero (role, company) using the standard tag pattern.
- Lists: bullet dots use `ph-bold ph-dot text-blue-600`; numbered pills use `rounded-full` with `border-gray-200`.
- Media: images wrapped with GLightbox, shared `data-gallery`, rounded-xl only.

---

## What NOT to Do

- ❌ Don't use `font-semibold` — use `font-bold` or `font-medium`
- ❌ Don't use `text-gray-600` for body text — use `text-gray-800`
- ❌ Don't add shadows (`shadow-*`)
- ❌ Don't use colored backgrounds (`bg-blue-*`, `bg-primary-*`)
- ❌ Don't override heading sizes with inline classes
- ❌ Don't use multiple border radius values — stick to `rounded-xl` and `rounded-full`
- ❌ Don't add borders darker than `border-gray-200`

