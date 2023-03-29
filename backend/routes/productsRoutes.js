const express = require('express');

const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productsController');

module.exports = express.Router()
  .post('/create', createProduct)
  .get('/', getProducts)
  .get('/:name', getProduct)
  .patch('/update/:name', updateProduct)
  .delete('/delete/:name', deleteProduct);