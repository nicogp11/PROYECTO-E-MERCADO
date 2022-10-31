const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let carrito = []


function usuarioYContraseña() {
  
  let usuario = document.getElementById("usuario").value;
  let contraseña = document.getElementById("password").value;

  if (usuario === "" || contraseña === "") {
    alert("Complete todos los campos");
    location.href= "login.html";
  } else {
    localStorage.setItem("usuario", usuario)
    location.href="index.html";
  }
}

function cargarCarrito(){
  localStorage.setItem("carrito",JSON.stringify(carrito));
  console.debug(carrito)
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(CART_INFO_URL)
      .then((response) => response.json())
      .then((datos) => {
        carrito = datos.articles;
        
        cargarCarrito()
        });
    
  document.getElementById("ingresar").addEventListener("click", function () {
    
    usuarioYContraseña();

  });
});
