const trusttable = require("./model");

trusttable.createTable();
const controller = {};

controller.addTrust = (req, res) => {
  const data = req.body;
  trusttable.insertTrust(data);
  res.send(data);
};

controller.getPendingTrust = (req, res) => {
  const id = req.params.id;
  const response = trusttable.getPendingRealation(id);
  response
    .then(trusts => {
      if (trusts.rows === 0) {
        res.send("No pending trust request");
      } else {
        res.send(trusts.rows);
      }
    })
    .catch(error => console.log("Error:", error));
};

controller.approveTrust = (req, res) => {
  const data = req.body;
  trusttable.approveTrust(data);
  res.send(data);
};

controller.getRelationship = (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;
  const response = trusttable.relationExist(id1, id2);
  response.then(skills => {
    const data = skills.rows;
    res.send(data);
  });
};

controller.rejectTrust = (req, res) => {
  const data = req.body;
  trusttable.rejectTrust(data);
  res.send(data);
};

controller.getTrust = (req, res) => {
  const id = req.params.id;
  const response = trusttable.getTrustRelation(id);
  response
    .then(trusts => {
      const data = trusts.rows;
      res.send(data);
    })
    .catch(error => console.log("Error:", error));
};

controller.getMutualTrust = (req, res) => {
  const data = req.body;
  const response = trusttable.getMutualTrust(data);
  response
    .then(trusted => {
      const data = trusted.rows;
      res.send(data);
    })
    .catch(error => console.log("Error:", error));
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
