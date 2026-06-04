const express = require('express')
const router = express.Router()
const {registerUser, loginUser, isLoggedIn} = require('../controllers/userController')
const userModel = require('../models/userModel')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', (req, res) => {
    res.clearCookie('token',{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
});
    return res.json({success: true, message:'Logout'})
})

router.get('/dashboard', isLoggedIn, async (req, res) => {
    let user = await userModel.findById(req.user.userId);
    if (!user) {
        return res.json({ success: false, message: 'Not loggedIn' })
    } else {
        return res.json({success: true, message: 'success', user})
    }
})



module.exports = router;