const database = require('../database/database');

const usersDB = database('users');

module.exports = usersDB;