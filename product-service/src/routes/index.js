const productsRoutes = require('./product.route');
const globalErrorHandler = require('../handlers/globalError.handler');

module.exports = (req, res) => {
  const { method, url } = req;

  // Health check endpoint
  if (url === '/hello' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Joy in every hello.');
    return;
  }

  try {
    // Product routes
    productsRoutes(req, res);
  } catch (err) {
    globalErrorHandler(err, req, res);
  }
};
