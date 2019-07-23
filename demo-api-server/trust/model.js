"use strict";

const database = require("../database");
const SQL = require("pg-template-tag").default;
console.log("usertable");
const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    trust
    (
      id SERIAL PRIMARY KEY,
      userrequesting INTEGER NOT NULL ,
      userrecieving INTEGER NOT NULL ,
      daterequesting DATE  NOT NULL,
      dateapproving DATE ,
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
      userrequesting,
      userrecieving,
      daterequesting,
      dateapproving,
      active,
      datecancelling,
      user1approval,
      user2approval
    ) VALUES (
      ${data.userrequesting},
      ${data.userrecieving},
      ${data.daterequesting},
      ${data.dateapproving},
      ${data.active},
      ${data.datecancelling},
      ${data.user1approval},
      ${data.user2approval}
    )
  `);
};

const getTrustRelation = id =>
  database.query(SQL`
    SELECT
    *
    FROM
    trust
    WHERE
    userrequesting = ${id} OR userrecieving = ${id};
  `);

const relationExist = (id1, id2) =>
  database.query(SQL`
  SELECT
    *
    FROM
    trust
    WHERE
    (userrequesting = ${id1} and userrecieving = ${id2} ) 
	OR 
	(userrecieving = ${id1} and userrequesting=${id2} );
`);

const getTrustpeople = id =>
  database.query(SQL`
  select id,first_name from users WHERE id IN
  (select userrequesting as temp2 from trust where userrecieving=${id} 
  UNION
  select userrecieving from trust where userrequesting=${id});
  `);

const getPendingRealation = id =>
  database.query(SQL`
    SELECT
    *
    FROM
    trust
    WHERE
    userrecieving = ${id} AND user2approval = false
  `);

const approveTrust = data => {
  database.query(SQL`
    UPDATE
    public.trust
    SET   dateapproving = ${data.dateapproving},
          active = true,
          user2approval = true
    WHERE
    userrecieving = ${data.userrecieving} AND userrequesting = ${
    data.userrequesting
  }
  `);
};

const rejectTrust = data => {
  database.query(SQL`
    DELETE FROM trust
    WHERE
    userrecieving = ${data.userrecieving} AND userrequesting = ${
    data.userrequesting
  }
  `);
};

module.exports = {
  createTable,
  insertTrust,
  getTrustRelation,
  getTrustpeople,
  getPendingRealation,
  approveTrust,
  rejectTrust,
  relationExist
};
