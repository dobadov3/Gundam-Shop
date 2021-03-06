var express = require("express");
var router = express.Router();
var controller = require("../controllers/accounts.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware.auth, controller.get);
router.get("/edit/:accountID",authMiddleware.auth, controller.getEdit);
router.get("/delete/:accountID", authMiddleware.auth, controller.delete);
router.get("/edit/:accountID/change-pass", authMiddleware.auth, controller.getChangePass);
router.post("/edit/:accountID/change-pass", authMiddleware.auth, controller.postChangePass);
router.post("/create",authMiddleware.auth, controller.postCreate);
router.post("/edit/:accountID", authMiddleware.auth, controller.postEdit);

module.exports = router;
