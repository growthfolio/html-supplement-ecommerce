// Theme Module
import { DOM } from '../utils/dom.js';

export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.toggle = null;
    this.init();
  }
  
  init() {
    this.applyTheme(this.currentTheme);
    this.createToggle();
    this.bindEvents();
  }
  
  createToggle() {
    const toggle = DOM.create('div', {
      className: 'theme-toggle tooltip',
      'data-tooltip': 'Alternar tema'
    }, `
      <span class="material-symbols-outlined theme-toggle__icon ${this.currentTheme === 'light' ? '' : 'theme-toggle__icon--active'}">
        ${this.currentTheme === 'light' ? 'light_mode' : 'dark_mode'}
      </span>
      <div class="theme-toggle__switch ${this.currentTheme === 'dark' ? 'theme-toggle__switch--active' : ''}"></div>
      <div class="tooltip__content">Alternar tema</div>
    `);
    
    // Add to header
    const nav = DOM.select('.nav__list');
    if (nav) {
      const li = DOM.create('li');
      li.appendChild(toggle);
      nav.insertBefore(li, nav.firstChild);
    }
    
    this.toggle = toggle;
  }
  
  bindEvents() {
    if (this.toggle) {
      DOM.on(this.toggle, 'click', () => this.toggleTheme());
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      DOM.on(mediaQuery, 'change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.updateToggle();
    localStorage.setItem('theme', theme);
    
    // Emit theme change event
    document.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  updateToggle() {
    if (!this.toggle) return;
    
    const icon = DOM.select('.theme-toggle__icon', this.toggle);
    const switchEl = DOM.select('.theme-toggle__switch', this.toggle);
    
    if (this.currentTheme === 'dark') {
      icon.textContent = 'dark_mode';
      DOM.addClass(icon, 'theme-toggle__icon--active');
      DOM.addClass(switchEl, 'theme-toggle__switch--active');
    } else {
      icon.textContent = 'light_mode';
      DOM.removeClass(icon, 'theme-toggle__icon--active');
      DOM.removeClass(switchEl, 'theme-toggle__switch--active');
    }
  }
  
  getTheme() {
    return this.currentTheme;
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});