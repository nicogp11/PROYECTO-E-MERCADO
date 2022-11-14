let comisionEnvio = 0.05;
let validacion = false

function clickProducto(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html";
}
function cambiarCant(i) {
  let cantidades = document.getElementsByClassName("cantProd");
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito[i].count = parseFloat(cantidades[i].value);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function borrarArticulo(pos){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.splice(pos, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let textoHtml = `<tr>
                    <th><div class="row"><div class="col-sm- text-start"></div></div></th>
                    <th><div class="row"><div class="col-sm- text-start">Nombre</div></div></th>
                    <th><div class="row"><div class="col-sm- text-start">Costo</div></div></th>
                    <th><div class="row"><div class="col-sm- text-start">Cantidad</div></div></th>
                    <th><div class="row"><div class="col-sm- text-start">Subtotal</div></div></th>
                    <th><div class="row"><div class="col-sm- text-start"></div></div></th>
                </tr>`;
  let i = 0;
  for (let articulo of carrito) {
    textoHtml += `<tr>
    <td><div class="row"><div class="col-sm- text-start"><img src="${
      articulo.image
    }" alt="" class="imagenPequeña" onclick="clickProducto(${
      articulo.id
    })"></div></div></td>
    <td><div class="row"><div class="col-sm- text-start">${
      articulo.name
    }</div></div></td>
    <td><div class="row"><div class="col-sm- text-start">${articulo.currency} ${
      articulo.unitCost
    }</div></div></td>   
    <td><div class="row"><div class="col-sm-3 text-start"><input type="number" min="1" value="${
      articulo.count
    }" class="cantProd form-control" onchange="cambiarCant(${i})"></div></div></td>
    <td id="subtotal${i}"><div class="row"><div class="col-sm- text-start">${
      articulo.currency
    } ${articulo.count * articulo.unitCost}</div></div></td>
    <td><div class="row"><div class="col-sm- text-start"><i class="fas fa-trash-alt " onclick="borrarArticulo(${i})"></i></div></div> </td>
  </tr>`;
    i++;
  }
  document.getElementById("productos").innerHTML = textoHtml;
  actualizarCosto()
}

function actualizarCosto(){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let subtotal = 0;
  let costoEnvio = 0;
  let costoTotal = 0;
  let moneda= "USD"
  for (let articulo of carrito) {
    if (articulo.currency == moneda){
      subtotal += articulo.count * articulo.unitCost; 
    }else{
      subtotal += articulo.count * articulo.unitCost/41;    
    }
  }
  costoEnvio = subtotal * comisionEnvio;
  costoTotal = subtotal + costoEnvio
  document.getElementById("subtotal").innerHTML = "USD " + Math.round(subtotal);
  document.getElementById("costoEnvio").innerHTML = "USD " + Math.round(costoEnvio);
  document.getElementById("costoTotal").innerHTML = "USD " + Math.round(costoTotal);
}
function cambiarMetodoPago(metodo){
  if(metodo=="Transferencia bancaria"){
  
  document.getElementById("tarjeta").setAttribute("disabled","")
  document.getElementById("nombre").setAttribute("disabled","")
  document.getElementById("mes").setAttribute("disabled","")
  document.getElementById("anio").setAttribute("disabled","")
  document.getElementById("codigoSeg").setAttribute("disabled","")
  document.getElementById("numerocuenta").removeAttribute("disabled", "")
  
  document.getElementById("tarjeta").value=""
  document.getElementById("nombre").value=""
  document.getElementById("mes").value=""
  document.getElementById("anio").value=""
  document.getElementById("codigoSeg").value=""
  
}else{
  document.getElementById("numerocuenta").setAttribute("disabled", "")
  document.getElementById("tarjeta").removeAttribute("disabled","")
  document.getElementById("nombre").removeAttribute("disabled","")
  document.getElementById("mes").removeAttribute("disabled","")
  document.getElementById("anio").removeAttribute("disabled","")
  document.getElementById("codigoSeg").removeAttribute("disabled","")
  
  document.getElementById("numerocuenta").value=""
}
document.getElementById("formaDepago").innerHTML = metodo
validacion = true
}
function validacionMetodoPago(){
  if (validacion &&
    document.getElementById("tarjeta").checkValidity()&&
    document.getElementById("nombre").checkValidity()&&
    document.getElementById("mes").checkValidity()&&
    document.getElementById("anio").checkValidity()&&
    document.getElementById("codigoSeg").checkValidity()&&
    document.getElementById("numerocuenta").checkValidity())
    {
    document.getElementById("formaDepago").removeAttribute("class","invalid-color");
    document.getElementById("feedback-formapago").style.display = "none";
  }else{
    document.getElementById("formaDepago").setAttribute("class","invalid-color");
    document.getElementById("feedback-formapago").style.display = "inline";
  }
  document.getElementById("tarjeta").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("nombre").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("mes").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("anio").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("codigoSeg").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("numerocuenta").setAttribute("onchange","validacionMetodoPago()");
  document.getElementById("cerrar").setAttribute("oneclick","validacionMetodoPago()");
  
}
document.addEventListener("DOMContentLoaded", function () {
  cargarCarrito();

  document
    .getElementById("premiumradio")
    .addEventListener("change", function () {
      comisionEnvio = 0.15;
      actualizarCosto();
    });

  document
    .getElementById("expressradio")
    .addEventListener("change", function () {
      comisionEnvio = 0.07;
      actualizarCosto();
    });

  document
    .getElementById("standardradio")
    .addEventListener("change", function () {
      comisionEnvio = 0.05;
      actualizarCosto();
    });



          // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Su compra se realizó con éxito',
            showConfirmButton: false,
          })
          event.stopPropagation();
          event.preventDefault()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()







});
