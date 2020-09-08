const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('../controllers/user_controller')

router.get('/signin', userController.signin)
router.get('/signup', userController.signup)
router.post(
    '/createSession',
    passport.authenticate('local', { failureRedirect: '/users/signin' }),
    userController.createSession
)

router.get('/signout', userController.destroySession)

router.post('/create', userController.create)
router.get('/createCsv', userController.createCsv)
router.get('/downloadCsv', userController.downloadCsv)

module.exports = router
