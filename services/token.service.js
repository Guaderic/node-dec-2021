const jwt = require('jsonwebtoken')
const {CustomError} = require("../Errors");
const {ACCESSES_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../constants/config.constant");



function generatedTokens(payload = {}) {
    const access_token =  jwt.sign(payload, ACCESSES_TOKEN_SECRET, {expiresIn: '15m'})
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return{
        access_token,
        refresh_token
    }
}

function checkAccessToken(token = ''){
    try{
        jwt.verify(token,ACCESSES_TOKEN_SECRET)
    }catch (e){
     throw new  CustomError('Token not valid', 401)
    }

}

module.exports = {
    checkAccessToken,
    generatedTokens,

}