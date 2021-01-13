

const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1',
});

module.exports = (Key) => {
    const s3 = new aws.S3()
    const params = {
        Bucket: process.env.BUCKET,
        Key
    }

    s3.deleteObject(params, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}



