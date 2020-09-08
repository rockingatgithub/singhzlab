// =============================================main file for interview routes========================================

const express = require('express')
const router = express.Router()
const passport = require('passport')

const interviewController = require('../controllers/interview_controller')
router.post('/create', passport.checkAuthentication, interviewController.create)
router.post(
    '/addCandidate/:id',
    passport.checkAuthentication,
    interviewController.addStudent
)
router.get('/list', passport.checkAuthentication, interviewController.getList)
router.get(
    '/otherList',
    passport.checkAuthentication,
    interviewController.getOtherList
)

module.exports = router
