const express = require('express');
const app = express();
const routersProductos = require('../routers/routersproductos');
const routersCarrito = require('../routers/routerscarrito');
const { Server: HttpServer } = require ('http');
const { Server: SocketServer } = require ('socket.io');
const dbConfig = require ('./db/config')
const httpServer = new HttpServer(app);
const Products = require("./model/producto");
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`public`))


app.use('/productos', routersProductos)
app.use('/carrito', routersCarrito)


const users = [];

//Socket
io.on("connection", async (socket) => {
    const products = await productsDB.getAll();
    socket.emit('products', products);

    socket.on('newProduct', async (newProduct) => {
        await productsDB.save(newProduct);
        const updateProducts = await productsDB.getAll();
        io.emit('products', updateProducts)
    });
    socket.on("new-user", (username) => {
        const newUser = {
            id: socket.id,
            username: username,
        };
        users.push(newUser);
    });
});

const conectedServer = app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})

conectedServer.on('error', (error) => {
    console.log('error:', error)
})

