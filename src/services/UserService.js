const crypto = require('crypto');
const usersDB = require('../models/User');

module.exports = {
    async create(request, response) {
        const { nome, email } = request.body;
        const id = crypto.randomBytes(6).toString('HEX');
    
        await usersDB.insert({ id, nome, email });
    
        return response.json({ id });
    }
};