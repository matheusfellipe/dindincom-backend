const cremosinho = require('../controllers/cremosinho')
const express = require('express');
const routes = express.Router();


routes.post('/cremosinho',cremosinho.criar)
routes.get('/cremosinhos',cremosinho.index)
routes.get('/cremosinho',cremosinho.consultarUm)
routes.delete('/cremosinho/:id',cremosinho.delete)
routes.put('/cremosinho/:id',cremosinho.update)

module.exports = routes
