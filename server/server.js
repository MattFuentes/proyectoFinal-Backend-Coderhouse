const express = require('express')
const app = express();
const routersProductos = require('../routers/routersproductos')
const routersCarrito = require('../routers/routerscarrito')

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use(express.static(`public`))


app.use('/productos', routersProductos)
app.use('/carrito', routersCarrito)


const conectedServer = app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})

conectedServer.on('error', (error) => {
    console.log('error:', error)
})

