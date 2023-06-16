// Declaração de var para validação form cadsastro linha 91
const form = document.getElementById('form');
let campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.helper-text');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



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


// MENU HAMBURGER
const brnMobile = document.getElementById('btn-mobile');
let menuItems = document.querySelectorAll('#li-button');
function toggleMenu(event) {
const nav = document.getElementById('nav');
nav.classList.toggle('active');
}

brnMobile.addEventListener('click', toggleMenu);
brnMobile.addEventListener('touchstart', toggleMenu);
menuItems.forEach(item => {
  item.addEventListener('click', toggleMenu);
  item.addEventListener('touchstart', toggleMenu);
});



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


    // ---------------Validação de Formulario Cadastro-------------//

  function setError(index) {
    campos[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';

  } 
  
  function removeError(index) {
  campos[index].style.border = '2px solid #3f9136';
  spans[index].style.display = 'none';

  }


  function nameValidate() {
      if(campos[0].value.length <2)
      {
          setError(0);
      }    
      else
      {
          removeError(0);
          
          
      }
  }

  function lastNameValidate() {
    if(campos[1].value.length <2)
    {
        setError(1);
    }    
    else
    {
        removeError(1);
        
        
    }
  }

  function emailValidate(){
    if(!emailRegex.test(campos[2].value))
    {
      setError(2);
    }
    else
    {
      removeError(2);
    }
  }

  function mainPasswordValidate() {
    if(campos[4].value.length < 8)
    {
      setError(4);
    }
    else
    {
      removeError(4);
      comparePassword();
    }
  }
  
  function comparePassword() {
    if (campos[4].value == campos[5].value && campos[5].value.length >=8)
      {
        removeError(5);
      }
      else
      {
        setError(5);
      }

    }