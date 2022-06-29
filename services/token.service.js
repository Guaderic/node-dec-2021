const jwt = require('jsonwebtoken')
const {CustomError} = require("../Errors");
const {ACCESSES_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../constants/constants");
const {configConstants} = require("../constants");



function generatedTokens(payload = {}) {
    const access_token =  jwt.sign(payload, ACCESSES_TOKEN_SECRET, {expiresIn: '15m'})
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return{
        access_token,
        refresh_token
    }
}

function checkToken(token = '', tokenType = 'access'){
    try{
        let secret
        if(tokenType === 'access') secret = configConstants.ACCESSES_TOKEN_SECRET
        if(tokenType === 'refresh') secret = configConstants.REFRESH_TOKEN_SECRET
        jwt.verify(token, secret)
    }catch (e){
     throw new  CustomError('Token not valid', 401)
    }

}

module.exports = {
    checkToken,
    generatedTokens,

}