const Order = require('../models/order.model');
const DeliveryMethod = require('../models/delivery_method.model')
const PaymentMethod = require('../models/payment_method.model')
const Bill = require('../models/bill.model')
var _ = require("lodash");
var shortid = require('short-id');

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

        setDateCreate(orders[i]);
    }

    orders = orders.filter(order => {
        return order.status === "Chờ xác nhận" || order.status === "Đang giao hàng" || order.status === "Hoàn thành";
    });

    res.render("./admin/orders/index", {
        orders,
    });
};

module.exports.getEdit = async function (req, res) {
    var delivery = await DeliveryMethod.find();
    var payment = await PaymentMethod.find();
    var order = await Order.findById(req.params.orderID);

    setDateCreate(order)
    res.render("./admin/orders/editOrder", {
        delivery,
        payment,
        order,
    });
};

module.exports.postEdit = async function(req, res){
    var orderID = req.params.orderID;
    var order = await Order.findById(orderID);
    var oldStatus = order.status
    var newStatus;
    var obj = {
        delivery_method: req.body.delivery_method,
        payment_method: req.body.payment_method,
        payment_status: req.body.payment_status,
        status: req.body.status,
        delivery_address: {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
        },
    };
    order = _.extend(order, obj);
    order.save();
    newStatus = order.status;
    settingBill(newStatus, oldStatus, order)
    res.redirect('/orders')
}

var setDateCreate = function (order) {
    var m = order.date.getMonth() + 1;
    var d = order.date.getDate();
    var y = order.date.getFullYear();
    order.date_create = d + "/" + m + "/" + y;
};

var settingBill = async function(newStatus, oldStatus, order){
    var delivery_method = await DeliveryMethod.findById(order.delivery_method);
    order.shippingCost = delivery_method.cost;
    if (oldStatus === 'Chờ xác nhận'){
            if (newStatus === 'Đang giao hàng'){
                var bill = new Bill({
                    order_id: order._id,
                    date: new Date(),
                    products: order.products,
                    shippingCost: order.shippingCost,
                    totalPrice: order.totalPrice,
                    code: shortid.generate()
                });
                Bill.create(bill);
                return
            }else if (newStatus === 'Đã hủy'){
                return;
            }else if (newStatus === "Hoàn thành"){
                var bill = new Bill({
                    order_id: order._id,
                    date: new Date(),
                    products: order.products,
                    shippingCost: order.shippingCost,
                    totalPrice: order.totalPrice,
                    code: shortid.generate(),
                });
                order.payment_status = "Đã thanh toán";
                order.markModified("payment_status");
                order.save();
                Bill.create(bill);
                return;
            }
        return;
    }else if (oldStatus === 'Đang giao hàng'){
        if (newStatus === 'Đã hủy'){
            Bill.findOneAndDelete({
                order_id: order._id
            })
            return;
        }else if (newStatus === 'Hoàn thành'){
            order.payment_status = "Đã thanh toán";
            order.markModified("payment_status");
            order.save();
            return;
        }
    }
}

