const skilltable = require('./model')

skilltable.createTable()

const controller = {}

controller.addSkill = (req, res) => {
  const data = req.body
  skilltable.insertSkill(data)
  res.send(data)
}

controller.getSkills = (req, res) => {
  const id = req.params.id
  const response = skilltable.getSkillsGrouped(id)
  response.then(skills => {
    const data = skills.rows
    res.send(data)
  })
}

controller.fetchSkills = (req, res) => {
  const id = req.params.id
  const response = skilltable.fetchSkillsOfOneUser(id)
  response.then(skills => {
    const data = skills.rows
    res.send(data)
  })
}

controller.getNumberOfPros = (req, res) => {
  const skill = req.params.skill
  const id = req.params.id
  const response = skilltable.getNumberOfPros(id, skill)
  response.then(trusts => {
    const data = trusts.rows
    res.send(data)
  })
}

module.exports = controller
