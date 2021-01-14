
//this file contains the image upload logic.

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require('uuid').v4
const path = require('path')
require('dotenv').config()

const s3 = new aws.S3();

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY, 
  region: "us-east-1",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: process.env.BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TEST" });
    },
    key: function (req, file, cb) {
      cb(null, `${uuid()}_${Date.now().toString()}${path.extname(file.originalname)}`);
    },
  }),
});


module.exports = upload