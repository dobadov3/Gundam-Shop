var express = require('express');
var controller = require('../controllers/cart.controller');
const { route } = require('./home.route');
var router = express.Router();

router.get('/', controller.get)

module.exports = router; 