var homeRoute = require('./home.route');
var productsRoute = require('./products.route');
var wishlistRoute = require('./wishlist.route');
var cartRoute = require('./cart.route');
var authenticationRoute = require('./authentication.route');
var checkoutRoute = require('./checkout.route');
var orderRoute = require('./order.route');
var accountRoute = require('./account.route');

var categoryAPI = require('../api/routes/category.route');
var categoryDetailAPI = require('../api/routes/category-detail.route');
var citiesAPI = require('../api/routes/cities.route');
var accountAPI = require('../api/routes/account.route');

var route = function(app){
    app.use('/home', homeRoute);
    app.use('/products', productsRoute);
    app.use('/wishlist', wishlistRoute);
    app.use('/cart', cartRoute);
    app.use('/authentication', authenticationRoute);
    app.use('/checkout',  checkoutRoute);
    app.use('/order',  orderRoute);
    app.use('/account', accountRoute);

    //api
    app.use('/api', categoryAPI)
    app.use('/api', categoryDetailAPI)
    app.use('/api', citiesAPI)
    app.use("/api", accountAPI);
}

module.exports = route;