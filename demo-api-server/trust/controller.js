const trusttable = require("./model");

trusttable.createTable();
const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller trust");
  res.send("response from trust controller");
};

controller.addTrust = (req, res) => {
const data = req.body;
trusttable.insertTrust(data);
res.send(data)
}

controller.getTrust = (req, res) => {
  const id = req.params.id;
  const response = trusttable.getTrustRelation(id);
  response.then(trusts => {
    const data = trusts.rows;
    res.send(data)
  })

}

module.exports = controller;
