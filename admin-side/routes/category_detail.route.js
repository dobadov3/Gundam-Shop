var express = require("express");
var router = express.Router();
var controller = require("../controllers/category_detail.controller");

router.get("/edit/:detailCateID", controller.getEdit);
router.get("/delete/:detailCateID", controller.delete);
router.post("/create", controller.postCreate);
router.post("/edit/:detailCateID", controller.postEdit);

module.exports = router;
