function perfilUsuario() {
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("segNombre").value = usuario.segNombre;
  document.getElementById("apellido").value = usuario.apellido;
  document.getElementById("segApellido").value = usuario.segApellido;
  document.getElementById("mail").value = usuario.mail;
  document.getElementById("telefono").value = usuario.telefono;
}

function actualizarPerfil() {
  let usuario = {};
  usuario.nombre = document.getElementById("nombre").value;
  usuario.segNombre = document.getElementById("segNombre").value;
  usuario.apellido = document.getElementById("apellido").value;
  usuario.segApellido = document.getElementById("segApellido").value;
  usuario.mail = document.getElementById("mail").value;
  usuario.telefono = document.getElementById("telefono").value;

  if (usuario.nombre == "" || usuario.apellido == "" || usuario.mail == "") {
    Swal.fire({
      icon: "error",
      title: 'Complete los datos marcados con "*"',
      showConfirmButton: false,
    });
  } else {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    Swal.fire({
      icon: "success",
      title: "Datos actualizados",
      showConfirmButton: false,
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  perfilUsuario();
  document.getElementById("guardar").addEventListener("click", function () {
    actualizarPerfil();
  });
});
