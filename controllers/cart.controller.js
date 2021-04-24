var data = require('../layout.data');
var Session = require('../models/session.model');
var Product = require('../models/products.model');
var sessionMiddleware = require('../middlewares/session.middleware');
const axios = require('axios');
var listCity = [];

module.exports.get = async function(req, res){
    var sessionID = req.signedCookies.sessionId;
    var session = await Session.findOne({sessionID: sessionID});

    var productID = session.cart.map(cart=>{
        return cart.idProduct
    });
    
    var countCart = session.cart.map(cart=>{
        return cart.count
    });

    var products = await Product.find({_id: {$in: productID}});

    for (let i =0; i<products.length; i++){
        products[i].countCart = countCart[i];
        products[i].total = products[i].price * countCart[i]
    }

    var finalPrice=0;

    products.forEach(product=>{
        finalPrice+=product.total
    })

    await axios.get('https://thongtindoanhnghiep.co/api/city').then(response => {
        response.data.LtsItem.map(c => {
            var city = {
                "id": c.ID,
                "name": c.Title
            }
            listCity.push(city)
        })
        console.log(response.data)
    }).catch(err => {
        console.log(err)
    })

    res.render('./cart/index', {
        data: data.data,
        products,
        finalPrice,
        wishListLength: sessionMiddleware.wishListLength,
        cartLength: sessionMiddleware.cartLength, 
        cartItems: sessionMiddleware.cartItems,
        finalPrice: sessionMiddleware.finalPrice,
        listCity
    });
}