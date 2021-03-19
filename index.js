const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var homeRoute = require('./routes/home.route');

app.use('/home', homeRoute);

app.use(express.static('public'));
app.listen(port);
