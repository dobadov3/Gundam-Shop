var mongoose = require("mongoose");

var billSchema = new mongoose.Schema({
    order_id: String,
    date: Date,
    products: Array,
    totalPrice: Number,
    shippingCost: Number,
    code: String
});

var Bill = mongoose.model("Bill", billSchema, "bill");

module.exports = Bill;
