

const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getAllImages, uploadImage, getImageDetails, deleteImage } = require('../controllers/imageController')

router.route('/')
    .all(passport.authenticate('jwt', { session: false }))
    .get(getAllImages)
    .post(uploadImage)

router.route('/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(getImageDetails)
    .delete(deleteImage)

module.exports = router