const {fileService} = require("../services");
const User = require('../dataBase/User')

module.exports = {


    getUsers: async (req, res) => {
        const users = await User.find();
        res.json(users)
    },

    getUserById: async (req, res) => {
        try {
            const {userId} = req.params

            const user = await User.find();

            // const user = users.find((user) => user.id === +userId)
            if (!user) {
                res.status(404).json(`User with id ${userId} is not found!!!`)
                return
            }
            res.json(user)
        } catch (e) {
            console.log(e.message)
        }
    },


    postUser: async (req, res) => {
        try {
            const {name, age} = req.body

            const user = await User.create(req.body);

            if (!Number.isInteger(age) || age < 18) {
                return res.status(400).json('set valid age')
            }
            if (!name || name.length < 3) {
                return res.status(400).json('set valid name')
            }
            //const users = await fileService.reader()

            // const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
            // await fileService.writer([...users, newUser])
            //
            // console.log(newUser)
            // res.status(201).json(newUser)
            res.status(201).json(user)
        }catch (e){
            console.log(e.message)
        }
    },


    updateUser: async (req, res) => {
        const {name, age} = req.body
        const {userId} = req.params


        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('set valid age')
        }
        if (name.length < 3) {
            return res.status(400).json('set valid name')
        }
        const users = await fileService.reader()

        const index = users.findIndex((user) => user.id === +userId)
        if (index === -1) {
            res.status(404).json(`User with id ${userId} is not found!!!`)
        }

        const updateUser = Object.assign(users[userId], req.body)

        users.splice(index, 1)

        // const newUserArr = [...users, {...users[index], ...req.body}]

        await fileService.writer([...users, updateUser])


        res.status(201).json(updateUser)
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params

            await User.deleteOne({_id: userId})


            // const index = users.findIndex((user) => user.id === +userId)
            // if (index === -1) {
            //     res.status(404).json(`User with id ${userId} is not found!!!`)
            // }
            // users.splice(index, 1);

            //await fileService.writer(users)

            res.sendStatus(204)
        }catch (e){
            console.log(e.message)
        }
    }
}