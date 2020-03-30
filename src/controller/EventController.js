const crypto = require('crypto');
const database = require('../database/database');

module.exports = {

    /**
     * Método responsável por retornar todos os eventos
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any>}
     */
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await database('events').count();

        const events = await  database('events')
            .join('users', 'users.id', '=', 'events.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'events.*',
                'users.nome',
                'users.email'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(events);
    },

    /**
     * Método responsável por retornar um evento
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any>}
     */
    async show(request, response) {
        const id = request.body.id;

        const event = await database('events').where('id', id).select();

        return response.json({ event });
    },

    /**
     * Método responsável por cadastrar um evento
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any>}
     */
    async create(request, response) {
        const { titulo, descricao, horario, cidade, uf } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');
        const user_id = request.headers.authorization;

        await database('events').insert({ id, titulo, descricao, horario, cidade, uf, user_id });

        return response.json({ id });
    },

    /**
     * Verifica se o usuário autenticado é o criador do evento a ser deletado
     *
     * @param request
     * @param response
     * @returns {Promise<Knex.ColumnBuilder|any|number|void>}
     */
    async delete(request, response) {
        const { id } = request.body;
        const user_id = request.headers.authorization;

        const event = await database('events').where('id', id).select('user_id').first();

        if (event.user_id != user_id) {
            return response.status(401).json({ error: 'Operação não permitida!' });
        }

        await database('events').where('id', id).delete();

        return response.status(204).send();
    }

};
