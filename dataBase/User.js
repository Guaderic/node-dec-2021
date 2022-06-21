const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true
    }


}, {timestamps: true})

module.exports = model('user', userSchema)