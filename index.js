const express = require('express');
const app = express();
const port = 3000;

var homeRoute = require('./routes/home.route');
var productsRoute = require('./routes/products.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/home', homeRoute);
app.use('/products', productsRoute);

app.use(express.static('public'));
app.listen(port);
