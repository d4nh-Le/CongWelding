const { validationResult, check } = require('express-validator');
const Cart = require('../models/userRelated/cart.js');
const User = require('../models/roles/verified/user');
const Product = require('../models/productRelated/product');
const HttpError = require('../models/httpError');

const getCart = async (req, res, next) => {
    try {
      const userId = req.userData.userId;  
      const cart = await Cart.find({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      
      res.json({ cart });
    } catch (err) {
      const error = new HttpError(
        'Failed to get cart.',
        500
      );
      console.error(err);
      return next(error);
    }
  }

const addCartItem = async (req, res, next) => {
    const userId = req.userData.userId;
    const { productId, quantity } = req.body;

    // Gets product info
    let product;
    try {
      product = await Product.findOne({ _id: productId });
    } catch (err) {
      const error = new HttpError(
        'Fetching product failed, please try again later.',
        500
      );
      return next(error);
    }

    if (!product) {
      const error = new HttpError(
        'Could not find product with the given id.',
        404
      );
      return next(error);
    }

    const { name, price, image } = product;

    try {
      if (!userId) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [{ product: productId, name, quantity, price, image }]
        });
      } else {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
  
        if (itemIndex >= 0) {
          cart.items[itemIndex].name = name;
          cart.items[itemIndex].quantity += quantity;
          cart.items[itemIndex].price = price;
        } else {
          cart.items.push({ product: productId, name, quantity, price, image });
        }
      }
      await cart.save();
  
      res.json({ cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add item to cart' });
    }
  }


// Changes cart item quantity
const updateCartItem = async (req, res) => {

    const userId = req.userData.userId;

    try {
      
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      const itemId = req.params.itemId;
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId.toString());
  
      console.log(itemIndex);

      if (itemIndex < 0) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      const item = cart.items[itemIndex];
      const newQuantity = req.body.quantity || item.quantity;
  
      if (newQuantity <= 0) {
         cart.items.splice(itemIndex, 1);
      } else {
        item.quantity = newQuantity;
      }
  
      await cart.save();
  
      res.json({ cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update item quantity in cart' });
    }
  }



const deleteCartItem = async (req, res) => {

    const userId = req.userData.userId;

    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const itemId = req.params.itemId;
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId.toString());
  
      if (itemIndex < 0) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.json({ cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete item from cart' });
    }
  }




const deleteCart = async (req, res) => {
    const userId = req.userData.userId;

    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.items = [];
      await cart.save();
  
      res.json({ cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to clear cart' });
    }
  }




module.exports = {
getCart,
addCartItem,
updateCartItem,
deleteCartItem,
deleteCart
 };



