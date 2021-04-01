var data = require('../layout.data');
var Product = require('../models/products.model');
var Category = require('../models/category.model');
var DetailCategory = require('../models/detail_category.model');
var Session = require('../models/session.model');

module.exports.get = function(req, res){
    
}

module.exports.getByCategory = async function(req, res){
    var cateID = req.params.cateID;
    var sessionId = req.signedCookies.sessionId;
    var page = req.query.page || 1;
    var limit = 8;
    var products = await Product.find({id_detail_category: cateID})
                                .skip((page * limit) - limit)
                                .limit(limit);

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100;
    })

    var session = await Session.findOne({sessionID: sessionId});

    var wishListLength = session.wishlist.length;
    var cartLength = session.cart.length;

    var count = await (await Product.find({id_detail_category: cateID})).length;

    res.render('./products/index', {
        data: data.data,
        products: products,
        page: parseInt(page),
        limit: parseInt(limit),
        items: (products.length)/limit,
        countItems: parseInt(count),
        cateID,
        wishListLength,
        cartLength
    });
};

module.exports.getCategory = async function(req, res){
    var page = req.query.page || 1;
    var cateName = req.params.cateName;
    var limit = 8;
    var sessionId = req.signedCookies.sessionId;

    var session = await Session.findOne({sessionID: sessionId});

    var wishListLength = session.wishlist.length;
    var cartLength = session.cart.length;

    var category = await Category.findOne({name: cateName});

    var detail_category = await DetailCategory.find({id_category: category._id})

    var list_id_detail = detail_category.map(function(cate){
        return cate._id;
    });

    var products = await Product.find({id_detail_category: {"$in": list_id_detail}})
                                .skip((page * limit) - limit)
                                .limit(limit);

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
        countItems: parseInt(count),
        wishListLength,
        cartLength
    });
};

module.exports.getDetail = async function(req, res){
    var code = req.params.code;
    var product = await Product.findOne({code: code});
    var sessionId = req.signedCookies.sessionId;

    var session = await Session.findOne({sessionID: sessionId});

    var wishListLength = session.wishlist.length;
    var cartLength = session.cart.length;

    product.priceSale = product.price - (product.price*product.sale)/100;

    res.render('./products/detail_products', {
        data: data.data,
        product,
        wishListLength,
        cartLength
    })
};

function checkCart(cart, idProduct){
    var check = false;
    cart.forEach(c => {
        if (c.idProduct === idProduct){
            check = true;
        }
    });
    return check;
}

module.exports.addToCart = async function(req, res){
    var productID = req.params.productID;
    var sessionID = req.signedCookies.sessionId;
    var countProduct = 0;
    var position = 0;
    
    var session = await Session.findOne({sessionID: sessionID});
    
    
    session.cart.forEach((c, index) => {
        if (c.idProduct === productID){
            position = index;
            countProduct = c.count + 1
        }
    });
    
    var cart = {idProduct: productID, count: countProduct+1}

    if (checkCart(session.cart, productID)){        
        session.cart[position].count = countProduct
    }else{
        session.cart.push(cart);
    }

    session.markModified("cart");

    await session.save((err, result) => {
        
    });

    res.redirect('back');
};

module.exports.addToWishList = async function(req, res){
    var productID = req.params.productID;
    var sessionID = req.signedCookies.sessionId;

    var session = await Session.findOne({sessionID: sessionID});

    if(!checkCart(session.wishlist, productID)){
        session.wishlist.push(productID);
    }

    session.save();

    res.redirect('back');
};

module.exports.search = async function(req, res){
    var productName = req.query.product.toLowerCase();

    var results = await Product.find();

    var products = results.filter(product => {
        return product.name.toLowerCase().indexOf(productName) !== -1;
    });

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100;
    })

    res.render('./products/index', {
        data: data.data,
        products,
        paggination: false
    })
}