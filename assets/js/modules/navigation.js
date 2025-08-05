// Navigation Module
import { DOM } from '../utils/dom.js';

export class Navigation {
  constructor() {
    this.nav = DOM.select('.nav');
    this.navToggle = DOM.select('.nav__toggle');
    this.navList = DOM.select('.nav__list');
    this.navLinks = DOM.selectAll('.nav__link');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.nav || !this.navToggle) return;
    
    // Toggle button event
    DOM.on(this.navToggle, 'click', () => this.toggle());
    
    // Close menu when clicking on links (mobile)
    this.navLinks.forEach(link => {
      DOM.on(link, 'click', () => {
        if (window.innerWidth <= 1024) {
          this.close();
        }
      });
    });
    
    // Close menu on window resize
    DOM.on(window, 'resize', () => {
      if (window.innerWidth > 1024 && this.isOpen) {
        this.close();
      }
    });
    
    // Close menu when clicking outside
    DOM.on(document, 'click', (e) => {
      if (this.isOpen && !this.nav.contains(e.target)) {
        this.close();
      }
    });
    
    // Handle active link
    this.setActiveLink();
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    DOM.addClass(this.navToggle, 'nav__toggle--active');
    DOM.addClass(this.navList, 'nav__list--active');
    DOM.addClass(document.body, 'nav-open');
    this.isOpen = true;
  }
  
  close() {
    DOM.removeClass(this.navToggle, 'nav__toggle--active');
    DOM.removeClass(this.navList, 'nav__list--active');
    DOM.removeClass(document.body, 'nav-open');
    this.isOpen = false;
  }
  
  setActiveLink() {
    const currentPath = window.location.pathname;
    
    this.navLinks.forEach(link => {
      DOM.removeClass(link, 'nav__link--active');
      
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath.includes('index.html'))) {
        DOM.addClass(link, 'nav__link--active');
      }
    });
  }
}

// Search functionality
export class Search {
  constructor() {
    this.searchForm = DOM.select('.search');
    this.searchInput = DOM.select('.search__input');
    this.searchButton = DOM.select('.search__button');
    
    this.init();
  }
  
  init() {
    if (!this.searchForm) return;
    
    DOM.on(this.searchForm, 'submit', (e) => this.handleSearch(e));
    DOM.on(this.searchInput, 'input', (e) => this.handleInput(e));
  }
  
  handleSearch(e) {
    e.preventDefault();
    const query = this.searchInput.value.trim();
    
    if (query) {
      this.performSearch(query);
    }
  }
  
  handleInput(e) {
    const query = e.target.value.trim();
    
    // Real-time search suggestions could be implemented here
    if (query.length >= 3) {
      // this.showSuggestions(query);
    }
  }
  
  performSearch(query) {
    // For now, we'll just log the search
    console.log('Searching for:', query);
    
    // In a real application, this would:
    // 1. Send request to search API
    // 2. Filter products
    // 3. Update UI with results
    // 4. Handle search history
    
    // Simple client-side search for demonstration
    this.searchProducts(query);
  }
  
  searchProducts(query) {
    const products = DOM.selectAll('.card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
      const title = DOM.select('.card__title', product);
      const description = DOM.select('.card__description', product);
      
      if (title || description) {
        const titleText = title ? title.textContent.toLowerCase() : '';
        const descText = description ? description.textContent.toLowerCase() : '';
        
        if (titleText.includes(searchTerm) || descText.includes(searchTerm)) {
          DOM.show(product.parentElement);
        } else {
          DOM.hide(product.parentElement);
        }
      }
    });
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new Search();
});