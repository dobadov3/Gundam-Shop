var data = require('../layout.data');
var Product = require('../models/products.model');
var mongoose = require('mongoose');

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
    var idProduct = req.params.id;
    await Product.find({kind: mongoose.Types.ObjectId('60580f43748f1d277053d41d')}, (err, result)=>{
        console.log(result)
        console.log(err)
    });

    // console.log(product)

    res.render('./products/detail_products', {
        data: data.data
    })
}