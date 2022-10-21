//// Variables

const bandejas = [
{
    id: 1,
    nombre: "Bandeja Home",
    img: "../img/bandeja1.jpg",
    precio: 5500
},
{
    id: 2,
    nombre: "Bandeja Love",
    img: "../img/bandeja2.jpg",
    precio: 6500
},
{
    id: 3,
    nombre: "Bandeja Light",
    img: "../img/bandeja3.jpg",
    precio: 5300
},
{
    id: 4,
    nombre: "Bandeja Cookie",
    img: "../img/bandeja4.jpg",
    precio: 5800
},
{
    id: 5,
    nombre: "Bandeja Art",
    img: "../img/bandeja5.jpg",
    precio: 5200
},
{
    id: 6,
    nombre: "Bandeja Design",
    img: "../img/bandeja6.jpg",
    precio: 5600
},
];
const cajas = [
    {
        id: 1,
        nombre: "Caja Pink",
        img: "../img/caja1.jpg",
        precio: 4300
    },
    {
        id: 2,
        nombre: "Caja Sugar",
        img: "../img/caja2.jpg",
        precio: 4100
    },
    {
        id: 3,
        nombre: "Caja Dorada",
        img: "../img/caja3.jpg",
        precio: 4400
    },
    {
        id: 4,
        nombre: "Caja Ave",
        img: "../img/caja4.jpg",
        precio: 4800
    },
    {
        id: 5,
        nombre: "Caja Sol",
        img: "../img/caja5.jpg",
        precio: 4200
    },
    {
        id: 6,
        nombre: "Caja Graffity",
        img: "../img/caja6.jpg",
        precio: 4600
    },
];
const muebles = [
    {
        id: 1,
        nombre: "Mueble Floral",
        img: "../img/mueble1.jpg",
        precio: 14800
    },
    {
        id: 2,
        nombre: "Mueble White",
        img: "../img/mueble2.jpg",
        precio: 12500
    },
    {
        id: 3,
        nombre: "Mueble Kubik",
        img: "../img/mueble3.jpg",
        precio: 15300
    },
    {
        id: 4,
        nombre: "Mueble Totem",
        img: "../img/mueble4.jpg",
        precio: 13800
    },
    {
        id: 5,
        nombre: "Mueble Old",
        img: "../img/mueble5.jpg",
        precio: 14200
    },
    {
        id: 6,
        nombre: "Mueble Cajonera",
        img: "../img/mueble6.jpg",
        precio: 15600
    },
];


divBandejas = document.querySelector (".divBandejas");
divCajas = document.querySelector (".divCajas");
divMuebles = document.querySelector (".divMuebles");


//// Eventos

document.addEventListener("DOMContentLoaded", mostrarBandejas());
document.addEventListener("DOMContentLoaded", mostrarCajas());
document.addEventListener("DOMContentLoaded", mostrarMuebles());

//// Funciones
function mostrarBandejas() {
    bandejas.forEach((bandeja)=>{
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

        cardBandeja.appendChild(imgBandeja);
        cardBandeja.appendChild(tituloBandeja);
        cardBandeja.appendChild(precioBandeja);
        cardBandeja.appendChild(btnBandeja);
        
        divBandejas.appendChild(cardBandeja);
    })
}

function mostrarCajas() {
    cajas.forEach((caja)=>{
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

        cardCaja.appendChild(imgCaja);
        cardCaja.appendChild(tituloCaja);
        cardCaja.appendChild(precioCaja);
        cardCaja.appendChild(btnCaja);
        
        divCajas.appendChild(cardCaja);
    })
}

function mostrarMuebles() {
    muebles.forEach((mueble)=>{
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

        cardMueble.appendChild(imgMueble);
        cardMueble.appendChild(tituloMueble);
        cardMueble.appendChild(precioMueble);
        cardMueble.appendChild(btnMueble);
        
        divMuebles.appendChild(cardMueble);
    })
}