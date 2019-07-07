const trusttabble = require("./model");

trusttabble();
const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller of skill");
  res.res("from controller of skill");
};

module.exports = controller;
