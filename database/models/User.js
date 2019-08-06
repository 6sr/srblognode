const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    }
})

// Encrypting password
UserSchema.pre('save', function(next) {
    const user = this

    // Higher value of 2nd parameter, more secure and slower the process of encrypting
    bcrypt.hash(user.password, 10, function(error, encrypted) {
        user.password = encrypted
        next()
    })
})

const User = mongoose.model('User',UserSchema)

module.exports = User

