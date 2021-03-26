var express = require('express');
var controller = require('../controllers/products.controller');
var router = express.Router();

router.get('/', controller.get);

router.get('/:cateID', controller.getByCategory);

router.get('/detail/:cateID', controller.getDetail);

module.exports = router;