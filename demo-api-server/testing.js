const express = require("express");
const testing_app = express();
const mongoose = require('mongoose');

require('./example-config');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => { console.log('Database connection established'); })
  .catch((err) => {
    console.error(`Database error, exiting. Stack trace:n${err}`);
    process.exit();
  });

const bodyParser = require('body-parser');
const cors = require('cors');

testing_app.use(cors());
testing_app.use(bodyParser.urlencoded({ extended: true }));
testing_app.use(bodyParser.json());

testing_app.get('/api', (req, res) => {
  res.json({ message: 'API ready' });
});

const api_server = require("./server");
testing_app.use("/api", api_server);

const port = process.env.PORT || 4000;
testing_app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
