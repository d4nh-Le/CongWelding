const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, required: true, unique: true, immutable: true },
    orderDate: {type: Date, default: Date.now },
    orderStatus: {type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    items: { type: Array, required: true }, // gonna get the info from the cart and clear it on order confirmation
    shippingAddress: { type: Object, required: true },
    billingAddress: { type: Object, required: true }, // shipping address and bill address are required as they can be different.
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('order', orderSchema);