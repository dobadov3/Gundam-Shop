var express = require("express");
var router = express.Router();
var controller = require("../controllers/product.controller");

router.get("/products/:detail_category_id/:page", controller.get);
router.get("/products/:cateID/:page/:sort", controller.getSort);

module.exports = router;
