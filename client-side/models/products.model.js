var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    id_detail_category: String,
    name: String,
    price: Number,
    count: Number,
    description: Array,
    image: Array,
    sale: Number,
    weight: Number,
    quantity: Number
});

var Product = mongoose.model('Product', productSchema, 'products');

Product.prototype.priceSale = Product.price - (Product.price * Product.sale) / 100;

module.exports = Product;