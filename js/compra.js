/* const res = fetch('../productos.json');
const data = res.json(); */
let total = 0;
function loadLS2() {
    /* costoFinal(); */
    
    arrayCarrito.forEach(prod => {
    
   /*  prod.precio.replace("$", ""); */

    let row = document.createElement('tr');
    contCompra = document.querySelector('#lista-compra tbody');


    totCompra = document.querySelector('#totalCompra');
    /* prod.precio.replace("$","") */
    /* total += (prod.precio); */
    total += parseFloat(prod.precio.replace("$","") * prod.cantidad)
    totCompra.innerHTML = `$${total}`;


    let item = `
            <img src="${prod.img}" id="img-compra" alt="" class="img-card cart-img">
            <div class="detail-box">
                <td class="cTitulo">${prod.titulo}</td>
                <td class="cPrecio">${prod.precio}</td>
                <td class="cCantidad">${prod.cantidad}</td>
                <td class="cSubTotal">$${parseFloat(prod.precio.replace("$","") * prod.cantidad)}</td>
            </div>`

    row.innerHTML = item;
    contCompra.appendChild(row);
});
}

document.addEventListener("DOMContentLoaded", loadLS2);

const nombre = document.getElementById('compraNombre');
const apellido = document.getElementById('compraApellido');
const tel = document.getElementById('compraTel');
const email = document.getElementById('compraEmail');


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    if (nombre.value != '' && apellido.value != '' && email.value != '' && tel.value != '') {
  
      window.onbeforeunload = () => {
        for (const form of document.getElementsByTagName('form')) {
          form.reset();
        }
      }

      arrayCarrito = [];
      localStorage.clear("data");

      Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 4500,
        timerProgressBar: true,
        icon: 'success',
        title: 'Compra exitosa! Nos pondremos en contacto para coordinar el envio. Muchas gracias!',
        confirmButtonText: 'Entendido'
      }).then(() => {
        setTimeout(() => { window.location.href = "../index.html"; }, 200);
      })
  
    }
  
    else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        icon: 'warning',
        title: 'Debes completar todos los campos correctamente para terminar la compra'
      })
      return;
    }
  
  });