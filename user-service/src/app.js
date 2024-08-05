// Loads .env file contents.
require('dotenv').config();

const db = require('./configs/db.config.js');
const routes = require('./routes');

db.establishConnection();

function app(req, res) {
    routes(req, res);
};

module.exports = app