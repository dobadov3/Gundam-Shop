const Order = require('../models/order.model');
const DeliveryMethod = require('../models/delivery_method.model')
const PaymentMethod = require('../models/payment_method.model')
module.exports.get = async function (req, res) {
    var orders = await Order.find().sort({
        date: -1,
        status: 1,
        payment_method: 1,
        payment_status: 1,
    });

    for (let i = 0; i < orders.length; i++) {
        deliveryID = orders[i].delivery_method;
        paymentID = orders[i].payment_method;

        var delivery = await DeliveryMethod.findById(deliveryID);
        var payment = await PaymentMethod.findById(paymentID);
        orders[i].delivery = delivery.content;
        orders[i].payment = payment.content;
        orders[i].deliveryName = delivery.name;
        orders[i].paymentName = payment.name;
    }

    res.render("./admin/orders/index", {
        orders,
    });
};

module.exports.getEdit = async function (req, res) {
    var delivery = await DeliveryMethod.find();
    var payment = await PaymentMethod.find();
    var order = await Order.findById(req.params.orderID);
    res.render("./admin/orders/editOrder", {
        delivery,
        payment,
        order,
    });
};
