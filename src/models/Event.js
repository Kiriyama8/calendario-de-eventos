const database = require('../database/database');

const eventsDB = database('events');

module.exports = eventsDB;