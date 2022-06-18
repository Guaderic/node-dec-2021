const express = require('express')
const {fileService} = require("./service");
// const users = require('./dataBase/users')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    console.log(req)
    res.json('Hello')
})

// app.get('/users', (req, res) => {
//     res.json(users)
// })

app.get('/users', async (req, res) => {
    const users = await fileService.reader()
    res.json(users)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()

    const user = users.find((user) => user.id === +userId)
    if (!user) {
        res.status(404).json(`User with id ${userId} is not found!!!`)
    }
    res.json(user)
})


app.post('/users', async (req, res) => {
    const {name, age} = req.body
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('set valid age')
    }
    if (!name || name.length < 3) {
        return res.status(400).json('set valid name')
    }
    const users = await fileService.reader()

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
    await fileService.writer([...users, newUser])

    console.log(newUser)
    res.status(201).json(newUser)
});


app.put('/users/:userId', async (req, res) => {
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
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fileService.reader()

    const index = users.findIndex((user) => user.id === +userId)
    if (index === -1) {
        res.status(404).json(`User with id ${userId} is not found!!!`)
    }
    users.splice(index, 1);

    await fileService.writer(users)

    res.sendStatus(204)
})


app.listen(5000, () => {
    console.log('Server listen 5000')
})