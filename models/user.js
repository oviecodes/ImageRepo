const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
})

userSchema.pre('save', async function(){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                reject (new Error(`an error occurred`))
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if(err){
                    reject (new Error(`an error occurred`))
                }
                resolve (this.password = hash)
            });
        });
    })
})

userSchema.methods.validPassword = async function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, res) {
           if(err) {
               reject(new Error(`an error occured`))
           }
           resolve(res)
        });
    })
}

module.exports = mongoose.model('user', userSchema)