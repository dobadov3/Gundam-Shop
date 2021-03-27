const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gundam');
  
app.use(express.static('public'));

var homeRoute = require('./routes/home.route');
var productsRoute = require('./routes/products.route');
var wishlistRoute = require('./routes/wishlist.route');
var cartRoute = require('./routes/cart.route');

app.set('view engine', 'pug');
app.set('views', './views'); 

app.get('/', (req, res) => {
    res.redirect('/home')
});
app.use('/home', homeRoute);
app.use('/products', productsRoute);
app.use('/wishlist', wishlistRoute);
app.use('/cart', cartRoute);

app.listen(port);
