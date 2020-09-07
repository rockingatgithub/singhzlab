const express = require('express')
const router = express.Router()

const courseController = require('../controllers/course_controller')

router.post('/addScore/:id', courseController.create)

module.exports = router
