const Category = require('../models/category.model');
const DetailCategory = require('../models/detail_category.model');
const Product = require('../models/products.model');

module.exports.get = async function (req, res) {
    var category = await Category.find();
    var cateObj = [];
    var detailObj = [];

    for (let i = 0; i < category.length; i++) {
        var detailCate = await DetailCategory.find({
            id_category: category[i]._id,
        });

        for (let i = 0; i < detailCate.length; i++) {
            var products = await Product.find({
                id_detail_category: detailCate[i]._id,
            });

            detailCate[i].countItems = products.length;
        }

        var myCateObj = {
            id: category[i]._id,
            name: category[i].name,
            countItems: detailCate.length,
        };
        var myDetailObj = {
            id: category[i]._id,
            name: category[i].name,
            detailCate: detailCate,
        };
        cateObj.push(myCateObj);
        detailObj.push(myDetailObj);
    }

    res.render("./admin/category/index", {
        category: cateObj,
        detailCate: detailObj,
        account: res.locals.account,
    });
};

module.exports.postCreate = async function (req, res) {
    var name = req.body.categoryName;

    var category = new Category();
    category.name = name;

    await Category.create(category);

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var cateID = req.params.cateID;

    var category = await Category.findById(cateID);
    res.render("./admin/category/editCategory", {
        category,
        account: res.locals.account,
    });
};

module.exports.postEdit = async function (req, res) {
    var cateID = req.params.cateID;
    var name = req.body.cateName;

    await Category.findOneAndUpdate({ _id: cateID }, { $set: { name: name } });

    res.redirect("/admin/category");
};

module.exports.delete = async function (req, res) {
    var cateID = req.params.cateID;

    await Category.findByIdAndDelete(cateID);

    res.redirect("/category");
};
