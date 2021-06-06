var express = require("express");
var router = express.Router();
var controller = require("../controllers/bill.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.auth, controller.get);
router.get("/edit/:billID", authMiddleware.auth, controller.getEdit);
router.get("/delete/:billID", authMiddleware.auth, controller.delete);
router.post("/edit/:billID", authMiddleware.auth, controller.postEdit);

module.exports = router;
