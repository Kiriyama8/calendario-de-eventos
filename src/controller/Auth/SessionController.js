const database = require('../../database/database');

module.exports = {
	async create(request, response) {
		const { id } = request.body;

		const user = await database('users')
			.where('id', id)
			.select('nome')
			.first();

		if (!user) {
			return response.status(400).json({ error: 'Usuário não encontrado' });
		}

		return response.json(user);
	}
};
