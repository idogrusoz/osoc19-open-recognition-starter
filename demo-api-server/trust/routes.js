const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/:id/people', controller.getTrustpeople)

router.get('/:id', controller.getTrust)

router.get('/:id1/relationship/:id2', controller.getRelationship)

router.post('/', controller.addTrust)

router.get('/:id/pending', controller.getPendingTrust)

router.delete('/:id1/rejection/:id2', controller.rejectTrust)

router.put('/:id/approval', controller.approveTrust)

module.exports = router
