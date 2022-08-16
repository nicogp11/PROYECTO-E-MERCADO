const direccion =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

let Productoslist = [];

function CargarProductos(lista) {

  let textoenHTML = "";

  for (let item of lista) {
    textoenHTML +=
      `
      <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
          <div class="col-3">
            <img src="` + item.image +`" alt="` + item.description +`" class="img-thumbnail">
          </div>

          <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">` + item.name +" - " + item.cost + item.currency + `</h4>
                <small class="tex-muted">` + item.soldCount+ " vendidos" + `</h4>
                </div>
                <p class="mb-1">` + item.description+ `</p>
          </div>
          
          
        
        </div>
      </div> 
          `;
    document.getElementById("listado-categorias").innerHTML = textoenHTML;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(direccion)
    .then((response) => response.json())
    .then((datos) => {
      Productoslist = datos.products;
      document.getElementById("categorias").innerHTML += " " + datos.catName;
      CargarProductos(Productoslist)
    console.debug(Productoslist)
    });
});
