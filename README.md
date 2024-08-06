# Microservice Architecture with User and Product Services

## Overview

This project demonstrates a simple microservice architecture consisting of two services: User Service and Product Service. The services communicate with each other using HTTP requests.

## Services

### User Service

Endpoints:
- `POST /users` - Create a new user.
- `GET /users/:id` - Retrieve user details by ID.

### Product Service

Endpoints:
- `POST /products` - Create a new product.
- `GET /products/:id` - Retrieve product details by ID.
- `GET /products/user/:userId` - Retrieve all products created by a specific user.

## Setup and Installation

### Prerequisites

- Node.js (>= v14.x)
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/stanlymathai/Microservice-api.git
   cd Microservice-api

2. Install dependencies for both services:
    cd user-service
    npm install

    cd ../product-service
    npm install

### Running the Services
 Start the User Service:
 
    cd user-service
    npm start


Start the Product Service:

    cd ../product-service
    npm start


### Running Test Cases
Both services use Jasmine for testing. To run the test cases, navigate to the respective service directories and run. Make sure you stopped the corresponding main server before:

    npm run test

### API Documentation
The services include Swagger documentation.

To view the API documentation:

Start the services.

Navigate to the following URLs in your browser:

User Service: http://localhost:3001/api-docs
Product Service: http://localhost:3002/api-docs


### Communication Between Services
The Product Service fetches user information from the User Service when creating a new product. This is done using HTTP requests with axios.