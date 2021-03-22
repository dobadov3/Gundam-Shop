var data = require('../layout.data');
var Product = require('../models/products.model');

module.exports.get = async function(req, res){
    var products = await Product.find();

    res.render('./products/index', {
        data: data.data,
        products: products
    });
};

module.exports.getByCategory = async function(req, res){
    var cateID = req.params.cateID;
    var products = await Product.find({id_detail_category: cateID});
    
    res.render('./products/index', {
        data: data.data,
        products: products
    });
}