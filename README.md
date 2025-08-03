# 💊 Supreme Nutrition - E-commerce HTML/CSS/JS

## 🎯 Objetivo de Aprendizado
Projeto desenvolvido para estudar **fundamentos de desenvolvimento web** com HTML, CSS e JavaScript puro, criando um e-commerce completo de suplementos alimentares com design responsivo e funcionalidades interativas.

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Estruturação semântica e acessibilidade
- **CSS3:** Estilização, Flexbox, Grid, responsividade
- **JavaScript:** Interatividade, validação de formulários, DOM
- **Design:** Layout responsivo mobile-first
- **Conceitos estudados:**
  - Semântica HTML e SEO
  - CSS Flexbox e Grid Layout
  - JavaScript vanilla e manipulação DOM
  - Design responsivo e media queries
  - Validação de formulários
  - Acessibilidade web

## 🚀 Demonstração
```html
<!-- Estrutura semântica -->
<header class="header">
  <nav class="navbar">
    <div class="logo">
      <img src="assets/img/logo.png" alt="Supreme Nutrition">
    </div>
    <ul class="nav-menu">
      <li><a href="#whey">Whey Protein</a></li>
      <li><a href="#creatina">Creatina</a></li>
      <li><a href="#pre-treino">Pré-Treino</a></li>
    </ul>
  </nav>
</header>
```

```css
/* CSS responsivo com Flexbox */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    position: absolute;
    top: 100%;
    width: 100%;
  }
}
```

```javascript
// JavaScript para interatividade
function validateForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  if (name.length < 2) {
    setError(0);
    return false;
  }
  
  if (!isValidEmail(email)) {
    setError(1);
    return false;
  }
  
  return true;
}
```

## 💡 Principais Aprendizados

### 🏗️ HTML Semântico
- **Estrutura:** header, nav, main, section, article, footer
- **Acessibilidade:** alt text, labels, ARIA attributes
- **SEO:** meta tags, structured data
- **Formulários:** input types, validation attributes

### 🎨 CSS Avançado
- **Layout:** Flexbox e CSS Grid
- **Responsividade:** Media queries e mobile-first
- **Animações:** Transitions e keyframes
- **Metodologia:** BEM para organização de classes

### ⚡ JavaScript Vanilla
- **DOM:** Seleção e manipulação de elementos
- **Eventos:** Click, submit, resize handlers
- **Validação:** Formulários e entrada de dados
- **Interatividade:** Menus, carrosséis, modais

## 🧠 Conceitos Técnicos Estudados

### 1. **Layout Responsivo**
```css
/* Mobile-first approach */
.container {
  width: 100%;
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### 2. **Validação de Formulários**
```javascript
function nameValidate() {
  if (campos[0].value.length < 2) {
    setError(0);
  } else {
    removeError(0);
  }
}

function setError(index) {
  campos[index].style.border = '2px solid #e63636';
  spans[index].style.display = 'block';
}

function removeError(index) {
  campos[index].style.border = '2px solid #3f9136';
  spans[index].style.display = 'none';
}
```

### 3. **Interatividade com JavaScript**
```javascript
// Menu responsivo
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Carrossel de produtos
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
```

## 📁 Estrutura do Projeto
```
html-supplement-ecommerce/
├── index.html              # Página inicial
├── pagina_whey.html        # Página Whey Protein
├── creatin.html           # Página Creatina
├── pre_treino.html        # Página Pré-Treino
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos principais
│   ├── js/
│   │   └── script.js      # JavaScript interativo
│   └── img/               # Imagens dos produtos
├── DER - projeto integrador.pdf  # Documentação
└── tabela-sprint5.sql     # Estrutura do banco
```

## 🔧 Como Executar

### Método Simples
1. Clone o repositório:
```bash
git clone <repo-url>
cd html-supplement-ecommerce
```

2. Abra o arquivo `index.html` no navegador

### Servidor Local (Recomendado)
```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Acesse: http://localhost:8000
```

## 🎨 Funcionalidades Implementadas
- ✅ **Página inicial** com produtos em destaque
- ✅ **Páginas de categorias** (Whey, Creatina, Pré-Treino)
- ✅ **Menu responsivo** com hamburger menu
- ✅ **Formulário de contato** com validação
- ✅ **Carrossel de produtos** interativo
- ✅ **Design responsivo** mobile-first
- ✅ **Animações CSS** suaves
- ✅ **Acessibilidade** básica implementada

## 🚧 Desafios Enfrentados
1. **Layout responsivo:** Adaptar design para diferentes telas
2. **JavaScript vanilla:** Implementar funcionalidades sem frameworks
3. **Cross-browser:** Garantir compatibilidade entre navegadores
4. **Performance:** Otimizar imagens e código
5. **Acessibilidade:** Implementar práticas inclusivas
6. **SEO:** Estruturar HTML para motores de busca

## 📚 Recursos Utilizados
- [MDN Web Docs](https://developer.mozilla.org/) - Referência HTML/CSS/JS
- [CSS-Tricks](https://css-tricks.com/) - Técnicas avançadas de CSS
- [Can I Use](https://caniuse.com/) - Compatibilidade de browsers
- [W3C Validator](https://validator.w3.org/) - Validação de HTML
- [ProzTech Bootcamp](https://proztech.com.br/) - Curso de desenvolvimento

## 📈 Próximos Passos
- [ ] Implementar carrinho de compras funcional
- [ ] Adicionar sistema de busca de produtos
- [ ] Integrar com API de pagamento
- [ ] Melhorar acessibilidade (WCAG)
- [ ] Otimizar performance (Lighthouse)
- [ ] Adicionar PWA features

## 🔗 Projetos Relacionados
- [React E-commerce](../react-ecommerce-tt/) - Evolução com React
- [Spring E-commerce](../spring-ecommerce-tt/) - Backend completo
- [Macedo Suplementos](../spring-eccomerce-generation/) - Versão console

---

**Desenvolvido por:** Felipe Macedo (em colaboração com Joel Alves e Fernando Alves)  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto estabeleceu as bases sólidas do meu conhecimento em desenvolvimento web. Trabalhar com HTML, CSS e JavaScript puro me ensinou os fundamentos essenciais que aplico em todos os frameworks modernos.