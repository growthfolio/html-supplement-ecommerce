// Modal Module
import { DOM } from '../utils/dom.js';

export class Modal {
  constructor(modalId) {
    this.modal = DOM.select(`#${modalId}`);
    this.closeButtons = DOM.selectAll(`#${modalId} [data-modal-close]`);
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Close button events
    this.closeButtons.forEach(button => {
      DOM.on(button, 'click', () => this.close());
    });
    
    // Close on backdrop click
    DOM.on(this.modal, 'click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
    
    // Close on Escape key
    DOM.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }
  
  open() {
    if (this.isOpen) return;
    
    DOM.addClass(this.modal, 'modal--active');
    DOM.addClass(document.body, 'modal-open');
    this.isOpen = true;
    
    // Focus management
    this.focusFirstElement();
    
    // Emit custom event
    this.modal.dispatchEvent(new CustomEvent('modal:open'));
  }
  
  close() {
    if (!this.isOpen) return;
    
    DOM.removeClass(this.modal, 'modal--active');
    DOM.removeClass(document.body, 'modal-open');
    this.isOpen = false;
    
    // Emit custom event
    this.modal.dispatchEvent(new CustomEvent('modal:close'));
  }
  
  focusFirstElement() {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
  
  setContent(content) {
    const modalBody = DOM.select('.modal__body', this.modal);
    if (modalBody) {
      modalBody.innerHTML = content;
    }
  }
  
  setTitle(title) {
    const modalTitle = DOM.select('.modal__title', this.modal);
    if (modalTitle) {
      modalTitle.textContent = title;
    }
  }
}

// Modal Manager
export const ModalManager = {
  modals: new Map(),
  
  register(modalId) {
    if (!this.modals.has(modalId)) {
      const modal = new Modal(modalId);
      this.modals.set(modalId, modal);
    }
    return this.modals.get(modalId);
  },
  
  open(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.open();
    }
  },
  
  close(modalId) {
    const modal = this.modals.get(modalId);
    if (modal) {
      modal.close();
    }
  },
  
  closeAll() {
    this.modals.forEach(modal => modal.close());
  }
};

// Auto-initialize modals
document.addEventListener('DOMContentLoaded', () => {
  const modals = DOM.selectAll('[data-modal]');
  modals.forEach(modal => {
    const modalId = modal.id;
    if (modalId) {
      ModalManager.register(modalId);
    }
  });
  
  // Modal trigger buttons
  const triggers = DOM.selectAll('[data-modal-target]');
  triggers.forEach(trigger => {
    DOM.on(trigger, 'click', (e) => {
      e.preventDefault();
      const targetModal = trigger.dataset.modalTarget;
      ModalManager.open(targetModal);
    });
  });
});