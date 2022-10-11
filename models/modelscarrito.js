const { leerCarrito, guardaCarrito } = require('../db/utils');
const carritoDB = require('../db/carrito.json');

class Carrito {
    constructor(ruta) {
        this.ruta = ruta;
        this.products = []
    }
    async nuevoCarrito() {
        try {
            const carrito = leerCarrito(carritoDB)
            const nuevoPedido = {
                id: carrito.length + 1,
                timestamp: new Date(),
                products: this.products,
                total: 0,
            }
            carrito.push(nuevoPedido);
            guardaCarrito(carrito)
            return nuevoPedido
        } catch (error) {
            console.log(`Se produjo un error en nuevoProducto:${error}`)
        }
    }
    async eliminaCarritoPorId(idCarrito) {
        try {
            const carrito = leerCarrito(carritoDB)
            const carritofiltrado = carrito.filter(({ id }) => id != idCarrito)
            const carritoEncontrado = carrito.find(({ id }) => id == idCarrito)

            if (carritoEncontrado) {
                guardaCarrito(carritofiltrado)
                return carritoEncontrado
            } else {
                console.log('no se ha encontrado el carrito con id')
            }
        } catch (error) {
            console.log('no se puede eliminar el carrito')
        }
    }

    async traeCarritoPorId(idCarrito) {
        try {
            const carrito = leerCarrito(carritoDB)
            const carritoEncontrado = carrito.find(({ id }) => id == idCarrito)
            if (carritoEncontrado) {
                return carritoEncontrado
            } else {
                return null
            }
        } catch (error) {
            console.log('se produjo un error en traer Carrito por Id')
        }
    }
}



module.exports = Carrito