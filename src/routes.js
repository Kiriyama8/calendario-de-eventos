const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        hello_world: 'Hello World',
        data_atual: new Date()
    });
});

module.exports = routes;