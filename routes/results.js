// =============================================main file for results routes========================================


const express = require('express')
const router = express.Router()
const passport = require('passport')
const resultController = require('../controllers/result_controller')

router.post('/addResult',  passport.checkAuthentication, resultController.create)

module.exports = router