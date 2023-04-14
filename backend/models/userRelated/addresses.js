const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const addressesSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    addresses: {type: [address], required: true }
});

addressesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('addresses', addressesSchema);