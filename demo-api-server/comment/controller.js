const commenttable = require("./model");

commenttable.createTable();

const controller = {};

controller.getUserComments = (req,res) => {
  const id = req.params.id;
  const response = commenttable.getCommentsOfOneUser(id);
  console.log(response);
  response.then(
    comments=>{
      const data = comments.rows;
      res.send(data);
    }
  )
}

controller.addNewComment = (req, res) => {
    const data = req.body;
    console.log(data)
    commenttable.insertComment(data);
    res.send(data);
}



module.exports = controller;
