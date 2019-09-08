const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
const bodyParser = require('body-parser')
const router = express.Router()
app.use(bodyParser.json())

app.use(bodyParser.json())

const users = require('./users')
app.use('/users', users)

const trust = require('./trust')
app.use('/trusts', trust)

const comment = require('./comment')
app.use('/comments', comment)

const skill = require('./skill')
app.use('/skills', skill)

app.listen(3000, () => {
  console.log('listenning on port 3000........')
})
module.exports = router
