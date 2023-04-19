const { validationResult, check } = require('express-validator');
const Cart = require('../models/userRelated/cart.js');
const User = require('../models/roles/verified/user');

const getCart = async (req, res) => {
    try {
      const usermail = req.userData.email;
      const userId = req.userData.userId;  

      const user = await User.findOne({ email: usermail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const cart = await Cart.find({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json({ cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get cart' });
    }
  }

const addCartItem = async (req, res, next) => {
    const userId = req.userData.userId;
    const { id, name, quantity, price, image } = req.body;

    try {
  
      if (!userId) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [{ product: id, name, quantity, price, image }]
        });
      } else {
        const itemIndex = cart.items.findIndex(item => item.product.toString() === id.toString());
  
        if (itemIndex >= 0) {
          cart.items[itemIndex].name = name;
          cart.items[itemIndex].quantity += quantity;
          cart.items[itemIndex].price = price;
        } else {
          cart.items.push({ product: id, name, quantity, price, image });
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



