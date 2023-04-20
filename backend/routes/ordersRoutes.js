const express = require('express');

const { createOrder, getOrders, getOrderByNumber, 
    getOrdersForUser, updateOrder, deleteOrder } = require('../controllers/ordersController');

const { userAuth } = require('../middleware/user/userAuthentication');
const { adminAuth } = require('../middleware/admin/adminAuthentication');

module.exports = express.Router()
    .post('/create', userAuth || adminAuth, createOrder)
    .get('/', adminAuth, getOrders)
    .get('/userOrders', userAuth, getOrdersForUser)
    .get('/:orderNumber', userAuth, getOrderByNumber)
    .patch('/update/:orderNumber', adminAuth, updateOrder)
    .delete('/delete/:orderNumber', adminAuth, deleteOrder);