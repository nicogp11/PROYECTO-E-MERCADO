const Direccion =`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
const Asc = "Ascendente"
const Desc = "Descendente"
const Rel = "Relevancia"
let Productoslist = [];
let NuevaLista = [];
let min = undefined;
let max = undefined;

function CargarProductos(lista) {
  let textoenHTML = "";

  for (let item of lista) {
    textoenHTML +=
    `<div class="list-group-item list-group-item-action cursor-active">
      <div class="row">
        <div class="col-3"><img src="` +item.image +`" alt="` +item.description +`" class="img-thumbnail">
        </div>
      <div class="col">
        <div class="d-flex w-100 justify-content-between">
          <h4 class="mb-1">` +item.name +" - " +item.currency +" " +item.cost +`</h4><small class="tex-muted">` +item.soldCount +" vendidos" +`</h4>
        </div>
        <p class="mb-1">` +item.description +`</p>
        </div>
      </div>
    </div>`;
  }
  document.getElementById("listado-categorias").innerHTML = textoenHTML;
}

function filtrar(lista) {
  min = document.getElementById("rangeFilterCountMin").value;
  max = document.getElementById("rangeFilterCountMax").value;

  NuevaLista = lista.filter(item => item.cost >= min && item.cost <= max);

  CargarProductos(NuevaLista);
}
function ordenar(lista,criterio){

if(criterio===Desc){
  lista.sort(function(a, b){
    return a.cost - b.cost;
  })
}else if(criterio===Asc){
  lista.sort(function(a, b){
    return b.cost - a.cost;
  })
}else if(criterio===Rel){
  lista.sort(function(a, b){
    return b.soldCount - a.soldCount;
  })
}
CargarProductos(lista);  
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(Direccion)
    .then((response) => response.json())
    .then((datos) => {
      Productoslist = datos.products;
      document.getElementById("categorias").innerHTML += " " + datos.catName;
      NuevaLista = Productoslist
      CargarProductos(NuevaLista);
  });
  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    filtrar(Productoslist);
  });
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    NuevaLista = Productoslist
    CargarProductos(NuevaLista);
  });
  document.getElementById("OrdenPrecioDesc").addEventListener("click", function () {
    ordenar(NuevaLista,Desc)

  });  
  document.getElementById("OrdenPrecioAsc").addEventListener("click", function () {
    ordenar(NuevaLista,Asc)
  });
  document.getElementById("OrdenRel").addEventListener("click", function () {
    ordenar(NuevaLista,Rel)
  });
});
