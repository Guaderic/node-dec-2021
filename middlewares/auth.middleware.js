const {CustomError} = require("../Errors");
const {checkToken} = require("../services/token.service");
const {OAuth} = require("../dataBase");


module.exports = {
    checkAccessToken: async (req, res, next)=>{
        try{

            const access_token = req.get('Authorization');

            if(!access_token){
                throw new CustomError('No token', 401);
            }

            checkToken(access_token);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if(!tokenInfo){
                throw new CustomError('Token not valid', 401)
            }

            next()
        }catch (e){
            next(e)
        }

    },

    checkRefreshToken: async (req, res, next)=>{
        try{

            const refresh_token = req.get('Authorization');

            if(!refresh_token){
                throw new CustomError('No token', 401);
            }

            checkToken(refresh_token, 'refresh');

            const tokenInfo = await OAuth.findOne({refresh_token})

            if(!tokenInfo){
                throw new CustomError('Token not valid', 401)
            }
            req.tokenInfo = tokenInfo
            next()
        }catch (e){
            next(e)
        }

    }


}