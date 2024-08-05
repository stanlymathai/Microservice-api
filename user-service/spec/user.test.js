const http = require('http');
const app = require('../src/app');

const { app_key } = require("../src/configs/env.config/app.env.js");

function generateRandomUser() {
    const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana"];
    const lastNames = ["Smith", "Doe", "Johnson", "Williams", "Brown", "Jones"];
    const domains = ["example.com", "test.com", "demo.com", "sample.com"];
    const genders = ['male', 'female', 'non-binary', 'not-specified'];

    const randomFirstName = `test${firstNames[Math.floor(Math.random() * firstNames.length)]}${Math.floor(Math.random() * 1000)}`;
    const randomLastName = `test${lastNames[Math.floor(Math.random() * lastNames.length)]}${Math.floor(Math.random() * 1000)}`;
    const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const randomGender = `${genders[Math.floor(Math.random() * genders.length)]}`;
    return {
        firstName: randomFirstName,
        lastName: randomLastName,
        gender: randomGender,
        email: randomEmail
    };
}


describe("User Service", () => {
    let server;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(8000, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it("should handle fetching a non-existent user", (done) => {
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
                    const expectedResponse = "As Strong as an Ox!";
                    expect(data).toBe(expectedResponse);
                } catch (e) {
                    done(e);
                }
                done();
            });
        }).on('error', done);
    });

    it("should return 403 for unauthorized requests", (done) => {
        const options = {
            method: 'GET'
        };

        http.get('http://localhost:8000/users/66b0a4ba67d300872678f488', options, (res) => {
            expect(res.statusCode).toBe(403);
            done();
        }).on('error', done);
    });

    it("should handle valid user retrieval", (done) => {
        const validUserId = '66b126517c9da40aeb2a2fd9';
        const options = {
            method: 'GET',
            headers: {
                'Authorization': app_key
            }
        };

        http.get(`http://localhost:8000/users/${validUserId}`, options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                expect(res.statusCode).toBe(200);
                try {
                    const expectedResponse = {
                        success: true,
                        data: {
                            firstName: "John",
                            lastName: "Doe",
                            email: "john.doe@example.com",
                            gender: "male",
                            _id: "66b126517c9da40aeb2a2fd9",
                            createdAt: "2024-08-05T19:21:53.577Z",
                            updatedAt: "2024-08-05T19:21:53.578Z"
                        }
                    }
                    expect(JSON.parse(data)).toEqual(expectedResponse);
                } catch (e) {
                    done(e);
                }
                done();
            });
        }).on('error', done);
    });

    it("should handle creating a new user", (done) => {
        const newUser = generateRandomUser();

        const options = {
            method: 'POST',
            headers: {
                'Authorization': app_key,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request('http://localhost:8000/users', options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                expect(res.statusCode).toBe(200);
                try {
                    const response = JSON.parse(data);
                    expect(response.success).toBe(true);
                    expect(response.data.firstName).toBe(newUser.firstName);
                } catch (e) {
                    done(e);
                }
                done();
            });
        });

        req.write(JSON.stringify(newUser));
        req.end();
    });

    it("should handle invalid user creation", (done) => {
        const invalidUser = {
            email: "invalid.email"  // Missing required fields
        };

        const options = {
            method: 'POST',
            headers: {
                'Authorization': app_key,
                'Content-Type': 'application/json'
            }
        };

        const req = http.request('http://localhost:8000/users', options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                expect(res.statusCode).toBe(500);
                try {
                    const response = JSON.parse(data);
                    expect(response.success).toBe(false);
                    expect(response.error).toBe('Failed to create user');
                } catch (e) {
                    done(e);
                }
                done();
            });
        });

        req.write(JSON.stringify(invalidUser));
        req.end();
    });

});
