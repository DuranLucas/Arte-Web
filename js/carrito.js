///// Variables
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let carrito = {};


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
    
}


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

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    
    addProductToCart(producto.titulo, producto.precio, producto.img);

    carrito[producto.id] = {...producto};
    updateTotal();
    console.log(carrito);

}
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

function buyButtonClicked (){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    if(cartContent.hasChildNodes() == false){alert('Primero debes agregar productos al carrito')}
    else{
    alert('Tu orden de Compra fue exitosa')
        cartContent.innerHTML=``;
        //return;
    }
    updateTotal();
}
//// Boton de compra
// class ProdCarrito{
//     constructor(id, nombre, precio, quantity){
//         this.id = id;
//         this.nombre = nombre;
//         this.precio = precio;
//         this.quantity = quantity;
//     }
// }

function addProductToCart(title, price, imgProducto){
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
        alert('Ya agregaste este producto al carrito');
        return;
        }
    }
    
    var cartBoxContent = `
                <img src="${imgProducto}" alt="" class="cart-img">
                <div class="detail-box">
                  <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity" min="1" max="20">
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
    }

        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    
}