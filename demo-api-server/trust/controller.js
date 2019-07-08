const trusttable = require("./model");

trusttable();
const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller trust");
  res.send("response from trust controller");
};

module.exports = controller;
