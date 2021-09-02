
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Image = require('../models/images')


// logic for creating user
const createUser = async (req, res) => {
	const { username, password, email } = req.body

	if(!username || !password || !email) {
		return res.json({ msg: 'incomplete credentials' })
	}

	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.json({ msg: `${email} already exists` })
		}
    
		await User.create(req.body)
	} catch (e) {
		console.log(e)
		return res.json({ msg: 'an error occurred' })
	}
    
	res.json({
		msg: 'proceed to /login'
	})
}


//logic for user login
const loginUser = async (req, res) => {
	const { password, email } = req.body

	if(!password || !email) {
		return res.json({ msg: 'incomplete credentials' })
	}
	//get user
	try {
		const user = await User.findOne({ email })

		if (!user) {
			return res.json({ msg: 'User does not exist' })
		}

		const { username } = user

		const valid = await user.validPassword(password)

		if (valid) {
			jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
				if (err) {
					return res.json({ msg: 'something went wrong' })
				}
				return res.json({ token, username, email })
			})
		} else {
			return res.json({ msg: 'invalid password' })
		}
	} catch (error) {
		return new Error('An error occurred')
	} 
}


//get all images by a particular user
const getUserImages = async (req, res) => {
	const authorId = req.params.id
	//get all images belonging to a specific user
	const authorImages = await Image.find({ author: authorId })
		.populate({ path: 'author', select: '-password' })
		.exec()
	if (!authorImages) {
		return res.status(404).json({ msg: 'author does not have any images'})
	}
	res.send(authorImages)
}


module.exports = {
	createUser,
	loginUser,
	getUserImages
}