const express = require('express');




const { getCart, addCartItem, updateCartItem, deleteCartItem, deleteCart } = require('../controllers/cartController');
const { userAuth } = require('../middleware/user/userAuthentication');

module.exports = express.Router()
    .get('/', userAuth, getCart)
    .post('/add', addCartItem)
    .patch('/update/:itemId', updateCartItem)
    .delete('/:itemId', deleteCartItem)
    .delete('/clear', deleteCart);