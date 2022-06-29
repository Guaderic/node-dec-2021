const {generatedTokens} = require("../services/token.service");
const {passwordService} = require("../services");
const {OAuth} = require("../dataBase");


module.exports ={
    login: async (req, res, next )=>{
        try{
            const { password : hashPassword, _id } = req.user
            const { password } = req.body

            await passwordService.comparePasswords(hashPassword, password)

            const tokens = generatedTokens()

            await OAuth.create({
                userId: _id,
                ...tokens
            })
            res.json({
                user: req.user,
                ...tokens
            })

            next()
        }catch (e){
            next(e)
        }
    },
    refreshToken: async (req, res, next )=>{
        try{
            const { userId, refresh_token } = req.tokenInfo

            await OAuth.deleteOne({refresh_token})


            const tokens = generatedTokens()

            await OAuth.create({
                userId,
                ...tokens
            })

            res.json(tokens)
        }catch (e){
            next(e)
        }
    }
}