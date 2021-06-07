const Order = require('../models/order.model')
module.exports.get = async function (req, res) {
    res.render("./admin/home/home", {
        role: res.locals.role,
        account: res.locals.account,
    });
};
