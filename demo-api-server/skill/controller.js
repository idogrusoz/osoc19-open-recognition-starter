const skilltable = require("./model");

skilltable.createTable();
const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller of skill");
  res.res("from controller of skill");
};

controller.addSkill = (req, res) => {
  const data = req.body;
  skilltable.insertSkill(data);
  res.send(data)
}

module.exports = controller;
