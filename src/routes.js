const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/users')
const HouseController = require('./controllers/houses')

routes.get('/users', UserController.get_all)
routes.get('/users/broker', UserController.get_broker_all)
routes.get('/users/broker/:url', UserController.get_broker)
routes.get('/users/:id', UserController.get)
routes.delete('/users/:id', UserController.delete)
routes.post('/users/create', UserController.create)
routes.post('/users/authenticate', UserController.authenticate)

routes.get('/houses/:id', HouseController.get_all)

module.exports = routes;