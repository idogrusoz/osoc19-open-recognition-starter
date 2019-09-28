const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/register', controller.insert)

router.get('/:id', controller.getUser)

router.get('/searchresults/:name', controller.getUserByName)

router.post('/login/', controller.checkUser)

module.exports = router
