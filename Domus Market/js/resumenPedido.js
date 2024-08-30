document.addEventListener('DOMContentLoaded', function() {
    agregarResumen();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || {};
}

function agregarResumen() {
    const carrito = obtenerCarrito();
    const tabla = document.getElementById('tabla-contenido');
    const elementosTotal = document.getElementsByClassName('total');
    
    if (tabla) { 
        tabla.innerHTML = ''; 
        let contadorProductos=1;
        let total = 0;
        let unidades = 0;

        for (let nombre in carrito) {
            const producto = carrito[nombre];
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            unidades += producto.cantidad;
            
            const tablaHTML = `
                <tr>
                    <th scope="row">${contadorProductos++}</th>
                    <td class="producto">
                        <img class="product_pic" src="${producto.img}" alt="">
                        <span>${nombre}</span>
                    </td>
                    <td>s/.${producto.precio.toFixed(2)}</td>
                    <td>${producto.cantidad}</td>
                    <td>s/.${subtotal.toFixed(2)}</td>
                </tr>`;
            tabla.insertAdjacentHTML('beforeend', tablaHTML);
        }

        document.getElementById('subtotal').innerText = `S/. ${total.toFixed(2)}`;

        for (let i = 0; i < elementosTotal.length; i++) {
            elementosTotal[i].innerText = `S/. ${total.toFixed(2)}`;
        }

    } else {
        console.error('No se encontró un elemento con el ID "tabla-contenido".');
    }
}
