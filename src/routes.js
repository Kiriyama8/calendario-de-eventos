const express = require('express');

const UserService = require('./services/UserService');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        hello_world: 'Hello World',
        data_atual: new Date()
    });
});

routes.post('/create', async (request, response) => {
    UserService.create(request, response);
});

module.exports = routes;