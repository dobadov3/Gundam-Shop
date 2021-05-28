const DetailCategory = require('../models/detail_category.model');
const Category = require("../models/category.model");

module.exports.postCreate = async function (req, res) {
    var name = req.body.detailName;
    var categoryID = req.params.categoryID;

    var detailCate = new DetailCategory();
    detailCate.name = name;
    detailCate.id_category = categoryID;

    await DetailCategory.create(detailCate);

    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    var detailCateID = req.params.detailCateID;

    await DetailCategory.findByIdAndDelete(detailCateID);

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var detailCateID = req.params.detailCateID;

    var detailCate = await DetailCategory.findById(detailCateID);
    var category = await Category.find();

    console.log(detailCate)

    res.render("./admin/category/editDetailCategory", {
        detailCate,
        category,
        account: res.locals.account,
    });
};

module.exports.postEdit = async function (req, res) {
    var nameDetail = req.body.detailCateName;
    var categoryID = req.body.category;
    var detailCateID = req.params.detailCateID;

    var detailCate = await DetailCategory.findById(detailCateID);

    detailCate.name = nameDetail;
    detailCate.id_category = categoryID;

    await detailCate.save();

    res.redirect("/admin/category");
};
