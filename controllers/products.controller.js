var data = require('../layout.data');
var Product = require('../models/products.model');
var Category = require('../models/category.model');
var DetailCategory = require('../models/detail_category.model');

module.exports.get = function(req, res){
    
}

module.exports.getByCategory = async function(req, res){
    var cateID = req.params.cateID;
    var page = req.query.page || 1;
    var limit = 4;
    var products = await Product.find({id_detail_category: cateID})
                                .skip((page * limit) - limit)
                                .limit(limit);

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100;
    })

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

module.exports.getCategory = async function(req, res){
    var page = req.query.page || 1;
    var cateName = req.params.cateName;
    var limit = 4;

    var category = await Category.findOne({name: cateName});

    var detail_category = await DetailCategory.find({id_category: category._id})

    var list_id_detail = detail_category.map(function(cate){
        return cate._id;
    });

    console.log(list_id_detail)

    var products = await Product.find({id_detail_category: {"$in": list_id_detail}})
                                .skip((page * limit) - limit)
                                .limit(limit);

    console.log(products)

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100;
    })

    var count = await (await Product.find({id_detail_category: {"$in": list_id_detail}})).length;

    res.render('./products/index', {
        data: data.data,
        products: products,
        page: parseInt(page),
        limit: parseInt(limit),
        items: (products.length)/limit,
        countItems: parseInt(count)
    });
};

module.exports.getDetail = async function(req, res){
    var code = req.params.code;
    var product = await Product.findOne({code: code});

    product.priceSale = product.price - (product.price*product.sale)/100;

    res.render('./products/detail_products', {
        data: data.data,
        product
    })
};

module.exports.addToCart = async function(req, res){
    res.redirect('')
};