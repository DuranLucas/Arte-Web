///// Variables
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.getElementsByClassName('cart-content')[0];
let carrito = [];
let arrayCarrito = JSON.parse(localStorage.getItem("data")) || [];


///// Eventos
cartIcon.addEventListener('click', ()=>{
    cart.classList.add("active");
});

closeCart.addEventListener('click', ()=>{
    cart.classList.remove("active");
});

if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}


///// Funciones
// Sacar items del carrito
function ready(){
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for(let i=0; i < removeCartButtons.length; i++){
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    // Cambios en la quantity
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i=0; i < quantityInputs.length; i++){
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
    for (let i=0; i < plus.length; i++){
        let btnPlus = plus[i];
        btnPlus.addEventListener('click', quantityPlus);
    }
    for (let i=0; i < minus.length; i++){
        let btnMinus = minus[i];
        btnMinus.addEventListener('click', quantityMinus);
    }

}
function loadLS () {
    arrayCarrito.forEach(prod => {
        var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartBoxContent = `
                <img src="${prod.img}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${prod.titulo}</div>
                  <div class="cart-price">${prod.precio}</div>
                  <div id="minusPlus">
                    <i class='bx bx-plus-circle'></i>
                    <input id=${prod.id} type="number" value="${prod.cantidad}" class="cart-quantity" min="1" max="20">
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
    
loadLS ();


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
    if(e.target.classList.contains('btn-card')){
        addCartClicked(e.target.parentElement)
    }
    e.stopPropagation();
}   


const addCartClicked = objeto => {
    // let idProd = objeto.id;
    let title = objeto.getElementsByClassName("titulo-card")[0].innerText;
    let price = objeto.querySelector('p').innerText;
    let imgProducto = objeto.getElementsByClassName('img-card')[0].src;
     
   
    const producto = {
        id: objeto.querySelector('.btn-card').dataset.id,
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

function buyButtonClicked (){
    if(localStorage.getItem("data") == "[]"){
        Swal.fire({
            toast: true,
             position: 'top-end',
             showConfirmButton: false,
             timer: 1500,
             icon: 'warning',
             title: 'Primero debes agregar productos al carrito'
        })
    }
    else{
        Swal.fire({
            toast: true,
             position: 'top-end',
             timer: 3500,
             timerProgressBar: true,
             icon: 'success',
             title: 'Tu orden de compra fue exitosa',
             confirmButtonText: 'Entendido'
        })
        cartContent.innerHTML=``;
        arrayCarrito = [];
        localStorage.clear("data")
        //return;
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

function addProductToArray(producto){   
        if(arrayCarrito.some((prod)=>prod.titulo === producto.titulo)){
            return
        }
        else { 
            arrayCarrito.push(producto);
            console.log(arrayCarrito)
        };
        localStorage.setItem("data", JSON.stringify(arrayCarrito));
}

function addProductToCart(title, price, imgProducto, id){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    // const idProducto = divBandejas.forEach((bandeja)=>{idProducto = bandeja.id});
    // const ProductoCarrito = new ProdCarrito(idProducto, nombre, precio, quantity);
    // carrito.push(ProductoCarrito);
    // console.log(carrito);
    
    

    for (let i=0; i < cartItemsNames.length; i++){
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
                onClick: function(){cart.classList.add("active");}
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
        onClick: function(){cart.classList.add("active");}
      }).showToast();
    
    var cartBoxContent = `
                <img src="${imgProducto}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <div id="minusPlus">
                    <i class='bx bx-plus-circle'></i>
                    <input id=${id} type="number" value="1" class="cart-quantity" min="1" max="20">
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
    for (let i=0; i < plus.length; i++){
        let btnPlus = plus[i];
        btnPlus.addEventListener('click', quantityPlus);
    }
    for (let i=0; i < minus.length; i++){
        let btnMinus = minus[i];
        btnMinus.addEventListener('click', quantityMinus);
    }
}

function quantityPlus(e){

    quantityInp = e.target.parentElement.childNodes[3].value;
    if(quantityInp >= 20) {Toastify({
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
    return;}
    else {
    reQuantityInp = parseInt(quantityInp) + 1;
    e.target.parentElement.childNodes[3].value = `${reQuantityInp}`;

    updateTotal();
    
    let search = arrayCarrito.find ((x)=> x.id === e.target.nextElementSibling.id)
    search.cantidad = reQuantityInp
    console.log(arrayCarrito)
    localStorage.setItem("data", JSON.stringify(arrayCarrito))
    }
}
function quantityMinus(e){
    quantityInp = e.target.parentElement.childNodes[3].value;
    if(quantityInp == 1) return;
    else {
    reQuantityInp = parseInt(quantityInp) - 1;
    e.target.parentElement.childNodes[3].value = `${reQuantityInp}`;

    updateTotal();

    let search = arrayCarrito.find ((x)=> x.id === e.target.previousElementSibling.id)
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
function removeCartItem(e){
    let buttonClicked = e.target;

    
    let search = arrayCarrito.find ((x)=> x.titulo === e.target.parentElement.children[1].children[0].innerHTML)
    let index = arrayCarrito.indexOf(search)
    arrayCarrito.splice(index,1)
    console.log(arrayCarrito);
    


    buttonClicked.parentElement.remove();
    updateTotal();
    localStorage.setItem("data", JSON.stringify(arrayCarrito))
}

// Cambio en la quantity
function quantityChanged(e){
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0){
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
function updateTotal(){
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

    for (let i=0; i<cartBoxes.length; i++){
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
