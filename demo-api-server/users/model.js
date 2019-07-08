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
      id NUMERIC PRIMARY KEY NOT NULL,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30)  NOT NULL,
      email VARCHAR(30)  NOT NULL,
      picture VARCHAR(30) NOT NULL,
      profession VARCHAR(30) NOT NULL,
      employment VARCHAR(30) NOT NULL,
      city VARCHAR(30) NOT NULL,
      country VARCHAR(30) NOT NULL,
      login VARCHAR(30) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
`);
  console.log("users table created successfully!!!!!");
};

const insert = data => {
  database.query(SQL`
  INSERT INTO users (
    id ,
    first_name ,
    last_name ,
    email ,
    picture ,
    profession ,
    employment ,
    city ,
    country ,
    login ,
    password
  ) VALUES (
    1,
    ${data.first_name} ,
    ${data.last_name} , 
    ${data.email} ,
    ${data.picture} ,
    ${data.profession} ,
    ${data.employment},
    ${data.city} ,
    ${data.country} ,
    ${data.login} ,
    ${data.password}
    )
  `);
  database.query(SQL`
  INSERT INTO users (
    id ,
    first_name ,
    last_name ,
    email ,
    picture ,
    profession ,
    employment ,
    city ,
    country ,
    login ,
    password
  ) VALUES (
    3,
    ${data.first_name} ,
    ${data.last_name} , 
    ${data.email} ,
    ${data.picture} ,
    ${data.profession} ,
    ${data.employment},
    ${data.city} ,
    ${data.country} ,
    ${data.login} ,
    ${data.password}
    )
  `);
};
module.exports = { createTable, insert };
