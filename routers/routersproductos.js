const express = require('express');
const router = express.Router();
const controlador = require('../controlers/controlers.productos');

router.get('/', controlador.traeTodo);
router.get('/:id', controlador.traePorId);
router.post('/', controlador.agrega);
router.put('/:id', controlador.actualizaProd);
router.delete('/:id', controlador.eliminaId);

module.exports = router