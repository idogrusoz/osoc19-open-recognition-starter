const skilltable = require("./model");

skilltable.createTable();

const controller = {};

controller.addSkill = (req, res) => {
  const data = req.body;
  skilltable.insertSkill(data);
  res.send(data);
};

controller.getSkills = (req, res) => {
  const id = req.params.id;
  const response = skilltable.getSkillsOfOneUser(id);
  response.then(skills => {
    const data = skills.rows;
    res.send(data);
  });
};

module.exports = controller;
