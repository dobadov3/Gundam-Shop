var express = require('express');
var router = express.Router();
var controller = require('../controllers/newproduct.controller');

router.get('/', controller.get);

module.exports = router;