var data = require('../layout.data');
var Session = require('../models/session.model');
var Product = require('../models/products.model');

module.exports.get = async function(req, res){
    var sessionID = req.signedCookies.sessionId;
    var session = await Session.findOne({sessionID: sessionID});

    var productID = session.cart.map(cart=>{
        return cart.idProduct
    });
    
    var countCart = session.cart.map(cart=>{
        return cart.count
    });

    var products = await Product.find({_id: {$in: productID}})

    for (let i =0; i<products.length; i++){
        products[i].countCart = countCart[i];
        products[i].total = products[i].price * countCart[i]
    }

    var finalPrice=0;

    var wishListLength = session.wishlist.length;
    var cartLength = session.cart.length;

    products.forEach(product=>{
        finalPrice+=product.total
    })
    
    res.render('./cart/index', {
        data: data.data,
        products,
        finalPrice,
        wishListLength,
        cartLength
    });
}