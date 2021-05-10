var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin.controller');

router.get('/', controller.get);
router.get('/products', controller.product);
router.get('/category', controller.category);
router.get('/users', controller.user);

module.exports = router;