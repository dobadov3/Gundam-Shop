var data = require('../layout.data');
var Product = require('../models/products.model');

module.exports.get = async function(req, res){
    var products = await Product.find();

    res.render('./home/index', {
        data: data.data,
        products: products.slice(0, 4)
    });
};