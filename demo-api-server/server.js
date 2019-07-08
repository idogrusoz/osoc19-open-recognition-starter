const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.json());

const authors = require("./authors");
app.use("/authors", authors);

const books = require("./books");
app.use("/books", books);

const users = require("./users");
app.use("/users", users);

const trust = require("./trust");
app.use("/trust", trust);

const comment = require("./comment");
app.use("/comment", comment);

const skill = require("./skill");
app.use("/skill", skill);

app.listen(3000, () => {
  console.log("listenning........");
});
module.exports = router;
