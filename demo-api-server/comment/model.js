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
      message TEXT NOT NULL,
      relationship TEXT NOT NULL,
      published BOOLEAN NOT NULL
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
    message,
    relationship,
    published
  ) VALUES (
    ${data.author},
    ${data.reciever},
    ${data.creationdate},
    ${data.message},
    ${data.relationship},
    ${data.published}
  )
  `);
};

const getCommentsOfOneUser = id =>
  database.query(SQL`
    SELECT
    *
    FROM
    comment
    WHERE
    reciever = ${id};
    `);

const getPendingComments = id =>
  database.query(SQL`
    SELECT
    *
    FROM
    comment
    WHERE
    (reciever = ${id} AND published = false)
  `)

  const updateComment = id => {
    database.query(SQL`
      UPDATE
    comment
    SET   
          published = true
    WHERE
    id = ${id} 
    `)
  }

  const rejectComment = id => { 
  database.query(SQL`
    DELETE FROM comment
    WHERE
    id = ${id}
  `)
  console.log('delete')
  }
module.exports = {
  createTable,
  insertComment,
  getCommentsOfOneUser,
  getPendingComments,
  updateComment,
  rejectComment
};
