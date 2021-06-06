var express = require("express");
var router = express.Router();
var controller = require("../controllers/category_detail.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/edit/:detailCateID",authMiddleware.auth, controller.getEdit);
router.get("/delete/:detailCateID",authMiddleware.auth, controller.delete);
router.post("/create/:categoryID", authMiddleware.auth, controller.postCreate);
router.post("/edit/:detailCateID",authMiddleware.auth, controller.postEdit);

module.exports = router;
