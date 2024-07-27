const header_items = document.querySelector('header')
gsap.from(header_items.children,{
    opacity: 0,
    y: -50,
    duration: 0.1,
    stagger:{
        amount: 0.75
    }
});

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".domus_title",{
    display: "block",
    opacity: 1,
    y: 0,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        toggleActions: "none none none none",
    }
},{
    display: "none",
    y: 100,
    opacity: 0,
    duration: 0.2,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        start: "top 85%",
        end: "top 85%",
        // markers:true,
        toggleActions: "play none reverse none",
    }
});

gsap.fromTo(".domus_img",{
    y: -200,
    opacity: 0,
    scale: 0.5,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        toggleActions: "none none none none",
    }
},{
    y: 0,
    opacity: 1,
    scale:1,
    duration: 0.2,
    scrollTrigger: {
        trigger: ".article_banner_domus",
        start: "top 85%",
        end: "top 85%",
        // markers: true,
        toggleActions: "play none reverse none",
    }
});

gsap.utils.toArray('.domus_text').forEach(domus_text=>{
    gsap.fromTo(domus_text,{
        x: 500,
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: domus_text,
            toggleActions: "none none none none",
        }
    },{
        x: 0,
        opacity: 1,
        scale:1,
        duration: 0.2,
        scrollTrigger: {
            trigger: domus_text,
            start: "top 90%",
            end: "top 22.5%",
            toggleActions: "play none none none",
        }
    });
});

gsap.utils.toArray('.domus_text2').forEach(domus_text2=>{
    gsap.fromTo(domus_text2,{
        x: -1000,
        opacity: 0,
        scale: 0.5,
        scrollTrigger: {
            trigger: domus_text2,
            toggleActions: "none none none none",
        }
    },{
        x: 0,
        opacity: 1,
        scale:1,
        duration: 0.2,
        scrollTrigger: {
            trigger: domus_text2,
            start: "top 70%",
            end: "top 22.5%",
            toggleActions: "play none none none",
        }
    });
});

gsap.utils.toArray('h1').forEach(h1=>{
    gsap.fromTo(h1,{
        letterSpacing:'5px',
        opacity:0,
        y:-150,
    },{
        letterSpacing:'0',
        opacity:1,
        y:0,
        duration: 0.2,
        scrollTrigger: {
            trigger: h1,
            start: "top 85%",
        }
    });
});

/* ------------------- CARRUSEL DE CARRITO --------------- */

const wrapper = document.querySelector(".list_product");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".product").offsetWidth;
const arrowBtns = document.querySelectorAll(".list_product i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

/* ------------------- CARRUSEL DE CARRITO --------------- */
/* --------------------------------------------------------------------------------------------------------------- --------------- */
/* --------------------------------------------PARA AGREGAR AL CARRO---------------------------------------------------- --------------- */
let descuentoAplicado = false;

document.addEventListener('DOMContentLoaded', () => {
        actualizarCarrito();

        document.querySelectorAll('.agregar').forEach(button => {
            button.addEventListener('click', event => {
                const productElement = event.target.closest('.product');
                const nombreProducto = productElement.querySelector('.nombreProducto').innerText;
                const precioOferta = parseFloat(productElement.querySelector('.oferta').innerText.replace('S/. ', '').replace(',', ''));
                const imagenProducto = productElement.querySelector('.img-product').src;
                agregarProducto(nombreProducto, precioOferta, imagenProducto);
            });
        });
    
});

function agregarProducto(nombre, precio, imagen) {
    let carrito = obtenerCarrito();
    if (carrito[nombre]) {
        carrito[nombre].cantidad += 1;
    } else {
        carrito[nombre] = {
            precio: precio,
            cantidad: 1,
            imagen: imagen
        };
    }
    guardarCarrito(carrito);
    actualizarCarrito();
}
function aumentar(button) {
    const productElement = button.closest('.row');
    const nombreProducto = productElement.querySelector('.nombreProducto').innerText;
    let carrito = obtenerCarrito();
    carrito[nombreProducto].cantidad += 1;
    guardarCarrito(carrito);
    actualizarCarrito();
}

function disminuir(button) {
    const productElement = button.closest('.row');
    const nombreProducto = productElement.querySelector('.nombreProducto').innerText;
    const descuentoElement = document.getElementById('descuento');
    let carrito = obtenerCarrito();
    carrito[nombreProducto].cantidad -= 1;
    if (carrito[nombreProducto].cantidad < 1) {
        delete carrito[nombreProducto];
        descuentoElement.querySelector('span').innerText = `S/.00.00`;
        descuentoAplicado = false;
    }
    guardarCarrito(carrito);
    actualizarCarrito();
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || {};
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    const carrito = obtenerCarrito();
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = '';
    let total = 0;
    let unidades = 0;

    for (let nombre in carrito) {
        const producto = carrito[nombre];
        const totalProducto = producto.precio * producto.cantidad;
        total += totalProducto;
        unidades += producto.cantidad;

        const productoHTML = `
            <div class="row align-items-center mb-3">
                <div class="col-5 d-flex align-items-center">
                    <img src="${producto.imagen}"
                        class="img-fluid rounded-start img-carrito" alt="Imagen del Producto">
                    <div class="ms-2">
                        <p class="nombreProducto mb-1">${nombre}</p>
                        <p class="vendido-por">Vendido por: <strong>Domus</strong></p>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center">
                    <p class="precioProducto">S/ ${producto.precio.toFixed(2)}</p>
                </div>
                <div class="col-3">
                    <div class="col card-footer d-flex align-items-center">
                        <button type="button" class="btn btn-outline-primary btn-responsive btn-round mx-3" onclick="disminuir(this)"><span class="signo">-</span></button>
                        <label class="cant">${producto.cantidad}</label>
                        <button type="button" class="btn btn-outline-primary btn-responsive btn-round mx-3" onclick="aumentar(this)"><span class="signo">+</span></button>
                    </div>
                </div>
                <div class="col-2 d-flex align-items-center">
                    <p class="total">S/ ${totalProducto.toFixed(2)}</p>
                </div>
            </div>
        `;

        carritoContenido.insertAdjacentHTML('beforeend', productoHTML);
    }

    document.getElementById('subtotal').querySelector('span').innerText = `S/. ${total.toFixed(2)}`;
    document.getElementById('total').querySelector('span').innerText = `S/. ${total.toFixed(2)}`;
    document.getElementById('unidades').innerText = unidades;
}

function aplicarDescuento() {
    const cupon = document.getElementById('coupon').value;
    const descuentoElement = document.getElementById('descuento');
    const totalElement = document.getElementById('total');
    let descuento = 0;

    const carrito = obtenerCarrito();
    let disponible = false;

    // Verificar si hay al menos un producto con cantidad mayor a 0
    for (let nombre in carrito) {
        if (carrito[nombre].cantidad > 0) {
            disponible = true;
            break;
        }
    }
    if (descuentoAplicado) {
        alert('Cupon aplicado exitosamente.');
    } else {
        if (cupon === 'DOMUSESMICASA50' && disponible) {
            let total = parseFloat(totalElement.querySelector('span').innerText.replace('S/. ', ''));
            descuento = total * 0.20;
            descuentoElement.querySelector('span').innerText = `S/. ${descuento.toFixed(2)}`;
            total -= descuento;
            totalElement.querySelector('span').innerText = `S/. ${total.toFixed(2)}`;
            descuentoAplicado = true;
        } else {
            alert('Cupón no es válido o el carrito está vacío.');
        }
    }
}
