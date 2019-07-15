const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.post("/", controller.insert);

router.get("/:id", controller.getUser);


router.get("/:login/:password", controller.checkUser)

router.get("/search/:name", controller.getUserByName);


module.exports = router;
