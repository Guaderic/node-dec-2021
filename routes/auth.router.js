const {authController} = require('../controllers');
const {userMiddleware} = require("../middlewares");

const router = require('express').Router()


router.post('/login' ,userMiddleware.CheckUserIsPresent, authController.login);


module.exports = router