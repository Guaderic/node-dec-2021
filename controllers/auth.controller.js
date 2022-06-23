const {generatedTokens} = require("../services/token.service");
module.exports ={
    login:(req, res, next )=>{
        try{

            const token  = generatedTokens()
            res.json(token)
            next()
        }catch (e){
            next(e)
        }
    }
}