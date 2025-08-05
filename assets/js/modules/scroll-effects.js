// Scroll Effects Module
import { DOM } from '../utils/dom.js';

export class ScrollEffects {
  constructor() {
    this.init();
  }
  
  init() {
    this.createScrollIndicator();
    this.createBackToTop();
    this.initSectionReveal();
    this.initParallax();
  }
  
  createScrollIndicator() {
    const indicator = DOM.create('div', {
      className: 'scroll-indicator'
    });
    
    document.body.appendChild(indicator);
    
    DOM.on(window, 'scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      indicator.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
  }
  
  createBackToTop() {
    const backToTop = DOM.create('button', {
      className: 'back-to-top',
      'aria-label': 'Voltar ao topo'
    }, `
      <span class="material-symbols-outlined back-to-top__icon">keyboard_arrow_up</span>
    `);
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll position
    DOM.on(window, 'scroll', () => {
      if (window.pageYOffset > 300) {
        DOM.addClass(backToTop, 'back-to-top--visible');
      } else {
        DOM.removeClass(backToTop, 'back-to-top--visible');
      }
    });
    
    // Smooth scroll to top
    DOM.on(backToTop, 'click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  initSectionReveal() {
    const sections = DOM.selectAll('.section, .card, .feature');
    
    // Add reveal class to sections
    sections.forEach(section => {
      DOM.addClass(section, 'section-reveal');
    });
    
    // Intersection Observer for reveal animation
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            DOM.addClass(entry.target, 'section-reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      sections.forEach(section => {
        revealObserver.observe(section);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      sections.forEach(section => {
        DOM.addClass(section, 'section-reveal--visible');
      });
    }
  }
  
  initParallax() {
    const parallaxElements = DOM.selectAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    DOM.on(window, 'scroll', () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
  
  // Smooth scroll for anchor links
  initSmoothScroll() {
    DOM.on(document, 'click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = DOM.select(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = DOM.select('.header')?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  }
  
  // Add scroll-based header styling
  initHeaderScroll() {
    const header = DOM.select('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    DOM.on(window, 'scroll', () => {
      const scrollTop = window.pageYOffset;
      
      // Add/remove scrolled class
      if (scrollTop > 50) {
        DOM.addClass(header, 'header--scrolled');
      } else {
        DOM.removeClass(header, 'header--scrolled');
      }
      
      // Hide/show header on scroll
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        DOM.addClass(header, 'header--hidden');
      } else {
        DOM.removeClass(header, 'header--hidden');
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // Lazy load images with fade-in effect
  initLazyImages() {
    const images = DOM.selectAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading class
            DOM.addClass(img, 'image-loading');
            
            // Load image
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            
            // Remove loading class when loaded
            DOM.on(img, 'load', () => {
              DOM.removeClass(img, 'image-loading');
              DOM.addClass(img, 'image-loaded');
            });
            
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new ScrollEffects();
});