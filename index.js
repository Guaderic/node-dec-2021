const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/dec-2021')


const {urlencoded} = require("express");

const {userRouter, authRouter} = require("./routes");


const app = express();
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use('/users',userRouter);
app.use('/auth',authRouter);


app.use('*',(req, res) => {
    res.status(404).json('Page not found');

})

app.use((err, req, res, next) =>{
   res
       .status(err.status  || 500)
       .json({
           error: err.message || 'Unknown error',
           code: err.status || 500
       })
})


app.listen(5000, () => {
    console.log('Server listen 5000')
})