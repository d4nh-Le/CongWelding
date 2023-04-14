const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  _id: false // Disables default Mongoose id generation
});

module.exports = mongoose.model('cart_item', cartItemSchema);
