const productos = require('../db/producto')

traeTodo = () => {
    const todoProductos = productos.traeTodosProductos()
    return todoProductos
}

traeUnProducto = (idProd) => {
    const traeUnProducto = productos.traeUnProducto(idProd)
    return traeUnProducto
}
agregaProd = (nuevoProducto) => {
    const insertarEnProd = {
        ...nuevoProducto,
        timestamp: new Date()
    }
    const productoCreado = productos.creaNuevoProducto(insertarEnProd)
    return productoCreado
}


actualizaProd = (prodId, cambio) => {
    const productoCambiado = productos.actualizaUnProducto(prodId, cambio)
    return (productoCambiado)
}

eliminaId = (idEliminar) => {
    const productoEliminar = productos.eliminaUnProducto(idEliminar)
    return (productoEliminar)
}

module.exports = {
    traeTodo,
    traeUnProducto,
    actualizaProd,
    agregaProd,
    eliminaId
}