const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/people/:id", controller.getTrustpeople);

router.get("/:id", controller.getTrust);

router.get("/relationship/:id1/:id2", controller.getRelationship);

router.post("/", controller.addTrust);

router.get("/pending/:id", controller.getPendingTrust);

router.delete("/reject/:id", controller.rejectTrust);

router.put("/approve/:id", controller.approveTrust);

module.exports = router;
