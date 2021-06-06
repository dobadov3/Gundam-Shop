var data = require('../layout.data')
var Account = require('../models/account.model');
var DeliveryMethod = require('../models/delivery_method.model');
var PaymentMethod = require('../models/payment_method.model');

module.exports.get = async function(req, res){
    if(!res.locals.checkLogin){
        res.redirect('/authentication');
        return;
    }
    if(req.query.delivery_address){
        var index = req.query.delivery_address;
        var currentUser = await Account.findOne({ _id: req.signedCookies.userID });
        var delivery_method = await DeliveryMethod.find();
        var payment_method = await PaymentMethod.find();
    
        var delivery = currentUser.delivery_address[index]
    
        res.render('./checkout/index', {
            data: data.data,
            delivery,
            index,
            currentUser,
            delivery_method,
            payment_method
        });
    }else{
        
    }
}