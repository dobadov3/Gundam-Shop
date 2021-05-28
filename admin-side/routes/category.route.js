var express = require("express");
var router = express.Router();
var controller = require("../controllers/category.controller");

router.get("/", controller.get);
router.get("/edit/:cateID", controller.getEdit);
router.get("/delete/:cateID", controller.delete);
router.post("/create", controller.postCreate);
router.post("/edit/:cateID", controller.postEdit);

module.exports = router;
