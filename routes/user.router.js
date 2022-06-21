const {userController} = require("../controllers");
const router = require('express').Router()


router.get('/', userController.getUsers);
router.post('/', userController.postUser);

router.get('/:userID', userController.getUserById)
router.put('/:userID', userController.updateUser);
router.delete('/:userID', userController.deleteUser);


module.exports = router