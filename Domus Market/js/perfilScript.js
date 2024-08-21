function confirmarCierreSesion() {
    var respuesta = confirm("¿Está seguro que quiere cerrar sesión?");
    if (respuesta) {
        window.location.href = 'index.html';
    }
}