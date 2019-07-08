const commenttable = require("./model");

commenttable.createTable();

const controller = {};

controller.welcome = (req, res) => {
  console.log("in controller comment");
  res.send("response from comment");
};

controller.addNewComment = (req, res) => {
    const data = req.body;
    commenttable.insertComment(data);
    res.send(data)
}

module.exports = controller;
