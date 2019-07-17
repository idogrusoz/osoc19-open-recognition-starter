const trusttable = require("./model");

trusttable.createTable();
const controller = {};

controller.addTrust = (req, res) => {
  const data = req.body;
  trusttable.insertTrust(data);
  res.send(data);
};

controller.getTrust = (req, res) => {
  const id = req.params.id;
  const response = trusttable.getTrustRelation(id);
  response.then(trusts => {
    const data = trusts.rows;
    res.send(data);
  });
};

controller.getTrustpeople = (req, res) => {
  const id = req.params.id;
  const response = trusttable.getTrustpeople(id);
  response.then(trusts => {
    const data = trusts.rows;
    res.send(data);
  });
};

module.exports = controller;
