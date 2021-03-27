var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    id: String,
    id_detail_category: String,
    name: String,
    price: Number,
    count: Number,
    status: String,
    description: String,
    image: Array,
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;