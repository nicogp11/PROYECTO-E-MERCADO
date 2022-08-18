function usuarioYContraseña() {
  
  let mail = document.getElementById("mail").value;
  let contraseña = document.getElementById("password").value;

  if (mail === "" || contraseña === "") {
    alert("Complete todos los campos");
    location.href= "login.html";
  } else {
    localStorage.setItem("usuario", mail)
    location.href="index.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ingresar").addEventListener("click", function () {
    usuarioYContraseña();
  });
});
