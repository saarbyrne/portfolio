let headerResizeObserver;

function reinitializePreline() {
  if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === "function") {
    window.HSStaticMethods.autoInit();
  }
}

function updateHeaderOffset() {
  const header = document.querySelector("header[data-site-header]");
  if (!header) return;

  document.documentElement.style.setProperty(
    "--header-offset",
    `${header.offsetHeight}px`
  );
}

async function loadFragment(selector, url) {
  const slot = document.querySelector(selector);
  if (!slot) return;

  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) return;

    const html = await response.text();
    slot.innerHTML = html;

    // Re-run Preline initialisation so dropdowns/collapse work on injected content
    reinitializePreline();

    // Adjust layout padding once header is present
    if (selector === "#site-header") {
      const header = slot.querySelector("header[data-site-header]");
      if (header) {
        updateHeaderOffset();

        if (headerResizeObserver) headerResizeObserver.disconnect();
        headerResizeObserver = new ResizeObserver(updateHeaderOffset);
        headerResizeObserver.observe(header);
      }
    }
  } catch (error) {
    // Fail silently; header/footer are non-critical
    console.error("Error loading layout fragment", selector, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFragment("#site-header", "/templates/header.html");
  loadFragment("#site-footer", "/templates/footer.html");
});

// Ensure Preline is initialised once all scripts have loaded
window.addEventListener("load", reinitializePreline);

window.addEventListener("resize", updateHeaderOffset);


