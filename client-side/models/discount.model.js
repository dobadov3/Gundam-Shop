var mongoose = require('mongoose');
var shortId = require('short-id')

var discountSchema = new mongoose.Schema({
    code: {
        type: String,
        default: shortId.generate(),
    },
    date_create: {
        type: Date,
        default: new Date(),
    },
    expire: Date,
    multiply: Number,
});

var Discount = mongoose.model("Discount", discountSchema, "discount");

module.exports = Discount;