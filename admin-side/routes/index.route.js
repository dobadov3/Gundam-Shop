const homeRoute = require('./home.route');
const authenticationRoute = require('./authentication.route');
const accountsRoute = require('./accounts.route');
const categoryRoute = require('./category.route');
const category_detailRoute = require('./category_detail.route');
const productsRoute = require('./products.route');
const rolesRoute = require('./roles.route');
const ordersRoute = require('./orders.route');
const billsRoute = require('./bill.route');
const profileRoute = require('./profile.route');
const discountRoute = require('./discount.route');
//api
const categoryAPI = require('../api/routes/category.route');
const categoryDetailAPI = require('../api/routes/category-detail.route');
const citiesAPI = require('../api/routes/cities.route');
const adminAPI = require('../api/routes/admin.route');

var route = function(app){
    app.use("/", homeRoute);
    app.use("/authentication", authenticationRoute);
    app.use("/accounts", accountsRoute);
    app.use("/category", categoryRoute);
    app.use("/detail-category", category_detailRoute);
    app.use("/products", productsRoute);
    app.use("/roles", rolesRoute);
    app.use("/orders", ordersRoute);
    app.use("/bills", billsRoute);
    app.use("/profile",profileRoute)
    app.use("/discounts", discountRoute);
    //api
    app.use("/api", categoryAPI);
    app.use("/api", categoryDetailAPI);
    app.use("/api", citiesAPI)
    app.use("/api", adminAPI);
}


module.exports = route;