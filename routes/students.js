const express = require('express')
const router = express.Router()
const passport = require('passport')

const studentsController = require('../controllers/student_controller')

router.post('/create', studentsController.create)
router.get('/list', studentsController.getList)

module.exports = router
