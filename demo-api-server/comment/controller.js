const commenttable = require("./model");

commenttable.createTable();

const controller = {};

controller.getUserComments = (req, res) => {
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

controller.getPendingComments = (req,res) => {
  const id = req.params.id
  const response = commenttable.getPendingComments(id)
  response.then(
    comments =>{
    const data = comments.rows
    res.send(data)
    }
  ).catch(err => console.log('Error:', err))
}

controller.addNewComment = (req, res) => {
    const data = req.body;
    console.log(data)
    commenttable.insertComment(data);
    res.send(data);
}

controller.updateComment = (req, res) => {
  const id = req.params.id
  commenttable.updateComment(id)
  res.status(200).send('published')
}

controller.rejectComment = (req, res) => {
  const id = req.params.id
  commenttable.rejectComment(id);
  res.status(200).send("delted")
}


controller.addNewComment = (req, res) => {
  const data = req.body;
  commenttable.insertComment(data);
  res.send(data);
};

module.exports = controller;
