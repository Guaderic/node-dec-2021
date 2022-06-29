const {authController} = require('../controllers');
const {userMiddleware, authMiddleware} = require("../middlewares");

const router = require('express').Router()


router.post('/login' ,
    userMiddleware.CheckUserIsPresent,
    authController.login);
router.post('/refreshToken' ,
    authMiddleware.checkRefreshToken,
    authController.refreshToken);
router.post('/logout' ,
    authMiddleware.checkRefreshToken,
    authController.refreshToken);


module.exports = router