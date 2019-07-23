const express = require("express");
const router = express.Router();

const controller = require("./controller");
// router.get("/", controller.welcome);

router.post("/", controller.addNewComment)

router.get("/:id", controller.getUserComments)

router.get('/pending/:id', controller.getPendingComments)

router.put("/approve/:id", controller.updateComment)

router.delete("/reject/:id", controller.rejectComment)

module.exports = router;
