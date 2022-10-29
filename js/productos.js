//// Variables
divBandejas = document.querySelector (".divBandejas");
divCajas = document.querySelector (".divCajas");
divMuebles = document.querySelector (".divMuebles");


///// Funciones

const fetchData = async () => {
    try{
        const res = await fetch('../productos.json');
        const data = await res.json();
        mostrarBandejasF (data);
        mostrarCajasF(data);
        mostrarMueblesF(data);
        
    } catch (error){
        console.log(error)
    }
}

function mostrarBandejasF(data) {
    data.forEach((bandeja)=>{
        
        if(bandeja.id <= 6){
        const cardBandeja = document.createElement ("div");
        cardBandeja.className = ("card");

        const imgBandeja = document.createElement ("img");
        imgBandeja.src = bandeja.img;
        imgBandeja.className = ("img-card");

        const tituloBandeja = document.createElement ("h4");
        tituloBandeja.textContent = bandeja.nombre;
        tituloBandeja.className = ("titulo-card");

        const precioBandeja = document.createElement ("p");
        precioBandeja.textContent = "$"+bandeja.precio;

        const btnBandeja = document.createElement ("button");
        btnBandeja.className = ("btn-card");
        btnBandeja.textContent = "Agregar al Carrito";
        btnBandeja.dataset.id = bandeja.id;

        cardBandeja.appendChild(imgBandeja);
        cardBandeja.appendChild(tituloBandeja);
        cardBandeja.appendChild(precioBandeja);
        cardBandeja.appendChild(btnBandeja);
        
        divBandejas.appendChild(cardBandeja);}
    })
}

function mostrarCajasF(data) {
    data.forEach((caja)=>{
        if(caja.id > 6 && caja.id <= 12){
        const cardCaja = document.createElement ("div");
        cardCaja.className = ("card");

        const imgCaja = document.createElement ("img");
        imgCaja.src = caja.img;
        imgCaja.className = ("img-card");

        const tituloCaja = document.createElement ("h4");
        tituloCaja.textContent = caja.nombre;
        tituloCaja.className = ("titulo-card");

        const precioCaja = document.createElement ("p");
        precioCaja.textContent = "$"+caja.precio;

        const btnCaja = document.createElement ("button");
        btnCaja.className = ("btn-card");
        btnCaja.textContent = "Agregar al Carrito";
        btnCaja.dataset.id = caja.id;

        cardCaja.appendChild(imgCaja);
        cardCaja.appendChild(tituloCaja);
        cardCaja.appendChild(precioCaja);
        cardCaja.appendChild(btnCaja);
        
        divCajas.appendChild(cardCaja);}
    })
}

function mostrarMueblesF(data) {
    data.forEach((mueble)=>{
        if(mueble.id > 12 && mueble.id <= 18){
        const cardMueble = document.createElement ("div");
        cardMueble.className = ("card");

        const imgMueble = document.createElement ("img");
        imgMueble.src = mueble.img;
        imgMueble.className = ("img-card");

        const tituloMueble = document.createElement ("h4");
        tituloMueble.textContent = mueble.nombre;
        tituloMueble.className = ("titulo-card");

        const precioMueble = document.createElement ("p");
        precioMueble.textContent = "$"+mueble.precio;

        const btnMueble = document.createElement ("button");
        btnMueble.className = ("btn-card");
        btnMueble.textContent = "Agregar al Carrito";
        btnMueble.dataset.id = mueble.id;

        cardMueble.appendChild(imgMueble);
        cardMueble.appendChild(tituloMueble);
        cardMueble.appendChild(precioMueble);
        cardMueble.appendChild(btnMueble);
        
        divMuebles.appendChild(cardMueble);}
    })
}

//// Eventos


document.addEventListener("DOMContentLoaded", ()=>{fetchData()});