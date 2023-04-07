const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName : { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    defaultAddress: { type: Schema.Types.ObjectId, ref: 'Address', default: null },
    sessionId : { type: String },
    lastKnownIP: { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);


