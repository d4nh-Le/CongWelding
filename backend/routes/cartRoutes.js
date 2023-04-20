const express = require('express');
const { getCart, addCartItem, updateCartItem, deleteCartItem, deleteCart } = require('../controllers/cartController');
const { userAuth } = require('../middleware/user/userAuthentication');

module.exports = express.Router()
    .get('/', userAuth, getCart)
    .post('/add', userAuth, addCartItem)
    .patch('/update/:itemId', userAuth, updateCartItem)
    .delete('/delete/:itemId', userAuth, deleteCartItem)
    .delete('/clear', userAuth, deleteCart);