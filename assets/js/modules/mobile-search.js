// Mobile Search Toggle
import { DOM } from '../utils/dom.js';

export class MobileSearch {
  constructor() {
    this.init();
  }
  
  init() {
    this.createSearchToggle();
    this.bindEvents();
  }
  
  createSearchToggle() {
    // Add search toggle button to mobile nav
    const navList = DOM.select('.nav__list');
    if (!navList) return;
    
    const searchToggle = DOM.create('li', {}, `
      <button class="nav__link mobile-search-toggle" aria-label="Abrir busca">
        <span class="material-symbols-outlined">search</span>
        Buscar
      </button>
    `);
    
    // Insert as first item
    navList.insertBefore(searchToggle, navList.firstChild);
    
    this.searchToggle = searchToggle;
  }
  
  bindEvents() {
    if (!this.searchToggle) return;
    
    const toggleBtn = DOM.select('.mobile-search-toggle', this.searchToggle);
    const searchContainer = DOM.select('.header__search');
    
    DOM.on(toggleBtn, 'click', () => {
      DOM.toggleClass(searchContainer, 'header__search--mobile-active');
      
      // Focus input when opened
      if (DOM.hasClass(searchContainer, 'header__search--mobile-active')) {
        const input = DOM.select('.search__input', searchContainer);
        setTimeout(() => input.focus(), 300);
      }
    });
    
    // Close search when clicking outside
    DOM.on(document, 'click', (e) => {
      if (!searchContainer.contains(e.target) && !this.searchToggle.contains(e.target)) {
        DOM.removeClass(searchContainer, 'header__search--mobile-active');
      }
    });
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new MobileSearch();
});