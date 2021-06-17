var Order = require('../../models/order.model');

module.exports.get = async function(req, res){
    var order = await Order.find({status: {$ne: ["Chờ xác nhận", "Đang giao Hàng", "Hoàn Thành"]}});
    res.json(order);
}
