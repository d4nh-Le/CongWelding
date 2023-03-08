const express = require('express');

const { createAddress, getAddresses, getAddress, updateAddress, deleteAddress } = require('../controllers/addresses-controllers');

module.exports = express.Router()
  .post('/create', createAddress)
  .get('/', getAddresses)
  .get('/:name', getAddress)
  .patch('/update/:name', updateAddress)
  .delete('/delete:name', deleteAddress);