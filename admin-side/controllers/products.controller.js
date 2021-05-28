const Category = require('../models/category.model');
const Product = require('../models/products.model');
const DetailCategory = require('../models/detail_category.model');

module.exports.get = async function (req, res) {
    var products = await Product.find();

    for (let i = 0; i < products.length; i++) {
        var detailCate = await DetailCategory.findById(products[i].id_detail_category);
        var category = await Category.findById(detailCate.id_category);
        products[i].type = category.name;
        products[i].typeDetail = detailCate.name;
    }

    res.render("./admin/products/products", {
        products,
        account: res.locals.account,
    });
};

module.exports.postcreate = async function (req, res) {
    var name = req.body.productName;
    var price = req.body.price;
    var weight = req.body.weight;
    var id_detail_category = req.body.categoryDetail;
    var description = req.body.description;
    req.body.avatar = [];

    req.files.forEach((file) => {
        var path = "/" + file.path.split("\\").slice(1).join("/");
        req.body.avatar.push(path);
    });
    description = description.split("\r").join("").split("\n");

    var product = new Product({
        id_detail_category: id_detail_category,
        name: name,
        price: price,
        weight: weight,
        image: req.body.avatar,
        count: 10,
        description: description,
    });
    console.log(product);
    await Product.create(product);

    res.redirect("back");
};

module.exports.getEdit = async function (req, res) {
    var productID = req.params.productID;
    var product = await Product.findById(productID);

    product.description = product.description.join("\n");

    res.render("./admin/products/editProduct", {
        product,
        description: product.description.toString(),
    });
};

module.exports.postEdit = async function (req, res) {
    var productID = req.params.productID;
    var product = await Product.findById(productID);
    var description = req.body.description;
    description = description.split("\r").join("").split("\n");

    product.name = req.body.nameProduct;
    product.price = req.body.price;
    product.count = req.body.count;
    product.weight = req.body.weight;
    product.description = description;

    for (let file of Object.keys(req.files)) {
        var index = parseInt(file.split("avatar-").join(""));
        var data = req.files[file];
        var path = "/" + data[0].path.split("\\").slice(1).join("/");
        product.image[index] = path;
        product.markModified("image");
    }

    product.save();

    res.redirect("back");
};

module.exports.delete = async function (req, res) {
    var productID = req.params.productID;

    await Product.findByIdAndDelete(productID);

    res.redirect("back");
};
