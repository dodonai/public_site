/**
 * Dodon.ai Main JavaScript File
 * This file consolidates all necessary JavaScript functionality for the Dodon.ai website
 */

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initDropdowns();
  initSliders();
  initMobileMenu();
  initAnimations();
  initLightbox();
  initForms();
  initRotatingText();
  fixImagePaths(); // Added function to fix image paths
});

/**
 * Fix Image Paths
 * Ensures all image paths are properly formatted
 */
function fixImagePaths() {
  // Fix image src attributes
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && src.startsWith('./assets/')) {
      img.src = src.replace('./assets/', '/assets/');
    }
  });
  
  // Fix image srcset attributes
  document.querySelectorAll('img[srcset]').forEach(img => {
    const srcset = img.getAttribute('srcset');
    if (srcset && srcset.includes('./assets/')) {
      img.srcset = srcset.replace(/\.\\/assets\//g, '/assets/');
    }
  });
  
  // Fix background images in inline styles
  document.querySelectorAll('[style*="background"]').forEach(el => {
    const style = el.getAttribute('style');
    if (style && style.includes('./assets/')) {
      el.style = style.replace('./assets/', '/assets/');
    }
  });
}

/**
 * Dropdown Menu Functionality
 * Handles the services dropdown in the navigation
 */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.w-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.w-dropdown-toggle');
    const list = dropdown.querySelector('.w-dropdown-list');
    
    if (!toggle || !list) return;
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      list.classList.toggle('w--open');
      toggle.classList.toggle('w--open');
      
      // Check if any other dropdowns are open and close them
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          const otherList = otherDropdown.querySelector('.w-dropdown-list');
          const otherToggle = otherDropdown.querySelector('.w-dropdown-toggle');
          if (otherList) otherList.classList.remove('w--open');
          if (otherToggle) otherToggle.classList.remove('w--open');
        }
      });
    });
    
    // Add hover functionality if data-hover attribute is set to true
    if (dropdown.getAttribute('data-hover') === 'true') {
      dropdown.addEventListener('mouseenter', function() {
        list.classList.add('w--open');
        toggle.classList.add('w--open');
      });
      
      dropdown.addEventListener('mouseleave', function() {
        list.classList.remove('w--open');
        toggle.classList.remove('w--open');
      });
    }
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        list.classList.remove('w--open');
        toggle.classList.remove('w--open');
      }
    });
  });
}

/**
 * Slider/Carousel Functionality
 * Handles all sliders including testimonial slider
 */
function initSliders() {
  const sliders = document.querySelectorAll('.w-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.w-slide');
    const mask = slider.querySelector('.w-slider-mask');
    const navButtons = slider.querySelectorAll('.w-slider-nav div');
    const leftArrow = slider.querySelector('.w-slider-arrow-left');
    const rightArrow = slider.querySelector('.w-slider-arrow-right');
    
    if (!slides.length || !mask) return;
    
    let currentSlide = 0;
    let autoplayInterval = null;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Check for autoplay settings
    const autoplay = slider.getAttribute('data-autoplay') === 'true';
    const delay = parseInt(slider.getAttribute('data-delay') || '4000', 10);
    const animation = slider.getAttribute('data-animation') || 'slide';
    
    // Function to show a specific slide
    function showSlide(index) {
      // Handle index boundaries
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Update current slide
      currentSlide = index;
      
      // Update slide positioning
      slides.forEach((slide, i) => {
        if (animation === 'fade') {
          slide.style.opacity = i === currentSlide ? '1' : '0';
          slide.style.transition = 'opacity 0.5s ease';
          slide.style.position = 'absolute';
          slide.style.left = 0;
          slide.style.top = 0;
          slide.style.zIndex = i === currentSlide ? 1 : 0;
        } else { // Default to slide animation
          slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        }
        slide.setAttribute('aria-hidden', i !== currentSlide ? 'true' : 'false');
      });
      
      // Update navigation dots
      if (navButtons.length) {
        navButtons.forEach((nav, i) => {
          nav.classList.toggle('w-active', i === currentSlide);
        });
      }
    }
    
    // Set up slide styles
    slides.forEach((slide, i) => {
      // Fix for slides being stacked - ensure proper positioning
      slide.style.position = 'absolute';
      slide.style.left = 0;
      slide.style.top = 0;
      slide.style.width = '100%';
      slide.style.height = '100%';
      slide.style.display = 'block';
      
      if (animation === 'fade') {
        slide.style.opacity = i === 0 ? '1' : '0';
        slide.style.transition = 'opacity 0.5s ease';
        slide.style.zIndex = i === 0 ? 1 : 0;
      } else {
        slide.style.transition = 'transform 0.5s ease';
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
      }
    });
    
    // Set mask height to match current slide height
    function updateMaskHeight() {
      if (slides[currentSlide]) {
        // Set a minimum height to prevent collapse
        const slideHeight = Math.max(slides[currentSlide].offsetHeight, 200);
        mask.style.height = `${slideHeight}px`;
      }
    }
    
    // Set mask style for slider to work properly
    if (mask) {
      mask.style.position = 'relative';
      mask.style.overflow = 'hidden';
      mask.style.width = '100%';
    }
    
    // Update height initially and on window resize
    updateMaskHeight();
    window.addEventListener('resize', updateMaskHeight);
    
    // Set up click handlers for arrows
    if (leftArrow) {
      leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentSlide - 1);
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      });
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentSlide + 1);
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      });
    }
    
    // Set up click handlers for nav buttons
    navButtons.forEach((nav, i) => {
      nav.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(i);
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          startAutoplay();
        }
      });
    });
    
    // Set up touch swipe functionality
    mask.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    mask.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance for swipe
      const diff = touchEndX - touchStartX;
      
      if (diff > swipeThreshold) {
        // Swipe right, go to previous slide
        showSlide(currentSlide - 1);
      } else if (diff < -swipeThreshold) {
        // Swipe left, go to next slide
        showSlide(currentSlide + 1);
      }
      
      if (autoplayInterval && Math.abs(diff) > swipeThreshold) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }
    
    // Set up autoplay if enabled
    function startAutoplay() {
      if (autoplay) {
        autoplayInterval = setInterval(() => {
          showSlide(currentSlide + 1);
        }, delay);
      }
    }
    
    startAutoplay();
    
    // Initialize first slide
    showSlide(0);
  });
}

/**
 * Mobile Menu Functionality
 * Handles the mobile navigation toggle
 */
function initMobileMenu() {
  const menuButton = document.querySelector('.w-nav-button');
  const menuList = document.querySelector('.w-nav-menu');
  
  if (menuButton && menuList) {
    menuButton.addEventListener('click', function(e) {
      e.preventDefault();
      menuButton.classList.toggle('w--open');
      menuList.classList.toggle('w--open');
      
      // Toggle aria-expanded attribute for accessibility
      const isExpanded = menuButton.classList.contains('w--open');
      menuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuButton.contains(e.target) && !menuList.contains(e.target) && menuList.classList.contains('w--open')) {
        menuButton.classList.remove('w--open');
        menuList.classList.remove('w--open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Animation Functionality
 * Handles fade-in animations when scrolling
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-w-id]');
  
  // Simple intersection observer to trigger animations when elements are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Handle opacity animations
        if (element.style.opacity === '0') {
          element.style.opacity = '1';
          element.style.transition = 'opacity 0.8s ease';
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Lightbox Functionality for YouTube Videos
 * Handles displaying videos in a lightbox overlay
 */
function initLightbox() {
  // Find all YouTube video links with lightbox
  const lightboxLinks = document.querySelectorAll('.w-lightbox');
  
  lightboxLinks.forEach(link => {
    // Add a visual indication that this is clickable
    link.style.cursor = 'pointer';
    
    // Add click event listener
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
        console.error('Error parsing lightbox data:', error);
      }
    });
    
    // Add a YouTube play button overlay to the image if not already there
    if (link.querySelector('.ytfacade')) {
      const ytImage = link.querySelector('.ytfacade');
      
      // Add YouTube play button overlay if not already present
      if (!ytImage.classList.contains('yt-play-button-added')) {
        ytImage.classList.add('yt-play-button-added');
      }
    }
  });
}

/**
 * Form Functionality
 * Handles form submissions and validation
 */
function initForms() {
  const forms = document.querySelectorAll('.w-form');
  
  forms.forEach(form => {
    const formElement = form.querySelector('form');
    const successMessage = form.querySelector('.w-form-done');
    const errorMessage = form.querySelector('.w-form-fail');
    
    if (!formElement || !successMessage || !errorMessage) return;
    
    formElement.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const requiredInputs = formElement.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value.trim())) {
            isValid = false;
            input.classList.add('error');
          }
        }
      });
      
      if (!isValid) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
      }
      
      // For demonstration purposes, we'll just show the success message
      // In a real implementation, you would send the form data to your server
      const formData = new FormData(formElement);
      
      // Simulate a form submission (replace with actual AJAX request)
      setTimeout(() => {
        // Success case
        formElement.reset();
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }, 500);
    });
    
    // Add input event listeners to remove error class when user types
    const allInputs = formElement.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('error');
        errorMessage.style.display = 'none';
      });
    });
  });
}

/**
 * Rotating Text Functionality
 * Handles the rotating text on the homepage
 */
function initRotatingText() {
  const changerMove = document.querySelector('.changer-move');
  if (!changerMove) return;
  
  const changers = changerMove.querySelectorAll('.changer');
  if (!changers.length) return;
  
  // Get the height of the first changer
  const changerHeight = changers[0].offsetHeight;
  let currentChanger = 0;
  
  // Set initial position
  changerMove.style.transition = 'transform 0.5s ease';
  
  // Function to move to the next text
  function moveToNext() {
    currentChanger = (currentChanger + 1) % changers.length;
    changerMove.style.transform = `translateY(-${currentChanger * changerHeight}px)`;
  }
  
  // Set interval for rotation
  setInterval(moveToNext, 3000);
}
