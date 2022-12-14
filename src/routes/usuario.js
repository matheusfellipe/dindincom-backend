const usuario = require('../controllers/usuario');
const express = require('express');
const routes = express.Router();


routes.post('/usuario',usuario.criar);
routes.get('/usuarioes',usuario.index);
routes.get('/usuario',usuario.consultarUm);
routes.delete('/usuario/:id',usuario.delete);
routes.put('/usuario/:id',usuario.update);

module.exports = routes;
