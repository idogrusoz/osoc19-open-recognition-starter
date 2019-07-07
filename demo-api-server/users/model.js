"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;
console.log("usertable");
const createTable = () => {
  console.log("inside createtable");
  database.query(`
  CREATE TABLE IF NOT EXISTS
    users
    (
      id VARCHAR(55) PRIMARY KEY,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30)  NOT NULL,
      email VARCHAR(30)  NOT NULL,
      picture VARCHAR(30) NOT NULL,
      profession VARCHAR(30) NOT NULL,
      employment VARCHAR(30) NOT NULL,
      city VARCHAR(30) NOT NULL,
      country VARCHAR(30) NOT NULL
    );
`);
  console.log("users table created successfully!!!!!");
};

module.exports = createTable;
