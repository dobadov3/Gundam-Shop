var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    delivery_method: String,
    payment_method: String,
    payment_status: String,
    id_account: String,
    delivery_address: Object,
    products: Array,
    paymentMethod: String,
    status: String, 
    date: Date,
    totalPrice: Number,
    code: String,
    delivery: String,
    payment: String
});

var Order = mongoose.model('Order', orderSchema, 'order');

module.exports = Order;