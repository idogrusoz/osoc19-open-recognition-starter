"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;
console.log("usertable");
const createTable = () => {
  console.log("inside createtable");
  database.query(`
  CREATE TABLE IF NOT EXISTS
    skill
    (
      id VARCHAR(55) PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      author NUMERIC NOT NULL REFERENCES users(id),
      reciever NUMERIC  NOT NULL REFERENCES users(id)
    );
`);
  console.log("skill table created successfully!!!!!");
};

module.exports = createTable;
