const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true},
    defaultAddress: { type: Schema.Types.ObjectId, ref: 'Address', default: null },
    sessionId : { type: String },
    lastKnownIP: { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);


