const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-dist');

const SWAGGER_UI_PATH = swaggerUi.getAbsoluteFSPath();
const SWAGGER_YAML_PATH = path.join(__dirname, '../utils/user-service-openapi.yml');

const server = http.createServer((req, res) => {
    if (req.url === '/api-docs') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const indexHTML = fs.readFileSync(path.join(SWAGGER_UI_PATH, 'index.html'), 'utf8');
        const updatedHTML = indexHTML.replace(
            'https://petstore.swagger.io/v2/swagger.json',
            '/swagger.yml'
        );
        res.end(updatedHTML);
    } else if (req.url === '/swagger.yml') {
        fs.readFile(SWAGGER_YAML_PATH, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/x-yaml' });
            res.end(data);
        });
    } else if (req.url.startsWith('/swagger-ui/')) {
        const filePath = path.join(SWAGGER_UI_PATH, req.url.replace('/swagger-ui/', ''));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }
            const ext = path.extname(filePath).substring(1);
            const mimeType = {
                'html': 'text/html',
                'js': 'application/javascript',
                'css': 'text/css',
                'png': 'image/png',
                'json': 'application/json',
                'yaml': 'application/x-yaml',
                'yml': 'application/x-yaml'
            }[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

module.exports = server;
