"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;
console.log("usertable");
const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    trust
    (
      id VARCHAR(55) PRIMARY KEY,
      userrequesting NUMERIC NOT NULL REFERENCES users(id),
      userrecieving NUMERIC NOT NULL REFERENCES users(id),
      daterequesting DATE  NOT NULL,
      dateapproving DATE NOT NULL,
      active BOOLEAN NOT NULL,
      datecancelling DATE ,
      user1approval BOOLEAN NOT NULL,
      user2approval BOOLEAN NOT NULL
    );
`);
  console.log("trust table created successfully!!!!!");
};

const insertTrust = data => {
  database.query(SQL`
    INSERT INTO trust (
      id,
      userrequesting,
      userrecieving,
      daterequesting,
      dateapproving,
      active,
      datecancelling,
      user1approval,
      user2approval
    ) VALUES (
      ${data.id},
      ${data.userrequesting},
      ${data.userrecieving},
      ${data.daterequesting},
      ${data.dateapproving},
      ${data.active},
      ${data.datecancelling},
      ${data.user1approval},
      ${data.user2approval}
    )
  `)
}

const getTrustRelation = id => (
  database.query(SQL`
    SELECT
    *
    FROM
    trust
    WHERE
    userrequesting = ${id} OR userrecieving = ${id};
  `)
)


module.exports = {
  createTable,
  insertTrust,
  getTrustRelation
};
