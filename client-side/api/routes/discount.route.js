var express = require("express");
var router = express.Router();
var controller = require("../controllers/discount.controller");

router.get("/:code", controller.get);

module.exports = router;
