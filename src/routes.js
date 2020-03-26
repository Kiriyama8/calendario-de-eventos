const express = require('express');

const UserController = require('./controller/UserController');
const EventController = require('./controller/EventController');

const routes = express.Router();

routes.get('/', EventController.index);
routes.post('/users/store', UserController.create);
routes.post('/events/store', EventController.create);

module.exports = routes;