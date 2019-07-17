const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/:id", controller.getTrust)

router.post("/", controller.addTrust)

router.get("/pending/:id", controller.getPendingTrust)

router.put("/approve/:id", controller.approveTrust )


module.exports = router;
