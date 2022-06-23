const {authController} = require("../controllers");
const { userMiddleware} = require("../middlewares");
const router = require('express').Router()


router.get('/' ,authController.login());


module.exports = router