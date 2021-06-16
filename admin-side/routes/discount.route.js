var express = require("express");
var router = express.Router();
var controller = require("../controllers/discount.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.auth, controller.get);
router.get("/edit/:discountID", authMiddleware.auth, controller.getEdit);
router.get("/delete/:discountID", authMiddleware.auth, controller.delete);
router.post("/create", authMiddleware.auth, controller.postCreate);
router.post("/edit/:discountID", authMiddleware.auth, controller.postEdit);

module.exports = router;
