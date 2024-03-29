const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/get-current-user',  auth,authController.getCurrentUser)
router.patch('/update-profile',  auth,authController.updateProfile)

module.exports = router