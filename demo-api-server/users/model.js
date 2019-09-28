'use strict'

const database = require('../database')
const SQL = require('pg-template-tag').default
const createTable = () => {
  database.query(`
  CREATE TABLE IF NOT EXISTS
    users
    (
      id SERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR(30) NOT NULL,
      last_name VARCHAR(30)  NOT NULL,
      email VARCHAR(30)  NULL,
      picture VARCHAR(300) ,
      profession VARCHAR(30) NULL,
      employment VARCHAR(30) NULL,
      city VARCHAR(30) NULL,
      country VARCHAR(30) NULL,
      login VARCHAR(30) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
`)
}

const insert = data => {
  database.query(SQL`
  INSERT INTO users (
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
  `)
}

const getUserById = id =>
  database.query(SQL`
  SELECT
  *
  FROM
  users
  WHERE
  id = ${id}
  `)

const checkUser = login =>
  database.query(SQL`

    SELECT
    *
    FROM
    users
    WHERE

    login = ${login};

    `)

const getUserByName = name =>
  database.query(SQL`

    SELECT
    *
    FROM
    users
    WHERE
    login = ${name}
    `)

module.exports = {
  createTable,
  insert,
  getUserById,
  getUserByName,
  checkUser
}
