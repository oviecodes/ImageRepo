# ImageRepo
The Shopify Technical Challenge Backend Solution.
This is an API that uses AWS-s3 to store images, then stores the returned url in mongodb along with the details of the Image supplied by the user. It also allows authorized users to delete images from AWS-s3 as well as mongodb.

## setting up aws-s3
Get your **accessKeyId** and **secretAccessKey** from your Aws console, and also create an s3 **bucket**.

create a .env file with and set the following environment variables
- ACCESS_KEY_ID = accessKeyId
- SECRET_ACCESS_KEY = secretAccessKey
- BUCKET = bucket

A fourth environment variable is also needed but it's not for aws configuration. It has to do with JWT.

- SECRET_KEY = yourSecret

## Signup - POST '/users/signup'
To signup using the API make a POST request to '/users/signup'

### Required credentials for signup
- username
- email
- password

All these are needed for successful signup, after which users need to proceed to login.

## Login - POST '/users/login'
To login using the API make a POST request to '/users/login'

### Required credentials for signup
- email
- password

Upon successful login the user recieves a token (expires in 60 minutes) which can be used to access protected routes along with some credentials i.e username, email.


## Getting Images Belonging to current user - GET '/images'
To get all the Images that you've uploaded make a GET request to '/images' and send along the token which you recieved in the Bearer header for validation.

## Uploading images - POST '/images'
To upload an image make a POST request to '/images' together with the token in the Bearer header for validation. The form must be a multipart form.
### Required credentials for Image upload
- image - contains the image to be uploaded
- name - what you wish to be the name of the image for easy recall
- desc - description of the image.

## Getting all Images from DB - GET '/images/market'
To get all the Images from the DB just make a GET request to '/images/market'. This route does not require any authentication.

## Getting Image Details - GET '/images/:id'
To get all the detail about an image including the username and email of the author(uploader), make a GET request to '/images/:id'
### Required credentials for Image detail
- id - the id of the desired image.
- token - sent in the Bearer header

## Deleting an Image - DELETE - '/images/:id'
To delete an image that you uploaded, make a DELETE request to '/images/:id' together with the token in the Bearer header for validation. 
### Required credentials for deleting an image
- you must be the author(uploader) of the image

## Getting Images belonging to another user - GET '/users/:id'
To get all Images belonging to another user, you need to make a GET request to '/users/:id' along with the Bearer token for validation.
### Required credentials for getting images belonging to another user
- id - id of the desired user



