//// Variables ////
const divBandejas = document.querySelector(".divBandejas");
const divCajas = document.querySelector(".divCajas");
const divMuebles = document.querySelector(".divMuebles");
let previewContainer = document.querySelector(".products-preview");
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.getElementsByClassName('cart-content')[0];
let arrayCarrito = JSON.parse(localStorage.getItem("data")) || [];

//// Simulacion de peticion de los productos a un archivo .json ////
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

//// Crear los template de las bandejas con la data obtenida del .json ////
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

//// Crear los template de las cajas con la data obtenida del .json ////
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

//// Crear los template de los muebles con la data obtenida del .json ////
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
        };
    });
};

//// Funcion que crea los Pop Up de los productos ////
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

    let previewBox = previewContainer.querySelectorAll('.preview');
    document.querySelectorAll('.card').forEach(product => {
        product.onclick = (e) => {
            if (e.target.className == "btn-card buttons") return;
            previewContainer.style.display = 'flex';

            let id = product.getAttribute('data-id');
            previewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if (id == target) {

                    preview.classList.add('active');

                };
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
        btn.onclick = (e) => {
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
                };
            });
        };
    });
};

//// Evento para solicitar la data del archivo .json con los productos ////
document.addEventListener("DOMContentLoaded", () => { fetchData() });

//// Evento para abrir y cerrar el carrito de compras ////
cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

//// Evento que se puede usar para ejecutar cierta funcion una vez que cargue la informacion del DOM ////
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready();
}

function ready() {
    //// Sacar items del carrito ////
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    let plus = document.querySelectorAll('.bx-plus-circle');
    let minus = document.querySelectorAll('.bx-minus-circle');
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }

    //// Cambios en la quantity ////
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    for (let i = 0; i < plus.length; i++) {
        let btnPlus = plus[i];
        btnPlus.addEventListener('click', quantityPlus);
    }
    for (let i = 0; i < minus.length; i++) {
        let btnMinus = minus[i];
        btnMinus.addEventListener('click', quantityMinus);
    }
}

//// Cargar Local Storage ////
function loadLS() {
    arrayCarrito.forEach(prod => {
        let cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box')
        let cartItems = document.getElementsByClassName('cart-content')[0];
        let cartBoxContent = `
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
    }
    e.stopPropagation();
}

//// Boton Agregar al carrito en seccion Productos ////
const addCartClicked = objeto => {
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
    addProductToCart(producto.titulo, producto.precio, producto.img, producto.id);
    updateTotal();
    addProductToArray(producto);
}



//// Boton Comprar del carrito en seccion Productos ////
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
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
        Swal.fire({
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Tu orden de compra fue exitosa',
            confirmButtonText: 'Entendido'
        }).then(() => {
            setTimeout(() => { window.location.href = "compra.html"; }, 200);
        })
        /* cartContent.innerHTML = ``; */
        /* arrayCarrito = []; */
        /* localStorage.clear("data"); */
    }
    updateTotal();
}

//// Agregar producto al array ////
function addProductToArray(producto) {
    if (arrayCarrito.some((prod) => prod.titulo === producto.titulo)) {
        return
    }
    else {
        arrayCarrito.push(producto);
    };
    localStorage.setItem("data", JSON.stringify(arrayCarrito));
}

//// Agregar producto al carrito ////
function addProductToCart(title, price, imgProducto, id) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

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

    let cartBoxContent = `
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

//// Boton de aumentar cantidad ////
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
        localStorage.setItem("data", JSON.stringify(arrayCarrito))
    }
}

//// Boton de disminuir cantidad ////
function quantityMinus(e) {
    quantityInp = e.target.parentElement.childNodes[3].value;
    if (quantityInp == 1) return;
    else {
        reQuantityInp = parseInt(quantityInp) - 1;
        e.target.parentElement.childNodes[3].value = `${reQuantityInp}`;
        updateTotal();

        let search = arrayCarrito.find((x) => x.id === e.target.previousElementSibling.id)
        search.cantidad = reQuantityInp
        localStorage.setItem("data", JSON.stringify(arrayCarrito))
    }
}

//// Remover items del cart ////
function removeCartItem(e) {
    let buttonClicked = e.target;
    let search = arrayCarrito.find((x) => x.titulo === e.target.parentElement.children[1].children[0].innerHTML)
    let index = arrayCarrito.indexOf(search)

    arrayCarrito.splice(index, 1)
    buttonClicked.parentElement.remove();
    updateTotal();
    localStorage.setItem("data", JSON.stringify(arrayCarrito))
}

//// Cambio en la quantity ////
function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//// Update Total ////
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    let totalQuantity = 0;
    let carritoQuantity = document.getElementById('cart-logo-quantity');
    let carritoQuantity2 = document.getElementById('cart-logo-quantity2');

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
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}

