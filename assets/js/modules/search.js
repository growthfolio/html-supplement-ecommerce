// Search Module
import { DOM } from '../utils/dom.js';
import { searchProducts, getAllProducts } from '../data/products.js';

export class SearchManager {
  constructor() {
    this.searchForm = DOM.select('.search');
    this.searchInput = DOM.select('.search__input');
    this.searchButton = DOM.select('.search__button');
    this.resultsContainer = null;
    this.isSearching = false;
    
    this.init();
  }
  
  init() {
    if (!this.searchForm) return;
    
    this.bindEvents();
    this.createResultsContainer();
  }
  
  bindEvents() {
    DOM.on(this.searchForm, 'submit', (e) => this.handleSearch(e));
    DOM.on(this.searchInput, 'input', (e) => this.handleInput(e));
    DOM.on(this.searchInput, 'focus', () => this.showSuggestions());
    DOM.on(document, 'click', (e) => this.handleClickOutside(e));
  }
  
  createResultsContainer() {
    this.resultsContainer = DOM.create('div', {
      className: 'search-results',
      style: 'display: none;'
    });
    
    this.searchForm.appendChild(this.resultsContainer);
  }
  
  handleSearch(e) {
    e.preventDefault();
    const query = this.searchInput.value.trim();
    
    if (query.length < 2) {
      this.showMessage('Digite pelo menos 2 caracteres para buscar');
      return;
    }
    
    this.performSearch(query);
  }
  
  handleInput(e) {
    const query = e.target.value.trim();
    
    if (query.length >= 2) {
      this.showSuggestions(query);
    } else {
      this.hideResults();
    }
  }
  
  handleClickOutside(e) {
    if (!this.searchForm.contains(e.target)) {
      this.hideResults();
    }
  }
  
  performSearch(query) {
    this.setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = searchProducts(query);
      this.displayResults(results, query);
      this.setLoading(false);
    }, 300);
  }
  
  showSuggestions(query = '') {
    if (query) {
      const results = searchProducts(query).slice(0, 5);
      this.displaySuggestions(results);
    } else {
      const popularProducts = getAllProducts().slice(0, 5);
      this.displaySuggestions(popularProducts, 'Produtos populares');
    }
  }
  
  displaySuggestions(products, title = 'Sugestões') {
    if (products.length === 0) {
      this.hideResults();
      return;
    }
    
    const html = `
      <div class="search-results__header">
        <h4 class="search-results__title">${title}</h4>
      </div>
      <div class="search-results__list">
        ${products.map(product => `
          <div class="search-result-item" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="search-result-item__image">
            <div class="search-result-item__content">
              <h5 class="search-result-item__name">${product.name}</h5>
              <p class="search-result-item__price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    this.resultsContainer.innerHTML = html;
    this.showResults();
    this.bindResultEvents();
  }
  
  displayResults(products, query) {
    if (products.length === 0) {
      this.showNoResults(query);
      return;
    }
    
    // Redirect to search results page or update current page
    this.redirectToResults(query, products);
  }
  
  showNoResults(query) {
    const html = `
      <div class="search-results__header">
        <h4 class="search-results__title">Nenhum resultado encontrado</h4>
      </div>
      <div class="search-results__empty">
        <p>Não encontramos produtos para "${query}"</p>
        <p>Tente buscar por:</p>
        <ul>
          <li>Whey Protein</li>
          <li>Creatina</li>
          <li>Pré-Treino</li>
        </ul>
      </div>
    `;
    
    this.resultsContainer.innerHTML = html;
    this.showResults();
  }
  
  redirectToResults(query, products) {
    // Store search results in sessionStorage
    sessionStorage.setItem('searchQuery', query);
    sessionStorage.setItem('searchResults', JSON.stringify(products));
    
    // Redirect to search results page or update current page
    if (window.location.pathname.includes('search.html')) {
      this.updateSearchPage(products, query);
    } else {
      window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    }
  }
  
  updateSearchPage(products, query) {
    // Update page title
    document.title = `Busca: ${query} - Supreme Nutrition`;
    
    // Update search results on page
    const resultsContainer = DOM.select('.search-page-results');
    if (resultsContainer) {
      this.renderSearchPage(resultsContainer, products, query);
    }
  }
  
  renderSearchPage(container, products, query) {
    const html = `
      <div class="search-page__header">
        <h1>Resultados para "${query}"</h1>
        <p>${products.length} produto(s) encontrado(s)</p>
      </div>
      <div class="products-grid">
        ${products.map(product => this.renderProductCard(product)).join('')}
      </div>
    `;
    
    container.innerHTML = html;
  }
  
  renderProductCard(product) {
    const badge = product.badge ? `<div class="product-card__badge product-card__badge--${product.badge}">${product.badge === 'sale' ? 'Oferta' : 'Novo'}</div>` : '';
    const originalPrice = product.originalPrice ? `<span class="product-card__price--old">R$ ${product.originalPrice.toFixed(2).replace('.', ',')}</span>` : '';
    
    return `
      <article class="card product-card hover-lift">
        ${badge}
        <img src="${product.image}" alt="${product.name}" class="card__image product-card__image" loading="lazy">
        <div class="card__content product-card__content">
          <h3 class="card__title product-card__title">${product.name}</h3>
          <div class="card__price product-card__price">
            ${originalPrice}
            R$ ${product.price.toFixed(2).replace('.', ',')}
          </div>
          <div class="card__actions product-card__actions">
            <button class="btn btn--primary add-to-cart btn-ripple" data-product-id="${product.id}">
              <span class="material-symbols-outlined">shopping_cart</span>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </article>
    `;
  }
  
  bindResultEvents() {
    const resultItems = DOM.selectAll('.search-result-item');
    resultItems.forEach(item => {
      DOM.on(item, 'click', () => {
        const productId = item.dataset.productId;
        this.selectProduct(productId);
      });
    });
  }
  
  selectProduct(productId) {
    // Navigate to product or add to search
    this.searchInput.value = DOM.select(`[data-product-id="${productId}"] .search-result-item__name`).textContent;
    this.hideResults();
    this.handleSearch({ preventDefault: () => {} });
  }
  
  showResults() {
    this.resultsContainer.style.display = 'block';
    DOM.addClass(this.resultsContainer, 'search-results--visible');
  }
  
  hideResults() {
    DOM.removeClass(this.resultsContainer, 'search-results--visible');
    setTimeout(() => {
      this.resultsContainer.style.display = 'none';
    }, 200);
  }
  
  setLoading(loading) {
    this.isSearching = loading;
    
    if (loading) {
      DOM.addClass(this.searchButton, 'loading');
      this.searchButton.disabled = true;
    } else {
      DOM.removeClass(this.searchButton, 'loading');
      this.searchButton.disabled = false;
    }
  }
  
  showMessage(message) {
    // Show temporary message
    const messageEl = DOM.create('div', {
      className: 'search-message'
    }, message);
    
    this.resultsContainer.innerHTML = '';
    this.resultsContainer.appendChild(messageEl);
    this.showResults();
    
    setTimeout(() => this.hideResults(), 2000);
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new SearchManager();
});