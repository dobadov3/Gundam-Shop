const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
require('dotenv').config();
var ids = require('short-id');
mongoose.connect('mongodb://localhost/gundam', { useNewUrlParser: true, useUnifiedTopology: true });
  
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

var homeRoute = require('./routes/home.route');
var productsRoute = require('./routes/products.route');
var wishlistRoute = require('./routes/wishlist.route');
var cartRoute = require('./routes/cart.route');
var authenticationRoute = require('./routes/authentication.route');

var sessionMiddleware = require('./middlewares/session.middleware')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(sessionMiddleware);

app.get('/', (req, res) => {
    res.redirect('/home')
});



app.use('/home', homeRoute);
app.use('/products', productsRoute);
app.use('/wishlist', wishlistRoute);
app.use('/cart', cartRoute);
app.use('/authentication', authenticationRoute);

app.listen(port);
