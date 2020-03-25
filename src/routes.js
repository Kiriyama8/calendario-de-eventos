const express = require('express');

const crypto = require('crypto');
const database = require('./database/database');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        hello_world: 'Hello World',
        data_atual: new Date()
    });
});

routes.post('/create', async (request, response) => {
    const { nome, email } = request.body;
    const id = crypto.randomBytes(6).toString('HEX');

    await database('users').insert({ id, nome, email });

    return response.json({ id });
});

module.exports = routes;