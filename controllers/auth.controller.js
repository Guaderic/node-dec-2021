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

            next()
        }catch (e){
            next(e)
        }
    }
}