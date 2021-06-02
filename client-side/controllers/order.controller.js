var Order = require('../models/order.model');
var Account = require('../models/account.model');
var DeliveryMethod = require('../models/delivery_method.model');
var PaymentMethod = require('../models/payment_method.model');
var Cart = require('../models/cart.model');
var data = require('../layout.data');
const shortid = require('short-id');

module.exports.get = function(req, res){

}

module.exports.post = async function(req, res){
    req.body.products = res.locals.cartItems;
    req.body.payment_status = "Chưa thanh toán";
    req.body.status = "Chờ xác nhận";
    var deliveryMethod = await DeliveryMethod.findById(req.body.delivery_method);
    var paymentMethod = await PaymentMethod.findById(req.body.payment_method);
    req.body.totalPrice = res.locals.finalPrice + deliveryMethod.cost
    
    var currentUser = await Account.findOne({ _id: req.signedCookies.userID });
    var address = currentUser.delivery_address[req.body.address];
    req.body.delivery_address = address;
    req.body.code = shortid.generate().toUpperCase();
    var order = new Order(req.body);
    Order.create(order);


    order.dm = deliveryMethod.content
    order.pm = paymentMethod.content

    req.session.destroy();
    res.locals.cartLength = 0;
    res.locals.cartItems = [];
    res.locals.finalPrice = 0;
    Cart.removeCart();


    setDateCreate(order);
    res.render('./checkout/success', {
        data: data.data,
        order
    });
}

var setDateCreate = function (order) {
    var m = order.date.getMonth() + 1;
    var d = order.date.getDate();
    var y = order.date.getFullYear();
    order.date_create = d + "/" + m + "/" + y;
};