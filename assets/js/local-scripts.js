ddEventListener('DOMContentLoaded', function() {
  // Initialize dropdown menus
  initDropdowns();
  
  // Initialize sliders
  initSliders();
  
  // Handle mobile menu toggle
  initMobileMenu();
  
  // Handle animations
  initAnimations();
});

// Dropdown functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.w-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.w-dropdown-toggle');
    const list = dropdown.querySelector('.w-dropdown-list');
    
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      list.classList.toggle('w--open');
      toggle.classList.toggle('w--open');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        list.classList.remove('w--open');
        toggle.classList.remove('w--open');
      }
    });
  });
}

// Slider functionality
function initSliders() {
  const sliders = document.querySelectorAll('.w-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.w-slide');
    const mask = slider.querySelector('.w-slider-mask');
    const navButtons = slider.querySelectorAll('.w-slider-nav div');
    const leftArrow = slider.querySelector('.w-slider-arrow-left');
    const rightArrow = slider.querySelector('.w-slider-arrow-right');
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      // Handle index boundaries
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Update current slide
      currentSlide = index;
      
      // Update slide positioning
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        slide.setAttribute('aria-hidden', i !== currentSlide);
      });
      
      // Update navigation dots
      if (navButtons.length) {
        navButtons.forEach((nav, i) => {
          nav.classList.toggle('w-active', i === currentSlide);
        });
      }
    }
    
    // Initialize slide positions
    slides.forEach((slide, i) => {
      slide.style.position = 'absolute';
      slide.style.left = 0;
      slide.style.top = 0;
      slide.style.width = '100%';
      slide.style.transition = 'transform 0.5s ease';
    });
    
    // Set up click handlers for arrows
    if (leftArrow) {
      leftArrow.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (rightArrow) {
      rightArrow.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    // Set up click handlers for nav buttons
    navButtons.forEach((nav, i) => {
      nav.addEventListener('click', () => showSlide(i));
    });
    
    // Initialize first slide
    showSlide(0);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuButton = document.querySelector('.w-nav-button');
  const menuList = document.querySelector('.w-nav-menu');
  
  if (menuButton && menuList) {
    menuButton.addEventListener('click', function() {
      menuButton.classList.toggle('w--open');
      menuList.classList.toggle('w--open');
    });
  }
}

// Animation functionality (basic implementation of Webflow animations)
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
          element.style.transition = 'opacity 0.5s ease';
        }
        
        // Add more animation types as needed based on your site's requirements
        
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
