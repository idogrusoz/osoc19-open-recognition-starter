const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/", controller.welcome);

router.post("/", controller.addSkill)

module.exports = router;
