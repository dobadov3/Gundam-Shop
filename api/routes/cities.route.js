var express = require('express');
var router = express.Router();
var controller = require('../controllers/cities.controller');

router.get('/cities', controller.get);

module.exports = router;