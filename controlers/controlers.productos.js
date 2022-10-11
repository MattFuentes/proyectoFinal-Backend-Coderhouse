const models = require('../models/modelsproductos')

const traeTodo = (req, res) => {
    const data = models.traeTodo()
    res.send(data)
}

const traePorId = (req, res) => {
    const prdId = Number(req.params.id)
    if (!prdId) return res.status(404).json(data)
    const data = models.traeUnProducto(prdId)
    res.send(data)
}

const agrega = (req, res) => {
    const { body } = req
    if (
        !body.id ||
        !body.title ||
        !body.descripcion ||
        !body.codigo ||
        !body.price ||
        !body.stock ||
        !body.thumbnail
    ) {
        res.status(400).send({ status: "falla", data: { error: "error en agregado" } })
    }
    const nuevoObjeto = {
        id: body.id,
        title: body.name,
        descripcion: body.descripcion,
        codigo: body.codigo,
        price: Number(body.price),
        stock: body.stock,
        thumbnail: body.thumbnail

    }
    const prodCreado = models.agregaProd(nuevoObjeto)
    res.status(201).send(prodCreado)

}

const actualizaProd = (req, res) => {
    const body = req.body
    const prodId = Number(req.params.id)
    if (!prodId) {
        return res.status(400).send({ error: "error de Id" })
    }
    const productoActualizado = models.actualizaProd(prodId, body)
    res.status(200).send(productoActualizado);
}

const eliminaId = (req, res) => {
    const prodId = Number(req.params.id)
    if (!prodId) return res.status(404).json(data)
    const data = models.eliminaId(prodId);
    res.status(204).send(data);
}

module.exports = {
    traeTodo,
    traePorId,
    actualizaProd,
    agrega,
    eliminaId
}