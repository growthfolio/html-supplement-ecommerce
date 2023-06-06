//altera o display do form cadastro

function singup() {
    var formulario = document.getElementById("janela-cadastro");
    formulario.style.display = "block";
  
    }
function closesingup() {
    var formulario = document.getElementById("janela-cadastro");
    formulario.style.display = "none";
  }
  
  //evento para botão fechar
  var closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", closesingup);

  //altera o display do form login

  function toggleLogin() {
  var loginForm = document.querySelector('.login-container');
  if (loginForm.style.display === 'none') {
      loginForm.style.display = 'flex';
      loginForm.style.flexDirection = 'column';
      loginForm.style.alignItems = 'center';
  } else {
      loginForm.style.display = 'none';
  }
}

//LEMBRAR DE FAZER O BOTÃO DE FECHAR xD

// MENU HAMBURGER
const brnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {

const nav = document.getElementById('nav');
nav.classList.toggle('active');
}

brnMobile.addEventListener('click', toggleMenu);
brnMobile.addEventListener('touchstart', toggleMenu);


// EVENTO CLIQUE PARA CAIXAS PAG INI

const boxes = document.getElementsByClassName('square-box');

for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];
  const boxTitle = box.querySelector('.box-tittle');
  const boxText = box.querySelector('.box-text');

  let isBoxTextVisible = false;

  box.addEventListener('click', function() {
    if (isBoxTextVisible) {
      boxText.style.display = 'none';
      boxTitle.style.display = 'block';
      isBoxTextVisible = false;
    } else {
      boxTitle.style.display = 'none';
      boxText.style.display = 'block';
      isBoxTextVisible = true;
    }
  });
}

      // CARROSSEL Em manutenção xD

      // Seleciona os elementos
const carrossel = document.querySelector('.carrossel');
const logotiposContainer = document.querySelector('.logotipos');



// Calcula a largura total dos logotipos
const logotiposWidth = logotiposArray.reduce((total, logotipo) => total + logotipo.offsetWidth, 0);

// Verifica se há espaço suficiente para exibir os logotipos
function verificarEspaco() {
  const carrosselWidth = carrossel.offsetWidth;
  
  if (carrosselWidth >= logotiposWidth) {
    logotiposContainer.style.width = '100%';
  } else {
    logotiposContainer.style.width = `${logotiposWidth}px`;
  }
}

