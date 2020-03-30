const express = require('express');

const UserController = require('./controller/UserController');
const EventController = require('./controller/EventController');
const SessionController = require('./controller/Auth/SessionController');

const routes = express.Router();

routes.get('/eventos', EventController.index);

routes.post('/sessions', SessionController.create);

routes.get('/eventos/listar/:id', EventController.show);
routes.post('/eventos/cadastrar', EventController.create);
routes.delete('/eventos/deletar/:id', EventController.delete);

routes.get('/usuarios/listar', UserController.index);
routes.post('/usuarios/cadastrar', UserController.create);

module.exports = routes;
