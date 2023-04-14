const express = require('express');

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByName } = require('../controllers/productsController');
const { adminAuth } = require('../middleware/admin/adminAuthentication');

module.exports = express.Router()
  .post('/create', adminAuth, createProduct)
  .get('/', getProducts)
  .get('/:name', getProductsByName)
  .patch('/update/:name', adminAuth, updateProduct)
  .delete('/delete/:name', adminAuth, deleteProduct);