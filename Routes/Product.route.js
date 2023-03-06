const express = require('express');
const router = express.Router();

const { rateLimiting } = require('../middleware/rate_limiting');
const auth = require('../middleware/authentication')

const ProductController = require('../Controllers/Product.Controller');

//Get a list of all products
router.get('/', rateLimiting({expiry: 15, maxRequests: 5}), ProductController.getAllProducts);

//Create a new product
router.post('/', rateLimiting({expiry: 15, maxRequests: 5}), (req, res, next) => {
    auth(req, res, next, 'admin');
}, ProductController.createNewProduct);

//Get a product by id
router.get('/:id', ProductController.findProductById);

//Update a product by id
router.patch('/:id', (req, res, next) => {
    auth(req, res, next, 'admin');
}, ProductController.updateAProduct);

//Delete a product by id
router.delete('/:id', (req, res, next) => {
    auth(req, res, next, 'admin');
}, ProductController.deleteAProduct);

module.exports = router;
