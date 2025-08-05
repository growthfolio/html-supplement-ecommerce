// Cart Module
import { DOM } from '../utils/dom.js';

export class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.isOpen = false;
    this.init();
  }
  
  init() {
    this.createCartUI();
    this.bindEvents();
    this.updateCartDisplay();
  }
  
  createCartUI() {
    // Create cart toggle button
    const cartToggle = DOM.create('div', {
      className: 'cart-toggle tooltip'
    }, `
      <button class="cart-toggle__btn" aria-label="Abrir carrinho">
        <span class="material-symbols-outlined cart-toggle__icon">shopping_cart</span>
        <span class="cart-toggle__badge">0</span>
      </button>
      <div class="tooltip__content">Carrinho de compras</div>
    `);
    
    // Add to header
    const nav = DOM.select('.nav__list');
    if (nav) {
      const li = DOM.create('li');
      li.appendChild(cartToggle);
      nav.appendChild(li);
    }
    
    // Create cart sidebar
    const cartSidebar = DOM.create('div', {
      className: 'cart-sidebar',
      id: 'cart-sidebar'
    }, `
      <div class="cart-sidebar__header">
        <h3 class="cart-sidebar__title">Carrinho de Compras</h3>
        <button class="cart-sidebar__close" aria-label="Fechar carrinho">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="cart-sidebar__content">
        <div class="cart-items"></div>
      </div>
      <div class="cart-sidebar__footer">
        <div class="cart-summary">
          <div class="cart-summary__row">
            <span>Subtotal:</span>
            <span class="cart-subtotal">R$ 0,00</span>
          </div>
          <div class="cart-summary__row cart-summary__total">
            <span>Total:</span>
            <span class="cart-total">R$ 0,00</span>
          </div>
          <button class="btn btn--primary btn--full" disabled>
            Finalizar Compra
          </button>
        </div>
      </div>
    `);
    
    document.body.appendChild(cartSidebar);
    
    this.cartToggle = cartToggle;
    this.cartSidebar = cartSidebar;
  }
  
  bindEvents() {
    // Toggle cart
    const toggleBtn = DOM.select('.cart-toggle__btn', this.cartToggle);
    DOM.on(toggleBtn, 'click', () => this.toggleCart());
    
    // Close cart
    const closeBtn = DOM.select('.cart-sidebar__close', this.cartSidebar);
    DOM.on(closeBtn, 'click', () => this.closeCart());
    
    // Close on backdrop click
    DOM.on(document, 'click', (e) => {
      if (this.isOpen && !this.cartSidebar.contains(e.target) && !this.cartToggle.contains(e.target)) {
        this.closeCart();
      }
    });
    
    // Add to cart buttons
    DOM.on(document, 'click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        e.preventDefault();
        const button = e.target.closest('.add-to-cart');
        const productId = button.dataset.productId;
        this.addToCart(productId, button);
      }
    });
  }
  
  addToCart(productId, button) {
    // Get product info from DOM
    const productCard = button.closest('.product-card') || button.closest('.card');
    const title = DOM.select('.card__title', productCard)?.textContent || 'Produto';
    const priceText = DOM.select('.card__price', productCard)?.textContent || 'R$ 0,00';
    const price = this.extractPrice(priceText);
    const image = DOM.select('.card__image', productCard)?.src || '';
    
    const product = {
      id: productId,
      name: title,
      price: price,
      image: image,
      quantity: 1
    };
    
    // Check if item already exists
    const existingItem = this.items.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push(product);
    }
    
    this.saveCart();
    this.updateCartDisplay();
    this.showAddedToCartFeedback(button);
    
    // Auto-open cart
    setTimeout(() => this.openCart(), 300);
  }
  
  removeFromCart(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }
  
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }
  
  updateCartDisplay() {
    this.updateCartBadge();
    this.updateCartItems();
    this.updateCartSummary();
  }
  
  updateCartBadge() {
    const badge = DOM.select('.cart-toggle__badge', this.cartToggle);
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    
    badge.textContent = totalItems;
    
    if (totalItems > 0) {
      DOM.addClass(badge, 'cart-toggle__badge--visible');
    } else {
      DOM.removeClass(badge, 'cart-toggle__badge--visible');
    }
  }
  
  updateCartItems() {
    const container = DOM.select('.cart-items', this.cartSidebar);
    
    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <h4 class="cart-empty__title">Seu carrinho está vazio</h4>
          <p>Adicione produtos para começar suas compras</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__image">
        <div class="cart-item__details">
          <h4 class="cart-item__name">${item.name}</h4>
          <p class="cart-item__price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
          <div class="cart-item__controls">
            <div class="cart-item__quantity">
              <button class="cart-item__quantity-btn" data-action="decrease">-</button>
              <span class="cart-item__quantity-value">${item.quantity}</span>
              <button class="cart-item__quantity-btn" data-action="increase">+</button>
            </div>
            <button class="cart-item__remove" data-action="remove">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // Bind item events
    DOM.on(container, 'click', (e) => {
      const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
      const itemEl = e.target.closest('.cart-item');
      const itemId = itemEl?.dataset.id;
      
      if (!itemId || !action) return;
      
      const item = this.items.find(i => i.id === itemId);
      if (!item) return;
      
      switch (action) {
        case 'increase':
          this.updateQuantity(itemId, item.quantity + 1);
          break;
        case 'decrease':
          this.updateQuantity(itemId, item.quantity - 1);
          break;
        case 'remove':
          this.removeFromCart(itemId);
          break;
      }
    });
  }
  
  updateCartSummary() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Add shipping, taxes, etc. here
    
    const subtotalEl = DOM.select('.cart-subtotal', this.cartSidebar);
    const totalEl = DOM.select('.cart-total', this.cartSidebar);
    const checkoutBtn = DOM.select('.btn', this.cartSidebar);
    
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if (checkoutBtn) {
      checkoutBtn.disabled = this.items.length === 0;
    }
  }
  
  toggleCart() {
    if (this.isOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }
  
  openCart() {
    DOM.addClass(this.cartSidebar, 'cart-sidebar--open');
    DOM.addClass(document.body, 'cart-open');
    this.isOpen = true;
  }
  
  closeCart() {
    DOM.removeClass(this.cartSidebar, 'cart-sidebar--open');
    DOM.removeClass(document.body, 'cart-open');
    this.isOpen = false;
  }
  
  showAddedToCartFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="material-symbols-outlined">check</span> Adicionado!';
    DOM.addClass(button, 'btn--success');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      DOM.removeClass(button, 'btn--success');
    }, 2000);
  }
  
  extractPrice(priceText) {
    const match = priceText.match(/R\$\s*([\d,]+\.?\d*)/);
    if (match) {
      return parseFloat(match[1].replace(',', '.'));
    }
    return 0;
  }
  
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
  }
  
  getCartTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  getCartCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new CartManager();
});