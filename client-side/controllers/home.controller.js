var data = require('../layout.data')
var Product = require('../models/products.model');
var Account = require('../models/account.model');
var Role = require('../models/role.model');

module.exports.get = async function(req, res) {
    if(req.signedCookies.userID){
        var account = await Account.findById(req.signedCookies.userID);
        var role = await Role.findOne({name: "admin"});
        if (account.id_role == role._id){
            res.redirect('/admin')
        }
    }

    var products = await Product.find();

    products.forEach(product => {
        product.priceSale = product.price - (product.price * product.sale) / 100
    });

    var products = await Product.find();

    res.render('./home/index', {
        data: data.data,
        checkLogin: res.locals.checkLogin,
        products: products.slice(8, 14),
        cartLength: res.locals.cartLength,
        cartItems: res.locals.cartItems,
        finalPrice: res.locals.finalPrice
    });
};