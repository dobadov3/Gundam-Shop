var express = require("express");
var router = express.Router();
var controller = require("../controllers/roles.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.auth, controller.get);
router.get("/", authMiddleware.auth, controller.getEdit);
router.get("/", authMiddleware.auth, controller.delete);
router.post("/", authMiddleware.auth, controller.postCreate);
router.post("/", authMiddleware.auth, controller.postEdit);

module.exports = router;
