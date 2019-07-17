const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/people/:id", controller.getTrustpeople);
router.get("/:id", controller.getTrust);

router.post("/", controller.addTrust);

module.exports = router;
