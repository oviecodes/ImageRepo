

const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getMyImages, getAllImages, uploadImage, getImageDetails, deleteImage } = require('../controllers/imageController')

router.route('/')
    .all(passport.authenticate('jwt', { session: false }))
    .get(getMyImages)
    .post(uploadImage)

router.route('/market')
    .get(getAllImages)

router.route('/:id')
    .all(passport.authenticate('jwt', { session: false }))
    .get(getImageDetails)
    .delete(deleteImage)

module.exports = router