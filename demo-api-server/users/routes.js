const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.post("/", controller.insert);

router.get("/:id", controller.getUser)

module.exports = router;
