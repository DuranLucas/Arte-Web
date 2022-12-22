/arraycarrit/// Variables
const divBandejas = document.querySelector(".divBandejas");
const divCajas = document.querySelector(".divCajas");
const divMuebles = document.querySelector(".divMuebles");
let previewContainer = document.querySelector(".products-preview");

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.getElementsByClassName('cart-content')[0];
let arrayCarrito = JSON.parse(localStorage.getItem("data")) || [];


///// Funciones
/* function loadLS2() {
    arrayCarrito.forEach(prod => {
        let row = document.createElement('tr');
        contCompra = document.querySelector('#lista-compra tbody');
        let item = `
                <img src="${prod.img}" alt="" class="img-card cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${prod.titulo}</div>
                  <div class="cart-price">${prod.precio}</div>
                  <div id="minusPlus">
                    <i class='bx bx-plus-circle'></i>
                    <input id=${prod.id} type="number" value="${prod.cantidad}" class="cart-quantity" min="1" max="20" readonly>
                    <i class='bx bx-minus-circle' ></i>
                  </div>
                </div>`

        row.innerHTML = item;
        console.log(contCompra);
        contCompra.appendChild(row);
        console.log(contCompra);
    });
} */


/* let contenedorCompras = document.querySelector('#contenedorCompras');
contenedorCompras.innerHTML = `<div>holaa</div>`
console.log(contenedorCompras); */

const fetchData = async () => {
    try {
        const res = await fetch('../productos.json');
        const data = await res.json();
        mostrarBandejasF(data);
        mostrarCajasF(data);
        mostrarMueblesF(data);



        crearPopUp(data);


    } catch (error) {
        console.log(error)
    }
}

function mostrarBandejasF(data) {
    data.forEach((bandeja) => {

        if (bandeja.id <= 6) {
            const cardBandeja = document.createElement("div");
            cardBandeja.className = ("card");
            cardBandeja.dataset.id = bandeja.id;

            const imgBandeja = document.createElement("img");
            imgBandeja.src = bandeja.img;
            imgBandeja.className = ("img-card");

            const tituloBandeja = document.createElement("h4");
            tituloBandeja.textContent = bandeja.nombre;
            tituloBandeja.className = ("titulo-card");

            const precioBandeja = document.createElement("p");
            precioBandeja.textContent = "$" + bandeja.precio;

            const btnBandeja = document.createElement("button");
            btnBandeja.className = ("btn-card buttons");
            btnBandeja.textContent = "Agregar al Carrito";
            btnBandeja.dataset.id = bandeja.id;

            cardBandeja.appendChild(imgBandeja);
            cardBandeja.appendChild(tituloBandeja);
            cardBandeja.appendChild(precioBandeja);
            cardBandeja.appendChild(btnBandeja);

            divBandejas.appendChild(cardBandeja);
        }
    })
}

function mostrarCajasF(data) {
    data.forEach((caja) => {
        if (caja.id > 6 && caja.id <= 12) {
            const cardCaja = document.createElement("div");
            cardCaja.className = ("card");
            cardCaja.dataset.id = caja.id;

            const imgCaja = document.createElement("img");
            imgCaja.src = caja.img;
            imgCaja.className = ("img-card");

            const tituloCaja = document.createElement("h4");
            tituloCaja.textContent = caja.nombre;
            tituloCaja.className = ("titulo-card");

            const precioCaja = document.createElement("p");
            precioCaja.textContent = "$" + caja.precio;

            const btnCaja = document.createElement("button");
            btnCaja.className = ("btn-card buttons");
            btnCaja.textContent = "Agregar al Carrito";
            btnCaja.dataset.id = caja.id;

            cardCaja.appendChild(imgCaja);
            cardCaja.appendChild(tituloCaja);
            cardCaja.appendChild(precioCaja);
            cardCaja.appendChild(btnCaja);

            divCajas.appendChild(cardCaja);
        }
    })
}

function mostrarMueblesF(data) {
    data.forEach((mueble) => {
        if (mueble.id > 12 && mueble.id <= 18) {
            const cardMueble = document.createElement("div");
            cardMueble.className = ("card");
            cardMueble.dataset.id = mueble.id;

            const imgMueble = document.createElement("img");
            imgMueble.src = mueble.img;
            imgMueble.className = ("img-card");

            const tituloMueble = document.createElement("h4");
            tituloMueble.textContent = mueble.nombre;
            tituloMueble.className = ("titulo-card");

            const precioMueble = document.createElement("p");
            precioMueble.textContent = "$" + mueble.precio;

            const btnMueble = document.createElement("button");
            btnMueble.className = ("btn-card buttons");
            btnMueble.textContent = "Agregar al Carrito";
            btnMueble.dataset.id = mueble.id;

            cardMueble.appendChild(imgMueble);
            cardMueble.appendChild(tituloMueble);
            cardMueble.appendChild(precioMueble);
            cardMueble.appendChild(btnMueble);

            divMuebles.appendChild(cardMueble);
        }
    })
}

function crearPopUp(data) {
    data.forEach((producto) => {
        let PopUps = document.createElement('div')
        PopUps.innerHTML = `<div class="preview" data-target="${producto.id}">
        <i class='bx bx-x'></i>
        <img src="${producto.img}" alt="">
        <h3 class="titulo-card">${producto.nombre}</h3>
        <div class="stars">
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star'></i>
          <i class='bx bxs-star-half'></i>
          <span>( 250 )</span>
        </div>
        <div class='desc'>Breve descripcion del producto, como por ejemplo los materiales utilizados y las medidas del mismo.
        </div>
        <p class="price">$${producto.precio}</p>
        <div>
          <a id="buttons" class="buttons addCart" data-id="${producto.id}">Agregar al carrito</a>
        </div>
      </div>`
        previewContainer.appendChild(PopUps);
    })
    console.log(previewContainer);

    let previewBox = previewContainer.querySelectorAll('.preview');
    let btncard = document.querySelectorAll('.btn-card');
    console.log(previewBox)

    document.querySelectorAll('.card').forEach(product => {
        product.onclick = (e) => {
            if (e.target.className == "btn-card buttons") return;
            previewContainer.style.display = 'flex';

            let id = product.getAttribute('data-id');
            previewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (id == target) {

                    preview.classList.add('active');

                }

            });

        };
    });
    previewBox.forEach(close => {
        close.querySelector('.bx-x').onclick = () => {
            close.classList.remove('active');
            previewContainer.style.display = 'none';
        };
    });

    document.querySelectorAll('.addCart').forEach(btn => {
        /* console.log(btn) */
        btn.onclick = (e) => {
            console.log(e.target.parentElement.parentElement);
            addCartClicked(e.target.parentElement.parentElement)
            updateTotal()
        }
    })

    document.querySelectorAll('.img-catalogo').forEach(img => {
        img.onclick = (e) => {
            previewContainer.style.display = 'flex';

            let id = img.getAttribute('data-id');
            previewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (id == target) {

                    preview.classList.add('active');

                }

            });

        }
    })
}


//// Eventos


document.addEventListener("DOMContentLoaded", () => { fetchData() });


////////////////////////////////////////////////////////////////////





///// Variables



///// Eventos
cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}


///// Funciones
// Sacar items del carrito
function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    // Cambios en la quantity
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }



    /*
    // Agregar al cart
    var addCart = document.getElementsByClassName("btn-card")
    for(let i=0 ; i < addCart.length; i++){
    var boton = addCart[i];
    boton.addEventListener("click", console.log("hola"));
    }

    var addCart = document.getElementsByClassName('btn-card');
    addCart.addEventListener('click', consolin);
    for (let i=0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', console.log("asd"));
    }
    console.log(addCart)
 
   // Agregar al cart
    function addCartClicked(event){
    var boton = event.target;
    var shopProducts = boton.parentNode
    var title = shopProducts.getElementsByClassName("titulo-card")[0].innerText;
}   */
    let plus = document.querySelectorAll('.bx-plus-circle');
    let minus = document.querySelectorAll('.bx-minus-circle');
    for (let i = 0; i < plus.length; i++) {
        let btnPlus = plus[i];
        btnPlus.addEventListener('click', quantityPlus);
    }
    for (let i = 0; i < minus.length; i++) {
        let btnMinus = minus[i];
        btnMinus.addEventListener('click', quantityMinus);
    }

}
function loadLS() {
    arrayCarrito.forEach(prod => {
        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box')
        var cartItems = document.getElementsByClassName('cart-content')[0];
        var cartBoxContent = `
                <img src="${prod.img}" alt="" class="img-card cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${prod.titulo}</div>
                  <div class="cart-price">${prod.precio}</div>
                  <div id="minusPlus">
                    <i class='bx bx-plus-circle'></i>
                    <input id=${prod.id} type="number" value="${prod.cantidad}" class="cart-quantity" min="1" max="20" readonly>
                    <i class='bx bx-minus-circle' ></i>
                  </div>
                </div>
                <i class='bx bx-trash cart-remove'></i>`

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
        updateTotal()

    });
}

loadLS();


divBandejas.addEventListener("click", e => {
    addCarrito(e);
})
divCajas.addEventListener("click", e => {
    addCarrito(e);
})
divMuebles.addEventListener("click", e => {
    addCarrito(e);
})

const addCarrito = e => {
    if (e.target.classList.contains('btn-card') || e.target.classList.contains('buttons')) {
        addCartClicked(e.target.parentElement)
        console.log(e.target.parentElement)
    }
    e.stopPropagation();
}






const addCartClicked = objeto => {
    // let idProd = objeto.id;
    let title = objeto.getElementsByClassName("titulo-card")[0].innerText;
    let price = objeto.querySelector('p').innerText;
    let imgProducto = objeto.querySelector('img').src;




    const producto = {
        id: objeto.querySelector('.buttons').dataset.id,
        titulo: title,
        precio: price,
        img: imgProducto,
        cantidad: 1
    }

    /*   if(carrito.hasOwnProperty(producto.id)){
           producto.cantidad = carrito[producto.id].cantidad + 1
       }
       */

    addProductToCart(producto.titulo, producto.precio, producto.img, producto.id);
    updateTotal();

    /*   if(carrito.hasOwnProperty(producto.id)){
          return;
      }
      else {carrito.push(producto)};
      console.log(carrito); */

    addProductToArray(producto);

}


document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
/* const contenedorCompras = document.querySelector('form');
console.log(contenedorCompras); */


function buyButtonClicked() {
    if (localStorage.getItem("data") == "[]" || localStorage.getItem("data") == undefined || cartContent.hasChildNodes() == false) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            icon: 'warning',
            title: 'Primero debes agregar productos al carrito'
        })
    }
    else {
            /* arrayCarrito.forEach(prod=>{
                
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>
                <img src="${prod.img}" width=100>
                </td>
                `;
                contenedorCompras.appendChild(row);
                
            }) */

        /* loadLS2(); */

        Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Tu orden de compra fue exitosa',
            confirmButtonText: 'Entendido'
        }).then(() =>{
            /* cartContent.innerHTML = ``; */
          /* arrayCarrito = []; */
          /* localStorage.clear("data"); */
          setTimeout( () => { window.location.href = "compra.html"; }, 200);
          })
        
    }
    updateTotal();
}

/* cartContent.innerHTML= localStorage.getItem("data") || `` */

//// Boton de compra
// class ProdCarrito{
//     constructor(id, nombre, precio, quantity){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.quantity = quantity;
//     }
// }

function addProductToArray(producto) {
    if (arrayCarrito.some((prod) => prod.titulo === producto.titulo)) {
        return
    }
    else {
        arrayCarrito.push(producto);
        console.log(arrayCarrito)
    };
    localStorage.setItem("data", JSON.stringify(arrayCarrito));
}

function addProductToCart(title, price, imgProducto, id) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    // const idProducto = divBandejas.forEach((bandeja)=>{idProducto = bandeja.id});
    // const ProductoCarrito = new ProdCarrito(idProducto, nombre, precio, quantity);
    // carrito.push(ProductoCarrito);
    // console.log(carrito);



    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            Toastify({
                text: `Ya agregaste este producto al carrito`,
                duration: 2500,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, rgb(255, 232, 23, 0.8), rgb(252, 151, 19))",
                },
                onClick: function () { cart.classList.add("active"); }
            }).showToast();
            return;
        }
    }

    Toastify({
        text: `Se agrego ${title} al carrito`,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, rgb(93, 230, 59, 0.9), rgb(1, 119, 17, 0.8))",
        },
        onClick: function () { cart.classList.add("active"); }
    }).showToast();

    var cartBoxContent = `
                <img src="${imgProducto}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <div id="minusPlus">
                    <i class='bx bx-plus-circle'></i>
                    <input id=${id} type="number" value="1" class="cart-quantity" min="1" max="20" readonly>
                    <i class='bx bx-minus-circle' ></i>
                  </div>
                </div>
                <i class='bx bx-trash cart-remove'></i>`

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    /* 
        let quantityInput = cartShopBox.getElementsByClassName('cart-quantity')[0]
        let plus = document.querySelector('.bx-plus-circle');
        let minus = document.querySelector('.bx-minus-circle');
        plus.addEventListener('click', quantityPlus);
    
     */
    let plus = document.querySelectorAll('.bx-plus-circle');
    let minus = document.querySelectorAll('.bx-minus-circle');
    for (let i = 0; i < plus.length; i++) {
        let btnPlus = plus[i];
        btnPlus.addEventListener('click', quantityPlus);
    }
    for (let i = 0; i < minus.length; i++) {
        let btnMinus = minus[i];
        btnMinus.addEventListener('click', quantityMinus);
    }
}

function quantityPlus(e) {

    quantityInp = e.target.parentElement.childNodes[3].value;
    if (quantityInp >= 20) {
        Toastify({
            text: `No puedes comprar mas de 20 productos iguales`,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, rgb(255, 232, 23, 0.8), rgb(252, 151, 19))",
            },
        }).showToast();
        return;
    }
    else {
        reQuantityInp = parseInt(quantityInp) + 1;
        e.target.parentElement.childNodes[3].value = `${reQuantityInp}`;

        updateTotal();

        let search = arrayCarrito.find((x) => x.id === e.target.nextElementSibling.id)
        search.cantidad = reQuantityInp
        console.log(arrayCarrito)
        localStorage.setItem("data", JSON.stringify(arrayCarrito))
    }
}
function quantityMinus(e) {
    quantityInp = e.target.parentElement.childNodes[3].value;
    if (quantityInp == 1) return;
    else {
        reQuantityInp = parseInt(quantityInp) - 1;
        e.target.parentElement.childNodes[3].value = `${reQuantityInp}`;

        updateTotal();

        let search = arrayCarrito.find((x) => x.id === e.target.previousElementSibling.id)
        search.cantidad = reQuantityInp
        console.log(arrayCarrito)
        localStorage.setItem("data", JSON.stringify(arrayCarrito))
    }
}


/* 
function quantityPlus(e){
    inputQuantity = document.getElementsByClassName('cart-quantity');
    quantityInp = e.target.parentElement.childNodes[3].value;
    reQuantityInp = parseInt(quantityInp) + 1;
    e.target.parentElement.childNodes[3].value.replace(reQuantityInp++);
    console.log(quantityInp)
} */

// Remover items del cart
function removeCartItem(e) {
    let buttonClicked = e.target;


    let search = arrayCarrito.find((x) => x.titulo === e.target.parentElement.children[1].children[0].innerHTML)
    let index = arrayCarrito.indexOf(search)
    arrayCarrito.splice(index, 1)
    console.log(arrayCarrito);



    buttonClicked.parentElement.remove();
    updateTotal();
    localStorage.setItem("data", JSON.stringify(arrayCarrito))
}

// Cambio en la quantity
function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

/*
function addCartClicked(e){
    var button = e.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('titulo-card');
    console.log(title);
}
*/
// Update Total
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    let totalQuantity = 0;
    let carritoQuantity = document.getElementById('cart-logo-quantity');
    let carritoQuantity2 = document.getElementById('cart-logo-quantity2');
    // carrito.forEach((producto)=>{
    //     let priceElement = producto.precio;
    //     let quantityElement = producto.cantidad
    //     let price = parseFloat(priceElement.innerText.replace("$", ""));
    //     let quantity = quantityElement.value;
    //     total += (price * quantity);
    // })

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total += (price * quantity);

        totalQuantity += parseInt(quantity);
    }
    carritoQuantity.innerHTML = `${totalQuantity}`;
    carritoQuantity2.innerHTML = `${totalQuantity}`;
    /* costofinal(); */

    total = Math.round(total * 100) / 100;
    /* function totalCompras (total){
        costoFinal(total)
    } */
    /* function costofinal(total){
        console.log(total);
        document.getElementById('totalCompra').innerText.replace = ("$" + total);
        
    } */

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;

}
/* function costoFinal(total){
    console.log(total);
} */