var data = require('../layout.data');
var Session = require('../models/session.model');
var Product = require('../models/products.model')

module.exports.get = async function(req, res){
  var sessionID = req.signedCookies.sessionId;
  var session = await Session.findOne({sessionID: sessionID});

  var products = await Product.find({_id: {$in: session.wishlist}})

  res.render('./wishlist/index', {
      data: data.data, 
      products
  });
}