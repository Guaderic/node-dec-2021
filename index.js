const express = require('express')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/dec');

const {urlencoded} = require("express");
const {userRouter} = require("./routes");


const app = express()
app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/users',userRouter)

app.use('*',(req, res) => {
    res.status(404).json('Page not found')
})
app.use((err, req, res, next)=>{
    res

})


app.listen(5000, () => {
    console.log('Server listen 5000')
})