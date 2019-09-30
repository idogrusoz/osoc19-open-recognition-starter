const usertable = require('./model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const saltRounds = 10

const PUBLIC_KEY = fs.readFileSync('./public.key')
const PRIVATE_KEY = fs.readFileSync('./private.key')

usertable.createTable()
const controller = {}

controller.insert = (req, res) => {
  const data = req.body.data
  bcrypt.hash(data.password, saltRounds, (err, hash) => {
    if (err) {
      throw err
    } else {
      data.password = hash
      usertable.insert(data)
      res.sendStatus(200)
    }
  })
}

controller.getUser = (req, res) => {
  const id = req.params.id
  const response = usertable.getUserById(id)
  response.then(user => {
    const data = user.rows
    res.send(data)
  })
}

controller.checkUser = (req, res) => {
  const data = req.body.data
  const result = usertable.checkUser(data.login)
  result.then(user => {
    user.rows[0] === undefined
      ? res.status(403).send('Wrong username or password')
      : bcrypt.compare(data.password, user.rows[0].password, (err, result) => {
          if (result) {
            let userData = user.rows[0]
            let token = jwt.sign({ user: userData.login }, PRIVATE_KEY, {
              expiresIn: '24h'
            })
            delete userData.password
            userData.token = token
            res.status(200).send(userData)
          } else {
            res.status(403).send('Wrong username or password')
          }
        })
  })
}

controller.getUserByName = (req, res) => {
  const name = req.params.name
  const result = usertable.getUserByName(name)
  result.then(x => {
    if (x.rows.length === 0) {
      res.status(403).send('error server')
    } else {
      res.send(x.rows)
    }
  })
}

module.exports = controller
