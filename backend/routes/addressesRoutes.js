const express = require('express');
const { userAuth } = require('../middleware/user/userAuthentication');

const { createAddress, getAddresses, getAddress, updateAddress, deleteAddress } = require('../controllers/addressesController');

module.exports = express.Router()
  .post('/create', userAuth, createAddress)
  .get('/', userAuth, getAddresses)
  .get('/:name', userAuth, getAddress)
  .patch('/update/:name', userAuth, updateAddress)
  .delete('/delete:name', userAuth, deleteAddress);