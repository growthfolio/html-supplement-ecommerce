// Main JavaScript Entry Point
import { DOM } from './utils/dom.js';
import { Validation } from './utils/validation.js';
import { ModalManager } from './modules/modal.js';
import './modules/navigation.js';
import './modules/theme.js';
import './modules/cart.js';
import './modules/favorites.js';
import './modules/scroll-effects.js';
import './modules/search.js';
import './modules/counter.js';
import './modules/mobile-search.js';

// App initialization
class App {
  constructor() {
    this.init();
  }
  
  init() {
    this.initInteractiveFeatures();
    this.initForms();
    this.initLazyLoading();
    this.initAnimations();
  }
  
  // Interactive features for home page
  initInteractiveFeatures() {
    const features = DOM.selectAll('.interactive-feature');
    
    features.forEach(feature => {
      DOM.on(feature, 'click', () => {
        // Toggle active state
        const isActive = DOM.hasClass(feature, 'interactive-feature--active');
        
        // Close all features
        features.forEach(f => DOM.removeClass(f, 'interactive-feature--active'));
        
        // Open clicked feature if it wasn't active
        if (!isActive) {
          DOM.addClass(feature, 'interactive-feature--active');
        }
      });
      
      // Close on escape key
      DOM.on(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
          DOM.removeClass(feature, 'interactive-feature--active');
        }
      });
    });
  }
  
  // Form handling
  initForms() {
    this.initLoginForm();
    this.initRegisterForm();
  }
  
  initLoginForm() {
    const form = DOM.select('#login-form');
    if (!form) return;
    
    DOM.on(form, 'submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');
      
      // Basic validation
      if (!email || !password) {
        this.showNotification('Por favor, preencha todos os campos.', 'error');
        return;
      }
      
      if (!Validation.isValidEmail(email)) {
        this.showNotification('Por favor, digite um e-mail válido.', 'error');
        return;
      }
      
      // Simulate login
      this.simulateLogin(email, password);
    });
  }
  
  initRegisterForm() {
    const form = DOM.select('#register-form');
    if (!form) return;
    
    // Real-time validation
    const fields = {
      'register-firstname': ['required', 'name'],
      'register-lastname': ['required', 'name'],
      'register-email': ['required', 'email'],
      'register-phone': ['phone'],
      'register-password': ['required', 'password'],
      'register-confirm-password': ['required', 'confirmPassword']
    };
    
    Object.entries(fields).forEach(([fieldId, rules]) => {
      const field = DOM.select(`#${fieldId}`);
      const errorElement = DOM.select(`#${fieldId.replace('register-', '')}-error`);
      
      if (field && errorElement) {
        DOM.on(field, 'blur', () => {
          this.validateField(field, rules, errorElement);
        });
        
        DOM.on(field, 'input', () => {
          if (DOM.hasClass(field, 'form__input--error')) {
            this.validateField(field, rules, errorElement);
          }
        });
      }
    });
    
    // Phone formatting
    const phoneField = DOM.select('#register-phone');
    if (phoneField) {
      DOM.on(phoneField, 'input', (e) => {
        e.target.value = Validation.formatPhone(e.target.value);
      });
    }
    
    // Form submission
    DOM.on(form, 'submit', (e) => {
      e.preventDefault();
      this.handleRegisterSubmit(form, fields);
    });
  }
  
  validateField(field, rules, errorElement) {
    const value = field.value;
    const originalPassword = rules.includes('confirmPassword') 
      ? DOM.select('#register-password').value 
      : null;
    
    const result = Validation.validateField(value, rules, originalPassword);
    
    if (result.isValid) {
      DOM.removeClass(field, 'form__input--error');
      DOM.addClass(field, 'form__input--success');
      errorElement.textContent = '';
    } else {
      DOM.addClass(field, 'form__input--error');
      DOM.removeClass(field, 'form__input--success');
      errorElement.textContent = result.errors[0];
    }
    
    return result.isValid;
  }
  
  handleRegisterSubmit(form, fields) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    let isFormValid = true;
    Object.entries(fields).forEach(([fieldId, rules]) => {
      const field = DOM.select(`#${fieldId}`);
      const errorElement = DOM.select(`#${fieldId.replace('register-', '')}-error`);
      
      if (field && errorElement) {
        const isValid = this.validateField(field, rules, errorElement);
        if (!isValid) isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      this.showNotification('Por favor, corrija os erros no formulário.', 'error');
      return;
    }
    
    // Simulate registration
    this.simulateRegistration(data);
  }
  
  simulateLogin(email, password) {
    const submitButton = DOM.select('#login-form button[type="submit"]');
    DOM.addClass(submitButton, 'btn--loading');
    
    setTimeout(() => {
      DOM.removeClass(submitButton, 'btn--loading');
      this.showNotification('Login realizado com sucesso!', 'success');
      ModalManager.close('login-modal');
    }, 1500);
  }
  
  simulateRegistration(data) {
    const submitButton = DOM.select('#register-form button[type="submit"]');
    DOM.addClass(submitButton, 'btn--loading');
    
    setTimeout(() => {
      DOM.removeClass(submitButton, 'btn--loading');
      this.showNotification('Cadastro realizado com sucesso!', 'success');
      ModalManager.close('register-modal');
    }, 2000);
  }
  
  // Lazy loading for images
  initLazyLoading() {
    const images = DOM.selectAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Scroll animations
  initAnimations() {
    const animatedElements = DOM.selectAll('.card, .feature, .section__header');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            DOM.addClass(entry.target, 'animate-fade-in');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }
  
  // Notification system
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = DOM.select('.notification');
    if (existing) existing.remove();
    
    const notification = DOM.create('div', {
      className: `notification notification--${type}`,
      role: 'alert',
      'aria-live': 'polite'
    }, `
      <span class="notification__message">${message}</span>
      <button class="notification__close" aria-label="Fechar notificação">
        <span class="material-symbols-outlined">close</span>
      </button>
    `);
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      maxWidth: '400px',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification__close');
    DOM.on(closeBtn, 'click', () => notification.remove());
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}