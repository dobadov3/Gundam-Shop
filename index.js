const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gundam', {useNewUrlParser: true});
  
app.use(express.static('public'));

var homeRoute = require('./routes/home.route');
var productsRoute = require('./routes/products.route');
var wishlistRoute = require('./routes/wishlist.route');

app.set('view engine', 'pug');
app.set('views', './views'); 

app.get('/', (req, res) => {
    res.redirect('/home')
});
app.use('/home', homeRoute);
app.use('/products', productsRoute);
app.use('/wishlist', wishlistRoute);

app.listen(port);
