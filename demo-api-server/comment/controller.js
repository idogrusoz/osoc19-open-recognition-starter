const commenttable = require("./model");

commenttable.createTable();

const controller = {};

controller.getUserComments = (req,res) => {
  const id = req.params.id;
  console.log(id);
  const response = commenttable.getCommentsOfOneUser(id);
  response.then(
    comments=>{
      const data = comments.rows;
      res.send(data);
    }
  )
}

controller.addNewComment = (req, res) => {
    const data = req.body;
    commenttable.insertComment(data);
    res.send(data);
}



module.exports = controller;
