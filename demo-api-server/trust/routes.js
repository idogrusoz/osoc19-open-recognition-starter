const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/:id", controller.getTrust)

router.post("/", controller.addTrust)


module.exports = router;
