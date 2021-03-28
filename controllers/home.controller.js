var data = require('../layout.data');
var Product = require('../models/products.model');

module.exports.get = async function(req, res){
    var products = await Product.find();

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100
    });

    res.render('./home/index', {
        data: data.data,
        products: products.slice(0, 4)
    });
};