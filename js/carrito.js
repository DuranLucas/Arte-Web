///// Variables
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let carrito = {}


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
    divBandejas.addEventListener("click", e => {
        addCarrito(e);
    })
    divCajas.addEventListener("click", e => {
        addCarrito(e);
    })
    divMuebles.addEventListener("click", e => {
        addCarrito(e);
    })
}

const addCarrito = e => {
    if(e.target.classList.contains('btn-card')){
        addCartClicked(e.target.parentElement)
    }
    e.stopPropagation();
}

const addCartClicked = objeto => {
    var title = objeto.getElementsByClassName("titulo-card")[0].innerText;
    var price = objeto.querySelector('p').innerText;
    var imgProducto = objeto.getElementsByClassName('img-card')[0].src;
    addProductToCart(title, price, imgProducto);
    updateTotal(); 
   /*
    const producto = {
        id: objeto.querySelector('.btn-card').dataset.id,
        titulo: objeto.querySelector('.titulo-card').textContent,
        precio: objeto.querySelector('p').textContent,
        img: objeto.querySelector('.cart-img')[0].src,
        cantidad: 1
    }
    console.log(producto.id, producto.titulo)
    */
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

function buyButtonClicked (){
    alert('Tu orden de Compra fue exitosa')
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.innerHTML=``;
    }
    updateTotal();
}
}
//// Boton de compra


function addProductToCart(title, price, imgProducto){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i=0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title) {
        alert('Ya agregaste este producto al carrito');
        return;
        }
    }

    var cartBoxContent = `
                <img src="${imgProducto}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity">
                </div>
                <i class='bx bx-trash cart-remove'></i>`

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}



// Remover items del cart
function removeCartItem(e){
    let buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
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
    for (let i=0; i<cartBoxes.length; i++){
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }

        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}