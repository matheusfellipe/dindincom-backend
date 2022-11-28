const entregador = require('../controllers/entregador')
const express = require('express');
const routes = express.Router();


routes.post('/entregador',entregador.criar)
routes.get('/entregadores',entregador.index)
routes.get('/entregador',entregador.consultarUm)
routes.delete('/entregador/:id',entregador.delete)
routes.put('/entregador/:id',entregador.update)

module.exports = routes
