// Counter Animation Module
import { DOM } from '../utils/dom.js';

export class CounterAnimation {
  constructor() {
    this.counters = DOM.selectAll('[data-count]');
    this.init();
  }
  
  init() {
    if (this.counters.length === 0) return;
    
    this.setupIntersectionObserver();
  }
  
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });
      
      this.counters.forEach(counter => {
        observer.observe(counter);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      this.counters.forEach(counter => {
        this.animateCounter(counter);
      });
    }
  }
  
  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    DOM.addClass(element, 'animate');
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      element.textContent = this.formatNumber(Math.floor(current));
    }, 16);
  }
  
  formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new CounterAnimation();
});