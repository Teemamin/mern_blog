const User = require('../model/user')
const BadRequestError = require('../errors/badRequest')



exports.register = async (req,res,next)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Please Provide all values')
    }

    const emailExist = await User.findOne({email})
    if(emailExist){
        throw new BadRequestError('Email already exist')
    }
   const user =   await User.create({name, email, password})
   user.password = undefined //to ensure the password is not sent as part of the response
    res.status(200).json(user)
}

exports.login = async (req,res,next)=>{
    res.send('login func')
}

exports.updateProfile = async (req,res,next)=>{
    res.send('update profile func')
}