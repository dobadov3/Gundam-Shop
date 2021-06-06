var express = require("express");
var router = express.Router();
var controller = require("../controllers/authentication.controller");

router.get("/login", controller.getLogin);
router.get("/register", controller.getRegister);
router.get("/logout", controller.logOut);

router.post('/login', controller.postLogin);

module.exports = router;
