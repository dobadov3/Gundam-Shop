var data = require('../layout.data');
var Session = require('../models/session.model');
var Product = require('../models/products.model')

module.exports.get = async function(req, res){
  var session = await Session.findOne({sessionID: "12345"});

  var products = await Product.find({_id: {$in: session.wishlist}})

  console.log(products)

  res.render('./wishlist/index', {
      data: data.data, 
      products
  });
}