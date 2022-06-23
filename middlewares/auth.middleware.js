const {CustomError} = require("../Errors");
const {checkAccessToken} = require("../services/token.service");
const {OAuth} = require("../dataBase");


module.exports = {
    checkAccessToken: async (req, res, next)=>{
        try{

            const access_token = req.get('Authorization');

            if(!access_token){
                throw new CustomError('No token', 401);
            }

            checkAccessToken(access_token);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if(!tokenInfo){
                throw new CustomError('Token not valid', 401)
            }

            next()
        }catch (e){
            next(e)
        }

    }


}