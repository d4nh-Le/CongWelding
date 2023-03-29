const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { unique: true });  // Prevents users from adding address duplicates

module.exports = mongoose.model('Address', addressSchema);


