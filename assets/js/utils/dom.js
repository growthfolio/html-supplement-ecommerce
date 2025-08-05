// DOM Utilities
export const DOM = {
  // Element selection
  select: (selector) => document.querySelector(selector),
  selectAll: (selector) => document.querySelectorAll(selector),
  
  // Element creation
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      element.innerHTML = content;
    }
    
    return element;
  },
  
  // Class manipulation
  addClass: (element, className) => element.classList.add(className),
  removeClass: (element, className) => element.classList.remove(className),
  toggleClass: (element, className) => element.classList.toggle(className),
  hasClass: (element, className) => element.classList.contains(className),
  
  // Event handling
  on: (element, event, handler, options = {}) => {
    element.addEventListener(event, handler, options);
  },
  
  off: (element, event, handler) => {
    element.removeEventListener(event, handler);
  },
  
  // Attribute manipulation
  attr: (element, name, value) => {
    if (value === undefined) {
      return element.getAttribute(name);
    }
    element.setAttribute(name, value);
  },
  
  removeAttr: (element, name) => {
    element.removeAttribute(name);
  },
  
  // Style manipulation
  css: (element, property, value) => {
    if (value === undefined) {
      return getComputedStyle(element)[property];
    }
    element.style[property] = value;
  },
  
  // Visibility
  show: (element) => {
    element.style.display = '';
  },
  
  hide: (element) => {
    element.style.display = 'none';
  },
  
  // Animation helpers
  fadeIn: (element, duration = 300) => {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },
  
  fadeOut: (element, duration = 300) => {
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = initialOpacity * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };
    
    requestAnimationFrame(animate);
  }
};