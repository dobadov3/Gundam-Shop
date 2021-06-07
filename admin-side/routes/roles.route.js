var express = require("express");
var router = express.Router();
var controller = require("../controllers/roles.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.auth, controller.get);
router.get("/edit/:roleID", authMiddleware.auth, controller.getEdit);
router.get("/delete/:roleID", authMiddleware.auth, controller.delete);
router.post("/create", authMiddleware.auth, controller.postCreate);
router.post("/edit/:roleID", authMiddleware.auth, controller.postEdit);

module.exports = router;
