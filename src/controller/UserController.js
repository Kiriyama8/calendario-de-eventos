const crypto = require('crypto');
const database = require('../database/database');

module.exports = {

    /**
     * Retorna todos os eventos cadastrados pelo usuário
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any>}
     */
    async index(request, response) {
        const userId = request.headers.authorization;

        const events = await database('events').where('user_id', userId).select();

        return response.json(events);
    },

    /**
     * Faz o cadastro de um novo usuário retornando o id gerado
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any>}
     */
    async create(request, response) {
        const { nome, email } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');

        await database('users').insert({ id, nome, email });

        return response.json({ id });
    }
};
