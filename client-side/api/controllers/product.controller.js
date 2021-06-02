const Product = require('../../models/products.model');

module.exports.get = async function(req, res){
    var {detail_category_id} = req.params
    var { page } = req.params;
    var limit = 12;
    var products = await Product.find({id_detail_category: detail_category_id})
        .skip(page * limit - limit)
        .limit(limit);

    AdjustProductsPriceSale(products);

    res.json(products)
}

module.exports.getSort = async function (req, res) {
    var cateID = req.params.cateID;
    var page = req.params.page;
    var limit = 12;

    switch (req.params.sort) {
        case "sortLowestFirst":
            var products = await Product.find({ id_detail_category: cateID })
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ price: 1 });
            break;
        case "sortHighestFirst":
            var products = await Product.find({ id_detail_category: cateID })
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ price: -1 });
            break;
        case "sortByName":
            var products = await Product.find({ id_detail_category: cateID })
                .skip(page * limit - limit)
                .limit(limit)
                .sort({ name: -1 });
            break;
        default:
            break;
    }

    AdjustProductsPriceSale(products);

    res.json(products);
};

var AdjustProductsPriceSale = function (products) {
    products.forEach((product) => {
        product.priceSale =
            product.price - (product.price * product.sale) / 100;
    });
};
