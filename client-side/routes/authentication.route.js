var express = require('express');
var router = express.Router();
var controller = require('../controllers/authentication.controller');

router.get('/', controller.get);

router.get('/logout', controller.logout);

router.get("/forgot-pass", controller.getForgot);

router.get("/reset-pass/:resetLink", controller.getResetPass);

router.post('/login', controller.postLogin);

router.post('/', controller.postSignUp);

router.post("/forgot-pass", controller.postForgot);

router.post("/reset-pass", controller.resetPass);

module.exports = router;