const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')

const controller = require('./controller')

router.get('/:id', controller.getSkills)

router.get('/:id/nomultiple', controller.fetchSkills)

router.route('/').post(protect, controller.addSkill)
router.get('/:id/pros/:skill', controller.getNumberOfPros)

module.exports = router
