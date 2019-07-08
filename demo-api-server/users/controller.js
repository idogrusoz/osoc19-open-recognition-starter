const usertable = require("./model");

usertable.createTable();
const controller = {};

controller.welcome = (req, res) => {
  console.log("is it working?");
  res.send("is it working? yes");
};

controller.insert = (req, res) => {
  const data = req.body;
  console.log(data);
  usertable.insert(req.body);
  res.send(data);
};

module.exports = controller;
