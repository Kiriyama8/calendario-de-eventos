const crypto = require('crypto');
const usersDB = require('../models/User');

module.exports = {
    async create() {
        const { titulo, descricao, horario, cidade, uf, user_id } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');
    
        await usersDB.insert({ id, titulo, descricao, horario, cidade, uf, user_id });
    
        return response.json({ titulo, descricao, horario, cidade, uf });
    }
};