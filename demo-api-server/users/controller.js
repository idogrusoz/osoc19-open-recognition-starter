const usertable = require("./model");

usertable.createTable();
const controller = {};



controller.insert = (req, res) => {
  const data = req.body;
  usertable.insert(data);
  res.send(data);
};

controller.getUser = (req, res) => {
  const id = req.params.id;
  const response = usertable.getUserById(id);
  response.then(user => {
    const data = user.rows;
    console.log(data);
    res.send(data);
  });
};

module.exports = controller;