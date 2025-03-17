// Lightbox functionality for YouTube videos
function initLightbox() {
  const lightboxLinks = document.querySelectorAll('.w-lightbox');
  
  lightboxLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the lightbox data
      const jsonScript = link.querySelector('.w-json');
      if (!jsonScript) return;
      
      try {
        const lightboxData = JSON.parse(jsonScript.textContent);
        const firstItem = lightboxData.items[0];
        
        if (firstItem && firstItem.type === 'video') {
          // Create lightbox overlay
          const overlay = document.createElement('div');
          overlay.className = 'lightbox-overlay';
          overlay.style.position = 'fixed';
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          overlay.style.zIndex = 9999;
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          
          // Create content container
          const content = document.createElement('div');
          content.className = 'lightbox-content';
          content.style.width = '80%';
          content.style.maxWidth = '940px';
          content.style.position = 'relative';
          
          // Create close button
          const closeBtn = document.createElement('button');
          closeBtn.className = 'lightbox-close';
          closeBtn.textContent = '×';
          closeBtn.style.position = 'absolute';
          closeBtn.style.top = '-40px';
          closeBtn.style.right = '0';
          closeBtn.style.background = 'none';
          closeBtn.style.border = 'none';
          closeBtn.style.color = 'white';
          closeBtn.style.fontSize = '30px';
          closeBtn.style.cursor = 'pointer';
          
          closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
          });
          
          // Create video container
          const videoContainer = document.createElement('div');
          videoContainer.innerHTML = firstItem.html;
          
          // Assemble the lightbox
          content.appendChild(closeBtn);
          content.appendChild(videoContainer);
          overlay.appendChild(content);
          
          // Add to document
          document.body.appendChild(overlay);
          
          // Close on overlay click
          overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
              document.body.removeChild(overlay);
            }
          });
        }
      } catch (error) {
        console.error('Error parsing lightbox data:', error);
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initLightbox();
});
