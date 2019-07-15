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

controller.checkUser = (req, res) => {
  const login = req.params.login;
  const password = req.params.password;
  const result = usertable.checkUser(login, password);

  result.then(x => {
    if (x.rows.length === 0) {
      res.status(403).send("Wrong login or password");
    } else {
      res.status(200).send(x.rows)
    }
  });
};

controller.getUserByName = (req, res) => {
  const name = req.params.name;
  const result = usertable.getUserByName(name);
  result.then(x => {
    if (x.rows.length === 0) {
      res.status(403).send("error server");
    } else {
      res.send(x.rows);
    }
  });
};

module.exports = controller;
