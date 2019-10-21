const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')

const controller = require('./controller')

router.route('/').post(protect, controller.addNewComment)

router.get('/:id', controller.getUserComments)

router.get('/:id/pending', controller.getPendingComments)

router.route('/:id/approval').put(protect, controller.updateComment)

router.route('/:id/rejection').delete(protect, controller.rejectComment)

module.exports = router
