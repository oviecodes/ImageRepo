

const express = require('express')
const passport = require('passport')
const router = express.Router()
const { createUser, loginUser, getUserImages } = require('../controllers/userController')


router.route('/')
	.get()

router.route('/signup')
	.post(createUser)

router.route('/login')
	.post(loginUser)

router.route('/:id')
	.all(passport.authenticate('jwt', { session: false }))
	.get(getUserImages)
    


module.exports = router