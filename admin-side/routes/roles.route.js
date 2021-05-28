var express = require("express");
var router = express.Router();
var controller = require("../controllers/roles.controller");

router.get("/", controller.get);
router.get("/", controller.getEdit);
router.get("/", controller.delete);
router.post("/", controller.postCreate);
router.post("/", controller.postEdit);

module.exports = router;
