// ===================================================main file for all routes=============================================


const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home_controller')
router.get('/', homeController.home)
router.use('/users', require('./users'))
router.use('/students', require('./students'))
router.use('/interviews', require('./interviews'))
router.use('/results', require('./results'))
router.use('/courses', require('./courses'))

module.exports = router
