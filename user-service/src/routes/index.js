const userRoutes = require('./user.route');

module.exports = (req, res) => {
  const { method, url } = req;

  // Health check endpoint
  if (url === '/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('As Strong as an Ox!');
    return;
  }

  // User routes
  userRoutes(req, res);
};