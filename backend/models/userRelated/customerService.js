const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const customerServiceSchema = new Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true, maxlength: 1}
});

module.exports = mongoose.model('CustomerService', customerServiceSchema);
