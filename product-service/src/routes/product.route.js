const { verifyString } = require('../middlewares/auth.middleware');
const handler = require('../controllers/product.controller');
const globalErrorHandler = require('../handlers/globalError.handler');

module.exports = (req, res) => {
    const { method, url } = req;

    try {
        return verifyString(req, res, () => {
            if (url === '/products' && method === 'POST') {
                return handler.createProduct(req, res);
            }

            const productIdMatch = url.match(/^\/products\/(\w+)$/);
            if (productIdMatch && method === 'GET') {
                const productId = productIdMatch[1];
                return handler.getProductById(req, res, productId);
            }

            const userProductsMatch = url.match(/^\/products\/user\/(\w+)$/);
            if (userProductsMatch && method === 'GET') {
                const userId = userProductsMatch[1];
                return handler.getProductsByUser(req, res, userId);
            }

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        });
    } catch (err) {
        globalErrorHandler(err, req, res);
    }
};
