const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/:id', controller.getSkills)

router.get('/:id/nomultiple', controller.fetchSkills)

router.post('/', controller.addSkill)
router.get('/:id/pros/:skill', controller.getNumberOfPros)

module.exports = router
