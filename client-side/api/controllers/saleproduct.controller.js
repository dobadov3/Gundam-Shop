var Product = require('../../models/products.model');
module.exports.get = async function(req, res){
    var product =await Product.find({sale:{$gt:0}})
    res.json(product);
}
