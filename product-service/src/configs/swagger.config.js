const http = require('http');
const fs = require('fs');
const path = require('path');
const swaggerUiDist = require('swagger-ui-dist');

const server = http.createServer((req, res) => {
    if (req.url === '/api-docs') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Swagger UI</title>
                <link rel="stylesheet" type="text/css" href="/swagger-ui.css" />
                <link rel="stylesheet" type="text/css" href="/index.css" />
            </head>
            <body>
                <div id="swagger-ui"></div>
                <script src="/swagger-ui-bundle.js"> </script>
                <script src="/swagger-ui-standalone-preset.js"> </script>
                <script>
                window.onload = function() {
                    const ui = SwaggerUIBundle({
                        url: '/swagger.yaml',
                        dom_id: '#swagger-ui',
                        presets: [
                            SwaggerUIBundle.presets.apis,
                            SwaggerUIStandalonePreset
                        ],
                        layout: "StandaloneLayout",
                        // Ensure the correct base URL for API
                        requestInterceptor: (req) => {
                            req.url = req.url.replace('http://localhost:3001', 'http://localhost:3000');
                            return req;
                        }
                    });
                }
                </script>
            </body>
            </html>
        `);
    } else if (req.url === '/swagger.yaml') {
        res.writeHead(200, { 'Content-Type': 'application/x-yaml' });
        res.end(fs.readFileSync(path.join(__dirname, '../utils/product-service-openapi.yml')));
    } else {
        // Serve static files from swagger-ui-dist
        const filePath = path.join(swaggerUiDist.getAbsoluteFSPath(), req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                let contentType = 'text/plain';
                if (req.url.endsWith('.css')) contentType = 'text/css';
                if (req.url.endsWith('.js')) contentType = 'application/javascript';
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
});

module.exports = server;
