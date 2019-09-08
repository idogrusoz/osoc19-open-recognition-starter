const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/', controller.insert)

router.get('/:id', controller.getUser)

router.get('/searchresults/:name', controller.getUserByName)

router.get('/:login/:password', controller.checkUser)

module.exports = router
