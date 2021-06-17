var Order = require('../../models/order.model');

module.exports.get = async function(req, res){
    var order = await Order.find({status: "Hoàn thành"});
    res.json(order);
}
