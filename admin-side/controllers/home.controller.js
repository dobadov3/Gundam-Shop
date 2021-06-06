const Order = require('../models/order.model')
module.exports.get = async function (req, res) {
    for (let i=0;i<Order.length;i++){
        
    }
    console.log(res.locals.role);
    res.render("./admin/home/home", {
        role: res.locals.role,
        account: res.locals.account,
    });
};
