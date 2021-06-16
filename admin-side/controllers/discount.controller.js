const Discount = require('../models/discount.model')
const _ = require("lodash");

module.exports.get = async function (req, res) {
    var discounts = await Discount.find();

    res.render('./admin/discount/index', {
        discounts
    })
};

module.exports.postCreate = async function (req, res) {
    req.body.expire = new Date(req.body.expire)
    await Discount.create(req.body)
    res.redirect('back')
};

module.exports.delete = async function (req, res) {
    await Discount.findByIdAndDelete(req.params.discountID)
    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var discount = await Discount.findById(req.params.discountID);

    res.render("./admin/discount/editDiscount", {
        discount
    });
};

module.exports.postEdit = async function (req, res) {
    if (req.body.expire){
        req.body.expire = new Date(req.body.expire);
    }

    var discount = await Discount.findById(req.params.discountID);

    _.extend(discount, req.body);
    
    discount.save();
    
    res.redirect("back");
};
