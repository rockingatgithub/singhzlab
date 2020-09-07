const express = require('express')
const router = express.Router()

const interviewController = require('../controllers/interview_controller')
router.post('/create', interviewController.create)
router.post('/addCandidate/:id', interviewController.addStudent)

module.exports = router