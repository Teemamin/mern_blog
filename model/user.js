const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please Provide name'],
        maxLength: 20,
        trim: true,
        default: 'lastName'   
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        validate:{
            validator: validator.isEmail,
            message:'Please provide valid email'
            },
        unique: true
    },
    password:   {
        type: String,
        required: [true, 'Please Provide password'],
        minLength: 6,
        select: false
    }
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await  bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model('User', UserSchema)