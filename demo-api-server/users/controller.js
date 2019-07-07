const usertable = require("./model");

usertable();
const controller = {};

controller.welcome = (req, res) => {
  console.log("is it working?");
  res.send("is it working? yes");
};

module.exports = controller;
