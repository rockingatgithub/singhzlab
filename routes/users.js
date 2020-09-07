const express = require('express')
const router = express.Router()
const passport = require('passport');

const userController = require('../controllers/user_controller')

router.get('/signin', userController.signin)
router.get('/signup', userController.signup)
router.post('/createSession',  passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},),
     userController.createSession)

router.post('/create', userController.create)
router.get('/createCsv', userController.createCsv)

module.exports = router
