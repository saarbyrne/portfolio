/**
 * Hero Section Loader
 * Dynamically loads and populates the case study hero section
 *
 * Usage in HTML:
 * <div id="case-study-hero"
 *      data-title="Your Title"
 *      data-caption="Case Study"
 *      data-tags='["Tag 1", "Tag 2"]'>
 * </div>
 */

document.addEventListener('DOMContentLoaded', async () => {
  const heroContainer = document.getElementById('case-study-hero');

  if (!heroContainer) {
    return; // No hero container found, skip
  }

  try {
    // Fetch the hero partial
    const response = await fetch('/templates/hero.html');
    if (!response.ok) {
      throw new Error(`Failed to load hero: ${response.status}`);
    }

    const heroHTML = await response.text();

    // Insert the hero HTML
    heroContainer.innerHTML = heroHTML;

    // Get data attributes
    const title = heroContainer.dataset.title || '';
    const caption = heroContainer.dataset.caption || 'Case Study';
    const tagsJSON = heroContainer.dataset.tags || '[]';

    // Parse tags
    let tags = [];
    try {
      tags = JSON.parse(tagsJSON);
    } catch (e) {
      console.error('Error parsing tags:', e);
    }

    // Populate caption
    const captionElement = heroContainer.querySelector('[data-hero-caption]');
    if (captionElement) {
      captionElement.textContent = caption;
    }

    // Populate title
    const titleElement = heroContainer.querySelector('[data-hero-title]');
    if (titleElement) {
      titleElement.textContent = title;
    }

    // Populate tags
    const tagsContainer = heroContainer.querySelector('[data-hero-tags]');
    if (tagsContainer && tags.length > 0) {
      tagsContainer.innerHTML = tags.map(tag =>
        `<span class="py-1.5 px-3 bg-white text-gray-800 text-sm rounded-xl">${tag}</span>`
      ).join('\n          ');
    }

  } catch (error) {
    console.error('Error loading hero:', error);
  }
});
