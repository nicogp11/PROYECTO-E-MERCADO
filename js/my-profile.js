function redireccion() {
    let usuario = localStorage.getItem("usuario")

    if ( usuario == null ){
        alert("Debe iniciar sesión")
        location = "login.html"
    }
}
function perfil(){
    document.getElementById("perfil").innerHTML=localStorage.getItem("usuario")
    document.getElementById("cerrarSesion").addEventListener("click", function() {
        localStorage.removeItem ("usuario");
        window.location = "login.html"
    });
}
document.addEventListener("DOMContentLoaded", function(){
    redireccion()
    perfil()
});