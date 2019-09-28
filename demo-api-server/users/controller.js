const usertable = require('./model')
const bcrypt = require('bcrypt')

const saltRounds = 10

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

  bcrypte.hash(data.password, saltRounds, (err, hash) => {
    if (err) {
      throw err
    } else {
      data.password = hash
      const result = usertable.checkUser(data.login, data.password)
      result.then(x => {
        if (x.rows.length === 0) {
          res.status(403).send('Wrong login or password')
        } else {
          res.status(200).send(x.rows)
        }
      })
    }
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
