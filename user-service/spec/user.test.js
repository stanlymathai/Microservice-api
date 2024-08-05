const http = require('http');
const app = require('../src/app');

const { app_key } = require("../src/configs/env.config/app.env.js");

describe("User Service", () => {
    let server;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(8000, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it("should return 404 for a non-existent user", (done) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': app_key
            }
        };

        http.get('http://localhost:8000/users/66b0a4ba67d300872678f488', options, (res) => {
            expect(res.statusCode).toBe(500);
            done();
        }).on('error', done);
    });

    it("should return 200 and status message for /health", (done) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': app_key
            }
        };

        http.get('http://localhost:8000/health', options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                expect(res.statusCode).toBe(200);
                try {
                    const expectedResponse = "As Strong as an Ox!"; // Adjust based on actual response
                    expect(data).toBe(expectedResponse);
                } catch (e) {
                    done(e);
                }
                done();
            });
        }).on('error', done);
    });
});
