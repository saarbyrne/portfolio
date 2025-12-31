// Select all timeline items and the dynamic content area
const timelineItems = document.querySelectorAll('.timeline-item');
const dynamicContent = document.getElementById('dynamic-content');

// Add click event listeners to each timeline item
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    // Get the associated content file
    const contentId = item.getAttribute('data-content');
    const contentFile = `content/${contentId}.html`;

    // Fetch the content file
    fetch(contentFile)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load content: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        // Update the dynamic content section with the loaded HTML
        dynamicContent.innerHTML = data;
      })
      .catch(error => {
        dynamicContent.innerHTML = `<p>Error loading content: ${error.message}</p>`;
      });
  });
});
