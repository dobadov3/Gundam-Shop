var express = require('express');
var controller = require('../controllers/products.controller');
var router = express.Router();

router.get('/', controller.get);

router.get('/:cateID', controller.getByCategory);

router.get('/detail/:code', controller.getDetail);

router.get('/cate/:cateName', controller.getCategory);

router.get('/add-to-cart/:productID', controller.addToCart);

module.exports = router;