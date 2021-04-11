var Category = require('./models/category.model');
var DetailCategory = require('./models/detail_category.model');
var Product = require('./models/products.model');
var Session = require('./models/session.model');

var category;
var detail_gundam;
var detail_tools;
var detail_paints;
var detail_other;

async function Data(){
    category = await Category.find();
    var gundam = await Category.findOne({name: "Gundam"});
    var tools = await Category.findOne({name: "Tools"});
    var paints = await Category.findOne({name: "Paints"});
    var other = await Category.findOne({name: "Mô hình khác"});

    detail_gundam = await DetailCategory.find({id_category: gundam.id});
    detail_tools = await DetailCategory.find({id_category: tools.id});
    detail_paints = await DetailCategory.find({id_category: paints.id});
    detail_other = await DetailCategory.find({id_category: other.id});

    var newProducts = await Product.find();

    newProducts = newProducts.slice(newProducts.length - 11, newProducts.length - 1);
    
    var bestSeller = await Product.find();
    
    var saleProducts = await Product.find();

    var specialProducts = await Product.find().limit(3);

    var data = [category, detail_gundam, detail_tools, detail_paints, detail_other, newProducts, bestSeller, saleProducts, specialProducts]

    module.exports.data = data
}

Data()

