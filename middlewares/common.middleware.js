const { Types } = require('mongoose')
const {CustomError}  = require("../Errors");

module.exports = {
    isIdvalid: (req, res, next) => {
     try {
         const { id } = req.params;
         const isValid = Types.ObjectId.isValid(id)
         if(!isValid){
             return next(new CustomError('Not valid ID'))
         }
         next();
     }catch (e){
        next(e)
     }
    }


}