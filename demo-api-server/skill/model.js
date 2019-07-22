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

const getSkillsOfOneUser = id =>
  database.query(SQL`
    SELECT 
    *
    FROM 
    skill
    WHERE
    reciever = ${id};
  `);

const getNumberOfPros = (id, skill) =>
  database.query(SQL`
  select COUNT (*) from (select distinct author from skill where reciever=${id} and name =${skill})AS yd
  inner join
  (select distinct reciever from skill where name =${skill}) y2
  on yd.author=y2.reciever;
  `);

const getSkillsGrouped = id => {
  return database.query(SQL`
    SELECT name,count(*)
    FROM skill 
    WHERE reciever=${id}
    GROUP BY name;
    `);
};
module.exports = {
  createTable,
  insertSkill,
  getSkillsOfOneUser,
  getNumberOfPros,
  getSkillsGrouped
};
