const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const unverifiedUserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    verificationToken: { type: String, required: true },
    uniqueUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' }
    }
});

unverifiedUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('unverified_users', unverifiedUserSchema);