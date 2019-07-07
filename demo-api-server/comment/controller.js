const commenttable = require("./model");

commenttable();

const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller comment");
  res.send("response from comment");
};
module.exports = controller;
