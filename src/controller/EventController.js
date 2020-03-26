const crypto = require('crypto');
const eventDB = require('../models/Event');

module.exports = {
    async index(request, response) {
        const events = await eventDB.select('*');

        return response.json(events);
    },

    async create(request, response) {
        const { titulo, descricao, horario, cidade, uf, user_id } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');
    
        await eventDB.insert({ id, titulo, descricao, horario, cidade, uf, user_id });
        
        return response.json({ titulo, descricao, horario, cidade, uf });
    }
};