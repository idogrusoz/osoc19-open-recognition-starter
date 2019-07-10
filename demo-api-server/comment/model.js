"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;
console.log("usertable");
const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    comment
    (
      id SERIAL PRIMARY KEY,
      author INTEGER NOT NULL REFERENCES users(id),
      reciever INTEGER NOT NULL REFERENCES users(id),
      creationdate DATE  NOT NULL,
      message TEXT NOT NULL
    );
`);
  console.log("comment table table created successfully!!!!!");
};

const insertComment = data => {
  database.query(SQL`
  INSERT INTO comment (
    author,
    reciever,
    creationdate,
    message
  ) VALUES (
    ${data.author},
    ${data.reciever},
    ${data.creationdate},
    ${data.message}
  )
  `);
  };

  const getCommentsOfOneUser = id => (
    database.query(SQL`
    SELECT
    *
    FROM
    comment
    WHERE
    reciever = ${id};
    `)
  )
    


module.exports = {
  createTable,
  insertComment,
  getCommentsOfOneUser
};
