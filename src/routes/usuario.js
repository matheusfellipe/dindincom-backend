const express = require('express');
const usuario = require('../controllers/usuario')
const routes = express.Router();



routes.post('/register',usuario.registrar)
routes.get('/users')
routes.get('/')



module.exports = routes;