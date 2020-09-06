const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller')

router.get('/reset', userController.getresetPassword)
router.post('/reset',userController.resetPassword)
router.get('/register', userController.getRegister)
router.post('/register', userController.Register)
router.get('/', userController.getLogin)
router.post('/login', passport.authenticate('local',{
    successRedirect:'/pedido',
    failureRedirect:'/',
    failureFlash: true
}))
router.get('/logout', userController.logOut)

module.exports = router