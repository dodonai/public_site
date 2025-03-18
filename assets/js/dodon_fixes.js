/**
 * Dodon.ai Issue Fix Script
 * 
 * This script addresses two critical issues:
 * 1. Slider navigation not working
 * 2. YouTube thumbnails not displaying properly
 * 
 * Add this script to your HTML just before the closing </body> tag
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fix slider navigation issue
  fixSliderNavigation();
  
  // Fix YouTube thumbnails
  fixYouTubeThumbnails();
  
  console.log('Applied fixes for slider navigation and YouTube thumbnails');
});

/**
 * Fix slider navigation issue
 */
function fixSliderNavigation() {
  const sliders = document.querySelectorAll('.w-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.w-slide');
    const leftArrow = slider.querySelector('.w-slider-arrow-left');
    const rightArrow = slider.querySelector('.w-slider-arrow-right');
    const navDots = slider.querySelectorAll('.w-slider-nav div');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Initialize the slider - show first slide, hide others
    function initializeSlider() {
      slides.forEach((slide, i) => {
        // Set proper positioning
        slide.style.position = 'absolute';
        slide.style.left = '0';
        slide.style.top = '0';
        slide.style.width = '100%';
        slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        
        // Initial slide position
        if (i === currentSlide) {
          slide.style.transform = 'translateX(0)';
          slide.style.opacity = '1';
          slide.style.zIndex = '1';
        } else {
          slide.style.transform = 'translateX(100%)';
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        }
      });
      
      // Update navigation dots
      updateNavDots();
    }
    
    // Move to a specific slide
    function goToSlide(index) {
      // Handle index boundaries
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Determine slide movement direction (left or right)
      const direction = index > currentSlide ? 1 : -1;
      
      // Update current slide
      const prevSlide = currentSlide;
      currentSlide = index;
      
      // Move slides
      slides.forEach((slide, i) => {
        if (i === prevSlide) {
          // Previous active slide moves out
          slide.style.transform = `translateX(${-100 * direction}%)`;
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        } else if (i === currentSlide) {
          // New active slide comes in
          slide.style.transform = 'translateX(0)';
          slide.style.opacity = '1';
          slide.style.zIndex = '1';
        } else {
          // Other slides are positioned out of view
          slide.style.transform = `translateX(${100 * direction}%)`;
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        }
      });
      
      // Update navigation dots
      updateNavDots();
    }
    
    // Update navigation dots active state
    function updateNavDots() {
      if (!navDots.length) return;
      
      navDots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('w-active');
        } else {
          dot.classList.remove('w-active');
        }
      });
    }
    
    // Set up click handlers for arrows
    if (leftArrow) {
      // Remove any existing event listeners
      const newLeftArrow = leftArrow.cloneNode(true);
      leftArrow.parentNode.replaceChild(newLeftArrow, leftArrow);
      
      newLeftArrow.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentSlide - 1);
      });
    }
    
    if (rightArrow) {
      // Remove any existing event listeners
      const newRightArrow = rightArrow.cloneNode(true);
      rightArrow.parentNode.replaceChild(newRightArrow, rightArrow);
      
      newRightArrow.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentSlide + 1);
      });
    }
    
    // Set up click handlers for navigation dots
    navDots.forEach((dot, i) => {
      // Remove any existing event listeners
      const newDot = dot.cloneNode(true);
      dot.parentNode.replaceChild(newDot, dot);
      
      newDot.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(i);
      });
    });
    
    // Initialize the slider
    initializeSlider();
    
    // Add debugging info
    console.log(`Initialized slider with ${slides.length} slides`);
  });
}

/**
 * Fix YouTube thumbnails
 */
function fixYouTubeThumbnails() {
  const lightboxLinks = document.querySelectorAll('.w-lightbox');
  
  lightboxLinks.forEach(link => {
    // Get the lightbox data
    const jsonScript = link.querySelector('.w-json');
    if (!jsonScript) return;
    
    try {
      const lightboxData = JSON.parse(jsonScript.textContent);
      const firstItem = lightboxData.items[0];
      
      if (firstItem && firstItem.type === 'video' && firstItem.thumbnailUrl) {
        // Find image that needs replacing
        const img = link.querySelector('img');
        if (img) {
          // Set direct YouTube thumbnail URL
          img.src = firstItem.thumbnailUrl;
          img.removeAttribute('srcset'); // Remove srcset to ensure our src is used
          img.classList.add('ytfacade');
          
          // Ensure the image is visible
          img.style.display = 'block';
          img.style.maxWidth = '100%';
          
          // Add the YouTube play button overlay if it doesn't exist
          if (!link.querySelector('.yt-play-button')) {
            const playButton = document.createElement('div');
            playButton.className = 'yt-play-button';
            playButton.style.position = 'absolute';
            playButton.style.top = '50%';
            playButton.style.left = '50%';
            playButton.style.transform = 'translate(-50%, -50%)';
            playButton.style.width = '68px';
            playButton.style.height = '48px';
            playButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            playButton.style.borderRadius = '10px';
            playButton.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 68 48'%3E%3Cpath d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z' fill='%23f00'%3E%3C/path%3E%3Cpath d='M 45,24 27,14 27,34' fill='%23fff'%3E%3C/path%3E%3C/svg%3E\")";
            playButton.style.backgroundPosition = 'center';
            playButton.style.backgroundRepeat = 'no-repeat';
            playButton.style.backgroundSize = 'cover';
            playButton.style.transition = 'transform 0.2s ease';
            playButton.style.pointerEvents = 'none';
            playButton.style.zIndex = '2';
            
            // Make sure the parent is positioned relatively
            link.style.position = 'relative';
            link.style.display = 'block';
            
            link.appendChild(playButton);
          }
          
          // Add hover effect to parent
          link.addEventListener('mouseenter', function() {
            const playButton = link.querySelector('.yt-play-button');
            if (playButton) {
              playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
            }
          });
          
          link.addEventListener('mouseleave', function() {
            const playButton = link.querySelector('.yt-play-button');
            if (playButton) {
              playButton.style.transform = 'translate(-50%, -50%) scale(1)';
            }
          });
        }
      }
    } catch (error) {
      console.error('Error parsing lightbox data:', error);
    }
    
    // Ensure lightbox click functionality
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the lightbox data again (in case it was updated)
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
          
          // Create content container with aspect ratio wrapper
          const content = document.createElement('div');
          content.className = 'lightbox-content';
          content.style.width = '80%';
          content.style.maxWidth = '940px';
          content.style.position = 'relative';
          
          // Create responsive wrapper with 16:9 aspect ratio
          const aspectRatioWrapper = document.createElement('div');
          aspectRatioWrapper.style.position = 'relative';
          aspectRatioWrapper.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
          aspectRatioWrapper.style.height = 0;
          aspectRatioWrapper.style.overflow = 'hidden';
          
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
          closeBtn.style.fontSize = '40px';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.fontWeight = 'bold';
          closeBtn.style.padding = '0';
          closeBtn.style.lineHeight = '1';
          closeBtn.setAttribute('aria-label', 'Close');
          
          closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
            // Re-enable scrolling
            document.body.style.overflow = '';
          });
          
          // Create video container
          const videoContainer = document.createElement('div');
          videoContainer.style.position = 'absolute';
          videoContainer.style.top = 0;
          videoContainer.style.left = 0;
          videoContainer.style.width = '100%';
          videoContainer.style.height = '100%';
          videoContainer.innerHTML = firstItem.html;
          
          // Assemble the lightbox
          aspectRatioWrapper.appendChild(videoContainer);
          content.appendChild(closeBtn);
          content.appendChild(aspectRatioWrapper);
          overlay.appendChild(content);
          
          // Disable scrolling on the body
          document.body.style.overflow = 'hidden';
          
          // Add to document
          document.body.appendChild(overlay);
          
          // Close on overlay click (outside the video)
          overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
              document.body.removeChild(overlay);
              // Re-enable scrolling
              document.body.style.overflow = '';
            }
          });
          
          // Handle ESC key to close
          document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
              if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
                // Re-enable scrolling
                document.body.style.overflow = '';
              }
              document.removeEventListener('keydown', escHandler);
            }
          });
        }
      } catch (error) {
        console.error('Error opening lightbox:', error);
      }
    });
  });
}
