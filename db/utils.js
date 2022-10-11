const fs = require('fs')
const path = require('path')


const guardaEnBase = async (db) => {
    fs.writeFileSync('./db/productos.json', JSON.stringify(db, null, 2), { encoding: 'utf-8' })
}
const leerCarrito = async (nombreArchivo) => {
    try {
        const data = await fs.promises.readFile(path.join(__dirname, `/${nombreArchivo}`), 'utf-8')
        console.log(data)
        const dataParse = JSON.parse(data)
        return dataParse


    } catch (error) {
        console.log('no se puede leer la base de productos', error)
    }

}
const guardaCarrito = async (nombreArchivo, item) => {
    try {
        const data = await fs.promises.writeFile(path.join(__dirname, `/${nombreArchivo}`), JSON.stringify(item, null, 2))
        console.log('guardado')
    } catch (error) {
        console.log('no se pudo guardar el producto')
    }
}

module.exports = {
    guardaEnBase,
    leerCarrito,
    guardaCarrito
}