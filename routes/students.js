// =============================================main file for student routes========================================


const express = require('express')
const router = express.Router()
const passport = require('passport')

const studentsController = require('../controllers/student_controller')

router.post('/create', passport.checkAuthentication, studentsController.create)
router.get('/list', passport.checkAuthentication, studentsController.getList)

module.exports = router
