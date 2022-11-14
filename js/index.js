function redireccion() {
    let usuario = localStorage.getItem("usuario")

    if ( usuario == null ){
        alert("Debe iniciar sesión")
        location = "login.html"
    }
}

function perfil(){
    let usuario = JSON.parse(localStorage.getItem("usuario"))
    document.getElementById("perfil").innerHTML=usuario.mail
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        localStorage.removeItem ("usuario");
        window.location = "login.html"
    });
}

document.addEventListener("DOMContentLoaded", function(){
    redireccion()
    perfil()
    
    
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    
});