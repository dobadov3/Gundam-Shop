var express = require("express");
var router = express.Router();
var controller = require("../controllers/orders.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.auth, controller.get);
router.get("/edit/:orderID", authMiddleware.auth, controller.getEdit);
// router.get("/delete/:cateID", authMiddleware.auth, controller.delete);
// router.post("/create", authMiddleware.auth, controller.postCreate);
router.post("/edit/:orderID", authMiddleware.auth, controller.postEdit);

module.exports = router;
