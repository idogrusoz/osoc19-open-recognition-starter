const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/:id", controller.getSkills);

router.post("/", controller.addSkill);

module.exports = router;
