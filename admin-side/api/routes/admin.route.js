var express = require("express");
var router = express.Router();
var controller = require("../controllers/admin.controller");

router.get("/currentAdmin", controller.getCurrentAdmin);

module.exports = router;
