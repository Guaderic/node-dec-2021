const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware} = require("../middlewares");
const router = require('express').Router()


router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserValidForCreate, userMiddleware.isUserUnique, userController.createUser);

router.get('/:id', commonMiddleware.isIdvalid , userMiddleware.isUserPresent ,userController.getUserById)
router.put('/:id', commonMiddleware.isIdvalid ,userMiddleware.isUserValidForUpdate ,userMiddleware.isUserPresent, userController.updateUser);
router.delete('/:id', commonMiddleware.isIdvalid , userMiddleware.isUserPresent, userController.deleteUser);


module.exports = router