const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const unverifiedAdminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName : { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    verificationToken: { type: String, required: true },
    uniqueUrl: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1d' }
    }
});

unverifiedAdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('unverified_admin', unverifiedAdminSchema);