const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let carrito = []


function usuario() { 
  let usuario = {}
  usuario.nombre = ""
  usuario.segNombre = ""
  usuario.apellido = ""
  usuario.segApellido = ""
  usuario.mail = document.getElementById("usuario").value;
  usuario.telefono = ""

  localStorage.setItem("usuario",JSON.stringify(usuario))
  location.href="index.html";
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
  document.getElementById("ingresar").addEventListener("click",
            function (event) {
              if (!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
              }else{
                usuario() 
              }
              document.body.classList.add("was-validated");
          }, false)
});
