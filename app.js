
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const PORT = 5000
const imageRoutes = require('./routes/images')
const userRoutes = require('./routes/user')
const passportLogic = require('./services/passportLogic')


passportLogic(passport)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());

mongoose.connect(`mongodb://localhost:27017/imageRepoApp`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`connected to db`)
}).catch(e => {
    console.error(e)
})

app.use('/images', imageRoutes)
app.use('/users', userRoutes)

app.get(`/`, (req, res) => {
    res.json({ msg: `welcome to the Homepage` })
})

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`)
})