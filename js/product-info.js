const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("ProductID")}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("ProductID")}.json`;
let infoProducto = [];
let comentProducto = [];

//formatea la fecha del comentario ingresado
function formatoFecha(){
  let fecha = new Date(Date.now())
  let año = fecha.getFullYear()
  let mes = fecha.getMonth()+1
  let dia = fecha.getDay()
  let hora = fecha.getHours()
  let minuto = fecha.getMinutes()
  let segundo = fecha.getSeconds()
  return año +"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundo;

}
//actualiza las estrellas en tiempo real dependiendo de en que estrella se encuentra el raton 
function puntuarEstrellas(puntos) {
  let textoHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= puntos) {
      textoHtml += `<i class="fas fa-star" onmouseover="puntuarEstrellas(${i})" id="estrSelec${i}" value="${puntos}"></i>`; //icono estrella llena
    } else {
      textoHtml += `<i class="far fa-star" onmouseover="puntuarEstrellas(${i})"value="${puntos}"></i>`; //icono contorno estrella
    }
  }
  document.getElementById("contenedorEstrella").innerHTML = textoHtml;
}
/*toma los datos ingresados para el comentario y si no estan vacios los carga a la lista ComentProductos,
luego llama a la funcion cargarComentarios*/
function ingresarComentario(){
  let nuevoComentario = {};
  nuevoComentario.product = localStorage.getItem("ProductID");
  nuevoComentario.score = document.getElementById("estrSelec1").getAttribute("value");
  nuevoComentario.description = document.getElementById("nuevocoment").value;
  nuevoComentario.user = localStorage.getItem("usuario");
  nuevoComentario.dateTime = formatoFecha();
  if (nuevoComentario !=""){
    comentProducto.push(nuevoComentario);
    cargarComentarios();
    document.getElementById("nuevocoment").value =""
    puntuarEstrellas(0)
  }
}

//recibe una puntuación e itera comparandola con la variable "i" para ver si pone una estrella solida o regular
function cargarEstrellas(puntos){
  let textoHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= puntos) {
      textoHtml += `<i class="fas fa-star"></i>`; //icono estrella llena
    } else {
      textoHtml += `<i class="far fa-star"></i>`; //icono contorno estrella
    }
  }
  return textoHtml;
}

//carga los datos de la variable comentProducto en el elemento con id="contenedorComentarios"
function cargarComentarios(){
  let textoHtml = "";
  for (let item of comentProducto) {
    textoHtml += `<ul class="list-group-sm>
                    <li class="list-group-item d-flex justify-content-between blackcolor">${item.user}<span class="badge">${cargarEstrellas(item.score)} ${item.dateTime}</span></li>
                    <li class="list-group-item d-flex justify-content-between blackcolor text-muted">${item.description}</li><hr>
                    </ul>`;
  } 
  document.getElementById("contenedorComentarios").innerHTML = textoHtml;
  puntuarEstrellas(0);
}
function productoRelacionado(id){
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html"
}
//recibe una lista con los datos de la pagina del producto y los carga en el Html en forma de "carrusel" 
function cargarInfoProducto(obj){
  let textoHtml = `
  <div class="wrap">
    <div class="wrap-texto">
      <h2><strong>${obj.name}</strong></h2><br><hr>
      <h6>Precio:            <span class="text-muted ">${obj.currency} ${obj.cost}</span></h6>
      <h6>Descripción:       <span class="text-muted ">${obj.description}         </span></h6>
      <h6>Categoría:         <span class="text-muted ">${obj.category}            </span></h6>
      <h6>Cantidad vendidos: <span class="text-muted ">${obj.soldCount}           </span></h6>
      <hr>
      <h6><strong>COMENTARIOS:</strong></h6>
      <div class="ajustepadding " id="contenedorComentarios">
      </div>
      <input type="text" class="contenedorpequeño alinearizquierda" id="nuevocoment">
      <div id="contenedorEstrella">
      </div>
      <button class="btn btn-sm text-muted btn-outline-light" onclick="ingresarComentario()"><strong>COMENTAR</strong>
      </button> 
    </div>
    <div id="demo" class="carousel slide " data-bs-ride="carousel"> 
      <div class="carousel-inner ajustesize " >
        <div class="carousel-item active">
          <img src="${obj.images[0]}" alt="0" class="d-block w-100">
        </div>
        <div class="carousel-item">
          <img src="${obj.images[1]}" alt="1" class="d-block w-100">
        </div>
        <div class="carousel-item">
          <img src="${obj.images[2]}" alt="2" class="d-block w-100">
        </div>
        <div class="carousel-item">
          <img src="${obj.images[3]}" alt="3" class="d-block w-100">
        </div>
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
        </div>
          <button class="carousel-control-prev " type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span class="carousel-control-prev-icon blackcolor"></span>
          </button>
          <button class="carousel-control-next " type="button" data-bs-target="#demo" data-bs-slide="next">
          <span class="carousel-control-next-icon blackcolor"></span>
          </button>
      </div>
      <div class="alinearcentro">
        <h6 class="text-muted hr"><strong>PRODUCTOS RELACIONADOS:</strong></h6>
        <div class="zoom alinearizquierda blackcolor" >
          <span class="text-muted ">${obj.relatedProducts[0].name}</span>
          <img src="${obj.relatedProducts[0].image}" onclick="productoRelacionado(${obj.relatedProducts[0].id})" alt="0" class="d-block w-100">
        </div>
        <div class="zoom alinearizquierda blackcolor" >
          <span class="text-muted ">${obj.relatedProducts[1].name}</span>
          <img src="${obj.relatedProducts[1].image}" onclick="productoRelacionado(${obj.relatedProducts[1].id})" alt="0" class="d-block w-100">
        </div>
      </div>
    </div> 
  </div>`;
  document.getElementById("infoProducto").innerHTML = textoHtml;
  cargarComentarios(); 
}
document.addEventListener("DOMContentLoaded", function(){
  fetch(PRODUCT_INFO_URL)
    .then((response) => response.json())
    .then((datos) => {
      infoProducto = datos;
    
      
      fetch(PRODUCT_INFO_COMMENTS_URL)
    .then((response)=>response.json())
    .then((datos2)=>{
      comentProducto=datos2;
      cargarInfoProducto(infoProducto);     
  });
  });
  
});