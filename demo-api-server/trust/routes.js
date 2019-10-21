const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')

const controller = require('./controller')

router.get('/:id/people', controller.getTrustpeople)

router.get('/:id', controller.getTrust)

router.get('/:id1/relationship/:id2', controller.getRelationship)

router.route('/').post(protect, controller.addTrust)

router.get('/:id/pending', controller.getPendingTrust)

router.route('/:id1/rejection/:id2').delete(protect, controller.rejectTrust)

router.route('/:id/approval').put(protect, controller.approveTrust)

module.exports = router
