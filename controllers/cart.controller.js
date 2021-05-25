var data = require('../layout.data');
var Product = require('../models/products.model');
var Account = require('../models/account.model');
var products = [];
const axios = require('axios');
var listCity = [];

module.exports.get = async function(req, res) {
    var currentUser = await Account.findOne({ _id: req.signedCookies.userID });
    var delivery_address = []
    if (req.session.cart){
        products = req.session.cart.products;
    }

    if(currentUser){
        delivery_address = currentUser.delivery_address;
    }

    res.render('./cart/index', {
        data: data.data,
        products,
        cartLength: res.locals.cartLength,
        cartItems: res.locals.cartItems,
        finalPrice: res.locals.finalPrice,
        delivery_address
    });
}

module.exports.removeCart = async function(req, res) {
    var productID = req.params.productID;
}