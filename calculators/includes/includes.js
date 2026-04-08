/**
 * HTML Include Loader
 * Loads header and footer from external files
 */

async function loadIncludes() {
  const includeElements = document.querySelectorAll('[data-include]');
  
  for (const element of includeElements) {
    const filePath = element.getAttribute('data-include');
    
    try {
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.status}`);
      }
      
      const html = await response.text();
      element.innerHTML = html;
      
      console.log(`✓ Loaded: ${filePath}`);
      
    } catch (error) {
      console.error(`✗ Error loading ${filePath}:`, error);
      element.innerHTML = `<p style="color:red;">Failed to load ${filePath}</p>`;
    }
  }
  
  // After includes are loaded, initialize any interactive elements
  initializeNavigation();
}

/**
 * Initialize navigation interactions (mobile menu, dropdowns, etc.)
 */
function initializeNavigation() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
      }
    });
  }
  
  // Dropdown hover/click handling
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = this.parentElement;
      dropdown.classList.toggle('active');
    });
  });
  
  // Highlight active page in navigation
  highlightActivePage();
}

/**
 * Highlight the current page in navigation
 */
function highlightActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '#calculators') {
      link.classList.add('active');
    }
  });
}

// Load includes when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadIncludes);
} else {
  // DOM is already loaded
  loadIncludes();
}