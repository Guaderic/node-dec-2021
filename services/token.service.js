const jwt = require('jsonwebtoken')



function generatedTokens(payload = {}) {
    const access_token =  jwt.sign(payload, 'svds', {expiresIn: '15m'})
    const refresh_token = jwt.sign(payload, 'ksjc', {expiresIn: '30d'})

    return{
        access_token,
        refresh_token
    }
}

module.exports = {
    generatedTokens
}