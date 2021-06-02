var data = require('../layout.data')
var sessionMiddleware = require('../middlewares/session.middleware');
const Account = require('../models/account.model')

module.exports.get = async function(req, res){
  if (!req.signedCookies.userID) {
    res.redirect('/authentication');
    return;
  }
  
  var products = [];
  var currentAccount = await Account.findById(res.locals.currentAccount._id);


  products = [...currentAccount.wishList];

  res.render('./wishlist/index', {
      data: data.data, 
      products,
      cartLength: res.locals.cartLength,
      cartItems: res.locals.cartItems,
      finalPrice: res.locals.finalPrice,
  });
}