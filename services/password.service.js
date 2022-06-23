const bcrypt = require('bcrypt');
const {CustomError} = require("../Errors");


module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (hashPassword, password) => {
       const isPasswordSame = await bcrypt.compare(password, hashPassword);

       if(!isPasswordSame){
           throw new CustomError('Email or password is wrong', 400)
       }
    }



}