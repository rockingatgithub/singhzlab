// =====================================================main file for course routes=====================================

const express = require('express')
const router = express.Router()
const passport = require('passport')
const courseController = require('../controllers/course_controller')

router.post(
    '/addScore/:id',
    passport.checkAuthentication,
    courseController.create
)

module.exports = router
