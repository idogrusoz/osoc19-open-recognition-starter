const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true
}

app.use(cors(corsOptions))

const bodyParser = require('body-parser')
const router = express.Router()
app.use(bodyParser.json())

app.use(bodyParser.json())
app.use(cookieParser())

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
