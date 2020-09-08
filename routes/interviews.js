const express = require('express')
const router = express.Router()

const interviewController = require('../controllers/interview_controller')
router.post('/create', interviewController.create)
router.post('/addCandidate/:id', interviewController.addStudent)
router.get('/list', interviewController.getList)
router.get('/otherList', interviewController.getOtherList)

module.exports = router