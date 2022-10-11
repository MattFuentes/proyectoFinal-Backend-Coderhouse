const Carrito = require('../models/modelscarrito');
const modelsProductos = require('../models/modelsproductos')
const carrito = new Carrito('../db/carrito.json')

const traeCarrito = async (req, res) => {
    const idCarrito = Number(req.params.id);
    const data = await carrito.traeCarrito(idCarrito);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(200).json(data)
}

const creaCarrito = (req, res) => {
    const { body: { } } = req
    const data = carrito.creaCarrito();
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(201).json(data)
}

const agregaProductos = async (req, res) => {
    const idCarrito = Number(req.params.id);
    const idProd = Number(req.body.idProd);
    const producto = await carrito.agregaProductos(idCarrito)
    if (producto?.error) return res.status(producto.error.status).json(producto.error.message);

    const productoEnCarrito = await modelsProductos.traeUnProducto(idProd);
    const itmes = productoEnCarrito[0]
    if (!idCarrito) return res.json({ error: "El numero no existe." })
    if (!idProd || productoEnCarrito.length == 0) return res.json({ error: "El producto no existe" })
    res.json(await carrito.agregaProductos(idCarrito, itmes))
}

const eliminaCarritoId = async (req, res) => {
    const idProd = Number(req.body.idProd);
    const data = await carrito.eliminaCarritoId(idProd)
    if (!data.length) return res.status(404).json({ error: "El id no existe" })
    res.status(204).json(data)
}
const eliminaItmesId = async (req, res) => {
    const idCarrito = Number(req.params.id);
    const idProd = Number(req.body.idProd);
    const producto = await modelsProductos.traeTodo(idProd)
    if (producto?.error) return res.status(producto.error.status).json(producto.error.message);
    const data = await carrito.eliminaItmesId(idCarrito, idProd);
    if (!data.error) return res.status(404).json({ error: 'El item a eliminar no existe' })
    res.status(204).send(data)
}

module.exports = {
    traeCarrito,
    creaCarrito,
    agregaProductos,
    eliminaCarritoId,
    eliminaItmesId
}
