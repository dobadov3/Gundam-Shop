const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var route = require('./routes/index.route');
var session = require('express-session')
var apiOrderRoute = require('./api/routes/order.route')
var productRoute = require('./api/routes/product.route')
var cors = require('cors')
require('dotenv').config();

var authMiddleware = require('./middlewares/auth.middleware');
var adminMiddleware = require("./middlewares/admin.middleware");

app.use(cookieParser(process.env.COOKIES_SECRET));

app.use(cors())

mongoose.connect('mongodb://localhost/gundam', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/api/orders',apiOrderRoute)
app.use('/api/products',productRoute)

app.use(authMiddleware.signedCookies);
app.use(adminMiddleware);

route(app);

app.listen(port);