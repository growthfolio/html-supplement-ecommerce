// Favorites Module
import { DOM } from '../utils/dom.js';

export class FavoritesManager {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.init();
  }
  
  init() {
    this.createFavoritesUI();
    this.bindEvents();
    this.updateFavoritesDisplay();
  }
  
  createFavoritesUI() {
    // Create favorites counter
    const favoritesCounter = DOM.create('div', {
      className: 'favorites-counter tooltip'
    }, `
      <button class="favorites-counter__btn" aria-label="Ver favoritos">
        <span class="material-symbols-outlined favorites-counter__icon">favorite</span>
        <span class="favorites-counter__badge">0</span>
      </button>
      <div class="tooltip__content">Produtos favoritos</div>
    `);
    
    // Add to header
    const nav = DOM.select('.nav__list');
    if (nav) {
      const li = DOM.create('li');
      li.appendChild(favoritesCounter);
      nav.appendChild(li);
    }
    
    // Add favorite buttons to product cards
    this.addFavoriteButtons();
    
    this.favoritesCounter = favoritesCounter;
  }
  
  addFavoriteButtons() {
    const productCards = DOM.selectAll('.product-card, .card');
    
    productCards.forEach(card => {
      if (DOM.select('.favorite-btn', card)) return; // Already has button
      
      const productId = this.getProductId(card);
      const isFavorite = this.favorites.includes(productId);
      
      const favoriteBtn = DOM.create('button', {
        className: `favorite-btn ${isFavorite ? 'favorite-btn--active' : ''}`,
        'data-product-id': productId,
        'aria-label': isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }, `
        <span class="material-symbols-outlined favorite-btn__icon">
          ${isFavorite ? 'favorite' : 'favorite_border'}
        </span>
      `);
      
      card.style.position = 'relative';
      card.appendChild(favoriteBtn);
    });
  }
  
  bindEvents() {
    // Favorites counter click
    const counterBtn = DOM.select('.favorites-counter__btn', this.favoritesCounter);
    DOM.on(counterBtn, 'click', () => this.showFavorites());
    
    // Favorite button clicks
    DOM.on(document, 'click', (e) => {
      if (e.target.closest('.favorite-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const button = e.target.closest('.favorite-btn');
        const productId = button.dataset.productId;
        this.toggleFavorite(productId, button);
      }
    });
    
    // Re-add buttons when new content is loaded
    const observer = new MutationObserver(() => {
      this.addFavoriteButtons();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  toggleFavorite(productId, button) {
    const isFavorite = this.favorites.includes(productId);
    
    if (isFavorite) {
      this.removeFromFavorites(productId, button);
    } else {
      this.addToFavorites(productId, button);
    }
  }
  
  addToFavorites(productId, button) {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.saveFavorites();
      this.updateFavoriteButton(button, true);
      this.updateFavoritesDisplay();
      this.showToast('Produto adicionado aos favoritos!', 'favorite');
    }
  }
  
  removeFromFavorites(productId, button) {
    this.favorites = this.favorites.filter(id => id !== productId);
    this.saveFavorites();
    this.updateFavoriteButton(button, false);
    this.updateFavoritesDisplay();
    this.showToast('Produto removido dos favoritos', 'favorite_border');
  }
  
  updateFavoriteButton(button, isFavorite) {
    const icon = DOM.select('.favorite-btn__icon', button);
    
    if (isFavorite) {
      DOM.addClass(button, 'favorite-btn--active');
      icon.textContent = 'favorite';
      button.setAttribute('aria-label', 'Remover dos favoritos');
    } else {
      DOM.removeClass(button, 'favorite-btn--active');
      icon.textContent = 'favorite_border';
      button.setAttribute('aria-label', 'Adicionar aos favoritos');
    }
  }
  
  updateFavoritesDisplay() {
    const badge = DOM.select('.favorites-counter__badge', this.favoritesCounter);
    const count = this.favorites.length;
    
    badge.textContent = count;
    
    if (count > 0) {
      DOM.addClass(badge, 'favorites-counter__badge--visible');
    } else {
      DOM.removeClass(badge, 'favorites-counter__badge--visible');
    }
  }
  
  showFavorites() {
    if (this.favorites.length === 0) {
      this.showToast('Você ainda não tem produtos favoritos', 'favorite_border');
      return;
    }
    
    // For now, just show a message. In a real app, this would open a favorites page/modal
    this.showToast(`Você tem ${this.favorites.length} produto(s) favorito(s)`, 'favorite');
  }
  
  showToast(message, icon) {
    // Remove existing toast
    const existingToast = DOM.select('.favorites-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = DOM.create('div', {
      className: 'favorites-toast'
    }, `
      <span class="material-symbols-outlined favorites-toast__icon">${icon}</span>
      <span class="favorites-toast__text">${message}</span>
    `);
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      DOM.addClass(toast, 'favorites-toast--visible');
    }, 100);
    
    // Hide toast
    setTimeout(() => {
      DOM.removeClass(toast, 'favorites-toast--visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  getProductId(card) {
    // Try to get ID from add-to-cart button
    const addToCartBtn = DOM.select('.add-to-cart', card);
    if (addToCartBtn && addToCartBtn.dataset.productId) {
      return addToCartBtn.dataset.productId;
    }
    
    // Fallback: generate ID from product title
    const title = DOM.select('.card__title', card);
    if (title) {
      return title.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Last resort: random ID
    return 'product-' + Math.random().toString(36).substr(2, 9);
  }
  
  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  
  isFavorite(productId) {
    return this.favorites.includes(productId);
  }
  
  getFavorites() {
    return [...this.favorites];
  }
  
  clearFavorites() {
    this.favorites = [];
    this.saveFavorites();
    this.updateFavoritesDisplay();
    
    // Update all favorite buttons
    const favoriteButtons = DOM.selectAll('.favorite-btn--active');
    favoriteButtons.forEach(button => {
      this.updateFavoriteButton(button, false);
    });
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new FavoritesManager();
});