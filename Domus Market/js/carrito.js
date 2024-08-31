let descuentoAplicado = false;

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito(); 
    const agregarDivs = document.querySelectorAll('.product_option_add');

    agregarDivs.forEach(div => {
        div.addEventListener('click', (event) => {
            console.log("CLICK EN AGREGAR");
            const productElement = event.target.closest('.product');
            if (productElement) {
                const nombreProducto = productElement.querySelector('.product_name').innerText;
                const img = productElement.querySelector('.product_pic').src;

                const priceForSaleElement = productElement.querySelector('.price_for_sale .product_price_number');
                const priceOnlineElement = productElement.querySelector('.price_online .product_price_number');

                let precio = 0;

                if (priceForSaleElement) {
                    precio = parseFloat(priceForSaleElement.innerText.replace('S/. ', '').replace(',', ''));
                } else if (priceOnlineElement) {
                    precio = parseFloat(priceOnlineElement.innerText.replace('S/. ', '').replace(',', ''));
                }

                agregarProducto(nombreProducto, precio, img);
                actualizarCarrito();
                actualizarCantidadCarrito();
                console.log(productElement);
            } else {
                console.log("No se encontró el elemento del producto.");
            }
        });
    });
});


function agregarProducto(nombre, precio, img) {
    let carrito = obtenerCarrito();
    if (carrito[nombre]) {
        carrito[nombre].cantidad += 1;
    } else {
        carrito[nombre] = {
            precio: precio,
            img: img,
            cantidad: 1
        };
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

/**********************************************LÓGICA PROPIA DEL CARRO******************************************************/
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
    
    if (carrito[nombreProducto]) {
        carrito[nombreProducto].cantidad -= 1;
        if (carrito[nombreProducto].cantidad < 1) {
            delete carrito[nombreProducto]; 
        }
        guardarCarrito(carrito);
        actualizarCarrito();
        actualizarCantidadCarrito();  
    }

    if (Object.keys(carrito).length === 0) { 
        descuentoElement.querySelector('span').innerText = `S/.00.00`;
        descuentoAplicado = false;
    }
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
                    <img src="${producto.img}"
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
function validarCarro() {
    const carrito = obtenerCarrito();
    let disponible = false;
    for (let nombre in carrito) {
        if (carrito[nombre].cantidad > 0) {
            disponible = true;
            break;
        }
    }
    if (disponible) {
        window.location.href = "resumenDePedido.html";
    } else {
        alert('Agregue productos a su carrito');
    }
}

/***************************************PARA EL CONTADOR DE PRODUCTOS*****************************************************/
function actualizarCantidadCarrito() {
    const carrito = obtenerCarrito();
    const contadorCarrito = document.getElementById('carrito_cant');
    let totalCantidad = 0;

    for (let producto in carrito) {
        totalCantidad += carrito[producto].cantidad;
    }

    contadorCarrito.innerText = `(${totalCantidad})`;
}
