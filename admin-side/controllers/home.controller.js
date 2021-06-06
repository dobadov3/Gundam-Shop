const Order = require('../models/order.model')
module.exports.get = async function (req, res) {
    console.log(res.locals.checkLogin);

    res.render("./admin/home/home", {
        role: res.locals.role,
        account: res.locals.account,
    });
};
