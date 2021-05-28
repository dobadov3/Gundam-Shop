const Account = require('../models/account.model');
const Order = require('../models/order.model');

module.exports.getProfile = async function(req, res){
    res.render('./account/profile', {
        currentAccount: res.locals.currentAccount
    })
}

module.exports.getChangePass = async function(req, res){
    res.render('./account/password')
}

module.exports.getHistory = async function (req, res) {
    var orders = await Order.find({id_account: res.locals.currentAccount._id});
    res.render("./account/history", {
        currentAccount: res.locals.currentAccount,
        orders
    });
};



