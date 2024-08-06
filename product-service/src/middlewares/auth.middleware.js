const { app_key } = require('../configs/env.config/app.env.js');

function verifyString(req, res, next) {
  const authorization = req.headers['authorization'];

  if (authorization === app_key) {
    next();
  } else {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Forbidden' }));
  }
}

module.exports = { verifyString };