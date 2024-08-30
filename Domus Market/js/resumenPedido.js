function agregarResumen() {
    const carrito = obtenerCarrito();
    const tabla = document.getElementsByClassName('tabla-contenido');
    
    if (tabla.length > 0) {
        tabla[0].innerHTML = '';

        let total = 0;
        let unidades = 0;

        for (let nombre in carrito) {
            const producto = carrito[nombre];
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            unidades += producto.cantidad;

            const tablaHTML = `
                <tr>
                    <th scope="row">1</th>
                    <td class="producto">
                        <img class="product_pic" src="${producto.img}" alt="">
                        <span>${nombre}</span>
                    </td>
                    <td>s/.${producto.precio.toFixed(2)}</td>
                    <td>${producto.cantidad}</td>
                    <td>s/.${subtotal.toFixed(2)}</td>
                </tr>`;
            tabla[0].insertAdjacentHTML('beforeend', tablaHTML);
        }

        document.getElementById('subtotal').querySelector('span').innerText = `S/. ${total.toFixed(2)}`;
        document.getElementById('total').querySelector('span').innerText = `S/. ${total.toFixed(2)}`;
    } else {
        console.error('No se encontró un elemento con la clase "tabla-contenido".');
    }
}