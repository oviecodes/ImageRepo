

const upload = require('../services/imageUpload')
const deleteFromBucket = require('../services/deleteFromBucket')
const singleUpload = upload.single("image")
const Image = require('../models/images')


//get images belonging to the current user
const getMyImages = async (req, res) => {
    try {
        //get all images belonging to a specific user
        const authorImages = await Image.find({ author: req.user.id })
            .populate({ path: 'author', select: '-password' })
            .exec()
        res.send(authorImages)
    } catch (error) {
        res.json({ msg: `an error occurred` })
    } 
}

const getAllImages = async (req, res) => {
    try {
        const allImages = await Image.find({}).exec()
        res.send(allImages)
    } catch (error) {
        res.json({ msg: `an error occurred` })
    }
}

const uploadImage = async (req, res) => {
    //Image upload logic
    singleUpload(req, res, async function (err) {
        const title = req.body.name
        const description = req.body.desc
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        } else {
            try {
               const newImage = await Image.create({
                    url: req.file.location,
                    title,
                    description,
                    author: req.user.id 
               }) 
                return res.json({ newImage })
            } catch (e) {
                return res.json({ msg: `an error occurred` })
            }
        }
    })
}


// logic to get a particular image
const getImageDetails = async (req, res) => {
    const imageDetail = await Image.findById(req.params.id)
        .populate({ path: 'author', select: '-password' })
        .exec()
    res.send(imageDetail)
}

//logic for deleting image
const deleteImage = async (req, res) => {
    //check if current user uploaded the image
    const image = await Image.findById(req.params.id)

    if (!image) {
        return res.json({ msg: `image does not exist` })
    }
    const Key = image.url.split('/')[3]

    if (req.user.id == image.author) {
        await Image.findByIdAndDelete(image.id)
        deleteFromBucket(Key)
        return res.json({ msg: `Image has been deleted` })
    } 
    res.status(401).json({ msg: `you cannot delete the image` })
}

module.exports = {
    getMyImages,
    getAllImages,
    uploadImage,
    getImageDetails,
    deleteImage
}