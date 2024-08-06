const axios = require('axios');
const Product = require('../models/product.model');

// Base URL of the User Service.
const userServiceBaseURL = process.env.USER_SERVICE_BASE_URL;
const authorizationKey = process.env.USER_SERVICE_APP_KEY;

// Create a new product
module.exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, createdBy } = req.body;

    // Fetch user information from User Service
    const userResponse = await axios.get(`${userServiceBaseURL}/users/${createdBy}`, {
      headers: {
        'Authorization': `${authorizationKey}`
      }
    });

    if (!userResponse.data) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    // Create the product
    const product = new Product({
      name,
      description,
      price,
      category,
      createdBy,
    });

    await product.save();

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (err) {
    if (err.response && err.response.status === 404) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error', error: err.message }));
    }
  }
};

// Get a product by ID
module.exports.getProductById = async (req, res, productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Product not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(product));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error', error: err.message }));
  }
};

// Get products by user ID
module.exports.getProductsByUser = async (req, res, userId) => {
  try {
    const products = await Product.find({ createdBy: userId });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error', error: err.message }));
  }
};
