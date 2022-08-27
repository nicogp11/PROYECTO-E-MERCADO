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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ingresar").addEventListener("click", function () {
    usuarioYContraseña();
  });
});
