const express = require('express');
const router = express.Router();
const controladorCarrito = require('../controlers/controlers.carrito');

router.get('/:id/productos', controladorCarrito.traeCarrito);

router.post('/', controladorCarrito.creaCarrito);
router.put('/:id/productos', controladorCarrito.agregaProductos);

router.delete('/:id', controladorCarrito.eliminaCarritoId);
router.delete('/:id/productos/:id_prod', controladorCarrito.eliminaItmesId);

module.exports = router




