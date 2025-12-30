// Related content loader
// Pulls card grids from their index pages so they stay in sync across pages.

const CONTENT_SOURCES = {
  'case-studies': {
    source: '/case-studies.html'
  },
  writing: {
    source: '/writing.html'
  },
  projects: {
    source: '/projects.html'
  }
};

function getContentType(pathname) {
  if (pathname.startsWith('/case-studies/')) return 'case-studies';
  if (pathname.startsWith('/writing/')) return 'writing';
  if (pathname.startsWith('/projects/')) return 'projects';
  return null;
}

function resolveRelativeUrls(container, baseUrl) {
  const links = container.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href.startsWith('http://') || href.startsWith('https://')) return;
    link.setAttribute('href', new URL(href, baseUrl).toString());
  });

  const images = container.querySelectorAll('img[src]');
  images.forEach(image => {
    const src = image.getAttribute('src');
    if (!src) return;
    image.setAttribute('src', new URL(src, baseUrl).toString());
  });
}

function buildSection(innerHtml, contentType) {
  const isWriting = contentType === 'writing';
  const sectionClass = isWriting ? 'bg-blue-600' : 'bg-white';
  const headingClass = isWriting ? 'text-white' : 'text-gray-800';

  return `
    <section class="${sectionClass}">
      <div class="content-container py-12 lg:py-16">
        <div class="mb-10 text-center">
          <h2 class="text-xl font-bold ${headingClass}">Read More</h2>
        </div>
        ${innerHtml}
      </div>
    </section>
  `;
}

export async function loadRelatedContent() {
  const container = document.getElementById('related-content');
  if (!container) return;

  const contentType = getContentType(window.location.pathname);
  if (!contentType || !CONTENT_SOURCES[contentType]) return;

  const { source } = CONTENT_SOURCES[contentType];

  try {
    const response = await fetch(source, { credentials: 'same-origin' });
    if (!response.ok) return;

    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const gridContainer = doc.querySelector('main#content > .content-container:last-of-type');
    if (!gridContainer) return;

    const baseUrl = new URL(source, window.location.href);
    resolveRelativeUrls(gridContainer, baseUrl);

    container.innerHTML = buildSection(gridContainer.innerHTML, contentType);
  } catch (error) {
    // Fail silently to avoid breaking page render.
  }
}

// Auto-load on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', loadRelatedContent);
}
