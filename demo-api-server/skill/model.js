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
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      author INTEGER NOT NULL REFERENCES users(id),
      reciever INTEGER NOT NULL REFERENCES users(id)
    );
`);
  console.log("skill table created successfully!!!!!");
};

const insertSkill = data => {
  database.query(SQL`
  INSERT INTO skill (
    name,
    author,
    reciever
  ) VALUES (
    ${data.name},
    ${data.author},
    ${data.reciever}
  )
  `);
};

const getSkillsOfOneUser = id => (
  database.query(SQL`
    SELECT 
    *
    FROM 
    skill
    WHERE
    reciever = ${id};
  `)
)



module.exports = {
  createTable,
  insertSkill,
  getSkillsOfOneUser
};
