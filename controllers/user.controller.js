const {fileService, userService} = require("../services");
const User = require('../dataBase/User')

module.exports = {


    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers()
            res.json(users)
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req

            res.json(user)
        } catch (e) {
            next(e)
        }
    },


    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            next(e)
        }
    },


    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params
            const updatedUser = await userService.updateOneUser({ _id : id }, req.dateForUpdate);
            res.status(201).json(updatedUser)
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params
            await userService.deleteOneUser({ _id : id })
            res.sendStatus(204)
            next()
        } catch (e) {
            next(e)
        }
    }
}