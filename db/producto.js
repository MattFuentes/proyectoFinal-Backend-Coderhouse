const db = require('./productos.json')
const { guardaEnBase } = require('./utils')



const traeTodosProductos = () => {
    return db
}

const traeUnProducto = (idProd) => {
    const prodId = db.find(prod => prod.id == idProd)
    if (!prodId) {
        return { error: 'producto no encontrado' }
    }
    return prodId
}

const creaNuevoProducto = (nvoProducto) => {
    const pdtoYaExiste = db.findIndex((obj) => obj.id === nvoProducto.id) > -1
    if (pdtoYaExiste) {
        return { error: "producto ya existe" }
    }
    db.push(nvoProducto)
    guardaEnBase(db)
    return nvoProducto
}

const actualizaUnProducto = (prodId, cambio) => {
    try {
        const cambioYaHecho = db.findIndex((prod) => prod.id === cambio.id) > -1;
        if (cambioYaHecho) {
            throw { status: 400, message: `cambio en ${cambio.id} ya se hizo` }
        };
        const indicePorActualizar = db.findIndex((prod) => prod.id === +prodId)

        if (indicePorActualizar === -1) {
            return { error: "producto no existe" }
        }
        const actualProducto = {
            ...db[indicePorActualizar],
            ...cambio,


        }
        db[indicePorActualizar] = actualProducto
        guardaEnBase(db)
        return db
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const eliminaUnProducto = (idEliminar) => {
    try {

        const indiceProdEliminar = db.findIndex(prod => prod.id === +idEliminar)

        if (indiceProdEliminar === -1) { throw { error: 'producto no econtrado' } }
        db.splice(indiceProdEliminar, 1)
        guardaEnBase(db)
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

module.exports = {
    traeTodosProductos,
    traeUnProducto,
    creaNuevoProducto,
    actualizaUnProducto,
    eliminaUnProducto
}