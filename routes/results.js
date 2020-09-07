const express = require('express')
const router = express.Router()

const resultController = require('../controllers/result_controller')

router.post('/addResult', resultController.create)

module.exports = router