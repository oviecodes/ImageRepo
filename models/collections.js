
const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true
	}
})

module.exports = mongoose.model('photoCollection', collectionSchema)