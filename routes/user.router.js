const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const router = require('express').Router()


router.get('/',userMiddleware.isQueryValid, userController.getUsers);
router.post('/', userMiddleware.isNewUserValid, userMiddleware.isEmailRegistered, userController.createUser);

router.get('/:id', commonMiddleware.isIdvalid , userMiddleware.isUserPresent ,userController.getUserById)
router.put('/:id', commonMiddleware.isIdvalid ,userMiddleware.isUserValidForUpdate ,userMiddleware.isUserPresent, userController.updateUser);
router.delete('/:id', authMiddleware.checkAccessToken, commonMiddleware.isIdvalid , userMiddleware.isUserPresent, userController.deleteUser);


module.exports = router