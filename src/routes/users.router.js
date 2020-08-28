const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller')

router.get('/', userController.getLogin)
router.post('/login', passport.authenticate('local',{
    successRedirect:'/pedido',
    failureRedirect:'/',
    failureFlash: true
}))
router.get('/logout', userController.logOut)

module.exports = router