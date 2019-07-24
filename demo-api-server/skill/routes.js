const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/:id", controller.getSkills);

router.get("/preventmultiple/:id", controller.fetchSkills)

router.post("/", controller.addSkill);
router.get("/pros/:id/:skill", controller.getNumberOfPros);

module.exports = router;
