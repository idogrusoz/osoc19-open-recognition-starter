const express = require("express");
const router = express.Router();

const controller = require("./controller");

// router.get("/", controller.welcome);

router.post("/", controller.insert);

module.exports = router;
