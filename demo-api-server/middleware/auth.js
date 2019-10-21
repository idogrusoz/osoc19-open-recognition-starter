const jwt = require('jsonwebtoken')
const fs = require('fs')

const PRIVATE_KEY = fs.readFileSync('./private.key')

const protect = (req, res, next) => {
  let token
  if (req.headers.cookie && req.headers.cookie.startsWith('token')) {
    token = req.headers.cookie.split('=')[1]
  }
  if (!token) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const verified = jwt.verify(token, PRIVATE_KEY)
    console.log(verified)

    next()
  } catch (err) {
    return res.status(401).send('Unauthorized')
  }
}

module.exports = protect
