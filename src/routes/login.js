const express = require('express');
const usuario = require('../controllers/login');
const routes = express.Router();



routes.post('/register',usuario.registrar);
routes.post('/login',usuario.login);
routes.get('/users');
routes.get('/');



module.exports = routes;