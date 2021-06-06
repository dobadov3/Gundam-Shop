const Bill = require('../models/bill.model');
const Order = require('../models/order.model');

module.exports.get = async function(req, res){
    var bills = await Bill.find();

    bills.forEach(item => {
        setDateCreate(item)
    })

    res.render('./admin/bills/index', {
        bills
    })
}

var setDateCreate = function (bill) {
    var m = bill.date.getMonth() + 1;
    var d = bill.date.getDate();
    var y = bill.date.getFullYear();
    bill.date_create = d + "/" + m + "/" + y;
};

module.exports.getEdit = async function(req, res){
    var billID = req.params.billID;
    var bill = await Bill.findById(billID);

    res.render('./admin/bills/editBill', {
        bill
    })
}

module.exports.postEdit = async function(req, res){

}

module.exports.delete = async function(req, res){

}