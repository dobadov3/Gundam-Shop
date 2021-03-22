var express = require('express');
var controller = require('../controllers/products.controller');
var router = express.Router();

router.get('/', controller.get);

router.get('/:cateID', controller.getByCategory);

module.exports = router;