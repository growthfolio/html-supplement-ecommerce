function singup() {
    var formulario = document.getElementById("janela-cadastro");
    formulario.style.display = "block";
  
    }
function closesingup() {
    var formulario = document.getElementById("janela-cadastro");
    formulario.style.display = "none";
  }
  
  // Adicione um event listener para o botão de fechar
  var closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", closesingup);

  //evento de clique "login"

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


