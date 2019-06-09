const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/users')

routes.get('/users', UserController.get_all)
routes.get('/users/:id', UserController.get)
routes.delete('/users/:id', UserController.delete)
routes.post('/users/create', UserController.create)
routes.post('/users/authenticate', UserController.authenticate)

module.exports = routes;