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
    var page = req.query.page || 1;
    var limit = 4;
    var products = await Product.find({id_detail_category: cateID})
                                .skip((page * limit) - limit)
                                .limit(limit);

    var count = await (await Product.find({id_detail_category: cateID})).length;
    
    res.render('./products/index', {
        data: data.data,
        products: products,
        page: parseInt(page),
        limit: parseInt(limit),
        items: (products.length)/limit,
        countItems: parseInt(count),
        cateID
    });
};

module.exports.getDetail = async function(req, res){
    var products = await Product.find(); 
    res.render('./products/detail_products', {
        data: data.data,
        products: products
    })
}