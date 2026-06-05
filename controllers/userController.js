const userModel = require('../models/userModel')
const { hashPassword, comparePassword } = require('../middlewares/auth')
const jwt = require('jsonwebtoken')


async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const hash = await hashPassword(password)
        let userInDb = await userModel.findOne({ email: email })
        if (userInDb) {
            console.log('same email')
            return res.json({ success: false, message: 'User already exists with this email' })   
        }
    let user = await userModel.create({
        name, 
        email,
        password: hash
    })
       
    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
})
    return res.json({ success: true, message:'Registered Successfully', user })
    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email })

        if (!user) {
            return res.json({success: false, message: 'User not registered' })
        }

        let match = await comparePassword(password, user.password)

        if (!match) {
            return res.json({success: false, message: 'Password not matched'})
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET)

            res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
})
        
        return res.json({success: true, message: 'Login Successful' })
        
        } catch (error) {
            return res.json({success: false, message: error.message})
    }
}


async function isLoggedIn(req, res, next) {
   try {
     let token = req.cookies.token;
    if (!token) {
        return res.json({success: false, message:'User not logged in'})
    }
    let data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next()
   } catch (error) {
     return res.json({success: false, message:'Something is wrong'})
   }
}

module.exports = {registerUser, loginUser, isLoggedIn}