var data = require('../layout.data');
var Product = require('../models/products.model');
var Session = require('../models/session.model');

module.exports.get = async function(req, res){
    var products = await Product.find();
    var sessionId = req.signedCookies.sessionId;

    var session = await Session.findOne({sessionID: sessionId});

    var wishListLength = session.wishlist.length;
    var cartLength = session.cart.length;

    products.forEach(product => {
        product.priceSale = product.price - (product.price*product.sale)/100
    });

    res.render('./home/index', {
        data: data.data,
        products: products.slice(8, 14),
        wishListLength,
        cartLength
    });
};