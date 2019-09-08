const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/', controller.addNewComment)

router.get('/:id', controller.getUserComments)

router.get('/:id/pending', controller.getPendingComments)

router.put('/:id/approval', controller.updateComment)

router.delete('/:id/rejection', controller.rejectComment)

module.exports = router
